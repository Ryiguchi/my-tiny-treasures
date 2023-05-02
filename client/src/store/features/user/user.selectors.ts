import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const userSlice = (state: RootState) => state.user;

export const selectUser = createSelector(
  [userSlice],
  userSlice => userSlice.user
);

export const selectIsLoggedIn = createSelector(
  [userSlice],
  userSlice => userSlice.isLoggedIn
);

export const selectIsConnected = createSelector(
  [userSlice],
  userSlice => userSlice.isConnected
);
