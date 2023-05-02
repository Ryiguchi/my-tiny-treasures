import { Server } from 'socket.io';
import { getChatFromUserIds, updateChatWithMsg } from './chatController';
import { getUserById } from './userController';
import { modifyMsgData } from '../models/userModel';

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

    // SIGN IN AND REGISTER ID
    socket.on('sign in', async (id: string) => {
      connectedUsers[id] = socket.id;
    });

    // JOIN ROOM
    socket.on('join', async (ids: [string, string]) => {
      const chat = await getChatFromUserIds(ids);

      if (chat instanceof Error) {
        emitError(chat);
        return;
      }

      const room = chat.id.toString();
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

      io.to([recipientSocketId, socket.id]).emit('message in', msg);

      const chat = await updateChatWithMsg(msg);
      if (chat instanceof Error) {
        emitError(chat);
      }
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
