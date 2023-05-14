import styled from 'styled-components';

interface DivProps {
  display?: 'grid' | 'flex' | 'block' | 'inline-block' | 'none';
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
  gridTemplateColumns?: string;
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
  cursor?: string;
  objectFit?: string;
  overflow?: string;
  overflowX?: string;
  whiteSpace?: string;
  objectPosition?: string;
  position?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  zIndex?: number;
  backgroundColor?: string;
  borderRadius?: string;
  boxShadow?: string;
  transform?: string;
  gridColumn?: string;
  alignSelf?: string;
  border?: string;
}

export const Div = styled.div<DivProps>`
  display: ${({ display }) => display || 'flex'};
  gap: ${({ gap }) => gap || 'none'};
  column-gap: ${({ columnGap }) => columnGap || 'none'};
  row-gap: ${({ rowGap }) => rowGap || 'none'};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  flex-direction: ${({ flexDirection }) => flexDirection || 'column'};
  flex-grow: ${({ flexGrow }) => flexGrow || 0};
  flex-basis: ${({ flexBasis }) => flexBasis || 'auto'};
  flex-shrink: ${({ flexShrink }) => flexShrink || 1};
  flex-wrap: ${({ flexWrap }) => flexWrap || 'nowrap'};
  flex: ${({ flex }) => flex || ''};
  align-items: ${({ alignItems }) => alignItems || 'stretch'};
  grid-template-columns: ${({ gridTemplateColumns }) =>
    gridTemplateColumns || 'auto'};
  margin: ${({ margin }) => margin || '0'};
  margin-top: ${({ marginTop }) => marginTop || '0'};
  margin-bottom: ${({ marginBottom }) => marginBottom || '0'};
  padding: ${({ padding }) => padding || '0'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  max-width: ${({ maxWidth }) => maxWidth || 'none'};
  max-height: ${({ maxHeight }) => maxHeight || 'none'};
  min-width: ${({ minWidth }) => minWidth || 'none'};
  min-height: ${({ minHeight }) => minHeight || 'none'};
  cursor: ${({ cursor }) => cursor || ''};
  object-fit: ${({ objectFit }) => objectFit || ''};
  overflow: ${({ overflow }) => overflow || ''};
  overflow-x: ${({ overflowX }) => overflowX || ''};
  white-space: ${({ whiteSpace }) => whiteSpace || ''};
  object-position: ${({ objectPosition }) => objectPosition || ''};
  position: ${({ position }) => position || ''};
  top: ${({ top }) => top || ''};
  bottom: ${({ bottom }) => bottom || ''};
  left: ${({ left }) => left || ''};
  right: ${({ right }) => right || ''};
  z-index: ${({ zIndex }) => zIndex || ''};
  background-color: ${({ backgroundColor }) => backgroundColor || ''};
  border-radius: ${({ borderRadius }) => borderRadius || 'none'};
  box-shadow: ${({ boxShadow }) => boxShadow || 'none'};
  transform: ${({ transform }) => transform || 'none'};
  grid-column: ${({ gridColumn }) => gridColumn || ''};
  align-self: ${({ alignSelf }) => alignSelf || ''};
  border: ${({ border }) => border || ''};
`;
