import styled from 'styled-components'
import {
  backgroundColor,
  width,
  height,
  borderRadius,
  justifyContent,
  alignItems,
  fontFamily,
  fontSize,
  space,
  flexDirection,
  fontWeight,
  flex,
  color,
  opacity,
  marginRight,
  marginLeft,
  marginBottom,
  marginTop,
  paddingRight,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  paddingLeft
} from 'styled-system'

const DropdownWrapper = styled.View`
  ${backgroundColor}
  ${width}
  ${height}
  ${justifyContent}
  ${alignItems}
  ${opacity}
  ${borderBottomLeftRadius}
  ${borderBottomRightRadius} 
  ${borderTopLeftRadius} 
  ${borderTopRightRadius} 
`

const DropdownLabel = styled.Text`
  ${fontFamily}
  ${fontSize}
  ${space}
  ${color}
  ${flexDirection}
  ${opacity}
`
const IconWrapper = styled.View`
  ${space}
  ${width}
  ${flex}
  ${justifyContent}
  ${alignItems}
  ${marginLeft}
  ${marginRight}
  ${marginBottom}
`
const DropdownOption = styled.Text`
  ${fontSize}
  ${fontFamily}
  ${fontWeight}
  ${space}
  ${color}
`
const DropdownRowWrapper = styled.View`
  ${flex}
  ${height}
  ${justifyContent}
  ${alignItems}
  ${space}
  ${flexDirection}
  ${backgroundColor}
  ${borderRadius}
  ${paddingRight}
`
const RowWithCheckboxWrapper = styled.View`
  ${space}
  ${flexDirection}
`
const CheckboxIconWrapper = styled.View`
  ${justifyContent}
  ${alignItems}
`
const DropdownOptionWrapper = styled.View`
  ${justifyContent}
  ${alignItems}
  ${marginLeft}
  ${marginRight}
  ${flex}
`
const DropdownLabelWithIconLeftWrapper = styled.View`
  ${flexDirection}
  ${marginTop}
  ${marginLeft}
  ${marginBottom}
  ${justifyContent}
  ${alignItems}
  ${space}
  ${opacity}
  ${flex}
`

const AmountIconWrapper = styled.View`
  ${backgroundColor}
  ${borderRadius}
  ${width}
  ${height}
  ${flexDirection}
  ${justifyContent}
  ${alignItems}
  ${space}
`
const Amount = styled.Text`
  ${space}
  ${color}
  ${fontFamily}
  ${fontSize}
`
const AmountWrapper = styled.View`
  ${width}
  ${flex}
  ${space}
  ${justifyContent}
  ${alignItems}
  ${paddingLeft}
`

const IconTouchable = styled.TouchableWithoutFeedback``

const IconOptionWrapper = styled.View`
  ${flexDirection}
  ${flex}
  ${marginLeft}
  ${marginRight}
  ${alignItems}
`
const AmountIconInnerWrapper = styled.View`
  ${flexDirection}
  ${justifyContent}
  ${alignItems}
  ${flex}
  ${marginLeft}
  ${marginRight}
`

export {
  DropdownWrapper,
  DropdownLabel,
  IconWrapper,
  DropdownOption,
  DropdownRowWrapper,
  RowWithCheckboxWrapper,
  CheckboxIconWrapper,
  DropdownOptionWrapper,
  DropdownLabelWithIconLeftWrapper,
  IconTouchable,
  AmountIconWrapper,
  Amount,
  AmountWrapper,
  IconOptionWrapper,
  AmountIconInnerWrapper
}
