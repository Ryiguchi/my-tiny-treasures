import styled, { css } from 'styled-components';
import { theme } from '../../styles/themes';

export const CommonMessageStyles = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  width: fit-content;
  max-width: 80%;
  min-height: 4rem;
  min-width: 15rem;
  box-shadow: ${theme.shadow};
  font-size: 1.6rem;
  /* padding: 1rem 1rem 0.6rem 1rem; */
  margin-top: 1rem;
`;

export const recievedStyle = css`
  background-color: ${theme.color.backgroundMain};
  color: #000;
  align-self: flex-start;
  border-radius: 20px 20px 20px 0;

  div {
    align-self: flex-start;
  }
`;
