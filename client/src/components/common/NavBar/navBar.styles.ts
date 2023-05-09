import styled from 'styled-components';
import { theme } from '../../../styles/themes';

export const StyledNav = styled.nav`
  position: fixed;
  left: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 7.5rem;
  width: 100%;
  border-radius: 10px 10px 0 0;
  box-shadow: ${theme.shadowTop};
  background-color: #fff;

  img {
    object-fit: contain;
    width: 100%;
  }

  p {
    font-size: 1.3rem;
    color: #323232;
  }
`;

export const NavItemBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 1.8rem;

  width: 7rem;
  height: 100%;

  a {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Badge = styled.span`
  position: absolute;
  top: -1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.2rem 0.6rem;
  font-weight: 700;
  font-size: 1.2rem;
  color: #fff;
  background-color: ${theme.color.primary};

  border-radius: 10px;
`;
