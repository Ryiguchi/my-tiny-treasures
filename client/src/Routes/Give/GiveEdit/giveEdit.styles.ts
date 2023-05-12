import styled from 'styled-components';
import { theme } from '../../../styles/themes';

export const ImagePreviewBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.4rem;
  max-height: 16rem;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    border-radius: ${theme.radius.image};
  }
`;

export const FileInput = styled.input`
  display: none;
`;
