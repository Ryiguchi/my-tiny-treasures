import { ReactNode, FC, RefObject } from 'react';
import * as S from './button.styles';
import { ButtonType } from './button.types';
import Box from '../Box/Box.component';

interface ButtonProps {
  buttonType: ButtonType;
  type?: 'button' | 'submit';
  children?: ReactNode;
  ref?: RefObject<HTMLButtonElement>;
  iconLeft?: string | null;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: FC<ButtonProps> = ({
  buttonType = ButtonType.Primary,
  onClick,
  children,
  type = 'button',
  iconLeft = null,
}) => {
  return (
    <S.StyledButton
      onClick={onClick}
      buttonType={buttonType}
      type={type}
      disabled={buttonType === ButtonType.Disabled}
    >
      <Box
        flexDirection="row"
        gap="1rem"
        alignItems="center"
        justifyContent="center"
      >
        {iconLeft && <img src={iconLeft} alt="Google icon" />}
        {children}
      </Box>
    </S.StyledButton>
  );
};

export default Button;
