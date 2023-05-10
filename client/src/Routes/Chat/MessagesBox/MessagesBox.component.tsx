import { forwardRef, Ref } from 'react';
import Box from '../../../components/common/Box/Box.component';
import { theme } from '../../../styles/themes';
import Message from '../Message/Message.component';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/features/user/user.selectors';
import { ChatMessage } from '../../../utils/types/interfaces/chat.interface';
import { Wrapper } from './messageBox.styles';

interface Messages {
  messages: ChatMessage[];
}

const MessagesBox = forwardRef((props: Messages, ref: Ref<HTMLDivElement>) => {
  const { messages } = props;
  const user = useSelector(selectUser);

  const isPrevSameSender = (id: string): boolean => {
    const prevMessage = document.getElementById(id);
    if (!prevMessage) return false;

    const style = window.getComputedStyle(prevMessage);
    const color = style.getPropertyValue('color');

    return color === 'rgb(255, 255, 255)';
  };

  return (
    <Wrapper ref={ref}>
      <Box
        width="100%"
        borderRadius={theme.radius.image}
        marginBottom="6rem"
        justifyContent="flex-end"
        padding="0 3.2rem"
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
    </Wrapper>
  );
});

export default MessagesBox;
