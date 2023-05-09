import React from 'react';
import * as S from './box.styles';
import { BoxProps } from './boxProps.interface';

const Box: React.FC<BoxProps> = ({ ...props }) => {
  return <S.Div {...props}>{props.children}</S.Div>;
};

export default Box;

<Box margin="23" flexDirection="row"></Box>;
