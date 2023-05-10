import styled from 'styled-components';
import { theme } from '../../../styles/themes';
import Box from '../../../components/common/Box/Box.component';

export const Wrapper = styled(Box)`
  border-radius: 8px;
  box-shadow: ${theme.shadow};
  img {
    width: 100%;
    object-fit: cover;
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 400;
  }
`;
