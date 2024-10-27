import { Animated } from 'react-native';
import styled from 'styled-components';

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
  width,
} from 'styled-system';

const StyledBubble = styled.View`
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
  ${textAlign}
`;
const AnimatedBubble = Animated.createAnimatedComponent(StyledBubble);
const StyledIcon = styled.Text`
  ${color};
  ${fontSize};
  ${fontFamily};
  ${textAlign};
  background-color: transparent;
`;
const IconWrapper = styled.View`
  ${alignItems};
`;
export { StyledBubble, StyledIcon, IconWrapper, AnimatedBubble };
