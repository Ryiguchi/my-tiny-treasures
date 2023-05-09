import styled, { css } from 'styled-components';
import { theme } from '../../../styles/themes';

interface MessageBoxProps {
  sentByUser: boolean;
  prevSameSender: boolean;
}

const sentStyle = css`
  background: ${theme.gradient.message1Primary};
  align-self: flex-end;
  color: #fff;
`;

const recievedStyle = css`
  background-color: ${theme.color.backgroundMain};
  color: #000;
  align-self: flex-start;
`;

export const MessageBox = styled.div<MessageBoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  max-width: 80%;
  min-height: 4rem;
  min-width: 12rem;
  border-radius: 20px;
  box-shadow: ${theme.shadow};
  font-size: 1.6rem;
  padding: 1rem;
  ${({ sentByUser }) => (sentByUser ? sentStyle : recievedStyle)}
  margin-top: ${({ prevSameSender }) => (prevSameSender ? '.4rem' : '1rem')};
`;
