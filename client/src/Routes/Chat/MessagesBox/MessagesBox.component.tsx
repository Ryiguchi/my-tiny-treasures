import { useEffect, FC, useRef } from 'react';
import Box from '../../../components/common/Box/Box.component';
import { theme } from '../../../styles/themes';
import Message from '../Message/Message.component';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/features/user/user.selectors';
import { ChatMessage } from '../../../utils/types/interfaces/chat.interface';
import * as S from './messagesBox.styles';

interface Messages {
  messages: ChatMessage[];
  showIsWritingEl: boolean;
}

const MessagesBox: FC<Messages> = ({ messages, showIsWritingEl }) => {
  const user = useSelector(selectUser);
  const messageBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const messageBoxEl = messageBoxRef.current;
    if (!messageBoxEl) return;

    messageBoxEl.scrollTop = messageBoxEl.scrollHeight;
  }, [messageBoxRef.current, messages, showIsWritingEl]);

  return (
    <S.Wrapper ref={messageBoxRef}>
      <Box
        width="100%"
        borderRadius={theme.radius.image}
        marginBottom="1rem"
        justifyContent="flex-end"
        padding="0 3.2rem"
      >
        {user &&
          messages.map(message => {
            return (
              <Message
                key={message._id}
                text={message.text}
                sentByUser={user.id === message.user}
              />
            );
          })}
        <S.IsWritingBox showIsWritingEl={showIsWritingEl}>
          <div></div>
          <div></div>
          <div></div>
        </S.IsWritingBox>
      </Box>
    </S.Wrapper>
  );
};

export default MessagesBox;
