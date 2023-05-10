import { FC } from 'react';
import { StyledNav } from './footer.styles';
import Box from '../Box/Box.component';
import { Outlet } from 'react-router-dom';

const Footer: FC = () => {
  return (
    <>
      <Outlet />
      <Box padding="1.2rem 3.2rem">
        <StyledNav>
          <a href="#">Support</a>
          <a href="#">How it Works</a>
          <a href="#">Reviews</a>
        </StyledNav>
      </Box>
    </>
  );
};

export default Footer;
