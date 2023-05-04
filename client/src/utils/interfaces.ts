// CHAT
interface NumberObject {
  [key: string]: number;
}

export interface Chat {
  newMsg: [NumberObject, NumberObject];
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
export interface ChatData {
  chatId: string;
  newMsgs: number;
  latestMsg: ChatMessage;
}

// MSGDATA
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
export interface GeoLocation {
  coordinates: [number, number];
  type: string;
  city?: string;
}

// STATE
export interface User {
  email: string;
  id: string;
  name: string;
  newMessages: number;
  location?: GeoLocation;
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

// REACT QUERY
export interface QueryClientResults<T> {
  data: {
    data: T;
  };
}

// export interface SignInCredentials {
//   email: string;
//   password: string;
// }

interface Metadata {
  nextPage: number;
  totalPages: number;
  totalResults: number;
  _id: null;
}

export interface PostQueryResult {
  metadata: Metadata;
  posts: Post[];
}
