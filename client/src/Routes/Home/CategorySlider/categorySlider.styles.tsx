import styled, { css } from 'styled-components';
import { theme } from '../../../styles/themes';

interface WrapperProps {
  lastElement: boolean;
}

const borderStyles = css`
  border-bottom: 1px solid #aaa;
`;

export const Wrapper = styled.div<WrapperProps>`
  padding-bottom: 6rem;
  ${({ lastElement }) => !lastElement && borderStyles}

  p {
    font-size: 1.6rem;
  }
`;

export const CategoryTitle = styled.h1`
  font-size: 3.5rem;
  text-align: center;
  color: ${theme.color.primary};
  margin-top: 4rem;
`;
