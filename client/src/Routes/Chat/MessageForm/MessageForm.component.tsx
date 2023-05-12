import { FC, useEffect, useRef, useState, ChangeEvent } from 'react';
import {} from '../../../utils/types/interfaces/general.interfaces';
import { socket } from '../../../utils/socket/socket';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/features/user/user.selectors';
import { FaPaperclip, FaTelegramPlane } from 'react-icons/fa';
import Box from '../../../components/common/Box/Box.component';
import { Wrapper } from './messageForm.styles';
import { Chat } from '../../../utils/types/interfaces/chat.interface';
import { MsgData } from '../../../utils/types/interfaces/message.interface';

interface MessageFormProps {
  chat: Chat;
}

let timeout: NodeJS.Timeout | null;

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
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCurrentMessage(e.target.value);
    const room = chat.id;
    if (timeout) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        socket.emit('stop writing', room);
        timeout = null;
      }, 2000);
    } else {
      socket.emit('writing', room);
      timeout = setTimeout(() => {
        socket.emit('stop writing', room);
        timeout = null;
      }, 2000);
    }
  };

  return (
    <Wrapper padding=".5rem 0 2rem 0">
      <Box
        flexDirection="row"
        gap="2rem"
        alignItems="center"
        justifyContent="space-between"
        padding="0 3.2rem"
      >
        <FaPaperclip size={32} />
        <form onSubmit={sendMessage}>
          <input
            type="text"
            ref={inputRef}
            onChange={handleOnChange}
            placeholder="Write Something..."
          />
        </form>
        <FaTelegramPlane size={40} />
      </Box>
    </Wrapper>
  );
};

export default MessageForm;
