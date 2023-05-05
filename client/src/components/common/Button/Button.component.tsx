import { ReactNode, FC, RefObject } from 'react';
import * as S from './button.styles';
import { ButtonType } from './button.types';

interface ButtonProps {
  buttonType: ButtonType;
  children?: ReactNode;
  ref?: RefObject<HTMLButtonElement>;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: FC<ButtonProps> = ({
  buttonType = ButtonType.Primary,
  onClick,
  children,
}) => {
  return (
    <S.StyledButton
      onClick={onClick}
      buttonType={buttonType}
      disabled={buttonType === ButtonType.Disabled}
    >
      {children}
    </S.StyledButton>
  );
};

export default Button;