import styled, { css } from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const iconsStyles = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const StyledArrowBack = styled(IoIosArrowBack)`
  ${iconsStyles}
  left: -1rem;
`;

export const StyledArrowForward = styled(IoIosArrowForward)`
  ${iconsStyles}
  right: -1rem;
`;

export const StyledImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;
