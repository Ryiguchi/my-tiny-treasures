import { FC } from 'react';
import { MessageBox } from './message.styles';
import { ChatMessage } from '../../../utils/types/interfaces/chat.interface';
import { getTimeFromDate } from '../../../utils/helpers';
import Box from '../../../components/common/Box/Box.component';

interface MessageProps {
  message: ChatMessage;
  sentByUser: boolean;
  handleOpenSlideshow: (image: string | undefined) => void;
  // id: string;
}

const Message: FC<MessageProps> = ({
  message,
  sentByUser,
  handleOpenSlideshow,
  // ...otherProps
}) => {
  return (
    <MessageBox
      sentByUser={sentByUser}
      // {...otherProps}
    >
      {message.image && (
        <Box
          onClick={() => handleOpenSlideshow(message.image)}
          width="14rem"
          height="14rem"
          margin=".6rem"
          marginTop=".6rem"
        >
          <img src={message.image} alt="User Image" />
        </Box>
      )}
      <p>{message.text}</p>
      <span>{getTimeFromDate(message.createdAt)}</span>
    </MessageBox>
  );
};

export default Message;
