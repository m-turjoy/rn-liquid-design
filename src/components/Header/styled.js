import styled from 'styled-components'
import {
  width,
  height,
  fontFamily,
  fontSize,
  lineHeight,
  color,
  backgroundColor
} from 'styled-system'

const HeaderWrapper = styled.View`
  ${width}
  position: absolute;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 15px;
`

const BackgroundWrapper = styled.View`
  ${width}
  ${height}
  ${backgroundColor}
`

const LogoWrapper = styled.View`
  padding-right: 7px;
  justify-content: center;
`

const IconsWrapper = styled.View`
  flex-direction: row;
  position: absolute;
  right: 15px;
`

const IconWrapper = styled.View`
  padding-horizontal: 8px
`

const LabelWrapper = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-left-width: 1px;
  border-left-color: rgba(255, 255, 255, 0.1);
  padding-left: 15px;
  position: absolute;
  right: 15px;
`

const SearchWrapper = styled.View`
  flex-direction: row;
`

const Label = styled.Text`
  ${fontFamily}
  ${fontSize}
  ${color}
  ${lineHeight}
  backgroundColor: transparent;
`

const ButtonWrapper = styled.View`
  position: absolute;
  right: 15px;
`

export {
  HeaderWrapper,
  LogoWrapper,
  IconsWrapper,
  IconWrapper,
  LabelWrapper,
  Label,
  SearchWrapper,
  BackgroundWrapper,
  ButtonWrapper
}
