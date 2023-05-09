import { useNavigate } from 'react-router-dom';
import * as S from './messages.styles';
import { useMsgData } from '../../utils/hooks';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/features/user/user.selectors';
import { socket } from '../../utils/socket';
import { ChatData } from '../../utils/interfaces';
import { queryClient } from '../../main';

const Messages: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { status, data, error, isFetching } = useMsgData();
  const chatData = data?.data.msgData.chatData;

  const goToChat = async (chat: ChatData) => {
    if (!user) return;
    const chatData = {
      users: chat.users,
      post: chat.post,
    };
    socket.emit('join', chatData);
    await queryClient.refetchQueries(['msgData']);
  };

  return (
    <S.MessagesContainer>
      {chatData && (
        <ul>
          {chatData.map(chat => {
            console.log(chat);
            return (
              <li key={chat.chatId} onClick={() => goToChat(chat)}>
                <div>User: {chat.chatId}</div>
                <div>LastMessage: {chat.latestMsg.text}</div>
                <div>NewMessages: {chat.newMsgs}</div>
              </li>
            );
          })}
        </ul>
      )}
      <button onClick={() => navigate('/')}>Home</button>
    </S.MessagesContainer>
  );
};

export default Messages;
