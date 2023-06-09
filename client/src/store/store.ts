import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import queryReducer from './features/query/querySlice';

import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    user: userReducer,
    query: queryReducer,
  },
  middleware: getDefaultMiddleware =>
    process.env.NODE_ENV === 'development'
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
