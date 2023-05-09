import { FC } from 'react';
import Box from '../Box/Box.component';
import * as S from './navBar.styles';
import { FaSearch, FaGift, FaComment, FaUserAlt } from 'react-icons/fa';
import { imgUrls } from '../../../utils/urls/imgUrls';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/features/user/user.selectors';
import { useMsgData } from '../../../utils/hooks/reactQueryHooks';

const NavBar: FC = () => {
  const user = useSelector(selectUser);
  const { status, data, error, isFetching } = useMsgData(user);
  const newMessages = data?.data.msgData.newMessages;

  return (
    <S.StyledNav>
      <S.NavItemBox>
        <a href="/home">
          <Box width="2.8rem">
            <img src={imgUrls.icons.logoSmall} alt="Logo" />
          </Box>
          <p>Home</p>
        </a>
      </S.NavItemBox>
      <S.NavItemBox>
        <a href="/search">
          <FaSearch size={21} color="323232" />
          <p>Search</p>
        </a>
      </S.NavItemBox>
      <S.NavItemBox>
        <a href="/give">
          <FaGift size={21} color="323232" />
          <p>Give Away</p>
        </a>
      </S.NavItemBox>
      <S.NavItemBox>
        <a href="messages">
          {data && newMessages && newMessages > 0 ? (
            <S.Badge>{newMessages}</S.Badge>
          ) : (
            ''
          )}
          <div></div>
          <FaComment size={21} color="323232" />
          <p>Messages</p>
        </a>
      </S.NavItemBox>
      {user ? (
        <S.NavItemBox>
          <a href="account">
            <FaUserAlt size={21} color="323232" />
            <p>Account</p>
          </a>
        </S.NavItemBox>
      ) : (
        <S.NavItemBox>
          <a href="signin">
            <FaUserAlt size={21} color="323232" />
            <p>Sign In</p>
          </a>
        </S.NavItemBox>
      )}
    </S.StyledNav>
  );
};

export default NavBar;
