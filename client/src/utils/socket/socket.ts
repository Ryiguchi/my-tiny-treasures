import { io } from 'socket.io-client';
import { baseUrl } from '../urls/serverUrls';
import { setIsConnected } from '../../store/features/user/userSlice';
import { Dispatch } from 'react';
import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import {} from '../types/interfaces/general.interfaces';
import { queryClient } from '../../main';
import { NavigateFunction } from 'react-router-dom';
import { UseMutationResult } from '@tanstack/react-query';
import { RootState } from '../../store/store';
import { User } from '../types/interfaces/state.interface';
import { MsgData } from '../types/interfaces/message.interface';
import { QueryClientResults } from '../types/interfaces/reactQuery.interface';
import { Chat } from '../types/interfaces/chat.interface';
import { TradeStatus } from '../types/enums/enums';

type MutationType = UseMutationResult<
  void,
  unknown,
  MsgData,
  {
    previousChatData: unknown;
  }
>;

type DispatchType = ThunkDispatch<RootState, undefined, AnyAction> &
  Dispatch<AnyAction>;

interface SocketArgs {
  dispatch: DispatchType;
  navigate: NavigateFunction;
  user: User | null;
  mutation: MutationType;
}

interface TradeUpdateData {
  status: TradeStatus;
  error?: string;
  room: string;
}

export const socket = io(baseUrl, {
  // autoConnect: false,
});

export const onSocket = (args: SocketArgs) => {
  socket.on('connect', () => onConnect(args.dispatch));
  socket.on('disconnect', () => onDisconnect(args.dispatch));
  socket.on('message in', (msgData: MsgData) =>
    onMessageIn(msgData, args.mutation, args.user)
  );
  socket.on('room', (room: string) => onRoom(room, args.navigate));
  socket.on('trade update', (tradeUpdateData: TradeUpdateData) => {
    const { status, room } = tradeUpdateData;
    if (status === TradeStatus.Completed) {
      // send toast
    }
    if (status === TradeStatus.Failed) {
      // send error toast
    }
    queryClient.refetchQueries(['chat', room]);
  });
};

export const offSocket = (args: SocketArgs) => {
  socket.off('connect', () => onConnect(args.dispatch));
  socket.off('disconnect', () => onDisconnect(args.dispatch));
  socket.off('message in', (msgData: MsgData) =>
    onMessageIn(msgData, args.mutation, args.user)
  );
  socket.on('room', (room: string) => onRoom(room, args.navigate));
};

socket.onAny((event, ...args) => {
  console.log(event, args);
});

// CALLBACKS
const onConnect = (dispatch: Dispatch<Action>): void => {
  dispatch(setIsConnected(true));
};

const onDisconnect = (dispatch: Dispatch<Action>): void => {
  dispatch(setIsConnected(false));
};
// When user receives a message, from another user or self
const onMessageIn = async (
  msg: MsgData,
  mutation: MutationType,
  user: User | null
): Promise<void> => {
  if (!user) return;
  console.log('MESSAGE IN');
  const chatData: QueryClientResults<Chat> | undefined =
    await queryClient.getQueryData(['chat', msg.room]);

  if (chatData && msg.room === chatData.data.data.id) {
    mutation.mutate(msg);
    if (user.id === msg.recipientId) {
      socket.emit('seen', msg.room);
    }
  }
  queryClient.refetchQueries(['msgData']);
};

// When user emits "join" and gets back a room id
const onRoom = (room: string, navigate: NavigateFunction): void => {
  navigate(`/chats/${room}`);
};
