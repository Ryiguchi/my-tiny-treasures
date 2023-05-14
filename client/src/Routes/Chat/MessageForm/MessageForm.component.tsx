import { FC, useEffect, useRef, useState, ChangeEvent, FormEvent } from 'react';
import {} from '../../../utils/types/interfaces/general.interfaces';
import { socket } from '../../../utils/socket/socket';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/features/user/user.selectors';
import { FaPaperclip, FaTelegramPlane } from 'react-icons/fa';
import Box from '../../../components/common/Box/Box.component';
import { Wrapper } from './messageForm.styles';
import { Chat } from '../../../utils/types/interfaces/chat.interface';
import { MsgData } from '../../../utils/types/interfaces/message.interface';
import { theme } from '../../../styles/themes';
import { FileInput } from '../../Give/GiveEdit/giveEdit.styles';
import ChatImgPreview from '../ChatImgPreview/ChatImgPreview.component';
import { Buffer } from 'buffer';

interface MessageFormProps {
  chat: Chat;
}

let timeout: NodeJS.Timeout | null;

const MessageForm: FC<MessageFormProps> = ({ chat }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [chatImgPreviewIsOpen, setChatImgPreviewIsOpen] = useState(false);
  const [userImg, setUserImg] = useState<File | null>(null);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, []);

  const sendMessage = async (e: FormEvent<HTMLFormElement> | null = null) => {
    if (e) e.preventDefault();

    if (currentMessage.trim() === '' || !user || !chat) return;

    const recipientId = chat.users.filter(id => id !== user.id).join('');

    const msgData: MsgData = {
      room: chat.id,
      text: currentMessage,
      senderId: user.id,
      recipientId,
    };

    if (userImg) {
      const buffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (!reader.result)
            reject(new Error('There was a problem uploading your image!'));
          const buffer = reader.result as ArrayBuffer;

          resolve(buffer);
        };

        reader.readAsArrayBuffer(userImg);
      });
      msgData.image = buffer;
    }

    socket.emit('message out', msgData);
    setCurrentMessage('');
    if (!inputRef.current) return;
    inputRef.current.value = '';
    inputRef.current.focus();
    cancelImg();
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

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleChooseImage = () => {
    if (!fileInputRef.current?.files) return;

    const file = fileInputRef.current.files[0];
    setUserImg(file);
    setChatImgPreviewIsOpen(true);
  };

  const cancelImg = () => {
    if (!fileInputRef.current) return;
    setChatImgPreviewIsOpen(false);
    setUserImg(null);
    fileInputRef.current.value = '';
  };

  return (
    <Wrapper padding=".5rem 0 2rem 0">
      {chatImgPreviewIsOpen && userImg && (
        <ChatImgPreview cancelImg={cancelImg} imgFile={userImg} />
      )}
      <Box
        flexDirection="row"
        gap="2rem"
        alignItems="center"
        justifyContent="space-between"
        padding="0 3.2rem"
      >
        <FileInput
          onChange={handleChooseImage}
          ref={fileInputRef}
          type="file"
        />
        <FaPaperclip
          onClick={openFilePicker}
          color={theme.color.blackMedium}
          size={32}
        />
        <form onSubmit={sendMessage}>
          <input
            type="text"
            ref={inputRef}
            onChange={handleOnChange}
            placeholder={
              chatImgPreviewIsOpen ? 'Add a Caption...' : 'Write Something...'
            }
          />
        </form>
        <FaTelegramPlane
          onClick={sendMessage}
          color={theme.color.blackMedium}
          size={40}
        />
      </Box>
    </Wrapper>
  );
};

export default MessageForm;
