interface ChatNewMsg {
  [key: string]: number;
}

export interface Chat {
  newMsg: [ChatNewMsg, ChatNewMsg];
  messages: MsgData[];
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

export interface MsgData {
  room: string;
  text: string;
  senderId: string;
  recipientId: string;
}

export interface UserMsgData {
  newMessages: number;
  chatData: ChatData[];
}

export interface ChatData {
  chatId: string;
  newMsgs: number;
  latestMsg: ChatMessage;
}

export interface User {
  email: string;
  id: string;
  name: string;
  newMessages: number;
  location?: {
    coordinates: [number, number];
    type: string;
  };
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface Post {
  categories: string[];
  condition: string;
  createdAt: Date;
  description: string;
  id: string;
  images: string[];
  itemCount: number;
  location: {
    coordinates: [number, number];
    type: string;
  };
  sizes: number[];
  title: string;
  user: string;
  _id: string;
}

export interface QueryClientResults<T> {
  data: {
    data: T;
  };
}
