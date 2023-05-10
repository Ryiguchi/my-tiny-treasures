import { useNavigate } from 'react-router-dom';
import * as S from './messages.styles';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/features/user/user.selectors';
import { socket } from '../../utils/socket/socket';
import { queryClient } from '../../main';
import { useMsgData } from '../../utils/hooks/reactQueryHooks';
import { ChatData } from '../../utils/types/interfaces/chat.interface';
import GoBackNav from '../../components/common/GoBackNav/GoBackNav.component';
import Box from '../../components/common/Box/Box.component';
import MessageCard from './MessageCard/MessageCard.component';

const Messages: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { status, data, error, isFetching } = useMsgData(user);
  const chatData = data?.data.msgData.chatData;

  const goToChat = async (chat: ChatData) => {
    if (!user) return;
    const chatData = {
      users: chat.users,
      post: chat.post,
    };
    socket.emit('get room', chatData);
    await queryClient.refetchQueries(['msgData']);
  };

  return (
    <S.Wrapper gap="2.4rem">
      <GoBackNav title="Messages" />
      {chatData && (
        <ul>
          <Box gap="2.4rem">
            {chatData.map(chat => (
              <MessageCard
                chat={chat}
                key={chat.chatId}
                onClick={() => goToChat(chat)}
              />
            ))}
          </Box>
        </ul>
      )}
    </S.Wrapper>
  );
};

export default Messages;
