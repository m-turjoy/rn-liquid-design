import styled from 'styled-components'
import {
  fontFamily,
  fontWeight,
  fontSize,
  color
} from 'styled-system'

const LabelWrapper = styled.Text`
  ${fontFamily}
  ${fontWeight}
  ${fontSize}
  ${color}
  width: 30px;
  height: 50%;
`

const SliderWrapper = styled.View`
  flex-direction: row;
`

const IconWrapper = styled.View`
  justify-content: center;
  width: 30px;
`

const TextWrapper = styled.Text`
  ${fontFamily}
  ${fontWeight}
  ${fontSize}
  ${color}
  width: 100%;
  textAlign: right;
`

export {
  LabelWrapper,
  SliderWrapper,
  IconWrapper,
  TextWrapper
}
