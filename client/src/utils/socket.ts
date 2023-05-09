import { Socket, io } from 'socket.io-client';
import { baseUrl } from './serverUrls';
import { setIsConnected } from '../store/features/user/userSlice';
import { Dispatch } from 'react';
import { Action } from '@reduxjs/toolkit';
import { Chat, MsgData, QueryClientResults, User } from './interfaces';
import { queryClient } from '../main';

const URL = 'http://localhost:8000';

export const socket = io(URL, {
  // autoConnect: false,
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default class SocketIO {
  private socket: Socket;

  constructor(public dispatch: Dispatch<Action>, public user: User) {
    this.socket = io(baseUrl);
    this.socket.on('connect', this.onConnect);
    this.socket.on('disconnect', this.onDisconnect);
    this.socket.on('message in', this.onMessageIn);
    this.socket.on('room', this.onRoom);
    this.socket.onAny((event, ...args) => {
      console.log(event, args);
    });
  }

  private onConnect(): void {
    this.dispatch(setIsConnected(true));
  }

  private onDisconnect(): void {
    this.dispatch(setIsConnected(false));
  }

  private async onMessageIn(msg: MsgData): Promise<void> {
    console.log('MESSAGE IN');
    const chatData: QueryClientResults<Chat> | undefined =
      await queryClient.getQueryData(['chat', msg.room]);

    if (chatData && msg.room === chatData.data.data.id) {
      mutation.mutate(msg);
      if (user.id === msg.recipientId) {
        socket.emit('seen', msg.room);
      }
    }
    queryClient.refetchQueries(['MsgData']);
    // refetchMsgData();
  }

  private mutateChat;
}
