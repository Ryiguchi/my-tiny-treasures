import styled from 'styled-components';
import Box from '../../components/common/Box/Box.component';
import { theme } from '../../styles/themes';

export const Wrapper = styled(Box)`
  ${theme.type.body}
  p {
    text-align: center;
    padding: 0 4rem;
  }

  span {
    font-size: 1.6;
    text-align: center;
  }
`;
