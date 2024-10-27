import styled from 'styled-components';
import { space, fontFamily, fontSize, fontWeight, color } from 'styled-system';

const CheckboxWrapper = styled.View`
  flex-direction: row;
`;
const CheckboxTitleWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  ${space}
`;

const CheckboxTouchableWrapper = styled.TouchableOpacity``;

const CheckboxTitle = styled.Text`
  ${fontFamily};
  ${fontSize};
  ${fontWeight}
  ${color}
`;

export {
  CheckboxWrapper,
  CheckboxTouchableWrapper,
  CheckboxTitle,
  CheckboxTitleWrapper,
};
