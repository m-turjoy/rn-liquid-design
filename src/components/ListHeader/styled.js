import styled from 'styled-components';
import {
  fontWeight,
  color,
  flexDirection,
  justifyContent,
  marginLeft,
  alignItems,
  width,
  height,
  backgroundColor,
  fontSize,
  fontFamily,
} from 'styled-system';

const HeaderWrapper = styled.View``;
const HeaderChildWrapper = styled.View``;

const Title = styled.Text`
  ${color}
  ${fontWeight}
  ${fontSize}
  ${fontFamily}
`;
const TitleWrapper = styled.View`
  ${marginLeft}
  ${alignItems}
  ${justifyContent}
`;
const HeaderTouchableWrapper = styled.TouchableHighlight``;

const TitleIconWrapper = styled.View`
  ${flexDirection}
  ${justifyContent}
  ${marginLeft}
  ${alignItems}
`;
const Separator = styled.View`
  ${width}
  ${height}
  ${backgroundColor}
`;
export {
  HeaderWrapper,
  Title,
  TitleIconWrapper,
  TitleWrapper,
  Separator,
  HeaderTouchableWrapper,
  HeaderChildWrapper,
};
