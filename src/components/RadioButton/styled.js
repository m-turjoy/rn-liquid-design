import styled from 'styled-components';
import {
  space,
  fontFamily,
  fontSize,
  fontWeight,
  color,
  opacity,
} from 'styled-system';

const RadioButtonWrapper = styled.View`
  flex-direction: row;
  ${opacity}
`;
const RadioButtonTitleWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  ${space}
`;

const RadioButtonTouchableWrapper = styled.TouchableOpacity``;

const RadioButtonTitle = styled.Text`
  ${fontFamily};
  ${fontSize};
  ${fontWeight}
  ${color}
`;

export {
  RadioButtonWrapper,
  RadioButtonTouchableWrapper,
  RadioButtonTitle,
  RadioButtonTitleWrapper,
};
