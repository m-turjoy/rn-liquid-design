import styled from 'styled-components'
import { Animated } from 'react-native'
import {
  backgroundColor,
  height,
  width,
  borderRadius,
  margin,
  opacity,
  alignItems,
  justifyContent,
  transform,
  flexDirection,
  position,
  flex
} from 'styled-system'

const TogglWrapper = styled.View`
  ${height}
  ${width}
  ${backgroundColor}
  ${borderRadius}
  ${opacity}
  ${alignItems}
  ${justifyContent}
  ${flexDirection}
  ${position}
  ${flex}
`
const AnimatedTogglWrapper = Animated.createAnimatedComponent(TogglWrapper)

const TogglGrip = styled.View`
  ${height}
  ${width}
  ${backgroundColor}
  ${borderRadius}
  ${margin}
  ${opacity}
  ${transform}
  ${alignItems}
  ${justifyContent}
`
const AnimatedTogglGrip = Animated.createAnimatedComponent(TogglGrip)

export {
  TogglWrapper,
  TogglGrip,
  AnimatedTogglWrapper,
  AnimatedTogglGrip
}
