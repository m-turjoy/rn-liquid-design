import styled from 'styled-components'

import {
  alignItems,
  bgColor,
  borderRadius,
  complexStyle,
  flex,
  height,
  justifyContent,
  position,
  space,
  width
} from 'styled-system'
import { shadowStyle } from '../../config/complexStyles'

const stacked = complexStyle({
  prop: 'stacked',
  key: 'stacked'
})

const StyledCard = styled.TouchableOpacity.attrs({ activeOpacity: 1 })`
  ${alignItems};
  ${bgColor};
  ${borderRadius};
  ${flex};
  ${height};
  ${justifyContent};
  ${position};
  ${shadowStyle};
  ${stacked};
  ${space};
  ${width};
`

const CardWrapper = styled.View`
  align-items: center;
  justify-content: center;
  ${space};
  ${justifyContent}
`
export { StyledCard, CardWrapper }
