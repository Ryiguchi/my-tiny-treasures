import { useEffect } from 'react';
import { socket } from '../../utils/socket/socket';
import { useParams } from 'react-router-dom';
import GoBackNav from '../../components/common/GoBackNav/GoBackNav.component';
import MessagesBox from './MessagesBox/MessagesBox.component';
import Box from '../../components/common/Box/Box.component';
import MessageForm from './MessageForm/MessageForm.component';
import { queryClient } from '../../main';
import { useChat } from '../../utils/hooks/reactQueryHooks';
import { Chat } from '../../utils/types/interfaces/chat.interface';

const ChatPage: React.FC = () => {
  const room = useParams().chatId;

  const { data: chatData } = useChat(room);
  const chat: Chat | undefined = chatData?.data.data;

  useEffect(() => {
    return () => {
      // TODO: clear query
      // dispatch(setChat(null));
      socket.emit('leave');
      queryClient.removeQueries(['chat', room]);
    };
  }, []);

  return (
    <Box padding="2rem">
      {chat && (
        <Box gap="1rem">
          <GoBackNav title="message" />
          <MessagesBox messages={chat.messages} />
          <MessageForm chat={chat} />
        </Box>
      )}
    </Box>
  );
};

export default ChatPage;
