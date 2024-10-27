import styled from 'styled-components'
import {
  fontSize,
  fontWeight,
  color,
  fontFamily,
  justifyContent,
  alignItems,
  flexDirection,
  space,
  opacity,
  underlayColor,
  width,
  flexWrap,
  marginRight,
  marginLeft
} from 'styled-system'

const ButtonTouchableWrapper = styled.TouchableHighlight`
  ${underlayColor}
`

const Title = styled.Text`
  ${fontSize};
  ${color};
  ${fontFamily};
  ${fontWeight};
`
const GhostButtonWrapper = styled.View`
  ${justifyContent}
  ${alignItems}
  ${opacity}
  ${width}
`
const TitleIconWrapper = styled.View`
  ${justifyContent}
  ${alignItems}
  ${flexDirection}
  ${width}
  ${flexWrap}
`
const IconWrapper = styled.View`
  ${space}
  ${justifyContent}
  ${alignItems}
  ${opacity}
  ${width}
  ${marginRight}
  ${marginLeft}
`
const TitleWrapper = styled.View`
  ${width}
  ${alignItems}
  ${marginRight}
`
export {
  ButtonTouchableWrapper,
  Title,
  GhostButtonWrapper,
  TitleIconWrapper,
  IconWrapper,
  TitleWrapper
}
