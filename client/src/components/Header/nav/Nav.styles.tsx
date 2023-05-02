import styled from 'styled-components';

export const NavContainer = styled.nav`
  width: 100%;

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const ListItem = styled.li<{ badge?: number }>`
  span {
    width: 1.4rem;
    height: 1.4rem;

    background-color: blue;
    color: #fff;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;
