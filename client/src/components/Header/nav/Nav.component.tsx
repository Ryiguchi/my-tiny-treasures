import { spawn } from 'child_process';
import * as S from './Nav.styles';
import { useNavigate } from 'react-router-dom';

export interface NavItem {
  name: string;
  href: string;
  badge?: number;
}

interface NavProps {
  navItems: NavItem[];
}

const Nav: React.FC<NavProps> = ({ navItems }) => {
  const navigate = useNavigate();
  return (
    <S.NavContainer>
      <ul>
        {navItems.map(item => (
          <S.ListItem key={item.name} badge={item.badge}>
            <a onClick={() => navigate(item.href)}>{item.name}</a>
            {item.badge ? <span>{item.badge}</span> : ''}
          </S.ListItem>
        ))}
      </ul>
    </S.NavContainer>
  );
};

export default Nav;
