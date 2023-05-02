import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { socket } from './socket';

import { GlobalStyles } from './styles/GlobalStyles';
import SignIn from './Routes/SignIn/SignIn.component';
import Home from './Routes/Home/Home.component';
import ChatPage from './Routes/Chat/Chat.component';
import { useSelector } from 'react-redux';
import { setIsConnected } from './store/features/user/userSlice';
import { selectUser } from './store/features/user/user.selectors';
import Header from './components/Header/Header.component';
import Messages from './Routes/Messages/Messages.component';
import { useAppDispatch, useChat, useMsgData } from './utils/hooks';
import { Chat, MsgData, QueryClientResults } from './utils/interfaces';
import Post from './Routes/Post/Post.component';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Account from './Routes/Account/Account.component';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const user = useSelector(selectUser);
  useChat(undefined);
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
    // if (!user) {
    //   dispatch(checkForLoggedInUser());
    // }

    const onConnect = (): void => {
      dispatch(setIsConnected(true));
    };

    const onDisconnect = (): void => {
      dispatch(setIsConnected(false));
    };

    const onMessageIn = async (msg: MsgData): Promise<void> => {
      const chatData: QueryClientResults<Chat> | undefined =
        await queryClient.getQueryData(['chat', msg.room]);
      if (chatData && msg.room === chatData.data.data.id) {
        // console.log('SAME ROOM');
        mutation.mutate(msg);
      } else {
        // console.log('NOT SAME ROOM');
        refetchMsgData();
      }
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
  }, []);

  return (
    <>
      <GlobalStyles />

      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="chats/:chatId" element={<ChatPage />} />
        <Route path="posts/:postId" element={<Post />} />
        <Route path="messages" element={<Messages />} />
        <Route path="account" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;
