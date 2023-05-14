import { useEffect, FC, useRef, useState } from 'react';
import Box from '../../../components/common/Box/Box.component';
import { theme } from '../../../styles/themes';
import Message from '../Message/Message.component';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/features/user/user.selectors';
import { ChatMessage } from '../../../utils/types/interfaces/chat.interface';
import * as S from './messagesBox.styles';
import { getMessageDate } from '../../../utils/helpers';
import ChatSlideshow from '../ChatSlideshow/ChatSlideshow.component';

interface Messages {
  messages: ChatMessage[];
  showIsWritingEl: boolean;
}

const MessagesBox: FC<Messages> = ({ messages, showIsWritingEl }) => {
  const user = useSelector(selectUser);
  const messageBoxRef = useRef<HTMLDivElement | null>(null);
  const [isSlideshowOpen, setIsSlideshowOpen] = useState(false);
  const [initialImage, setInitialImage] = useState('');

  let messageDate: string;

  useEffect(() => {
    const messageBoxEl = messageBoxRef.current;
    if (!messageBoxEl) return;

    messageBoxEl.scrollTop = messageBoxEl.scrollHeight;
  }, [messageBoxRef.current, messages, showIsWritingEl]);

  const handleOpenSlideshow = (image: string | undefined) => {
    if (!image) return;

    setIsSlideshowOpen(true);
    setInitialImage(image);
  };

  return (
    <S.Wrapper ref={messageBoxRef}>
      {isSlideshowOpen && (
        <ChatSlideshow
          setIsSlideshowOpen={setIsSlideshowOpen}
          messages={messages}
          initialImage={initialImage}
        />
      )}

      <Box
        width="100%"
        borderRadius={theme.radius.image}
        marginBottom="1rem"
        justifyContent="flex-end"
        padding="0 3.2rem"
      >
        {user &&
          messages.map(message => {
            let newDate: string | null = null;
            const formattedDate = getMessageDate(message.createdAt);
            if (formattedDate !== messageDate) {
              messageDate = formattedDate;
              newDate = formattedDate;
            }

            return (
              <Box key={message._id}>
                {newDate && <S.StyledDate>{formattedDate}</S.StyledDate>}
                <Message
                  message={message}
                  sentByUser={user.id === message.user}
                  handleOpenSlideshow={handleOpenSlideshow}
                />
              </Box>
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
