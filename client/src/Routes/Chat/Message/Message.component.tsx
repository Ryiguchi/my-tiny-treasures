import { FC } from 'react';
import { MessageBox } from './message.styles';

interface messageData {
  text: string;
  sentByUser: boolean;
  prevSameSender: boolean;
  id: string;
}

const Message: FC<messageData> = ({
  text,
  sentByUser,
  prevSameSender,
  ...otherProps
}) => {
  return (
    <MessageBox
      prevSameSender={prevSameSender}
      sentByUser={sentByUser}
      {...otherProps}
    >
      {text}
    </MessageBox>
  );
};

export default Message;
