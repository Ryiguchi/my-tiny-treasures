import { Server } from 'socket.io';
import {
  getChatFromUserIds,
  markAsSeen,
  updateChatWithMsg,
} from './chatController';
import { getUserById } from './userController';
import { modifyMsgData } from '../models/userModel';
import { OnJoinData } from '../utils/interfaces';

export interface MsgData {
  room: string;
  text: string;
  senderId: string;
  recipientId: string;
}

export const listen = (io: Server): void => {
  const connectedUsers: { [key: string]: string } = {};

  io.on('connection', socket => {
    let room: string;
    let userId: string;
    let socketId: string;

    // SIGN IN AND REGISTER ID
    socket.on('sign in', async (id: string) => {
      socketId = socket.id;
      userId = id;

      connectedUsers[id] = socket.id;
    });

    // JOIN ROOM
    socket.on('join', async (chatData: OnJoinData) => {
      const chat = await getChatFromUserIds(chatData);
      if (chat instanceof Error) {
        emitError(chat);
        return;
      }

      room = chat.id.toString();
      socket.join(room);
      socket.emit('room', room);
    });

    // LEAVE A ROOM
    socket.on('leave', () => {
      socket.leave(room);
      room = '';
    });

    // SEND MESSAGE
    socket.on('message out', async (msg: MsgData) => {
      const recipientSocketId = connectedUsers[msg.recipientId];

      const chat = await updateChatWithMsg(msg);

      io.to([recipientSocketId, socketId]).emit('message in', msg);

      if (chat instanceof Error) {
        emitError(chat);
      }
    });

    socket.on('seen', async (room: string) => {
      await markAsSeen(room);
    });

    // RETRIEVE NEW MESSAGES
    // socket.on('get new messages', async (id: string) => {
    //   const user = await getUserById(id, ['newMessages']);
    //   if (user instanceof Error) {
    //     emitError(user);
    //     return;
    //   }

    //   const newMessages = user.newMessages;
    //   socket.emit('new messages', newMessages);
    // });

    // DISCONNECT
    socket.on('disconnect', () => {
      for (let key in connectedUsers) {
        if (connectedUsers[key] === socket.id) {
          delete connectedUsers[key];
        }
      }
    });

    // LOGGER
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    // ERROR
    const emitError = (error: Error) => {
      socket.emit('error', error);
    };
  });
};
