import styled from 'styled-components'
import {
  fontWeight,
  color,
  flexDirection,
  justifyContent,
  marginLeft,
  paddingRight,
  alignItems,
  flex,
  height,
  fontFamily,
  alignSelf
} from 'styled-system'

const ItemWrapper = styled.View`
  ${flexDirection}
`
const ItemTouchableWrapper = styled.TouchableHighlight`
`

const Title = styled.Text`
  ${color}
  ${fontWeight}
  ${fontFamily}
  ${alignSelf}
  ${paddingRight}
`
const TitleWrapper = styled.View`
  ${marginLeft}
  ${flex}
  ${height}
`
const TitleIconWrapper = styled.View`
  ${flexDirection}
  ${justifyContent}
  ${marginLeft}
  ${paddingRight}
  ${alignItems}
`
export {
  ItemWrapper,
  ItemTouchableWrapper,
  Title,
  TitleIconWrapper,
  TitleWrapper
}
