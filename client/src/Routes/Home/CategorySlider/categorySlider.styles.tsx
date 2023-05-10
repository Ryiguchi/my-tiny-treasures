import styled from 'styled-components';
import { theme } from '../../../styles/themes';

export const Wrapper = styled.div`
  padding-bottom: 2.4rem;

  p {
    font-size: 1.6rem;
  }
`;

export const CategoryTitle = styled.h1`
  font-size: 3.5rem;
  line-height: 52.5px;
  text-align: center;
  color: ${theme.color.primary};
`;
