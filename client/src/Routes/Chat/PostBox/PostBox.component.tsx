import { FC } from 'react';
import Box from '../../../components/common/Box/Box.component';
import Button from '../../../components/common/Button/Button.component';
import { ButtonType } from '../../../components/common/Button/button.types';
import { Wrapper } from './postBox.styles';
import { Chat } from '../../../utils/types/interfaces/chat.interface';
import { ChatStatus } from '../../../utils/types/enums/enums';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/features/user/user.selectors';
import { socket } from '../../../utils/socket/socket';
import { useNavigate } from 'react-router-dom';

interface PostBoxProps {
  chat: Chat;
}

const PostBox: FC<PostBoxProps> = ({ chat }) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleTrade = (agree: boolean) => {
    if (!user) return;
    const isSeller = chat.post.user === user.id;

    if (agree && !isSeller && user.credits < 1) {
      console.log('Not enough credits!');
      return;
    }

    const tradeData = {
      room: chat.id,
      userId: user.id,
      agree,
    };

    socket.emit('trade', tradeData);
  };
  return (
    <Wrapper marginBottom=".5rem">
      <Box
        display="grid"
        gridTemplateColumns="1fr auto"
        padding="2rem 3.2rem"
        backgroundColor="#fff"
      >
        <Box width="6rem" height="6rem" borderRadius="8px" marginBottom="1rem">
          <img
            onClick={() => navigate(`/posts/${chat.post._id}`)}
            src={chat.post.images[0]}
            alt="Kids Items"
          />
        </Box>
        {user &&
          (chat.status === ChatStatus.Active ||
            (chat.status === ChatStatus.Pending &&
              !chat.agreedUsers.includes(user.id))) && (
            <Button
              onClick={() => handleTrade(true)}
              buttonType={ButtonType.SmallGreen}
            >
              Trade
            </Button>
          )}
        {user &&
          chat.status === ChatStatus.Pending &&
          chat.agreedUsers.includes(user.id) && (
            <Button
              onClick={() => handleTrade(false)}
              buttonType={ButtonType.SmallYellow}
            >
              Pending
            </Button>
          )}
        {chat.status === ChatStatus.Completed && (
          <Button buttonType={ButtonType.SmallTransparent}>Completed</Button>
        )}

        <Box gridColumn="1 / -1">
          <h2>{chat.post.title}</h2>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default PostBox;
