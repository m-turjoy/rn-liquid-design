import styled from 'styled-components'
import {
  width,
  height,
  fontSize,
  color,
  borderRadius,
  fontFamily,
  flexDirection,
  alignItems,
  justifyContent,
  marginRight,
  opacity,
  backgroundColor,
  paddingHorizontal,
  paddingVertical
} from 'styled-system'

const ButtonWrapper = styled.View`
  ${width};
  ${height};
  ${backgroundColor}
  ${borderRadius};
  ${opacity};
  ${paddingHorizontal};
  ${paddingVertical};
  justify-content: center;
  align-items: center;
`
const Title = styled.Text`
  ${fontSize};
  ${color};
  ${fontFamily};
  ${opacity}
`
const ButtonTouchableWrapper = styled.TouchableHighlight`
`

const TitleIconWrapper = styled.View`
  ${flexDirection};
  ${alignItems};
  ${justifyContent};
  ${opacity};
`
const IconLeftWrapper = styled.View`
   ${marginRight}
`
const IconWrapper = styled.View`
  ${opacity}
`
const TitleWrapper = styled.View`
  ${opacity}
`

export {
  ButtonWrapper,
  Title,
  ButtonTouchableWrapper,
  TitleIconWrapper,
  IconLeftWrapper,
  TitleWrapper,
  IconWrapper
}
