import styled from 'styled-components'
import { Animated } from 'react-native'
import {
  backgroundColor,
  height,
  width,
  borderRadius,
  opacity,
  alignItems,
  justifyContent,
  flexDirection,
  position,
  flex,
  paddingLeft,
  paddingRight,
  marginLeft,
  marginRight,
  elevation
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
  ${paddingLeft}
  ${paddingRight}
`

const AnimatedSliderWrapper = Animated.createAnimatedComponent(TogglWrapper)

const AnimatedIconTouchable = styled.TouchableOpacity`
  ${backgroundColor}
  ${flex}
  ${marginLeft}
  ${marginRight}
  ${alignItems}
  ${justifyContent}
  ${elevation}
  ${paddingLeft}
  ${marginRight}
`

const TouchableWrapper = styled.View``

const AnimatedIconWrapper = styled.View``

export {
  TogglWrapper,
  AnimatedSliderWrapper,
  AnimatedIconTouchable,
  TouchableWrapper,
  AnimatedIconWrapper
}
