import { ChatStatus } from '../enums/enums';
import { Post } from './state.interface';

interface NumberObject {
  [key: string]: number;
}

export interface Chat {
  status: ChatStatus;
  newMsg: [NumberObject, NumberObject];
  messages: ChatMessage[];
  post: Post;
  users: string[];
  agreedUsers: string[];
  _id: string;
  id: string;
}

export interface ChatMessage {
  createdAt: string;
  seen: boolean;
  text: string;
  image?: string;
  user: string;
  _id: string;
}
export interface ChatData {
  chatId: string;
  newMsgs: number;
  latestMsg: ChatMessage;
  users: string[];
  post: Post;
}

export interface ChatDataEmitJoin {
  users: string[];
  post: string;
}
