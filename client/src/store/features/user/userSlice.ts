import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { socket } from '../../../socket';
import { SignInCredentials, User } from '../../../utils/interfaces';
//TODO: find better place for this
axios.defaults.withCredentials = true;

export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  isConnected: boolean;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  isConnected: false,
  loading: 'idle',
};

// HELPERS
const axiosGetUserFromPassword = async (email: string, password: string) => {
  const url = 'http://localhost:8000/api/v1/users/signin';
  const res = await axios.post(url, {
    email,
    password,
  });

  return res.data.data.data;
};

const axiosGetUserFromJwt = async () => {
  const url = 'http://localhost:8000/api/v1/users/checkLoggedIn';
  const res = await axios.get(url);

  return res.data.data.data;
};

// THUNKS
export const signInUser = createAsyncThunk(
  'user/signInUser',
  async ({ email, password }: SignInCredentials) => {
    const user: User = await axiosGetUserFromPassword(email, password);
    if (!user) return;
    // register in socket
    socket.emit('sign in', user.id);
    return user;
  }
);

export const checkForLoggedInUser = createAsyncThunk(
  'user/checkForLoggedInUser',
  async () => {
    const user: User = await axiosGetUserFromJwt();
    if (!user) return;
    return user;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsConnected: (state, { payload }: PayloadAction<boolean>) => {
      state.isConnected = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(checkForLoggedInUser.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload;
        state.isLoggedIn = true;
      }
    });
    builder.addCase(signInUser.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload;
        state.isLoggedIn = true;
      }
    });
  },
});

export const { setIsConnected } = userSlice.actions;
export default userSlice.reducer;
