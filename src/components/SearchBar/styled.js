import styled from 'styled-components'
import {
  backgroundColor,
  bgColor,
  borderRadius,
  height,
  width,
  justifyContent,
  flexDirection,
  alignItems,
  flex,
  elevation
} from 'styled-system'

const SearchBarWrapper = styled.View`
  ${backgroundColor};
  ${borderRadius};
  ${height};
  ${width};
  ${justifyContent};
  ${flexDirection};
  ${alignItems};
  ${elevation};
`
const IconWrapper = styled.View`
  ${flex};
  ${justifyContent};
  ${alignItems};
`
const SearchInputWrapper = styled.View`
`
const SearchInput = styled.TextInput`
  ${flex};
  ${bgColor};
`

const SearchContainer = styled.View``

const IconInputWrapper = styled.View``

const Underline = styled.View``

export {
  SearchBarWrapper,
  IconWrapper,
  SearchInputWrapper,
  SearchInput,
  SearchContainer,
  IconInputWrapper,
  Underline
}
