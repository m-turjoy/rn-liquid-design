import styled from 'styled-components'

import {
  alignItems,
  bgColor,
  borderRadius,
  color,
  flex,
  fontSize,
  fontFamily,
  height,
  justifyContent,
  right,
  textAlign,
  space,
  top,
  minWidth,
  maxWidth,
  opacity,
  width
} from 'styled-system'

const StyledBadge = styled.View`
  ${alignItems};
  ${bgColor};
  ${borderRadius};
  ${flex};
  ${height};
  ${justifyContent};
  ${right};
  ${space};
  ${top};
  ${width};
  ${opacity};
`
const StyledBadgeText = styled.Text`
  ${color};
  ${fontSize};
  ${fontFamily};
  ${textAlign};
  ${minWidth};
  ${maxWidth};
  ${opacity};
  ${alignItems};

`

export { StyledBadge, StyledBadgeText }
