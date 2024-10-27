import styled from 'styled-components';
import {
  width,
  backgroundColor,
  fontFamily,
  fontSize,
  fontWeight,
  color,
  lineHeight,
} from 'styled-system';

const HeaderWrapper = styled.View`
  ${backgroundColor}
`;

const LabelWrapper = styled.Text`
  ${fontSize}
  ${fontFamily}
${fontWeight}
${lineHeight}
${color}
  width: 80%;
  text-align: left;
`;
const ContentWrapper = styled.Text`
  ${fontSize}
  ${fontFamily}
${fontWeight}
${lineHeight}
${color}
text-align: center;
`;

const BodyWrapper = styled.View`
  ${backgroundColor}
`;

const ModalWrapper = styled.View`
  ${width}
`;

export {
  HeaderWrapper,
  LabelWrapper,
  ContentWrapper,
  BodyWrapper,
  ModalWrapper,
};
