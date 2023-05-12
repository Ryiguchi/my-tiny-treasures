import styled from 'styled-components';
import { theme } from '../../../styles/themes';
import Box from '../../../components/common/Box/Box.component';

export const Wrapper = styled(Box)`
  padding-bottom: 2.4rem;

  p {
    font-size: 1.6rem;
  }
`;

export const CategoryTitle = styled.h1`
  font-size: 3.5rem;
  line-height: 52.5px;
  text-align: center;
  color: ${theme.color.primaryBlue};
`;
