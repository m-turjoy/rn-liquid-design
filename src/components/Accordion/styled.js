import styled from 'styled-components';
import {
  width,
  height,
  borderColor,
  fontFamily,
  color,
  fontSize,
  lineHeight,
  fontWeight,
} from 'styled-system';

const AccordionWrapper = styled.View`
  ${width}
  ${borderColor}
  border-bottom-width: 1px;
  flexdirection: column;
  overflow: hidden;
`;

const TitleWrapper = styled.View`
  ${borderColor}
  width: 100%;
  border-top-width: 1px;
  padding-top: 16px;
  padding-bottom: 14px;
  padding-left: 14px;
  flex-direction: row;
  align-items: center;
`;

const TitleText = styled.Text`
  ${fontFamily}
  ${color}
  ${fontWeight}
  margin-left: 13px;
`;

const DescriptionWrapper = styled.View`
  ${width}
  ${height}
padding-left: 51px;
  padding-right: 14px;
`;
const DescriptionText = styled.Text`
  ${fontFamily}
  ${color}
  ${fontSize}
  ${lineHeight}
  ${fontWeight}
`;

export {
  AccordionWrapper,
  TitleWrapper,
  TitleText,
  DescriptionWrapper,
  DescriptionText,
};
