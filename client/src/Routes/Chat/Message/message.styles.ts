import styled, { css } from 'styled-components';
import { theme } from '../../../styles/themes';
import { CommonMessageStyles, recievedStyle } from '../commonStyles';

interface MessageBoxProps {
  sentByUser: boolean;
}

const sentStyle = css`
  background: ${theme.gradient.primaryBlue};
  align-self: flex-end;
  color: #fff;
  border-radius: 20px 20px 0 20px;

  div {
    align-self: flex-end;
  }

  span {
    /* color: ${theme.color.black}; */
    font-size: 1.2rem;
    align-self: flex-end;
  }
`;

export const MessageBox = styled(CommonMessageStyles)<MessageBoxProps>`
  ${({ sentByUser }) => (sentByUser ? sentStyle : recievedStyle)};
  span {
    font-size: 1.2rem;
    align-self: flex-end;
    padding: 0.6rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    align-self: flex-end;
  }
  p {
    padding: 1rem 0.6rem 0 1.6rem;
  }
`;
