import { FormEvent, useEffect, useState, useRef } from 'react';
import { socket } from '../../socket';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { MsgData } from '../../utils/interfaces';
import { useChat } from '../../utils/hooks';
import { selectUser } from '../../store/features/user/user.selectors';

const ChatPage: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  const room = useParams().chatId;

  const user = useSelector(selectUser);
  // const messages = useSelector(selectMessages);
  // const recipientId = useSelector(selectRecipient);

  const [currentMessage, setCurrentMessage] = useState('');

  const { data: chatData } = useChat(room);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();

    return () => {
      // TODO: clear query
      // dispatch(setChat(null));
      socket.emit('leave');
    };
  }, []);

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const chat = chatData?.data.data;

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

  return (
    <>
      {chatData?.data.data.messages && (
        <ul id="messages">
          {chatData?.data.data.messages.map(message => (
            <li key={uniqid()}>{message.text}</li>
          ))}
        </ul>
      )}

      <form id="form" action="" onSubmit={sendMessage}>
        <input
          ref={inputRef}
          id="input"
          onChange={e => setCurrentMessage(e.target.value)}
        />
        <button>Send</button>
      </form>
      <button onClick={() => navigate('/')}>Home</button>
    </>
  );
};

export default ChatPage;
