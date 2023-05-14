import { ChatData } from './chat.interface';

export interface MsgData {
  room: string;
  text: string;
  senderId: string;
  recipientId: string;
  image?: ArrayBuffer | string;
}

export interface UserMsgData {
  newMessages: number;
  chatData: ChatData[];
}
