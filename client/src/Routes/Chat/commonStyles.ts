import styled, { css } from 'styled-components';
import { theme } from '../../styles/themes';

export const CommonMessageStyles = styled.div`
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
  margin-top: 1rem;
`;

export const recievedStyle = css`
  background-color: ${theme.color.backgroundMain};
  color: #000;
  align-self: flex-start;
`;
