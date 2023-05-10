import styled, { css } from 'styled-components';
import { theme } from '../../../styles/themes';
import { CommonMessageStyles, recievedStyle } from '../commonStyles';

interface MessageBoxProps {
  sentByUser: boolean;
}

const sentStyle = css`
  background: ${theme.gradient.message1Primary};
  align-self: flex-end;
  color: #fff;
`;

export const MessageBox = styled(CommonMessageStyles)<MessageBoxProps>`
  ${({ sentByUser }) => (sentByUser ? sentStyle : recievedStyle)};
`;
