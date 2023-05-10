import { Server } from 'socket.io';
import {
  getChatFromUserIds,
  markAsSeen,
  updateChatAgreedUsers,
  updateChatWithMsg,
} from './chatController';
import { OnJoinData } from '../utils/interfaces';
import { TradeStatus } from '../utils/types/enums';

export interface MsgData {
  room: string;
  text: string;
  senderId: string;
  recipientId: string;
}
export interface TradeData {
  room: string;
  userId: string;
  agree: boolean;
}

export const listen = (io: Server): void => {
  const connectedUsers: { [key: string]: string } = {};

  io.on('connection', socket => {
    // SIGN IN AND REGISTER ID
    socket.on('sign in', async (id: string) => {
      const socketId = socket.id;
      const userId = id;

      connectedUsers[id] = socket.id;
    });

    // JOIN ROOM
    socket.on('get room', async (chatData: OnJoinData) => {
      const chat = await getChatFromUserIds(chatData);
      if (chat instanceof Error) {
        emitError(chat);
        return;
      }

      const room = chat.id.toString();
      socket.emit('room', room);
    });

    socket.on('join room', room => {
      socket.join(room);
    });

    // LEAVE A ROOM
    socket.on('leave', (room: string) => {
      socket.leave(room);
    });

    // SEND MESSAGE
    socket.on('message out', async (msg: MsgData) => {
      const recipientSocketId = connectedUsers[msg.recipientId];

      const chat = await updateChatWithMsg(msg);

      io.to([recipientSocketId, socket.id]).emit('message in', msg);

      if (chat instanceof Error) {
        emitError(chat);
      }
    });

    socket.on('seen', async (room: string) => {
      await markAsSeen(room);
    });

    socket.on('writing', (room: string) => {
      console.log(socket.rooms);
      socket.to(room).emit('writing');
    });

    socket.on('stop writing', (room: string) => {
      socket.to(room).emit('stop writing');
    });

    socket.on('trade', async (tradeData: TradeData) => {
      const { room } = tradeData;
      try {
        const status = await updateChatAgreedUsers(tradeData);

        if (status === TradeStatus.Completed) {
          io.in(room).emit('trade update', { status, room });
        } else if (status === TradeStatus.Success) {
          io.in(room).emit('trade update', { status, room });
        } else {
          throw new Error('There was a problem with the trade');
        }
      } catch (error: any) {
        io.in(room).emit('trade update', {
          status: TradeStatus.Failed,
          error: error.message,
          room,
        });
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
