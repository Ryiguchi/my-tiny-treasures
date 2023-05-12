import styled, { css } from 'styled-components';
import { theme } from '../../../styles/themes';
import { CommonMessageStyles, recievedStyle } from '../commonStyles';

export const Wrapper = styled.div`
  overflow-y: scroll;
`;

const animation = css`
  @keyframes blink {
    0% {
      background-color: ${theme.color.grayDark};
    }
    33% {
      background-color: ${theme.color.grayLight1};
    }
  }
`;

interface IsWritingBoxProps {
  showIsWritingEl: boolean;
}

export const IsWritingBox = styled(CommonMessageStyles)<IsWritingBoxProps>`
  ${recievedStyle}
  gap: .4rem;
  display: ${({ showIsWritingEl }) => (showIsWritingEl ? 'flex' : 'none')};
  div {
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 50%;
    background-color: ${theme.color.grayDark};
    transition: all 0.1s;
    ${animation}
    &:first-child {
      animation: blink 1.2s infinite;
    }
    &:nth-child(2) {
      animation: blink 1.2s infinite 0.4s;
    }
    &:nth-child(3) {
      animation: blink 1.2s infinite 0.8s;
    }
  }
`;
