import styled from 'styled-components';
import { CheckboxSizes } from '../../../utils/types/enums/enums';
import {
  filterCheckboxLarge,
  filterCheckboxSmall,
  selectedStyle,
  theme,
} from '../../../styles/themes';
import Box from '../Box/Box.component';

interface CheckboxContainerProps {
  size: CheckboxSizes;
  selected: boolean | undefined;
}

export const Wrapper = styled(Box)`
  h2 {
    ${theme.type.h5}
  }
`;

export const CheckboxContainer = styled.div<CheckboxContainerProps>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ size }) =>
    size === CheckboxSizes.Small ? filterCheckboxSmall : filterCheckboxLarge}
  ${({ selected }) => selected && selectedStyle} 

  input {
    position: absolute;

    width: 100%;
    height: 100%;

    opacity: 0;
  }

  p {
  }
`;
