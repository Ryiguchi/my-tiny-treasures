import { ChatMessage } from '../../utils/types/interfaces/chat.interface';

export const getAllChatImages = (messages: ChatMessage[]): string[] => {
  const imgArray: string[] = [];
  messages.forEach(message => {
    if (message.image) {
      imgArray.push(message.image);
    }
  });

  return imgArray;
};
