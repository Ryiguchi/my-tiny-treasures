import styled from 'styled-components';
import { theme } from '../../../styles/themes';

export const Wrapper = styled.div`
  border-radius: 8px;
  box-shadow: ${theme.shadow};
  img {
    width: 100%;
    object-fit: cover;
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 400;
    margin-bottom: 1.6rem;
  }

  p {
    font-size: 1.3rem;
  }
`;
