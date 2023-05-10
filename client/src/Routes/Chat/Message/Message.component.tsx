import { FC } from 'react';
import { MessageBox } from './message.styles';

interface messageData {
  text: string;
  sentByUser: boolean;
  // id: string;
}

const Message: FC<messageData> = ({
  text,
  sentByUser,
  // ...otherProps
}) => {
  return (
    <MessageBox
      sentByUser={sentByUser}
      // {...otherProps}
    >
      {text}
    </MessageBox>
  );
};

export default Message;
