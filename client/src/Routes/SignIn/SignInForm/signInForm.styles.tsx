import styled from 'styled-components';
import { theme } from '../../../styles/themes';

export const Wrapper = styled.div`
  #forgot-text {
    font-size: 1rem;
    text-align: start;
    margin: 0;
  }
  h2 {
    font-weight: 700;
    font-size: 1.6rem;
  }

  a {
    display: block;
    margin-top: 1rem;
    text-align: center;

    span {
      color: ${theme.color.primary};
    }
  }
`;
