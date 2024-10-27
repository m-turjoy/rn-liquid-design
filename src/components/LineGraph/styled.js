import styled from 'styled-components'
import {
  fontFamily,
  fontSize,
  lineHeight,
  borderTopColor,
  borderTopWidth,
  color,
  opacity
} from 'styled-system'

const LegendsWrapper = styled.View`
  flex-direction: row;
  top: -28px;
  align-items: flex-start;
  justify-content: space-between
`

const LegendWrapper = styled.View`
  flex-direction: column;
  padding-top: 9px;
  ${borderTopColor}
  ${borderTopWidth}
  ${opacity}
`

const Legend = styled.Text`
  flex-direction: row;
  ${lineHeight}
  ${fontSize}
  ${color}
  ${fontFamily}
`

const LineGraphWrapper = styled.View`
align-items: center;
`

export {
  LegendWrapper,
  LegendsWrapper,
  Legend,
  LineGraphWrapper
}
