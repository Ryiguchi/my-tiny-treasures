import styled from 'styled-components';
import { theme } from '../../../styles/themes';

export const StyledInput = styled.input`
  width: 100%;
  max-width: 40rem;
  font-size: 2rem;
  font-family: 'Open Sans';
  padding: 0 1.6rem;
  height: 45px;
  border-radius: 5px;
  box-shadow: ${theme.shadow};
  border: 1px solid #aaa;
  color: ${theme.color.text};
  background-color: #f5f5f5;

  &:hover {
    border: 1px solid #323232;
  }

  &:focus {
    outline: 1px solid ${theme.color.primary};
  }

  &:disabled {
    background-color: #aaa;
  }

  &:invalid {
    outline: 1px solid red;
  }
`;
