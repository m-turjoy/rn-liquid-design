import styled from 'styled-components';

import {
  alignItems,
  bgColor,
  color,
  borderRadius,
  flexDirection,
  height,
  maxWidth,
  minWidth,
  fontSize,
  fontFamily,
  justifyContent,
  space,
  textAlign,
  width,
  opacity,
  top,
} from 'styled-system';

const StyledFiltersTextContainer = styled.View`
  ${borderRadius}
  ${justifyContent}
  ${flexDirection}
  ${alignItems}
  ${bgColor}
  ${space}
  ${height}
  ${width}
  ${maxWidth}
  ${minWidth}
`;
const StyledFilterText = styled.Text.attrs({
  numberOfLines: 1,
})`
  ${alignItems}
  ${color}
  ${fontSize}
  ${fontFamily}
  ${textAlign}
  ${space}
  ${maxWidth}
  ${height}
  ${opacity}
  ${minWidth}
  ${top}
`;
export { StyledFilterText, StyledFiltersTextContainer };
