import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { socket } from '../../../utils/socket';
import { SignInCredentials, User } from '../../../utils/interfaces';
import { serverRoute } from '../../../utils/serverUrls';
import { RootState } from '../../store';
//TODO: find better place for this
axios.defaults.withCredentials = true;

export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  isConnected: boolean;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

export interface SignUpUserData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  isConnected: false,
  loading: 'idle',
};

// HELPERS

const axiosSignUpUser = async (userData: SignUpUserData): Promise<User> => {
  const res = await axios.post(serverRoute.signUp, userData);
  return res.data.data.data;
};

const axiosGetUserFromPassword = async (
  email: string,
  password: string
): Promise<User> => {
  const res = await axios.post(serverRoute.signIn, {
    email,
    password,
  });

  return res.data.data.data;
};

const axiosGetUserFromJwt = async () => {
  const res = await axios.get(serverRoute.checkSignedIn);
  return res.data.data.data;
};

// THUNKS

export const signUpUser = createAsyncThunk(
  'user/signUpUser',
  async (userData: SignUpUserData) => {
    const user: User = await axiosSignUpUser(userData);
    if (!user) return;
    socket.emit('sign in', user.id);
    return user;
  }
);

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

// FIXME: handle error if not signed in
export const checkForLoggedInUser = createAsyncThunk(
  'user/checkForLoggedInUser',
  async () => {
    try {
      const user: User = await axiosGetUserFromJwt();
      if (!user) return;
      socket.emit('sign in', user.id);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
);

export const signOutUserAsync = createAsyncThunk(
  'user/signOutUserAsync',
  async () => {
    await axios.post(serverRoute.signout);
    return;
  }
);

interface UpdateData {
  [key: string]: string | number | string[];
  field: string;
}

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async ({ newData, field }: UpdateData) => {
    const res = await axios.patch(serverRoute.updateMe, {
      [field]: newData,
    });
    const user: User = res.data.data.data;
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
    builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
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
    builder.addCase(signOutUserAsync.fulfilled, state => {
      state.user = null;
      state.isLoggedIn = false;
    });
    builder.addCase(updateUserAsync.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export const { setIsConnected } = userSlice.actions;
export default userSlice.reducer;
