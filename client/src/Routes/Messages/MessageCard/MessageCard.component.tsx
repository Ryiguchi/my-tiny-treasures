import { FC } from 'react';
import { ChatData } from '../../../utils/types/interfaces/chat.interface';
import Box from '../../../components/common/Box/Box.component';
import { FaArrowRight } from 'react-icons/fa';
import { theme } from '../../../styles/themes';
import { Wrapper } from './messages.styles';
import { getDate } from '../../../utils/helpers';

interface MessageCardProps {
  chat: ChatData;
  onClick: () => void;
}

const MessageCard: FC<MessageCardProps> = ({ chat, onClick }) => {
  return (
    <>
      {chat.post && (
        <Wrapper
          boxShadow={theme.shadow}
          padding="2.4rem"
          borderRadius={theme.radius.image}
        >
          <li onClick={onClick}>
            <Box gap="1.6rem" flexDirection="row">
              <Box
                minWidth="10rem"
                height="10rem"
                borderRadius={theme.radius.image}
              >
                <img src={chat.post.images[0]} alt="Kids Items" />
              </Box>
              <Box gap=".6rem" flex={1} overflow="hidden">
                <p>{chat.post.userName}</p>
                <p>{getDate(chat.post.createdAt)}</p>
                <p>{chat.post.title}</p>
                <p>{chat.post.description}</p>
              </Box>
              <Box alignSelf="center">
                <FaArrowRight size={24} />
              </Box>
            </Box>
          </li>
        </Wrapper>
      )}
    </>
  );
};

export default MessageCard;
