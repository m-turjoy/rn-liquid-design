import styled from 'styled-components';
import {
  fontFamily,
  fontSize,
  fontWeight,
  color,
  lineHeight,
  width,
} from 'styled-system';

const DescriptionWrapper = styled.Text`
  ${fontSize}
  ${fontFamily}
${fontWeight}
${lineHeight}
${color}
${width}
padding-horizontal: 35px;
  text-align: center;
  padding-bottom: 50px;
  padding-top: 20px;
`;

const FAQWrapper = styled.View`
  ${width}
  align-items: center;
  justify-content: center;
`;

export { DescriptionWrapper, FAQWrapper };
