import styled from 'styled-components'
import {
  height,
  width,
  opacity,
  alignItems,
  justifyContent,
  flexDirection,
  marginRight,
  position
} from 'styled-system'

const RatingWrapper = styled.View`
  ${height}
  ${width}
  ${opacity}
  ${alignItems}
  ${justifyContent}
  ${flexDirection}
`
const IconTouchableWrapper = styled.TouchableOpacity`
  ${marginRight}
`
const IconWrapper = styled.View`
  ${marginRight}
  ${opacity}
`
const IconsWrapper = styled.View`
  ${position}
`

export { RatingWrapper, IconTouchableWrapper, IconWrapper, IconsWrapper }
