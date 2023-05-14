import styled from 'styled-components';
import Box from '../../../components/common/Box/Box.component';

export const Wrapper = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  background-color: #000;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
