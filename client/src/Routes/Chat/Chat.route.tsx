import { useEffect, useRef } from 'react';
import { socket } from '../../utils/socket/socket';
import { useParams } from 'react-router-dom';
import GoBackNav from '../../components/common/GoBackNav/GoBackNav.component';
import MessagesBox from './MessagesBox/MessagesBox.component';
import Box from '../../components/common/Box/Box.component';
import MessageForm from './MessageForm/MessageForm.component';
import { queryClient } from '../../main';
import { useChat } from '../../utils/hooks/reactQueryHooks';
import { Chat } from '../../utils/types/interfaces/chat.interface';
import PostBox from './PostBox/PostBox.component';

const ChatPage: React.FC = () => {
  const room = useParams().chatId;
  const messageBoxRef = useRef<HTMLDivElement | null>(null);

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
    <>
      {chat && (
        <Box height="calc(100vh - 8rem)" justifyContent="space-between">
          <GoBackNav title="messages" />
          <PostBox post={chat.post} />

          <MessagesBox messages={chat.messages} ref={messageBoxRef} />
          <MessageForm chat={chat} messageBoxRef={messageBoxRef.current} />
        </Box>
      )}
    </>
  );
};

export default ChatPage;
