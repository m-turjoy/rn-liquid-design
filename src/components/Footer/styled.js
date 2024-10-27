import styled from 'styled-components'
import {
  width,
  height,
  backgroundColor,
  fontFamily,
  fontSize,
  color,
  lineHeight
} from 'styled-system'

const FooterWrapper = styled.View`
  ${backgroundColor}
  ${width}
  flex-direction: column;
  padding-horizontal: 30px;
  padding-top: 40px;
  padding-bottom: 30px;
`

const IconsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 23;
`

const SecondaryIconsWrapper = styled.View`
  flex-direction: row;
`

const SecondaryCenterIcon = styled.View`
  padding-horizontal: 26
`

const LineWrapper = styled.View`
  ${width}
  ${height}
  ${backgroundColor}
  margin-top: 30px;
  margin-bottom: 45px
`

const LabelWrapper = styled.Text`
${fontSize}
${fontFamily}
${lineHeight}
${color}
  margin-bottom: 23px;
`

export {
  LineWrapper,
  FooterWrapper,
  LabelWrapper,
  IconsWrapper,
  SecondaryIconsWrapper,
  SecondaryCenterIcon
}
