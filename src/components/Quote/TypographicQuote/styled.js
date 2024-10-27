import styled from 'styled-components';
import {
  width,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  color,
} from 'styled-system';

const QuoteWrapper = styled.View`
  ${width};
  flexdirection: column;
  justify-content: center;
  align-items: flex-start;
`;

const AuthorWrapper = styled.Text`
  ${fontFamily}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}
  ${color}
  margin-top: 10
`;
const PhraseWrapper = styled.Text`
  ${fontFamily}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}
  ${color}
`;

export { QuoteWrapper, AuthorWrapper, PhraseWrapper };
