import styled from 'styled-components';
import { fontSize, fontFamily, color } from 'styled-system';
import { Animated } from 'react-native';

const PaginationWrapper = styled.View``;

const DropdownPerPageWrapper = styled.View``;

const ItemsPagesWrapper = styled.View``;

const PagesDropdownWrapper = styled.View``;

const ItemsWrapper = styled.View``;

const Items = styled.Text`
  ${fontSize}
  ${fontFamily}
  ${color}
`;
const ItemsDropdownWrapper = styled.View``;

const DropdownWrapper = styled.View``;

const ItemsPerPage = styled.Text`
  ${fontSize}
  ${fontFamily}
  ${color}
`;
const IconWrapper = styled.View``;

const ItemsRange = styled.Text`
  ${fontSize}
  ${fontFamily}
  ${color}
`;
const PagesRange = styled.Text`
  ${fontSize}
  ${fontFamily}
  ${color}
`;

const IconPageWrapper = styled.View``;

const Page = styled.Text`
  ${fontSize}
  ${fontFamily}
  ${color}
`;

const AnimatedIconWrapper = Animated.createAnimatedComponent(IconWrapper);

const DropdownTouchable = styled.TouchableWithoutFeedback``;

const TouchableModalWrapper = styled.TouchableWithoutFeedback``;

const ModalWrapper = styled.View``;

const RowWrapper = styled.View``;

const Separator = styled.View``;

const RowTouchable = styled.TouchableWithoutFeedback``;

const Container = styled.View``;

const IconTouchable = styled.TouchableWithoutFeedback``;

export {
  PaginationWrapper,
  DropdownPerPageWrapper,
  ItemsPagesWrapper,
  PagesDropdownWrapper,
  ItemsWrapper,
  Items,
  ItemsDropdownWrapper,
  DropdownWrapper,
  ItemsPerPage,
  IconWrapper,
  ItemsRange,
  PagesRange,
  IconPageWrapper,
  Page,
  AnimatedIconWrapper,
  DropdownTouchable,
  TouchableModalWrapper,
  ModalWrapper,
  RowWrapper,
  Separator,
  RowTouchable,
  Container,
  IconTouchable,
};
