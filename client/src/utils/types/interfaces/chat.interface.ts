import { Post } from './state.interface';

interface NumberObject {
  [key: string]: number;
}

export interface Chat {
  newMsg: [NumberObject, NumberObject];
  messages: ChatMessage[];
  post: Post;
  users: string[];
  _id: string;
  id: string;
}

export interface ChatMessage {
  createdAt: Date;
  seen: boolean;
  text: string;
  user: string;
  _id: string;
}
export interface ChatData {
  chatId: string;
  newMsgs: number;
  latestMsg: ChatMessage;
  users: string[];
  post: string;
}

export interface ChatDataEmitJoin {
  users: string[];
  post: string;
}
