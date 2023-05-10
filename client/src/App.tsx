import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { offSocket, onSocket } from './utils/socket/socket';

import { GlobalStyles } from './styles/GlobalStyles';
import SignIn from './Routes/SignIn/SignIn.route';
import ChatPage from './Routes/Chat/Chat.route';
import { useSelector } from 'react-redux';
import { checkForLoggedInUser } from './store/features/user/userSlice';
import { selectUser } from './store/features/user/user.selectors';
import Messages from './Routes/Messages/Messages.route';
import { useAppDispatch } from './utils/hooks/reduxHooks';
import Post from './Routes/Post/Post.route';
import { useMutation } from '@tanstack/react-query';
import Account from './Routes/Account/Account.route';
import Give from './Routes/Give/Give.route';
import Category from './Routes/Category/Category.route';
import Home from './Routes/Home/Home.route';
import SignUp from './Routes/SignUp/SignUp.route';
import {
  msgDataMutationOptions,
  useEnums,
} from './utils/hooks/reactQueryHooks';
import NavBar from './components/common/NavBar/NavBar.component';
import Footer from './components/common/Footer/Footer.component';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mutation = useMutation(msgDataMutationOptions);
  const user = useSelector(selectUser);

  useEnums();

  // useChat(undefined);

  useEffect(() => {
    if (!user) {
      dispatch(checkForLoggedInUser());
    }
    const args = {
      dispatch,
      navigate,
      user,
      mutation,
    };
    onSocket(args);

    return offSocket(args);
  }, [user]);

  return (
    <>
      <GlobalStyles />

      <Routes>
        <Route element={<NavBar />}>
          <Route element={<Footer />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="home" element={<Home />} />
            <Route path="posts/:postId" element={<Post />} />
            <Route path="category/:category" element={<Category />} />
            <Route path="account" element={<Account />} />
            <Route path="give" element={<Give />} />
          </Route>
          <Route path="messages" element={<Messages />} />
          <Route path="chats/:chatId" element={<ChatPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
