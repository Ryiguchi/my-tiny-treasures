import { io } from 'socket.io-client';
// import { RootState } from './store/store';
// import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
// import { setIsConnected, setNewMessages } from './store/features/user/userSlice';
// import { setMessages } from './store/features/chat/chatSlice';

const URL = 'http://localhost:8000';

export const socket = io(URL, {
  // autoConnect: false,
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});
