import { useSelector } from 'react-redux';
import { selectUser } from '../../store/features/user/user.selectors';

import * as S from './Header.styles';
import Nav, { NavItem } from './nav/Nav.component';
import { useMsgData } from '../../utils/hooks';

const navList: NavItem[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Search',
    href: '/search',
  },
  {
    name: 'Give',
    href: '/give',
  },
  {
    name: 'Messages',
    href: '/messages',
  },
  {
    name: 'Sign in',
    href: '/signin',
  },
];

const Header: React.FC = () => {
  const user = useSelector(selectUser);
  const { status, data, error, isFetching } = useMsgData(user);

  const getNavList = (): NavItem[] => {
    if (!data) return navList;

    const newMessages = data?.data.msgData.newMessages;
    const newList = [...navList];
    const account = { name: 'Account', href: '/account' };
    const msgIndex = navList.findIndex(item => item.name === 'Messages');
    newList[msgIndex].badge = newMessages;
    newList.splice(-1);
    newList.push(account);

    return newList;
  };

  return (
    <S.HeaderContainer>
      <Nav navItems={getNavList()} />

      {/* {!user && <button onClick={() => navigate('/signin')}>Log in</button>} */}
    </S.HeaderContainer>
  );
};

export default Header;
