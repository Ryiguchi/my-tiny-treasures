import { NextFunction, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { CustomRequest } from '../utils/expressInterfaces';
import Chat, { ChatDocument } from '../models/chatModel';
import { MsgData, TradeData } from './socketsController';
import AppError from '../utils/appError';
import { ChatMessage, OnJoinData } from '../utils/interfaces';
import { PostDocument } from '../models/postModel';
import User from '../models/userModel';

export interface ChatPreview {
  id: string;
  latestMsg: ChatMessage;
  unread: number;
}

export const getMyChat = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const roomId = req.params.roomId;

    const chat = await Chat.findById(roomId).populate('post');

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

// FROM SOCKET

export const getChatFromUserIds = async (chatData: OnJoinData) => {
  let chat: ChatDocument | null;
  const query = { users: { $all: chatData.users } };
  const update = { $set: { 'messages.$[].seen': true } };
  const options = { new: true };
  // TODO: GET ONLY CERTAIN NUMBER OF MESSAGES
  // const options = {
  //   new: true,
  //   sort: { 'messages.createdAt': -1 },
  //   slice: { messages: 20 },
  // };

  try {
    chat = await Chat.findOneAndUpdate(query, update, options)
      .sort({ 'messages.createdAt': -1 })
      .slice('messages', -20);
    if (!chat) {
      chat = await Chat.create(chatData);
    }

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

export const markAsSeen = async (room: string) => {
  console.log('MARKING');
  const update = { $set: { 'messages.$[].seen': true } };
  try {
    const updatedChat = await Chat.findByIdAndUpdate(room, update);
  } catch (error) {
    return new Error('Chat not found!');
  }
};

export const updateChatAgreedUsers = async ({
  room,
  userId,
  agree,
}: TradeData) => {
  const updateQuery = { agreedUsers: userId };
  const update = agree ? { $addToSet: updateQuery } : { $pull: updateQuery };
  const options = { new: true };

  try {
    const chat: ChatDocument | null = await Chat.findByIdAndUpdate(
      room,
      update,
      options
    );
    if (!chat) throw new Error('There was a problem updating the Chat!');
    if (chat.status === 'completed') {
      await exchangeTokens(chat);
      return 'completed';
    }
    return 'success';
  } catch (error) {
    throw new Error('There was a problem updating the Chat!');
  }
};

const exchangeTokens = async (chat: ChatDocument) => {
  const post = chat.post as PostDocument;

  const sellerId = post.user;
  const buyerId = chat.users.filter(user => user !== sellerId);

  const buyer = await User.findByIdAndUpdate(
    buyerId,
    { $inc: { credits: -1 } },
    { new: true }
  );
  if (!buyer) {
    throw new Error('There was a problem updating the Chat!');
  }
  const seller = await User.findByIdAndUpdate(
    sellerId,
    { $inc: { credits: 1 } },
    { new: true }
  );
  if (!seller) {
    throw new Error('There was a problem updating the Chat!');
  }
};
