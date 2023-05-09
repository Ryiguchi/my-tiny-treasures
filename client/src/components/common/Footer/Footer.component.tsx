import { FC } from 'react';
import { StyledNav } from './footer.styles';
import Box from '../Box/Box.component';

const Footer: FC = () => {
  return (
    <Box padding="0 3.2rem">
      <StyledNav>
        <a href="#">Support</a>
        <a href="#">How it Works</a>
        <a href="#">Reviews</a>
      </StyledNav>
    </Box>
  );
};

export default Footer;
