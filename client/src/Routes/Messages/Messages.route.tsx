import { useNavigate } from 'react-router-dom';
import * as S from './messages.styles';
import { useMsgData } from '../../utils/hooks';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/features/user/user.selectors';

const Messages: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { status, data, error, isFetching } = useMsgData(user);
  const chatData = data?.data.msgData.chatData;

  return (
    <S.MessagesContainer>
      {chatData && (
        <ul>
          {chatData.map(chat => (
            <li key={chat.chatId}>
              <div>User: {chat.chatId}</div>
              <div>LastMessage: {chat.latestMsg.text}</div>
              <div>NewMessages: {chat.newMsgs}</div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate('/')}>Home</button>
    </S.MessagesContainer>
  );
};

export default Messages;
