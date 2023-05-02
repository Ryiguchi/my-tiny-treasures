import { NextFunction, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { CustomRequest } from '../utils/expressInterfaces';
import Chat, { ChatDocument } from '../models/chatModel';
import { MsgData } from './socketsController';
import User, { UserDocument } from '../models/userModel';
import AppError from '../utils/appError';
import { ChatMessage } from '../utils/interfaces';

export interface ChatPreview {
  id: string;
  latestMsg: ChatMessage;
  unread: number;
}

export const getMyChat = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const roomId = req.params.roomId;

    const chat = await Chat.findById(roomId);

    if (!chat) {
      return next(new AppError('No chat found!', 400));
    }

    const users = chat.users.map(ObId => ObId.toString());
    if (!users.includes(req.user.id)) {
      return next(new AppError('You do not have access to this chat!', 401));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: chat,
      },
    });
  }
);

// export const createChat = catchAsync(
//   async (req: CustomRequest, res: Response, next: NextFunction) => {
//     const data = {
//       messages: [],
//       users: [req.params.myId, req.params.chatWithId],
//     };

//     const chat = await Chat.create(data);

//     res.status(200).json({
//       status: 'success',
//       data: {
//         data: chat,
//       },
//     });
//   }
// );

// export const addMessage = catchAsync(
//   async (req: CustomRequest, res: Response, next: NextFunction) => {
//     const chatId = req.params.chatId;

//     const updatedChat = await Chat.findByIdAndUpdate(
//       chatId,
//       {
//         $push: { messages: req.body },
//         $addToSet: { newMessage: req.body.user },
//       },
//       {
//         new: true,
//       }
//     );

//     res.status(200).json({
//       status: 'success',
//       data: {
//         data: updatedChat,
//       },
//     });
//   }
// );

// export const getPreviews = catchAsync(
//   async (req: CustomRequest, res: Response, next: NextFunction) => {
//     const userId = req.user._id.toString();
//     const data: UserDocument | null = await User.findById(userId).populate(
//       'chats'
//     );

//     if (!data) {
//       return next(new AppError('No chats found!', 400));
//     }

//     let chats: ChatPreview[] = [];
//     data.chats.forEach(chat => {
//       const newMsgs = chat.messages.reduce((acc, cur) => {
//         return cur.seen || cur.user.toString() === userId ? acc : acc + 1;
//       }, 0);
//       const previewData: ChatPreview = {
//         id: chat._id.toString(),
//         latestMsg: chat.messages[chat.messages.length - 1],
//         unread: newMsgs,
//       };
//       chats.push(previewData);
//     });

//     res.status(200).json({
//       status: 'success',
//       results: chats.length,
//       data: {
//         data: chats,
//       },
//     });
//   }
// );

// FROM SOCKET

export const getChatFromUserIds = async (ids: string[]) => {
  let chat: ChatDocument | null;
  const query = { users: { $all: ids } };
  const update = { $set: { 'messages.$[].seen': true } };
  // TODO: GET ONLY CERTAIN NUMBER OF MESSAGES
  // const options = {
  //   new: true,
  //   sort: { 'messages.createdAt': -1 },
  //   slice: { messages: 20 },
  // };

  try {
    chat = await Chat.findOneAndUpdate(query, update)
      .sort({ 'messages.createdAt': -1 })
      .slice('messages', -20);
    if (!chat) chat = await Chat.create({ users: ids });
    return chat ? chat : new Error('Chat not found!');
  } catch (error) {
    return new Error('Chat not found!');
  }
};

export const updateChatWithMsg = async (msg: MsgData) => {
  const message = { user: msg.senderId, text: msg.text };
  const query = { $push: { messages: message } };
  const options = { new: true };

  try {
    const chat = await Chat.findByIdAndUpdate(msg.room, query, options);
    return chat ? chat : new Error('');
  } catch (error) {
    return new Error('Chat not found!');
  }
};
