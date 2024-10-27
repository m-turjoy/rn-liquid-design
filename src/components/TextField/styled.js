import styled from 'styled-components';

import {
  borderColor,
  bgColor,
  height,
  opacity,
  color,
  fontFamily,
  fontSize,
  letterSpacing,
} from 'styled-system';

const TextInput = styled.TextInput`
  ${borderColor}
  ${opacity}
  ${bgColor}
`;
const ErrorMessage = styled.Text`
  ${color}
  ${fontFamily}
  ${fontSize}
  ${letterSpacing}
`;
const TextInputWrapper = styled.View`
  ${height}
  ${bgColor}
`;
const TextInputErrorWrapper = styled.View`
  ${height}
`;
const TextInputContainer = styled.View``;

const Label = styled.Text`
  ${color}
  ${fontFamily}
  ${fontSize}
`;

const ErrorContainer = styled.View``;

export {
  TextInput,
  ErrorMessage,
  TextInputWrapper,
  TextInputContainer,
  Label,
  TextInputErrorWrapper,
  ErrorContainer,
};
