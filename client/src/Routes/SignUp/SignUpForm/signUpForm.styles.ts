import styled from 'styled-components';
import { theme } from '../../../styles/themes';

export const Wrapper = styled.div`
  a {
    display: block;
    margin-top: 1rem;
    text-align: center;

    span {
      color: ${theme.color.primaryBlue};
    }
  }
  h2 {
    font-weight: 700;
    font-size: 1.6rem;
  }
`;
