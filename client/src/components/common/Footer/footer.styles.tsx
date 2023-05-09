import styled from 'styled-components';
import { theme } from '../../../styles/themes';

export const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  border-top: 1px solid #aaa;

  padding: 6rem 0 2.4rem 0;

  a {
    color: ${theme.color.text};
  }
`;
