import { FC, useEffect, useRef, useState } from 'react';
import { Chat, MsgData } from '../../../utils/interfaces';
import { socket } from '../../../utils/socket';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/features/user/user.selectors';
import { FaPaperclip } from 'react-icons/fa';
import Box from '../../../components/common/Box/Box.component';
import { fileRefs } from '../../../utils/fileRefs';
import { Wrapper } from './messageForm.styles';

interface MessageFormProps {
  chat: Chat;
}

const MessageForm: FC<MessageFormProps> = ({ chat }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, []);

  const sendMessage = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (currentMessage.trim() === '' || !user || !chat) return;

    const recipientId = chat.users.filter(id => id !== user.id).join('');

    const msgData: MsgData = {
      room: chat.id,
      text: currentMessage,
      senderId: user.id,
      recipientId,
    };

    socket.emit('message out', msgData);
    setCurrentMessage('');
    if (!inputRef.current) return;
    inputRef.current.value = '';
    inputRef.current.focus();
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <Wrapper>
      <Box
        flexDirection="row"
        gap="2rem"
        alignItems="center"
        justifyContent="space-between"
      >
        <FaPaperclip size={40} />
        <form onSubmit={sendMessage}>
          <input
            type="text"
            ref={inputRef}
            onChange={e => setCurrentMessage(e.target.value)}
          />
        </form>
        <Box width="4rem" height="4rem">
          <img
            src={fileRefs.sendMessage}
            alt="Send Message"
            onClick={sendMessage}
          />
        </Box>
      </Box>
    </Wrapper>
  );
};

export default MessageForm;
