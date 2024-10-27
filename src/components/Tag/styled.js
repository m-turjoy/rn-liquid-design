import styled from 'styled-components'

import {
  bgColor,
  color,
  borderRadius,
  height,
  width,
  space,
  justifyContent,
  flexDirection,
  fontFamily,
  fontSize,
  alignItems
} from 'styled-system'

const TagContainer = styled.View`
${bgColor};
${borderRadius};
${height};
${width};
${space};
${justifyContent};
${flexDirection};
${alignItems};
`

const TagText = styled.Text`
${color};
${fontSize};
${fontFamily}
`
export { TagContainer, TagText }
