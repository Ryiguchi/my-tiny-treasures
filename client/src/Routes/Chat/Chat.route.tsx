import { useEffect, useState } from 'react';
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
  const [showIsWritingEl, setShowIsWritingEl] = useState<boolean>(false);

  const { data: chatData } = useChat(room);
  const chat: Chat | undefined = chatData?.data.data;

  useEffect(() => {
    socket.emit('join room', room);
  }, [room]);

  useEffect(() => {
    socket.on('writing', (): void => {
      setShowIsWritingEl(true);
    });
    socket.on('stop writing', (): void => setShowIsWritingEl(false));
    return () => {
      queryClient.removeQueries(['chat', room]);
      chat && socket.emit('leave', room);
    };
  }, []);

  return (
    <>
      {chat && (
        <Box height="calc(100vh - 8rem)" justifyContent="space-between">
          <GoBackNav title={chat.post.userName} />
          <PostBox chat={chat} />

          <MessagesBox
            messages={chat.messages}
            showIsWritingEl={showIsWritingEl}
          />
          <MessageForm chat={chat} />
        </Box>
      )}
    </>
  );
};

export default ChatPage;
