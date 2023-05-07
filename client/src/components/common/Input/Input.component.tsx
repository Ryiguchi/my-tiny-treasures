import { ChangeEvent, FC } from 'react';
import * as S from './input.styles';

interface labelProps {
  label: string;
  type?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<labelProps> = ({ label, type = 'text', onChange }) => {
  const minLength = type === 'password' && 8;
  return (
    <S.StyledInput
      minLength={type === 'password' ? 8 : undefined}
      type={type}
      placeholder={label}
      onChange={onChange}
    />
  );
};

export default Input;
