import styled from 'styled-components'

import {
  width,
  height,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  color,
  paddingLeft,
  paddingRight,
  opacity,
  top
} from 'styled-system'

const InnerWrapper = styled.View`
  ${width}
  align-items: center;
  justify-content: space-between;
`

const TextWrapper = styled.Text`
  ${fontFamily}
  ${fontWeight}
  ${fontSize}
  ${lineHeight}
  ${color}
  ${opacity}
  ${top}
  text-align: center;
`

const PaginationDotWrapper = styled.View`
  ${paddingLeft}
  ${paddingRight}
  align-items: center;
  justify-content: center;
`

const PaginationContainer = styled.View`
  ${width}
  ${height}
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const IconWrapper = styled.View`
  ${width}
  ${height}
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export {
  InnerWrapper,
  TextWrapper,
  PaginationDotWrapper,
  PaginationContainer,
  IconWrapper
}
