import styled from 'styled-components';
import Box from '../../../components/common/Box/Box.component';
import { theme } from '../../../styles/themes';

export const Wrapper = styled(Box)``;

export const ImgBox = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  border: 4px solid ${theme.color.blackMedium};

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border: 4px solid ${theme.color.primaryOffWhite};
  }
`;

export const CancelIconBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  transform: translate(20%, -20%);
  padding: 1rem;
  border-radius: 50%;

  background-color: ${theme.color.primaryBlue};
  border: 4px solid ${theme.color.primaryOffWhite};
`;
