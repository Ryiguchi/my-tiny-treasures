import { ChangeEvent, FC, useRef, useEffect } from 'react';
import * as S from './input.styles';

interface labelProps {
  label: string;
  type?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  min?: number;
  max?: number;
  previousValue?: string;
  name?: string;
}

const Input: FC<labelProps> = ({
  label,
  type = 'text',
  onChange,
  previousValue,
  ...otherProps
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!previousValue || previousValue === '' || !inputRef.current) return;

    inputRef.current.value = previousValue;
  }, [previousValue, inputRef.current]);

  useEffect(() => {
    if (!previousValue || previousValue === '' || !textAreaRef.current) return;
    console.log('TEXTAREA');

    textAreaRef.current.value = previousValue;
  }, [previousValue, textAreaRef.current]);

  return (
    <>
      {type !== 'textarea' && (
        <S.StyledInput
          ref={inputRef}
          minLength={type === 'password' ? 8 : undefined}
          type={type}
          placeholder={label}
          onChange={onChange}
          {...otherProps}
        />
      )}
      {type === 'textarea' && (
        <S.StyledTextarea
          ref={textAreaRef}
          placeholder={label}
          onChange={onChange}
          {...otherProps}
        />
      )}
    </>
  );
};

export default Input;
