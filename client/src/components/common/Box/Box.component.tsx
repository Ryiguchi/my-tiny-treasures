import React, { ReactNode } from 'react';
import * as S from './box.styles';

type BoxProps = {
  display?: 'grid' | 'flex' | 'block' | 'inline-block' | 'none';
  gridTemplateColumns?: string;
  children?: ReactNode;
  className?: string;
  flexDirection?: 'row';
  gap?: string;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'initial'
    | 'inherit';
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  alignItems?:
    | 'stretch'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'baseline'
    | 'initial'
    | 'inherit';
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number;
  flex?: string;
  padding?: string;
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
  cursor?: string; // FIXME:
  objectFit?: string; // FIXME:
  overflow?: string; // FIXME:
  overflowX?: string;
  whiteSpace?: string;
  objectPosition?: string; // FIXME:
  position?: string; // FIXME:
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  zIndex?: number;
  transform?: string;
  backgroundColor?: string;
  borderRadius?: string;
  boxShadow?: string;
  ref?: React.RefObject<HTMLDivElement>;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const Box: React.FC<BoxProps> = ({ ...props }) => {
  return <S.Div {...props}>{props.children}</S.Div>;
};

export default Box;

<Box margin="23" flexDirection="row"></Box>;
