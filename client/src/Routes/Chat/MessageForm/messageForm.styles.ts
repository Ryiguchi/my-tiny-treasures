import styled from 'styled-components';
import Box from '../../../components/common/Box/Box.component';
import { theme } from '../../../styles/themes';

export const Wrapper = styled(Box)`
  form {
    width: 100%;
  }

  input {
    width: 100%;
    height: 5.3rem;
    border-radius: ${theme.radius.button};
    background-color: #f5f9fa;
    color: #8b8b8b;
    border: 0.5px solid #8b8b8b;
    box-shadow: ${theme.shadow};
    padding: 0 2rem;
    font-size: 2rem;
  }
`;
