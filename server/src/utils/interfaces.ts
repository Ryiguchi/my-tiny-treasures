import mongoose from 'mongoose';
import { PostDocument } from '../models/postModel';

export interface StringObject {
  [key: string]: string;
}

export interface NumberObject {
  [key: string]: number | undefined;
}

export interface BasicUserData {
  id: string;
  name: string;
  email: string;
  location: LocationData;
  saved: PostDocument[];
  credits: number;
}

export interface ChatMessage {
  user: mongoose.Schema.Types.ObjectId;
  text: string;
  createdAt: Date;
  seen: boolean;
  image: string;
}

export interface ChatData {
  chatId: string;
  newMsgs: number;
  latestMsg: ChatMessage;
  users: string[];
  post: PostDocument;
}

export interface OnJoinData {
  users: [string, string];
  post: string;
}

export interface UserMsgData {
  newMessages: number;
  chatData: ChatData[];
}

export enum Point {
  Point = 'Point',
}

export interface LocationData {
  type: Point;
  coordinates: [number, number];
  city?: string;
}

export interface PostsWithData {
  posts: PostDocument[];
  nextPage: number;
}
