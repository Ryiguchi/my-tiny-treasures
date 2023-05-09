import { FC } from 'react';
import Box from '../../../components/common/Box/Box.component';
import { theme } from '../../../styles/themes';
import Message from '../Message/Message.component';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/features/user/user.selectors';
import { ChatMessage } from '../../../utils/interfaces';

interface Messages {
  messages: ChatMessage[];
}

const MessagesBox: FC<Messages> = ({ messages }) => {
  const user = useSelector(selectUser);

  const isPrevSameSender = (id: string): boolean => {
    const prevMessage = document.getElementById(id);
    if (!prevMessage) return false;

    const style = window.getComputedStyle(prevMessage);
    const color = style.getPropertyValue('color');

    return color === 'rgb(255, 255, 255)';
  };

  return (
    <Box
      width="100%"
      minHeight="10rem"
      borderRadius={theme.radius.image}
      boxShadow={theme.shadow}
      padding="1rem"
      backgroundColor="#fff"
      justifyContent="flex-end"
    >
      {user &&
        messages.map(message => {
          return (
            <Message
              key={message._id}
              id={message._id}
              text={message.text}
              sentByUser={user.id === message.user}
              prevSameSender={isPrevSameSender(message._id)}
            />
          );
        })}
    </Box>
  );
};

export default MessagesBox;
