import styled from 'styled-components';
import {
  fontFamily,
  fontSize,
  fontWeight,
  color,
  letterSpacing,
} from 'styled-system';

const ParagraphText = styled.Text`
  ${fontFamily};
  ${fontSize};
  ${fontWeight};
  ${color};
  ${letterSpacing}
  backgroundColor: transparent;
`;

const ParagraphWrapper = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-end;
`;

export { ParagraphText, ParagraphWrapper };
