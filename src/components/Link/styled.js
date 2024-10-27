import styled from 'styled-components'
import {
  fontFamily,
  fontSize,
  fontWeight,
  color
} from 'styled-system'

const LinkText = styled.Text`
  ${fontFamily};
  ${fontSize};
  ${fontWeight};
  ${color};
`

const TouchableWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ViewWrapper = styled.TouchableHighlight`
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
`

export {
  LinkText,
  TouchableWrapper,
  ViewWrapper
}
