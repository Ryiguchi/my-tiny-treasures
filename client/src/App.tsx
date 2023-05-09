import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { socket } from './utils/socket';

import { GlobalStyles } from './styles/GlobalStyles';
import SignIn from './Routes/SignIn/SignIn.route';
import ChatPage from './Routes/Chat/Chat.route';
import { useSelector } from 'react-redux';
import {
  checkForLoggedInUser,
  setIsConnected,
} from './store/features/user/userSlice';
import { selectUser } from './store/features/user/user.selectors';
import Header from './components/Header/Header.component';
import Messages from './Routes/Messages/Messages.route';
import { useAppDispatch, useChat, useEnums, useMsgData } from './utils/hooks';
import { Chat, MsgData, QueryClientResults } from './utils/interfaces';
import Post from './Routes/Post/Post.route';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Account from './Routes/Account/Account.route';
import Give from './Routes/Give/Give.route';
import Category from './Routes/Category/Category.route';
import Home from './Routes/Home/Home.route';
import SignUp from './Routes/SignUp/SignUp.route';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useEnums();

  const user = useSelector(selectUser);
  // useChat(undefined);
  const { refetch: refetchMsgData } = useMsgData(user);

  const mutation = useMutation({
    mutationFn: async (): Promise<void> => console.log('Mutating'),
    onMutate: async (msg: MsgData) => {
      await queryClient.cancelQueries({ queryKey: ['chat'] });

      const previousChatData = queryClient.getQueryData(['chat']);

      queryClient.setQueryData(['chat'], (old: Chat | undefined) => {
        if (!old) return;
        const newChatData = { ...old, messsages: [old.messages, msg] };
        return newChatData;
      });

      return { previousChatData };
    },
    onError: (err, msg: MsgData, context): void => {
      queryClient.setQueryData(['chat'], context?.previousChatData);
    },
    onSettled: (): void => {
      queryClient.invalidateQueries({ queryKey: ['chat'] });
    },
  });

  useEffect(() => {
    if (!user) {
      dispatch(checkForLoggedInUser());
      return;
    }

    const onConnect = (): void => {
      dispatch(setIsConnected(true));
    };

    const onDisconnect = (): void => {
      dispatch(setIsConnected(false));
    };

    const onMessageIn = async (msg: MsgData): Promise<void> => {
      console.log('MESSAGE IN');
      const chatData: QueryClientResults<Chat> | undefined =
        await queryClient.getQueryData(['chat', msg.room]);

      if (chatData && msg.room === chatData.data.data.id) {
        mutation.mutate(msg);
        if (user.id === msg.recipientId) {
          socket.emit('seen', msg.room);
        }
      }
      refetchMsgData();
    };

    const onRoom = (room: string): void => {
      navigate(`/chats/${room}`);
    };

    // const onMessageData = () => {};

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message in', onMessageIn);
    socket.on('room', onRoom);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message in', onMessageIn);
      socket.off('room', onRoom);
    };
  }, [user]);

  return (
    <>
      <GlobalStyles />

      <Header />
      <Routes>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="home" element={<Home />} />
        <Route path="chats/:chatId" element={<ChatPage />} />
        <Route path="posts/:postId" element={<Post />} />
        <Route path="category/:category" element={<Category />} />
        <Route path="messages" element={<Messages />} />
        <Route path="account" element={<Account />} />
        <Route path="give" element={<Give />} />
      </Routes>
    </>
  );
}

export default App;
