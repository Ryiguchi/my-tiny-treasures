import styled from 'styled-components';
import Box from '../../../components/common/Box/Box.component';
import { theme } from '../../../styles/themes';

export const Wrapper = styled(Box)`
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
    border-radius: ${theme.radius.image};
  }

  p {
    font-size: 1.3rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
