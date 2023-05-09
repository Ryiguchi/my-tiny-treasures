// CHAT
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
  saved: string[];
}
export interface Post {
  mainCategory: string;
  subCategory: string;
  condition: string;
  createdAt: string;
  description: string;
  id: string;
  images: string[];
  itemCount: number;
  location: {
    coordinates: [number, number];
    type: string;
    city?: string;
  };
  size?: number;
  age: string;
  title: string;
  user: string;
  _id: string;
  distance?: number;
}

// REACT QUERY
export interface QueryClientResults<T> {
  data: {
    data: T;
  };
}

export interface SignInCredentials {
  email: string;
  password: string;
}

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

export interface Enum {
  [key: string]: string[];
  sizes: string[];
  clothes: string[];
  main: string[];
  toys: string[];
  other: string[];
}
