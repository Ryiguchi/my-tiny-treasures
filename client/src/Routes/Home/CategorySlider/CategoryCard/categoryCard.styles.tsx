import styled from 'styled-components';
import { theme } from '../../../../styles/themes';

interface ImageBoxProps {
  url: string;
}

export const ImageBox = styled.div<ImageBoxProps>`
  width: 100%;
  height: 70%;
  object-fit: fill;
  justify-content: center;
  align-items: center;
  background-image: ${({ url }) => `url(${url});`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 0 0 ${theme.radius.image} ${theme.radius.image};
`;
