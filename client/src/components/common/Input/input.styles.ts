import styled, { css } from 'styled-components';
import { theme } from '../../../styles/themes';

const sharedInputStyles = css`
  width: 100%;
  max-width: 40rem;
  font-size: 2rem;
  font-family: 'Open Sans';
  border-radius: 5px;
  box-shadow: ${theme.shadow};
  border: 1px solid #aaa;
  color: ${theme.color.black};
  background-color: #f5f5f5;

  &:hover {
    border: 1px solid #323232;
  }

  &:focus {
    outline: 1px solid ${theme.color.primaryBlue};
  }

  &:disabled {
    background-color: #eee;
    color: #ccc;
  }

  &:invalid:not(:placeholder-shown) {
    outline: 1px solid red;
  }
`;

export const StyledInput = styled.input`
  ${sharedInputStyles}
  padding: 0 1.6rem;
  height: 45px;
`;

export const StyledTextarea = styled.textarea`
  ${sharedInputStyles}
  padding:  1.6rem;
  min-height: 12rem;
`;
