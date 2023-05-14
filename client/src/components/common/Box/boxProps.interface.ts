import { ReactNode } from 'react';

export interface BoxProps {
  display?: 'grid' | 'flex' | 'block' | 'inline-block' | 'none';
  gridTemplateColumns?: string;
  children?: ReactNode;
  className?: string;
  flexDirection?: 'row';
  gap?: string;
  columnGap?: string;
  rowGap?: string;
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
  flex?: string | number;
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
  gridColumn?: string;
  alignSelf?: string;
  border?: string;
  ref?: React.RefObject<HTMLDivElement>;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
