import { Animated, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components";
import {
	backgroundColor,
	width,
	height,
	color,
	fontFamily,
	fontSize,
	paddingLeft,
} from "styled-system";

const FlyoutWrapper = styled.View`
	${backgroundColor}
	${width}
  ${height}
`;
const Label = styled.Text`
	${color}
	${fontFamily}
  ${fontSize}
  ${paddingLeft}
`;

const IconLabelTouchable = styled.TouchableHighlight``;

const IconLabelWrapper = styled.View``;

const TouchableModalChildrenWrapper = styled(TouchableWithoutFeedback)``;

const ListContainer = styled.View``;

const ListWrapper = styled.View``;

const RowWrapper = styled.View``;

const HeaderContainer = styled.View`
	${backgroundColor}
`;

const Header = styled.Text`
	${color}
	${fontFamily}
  ${fontSize}
`;

const TouchableHeaderWrapper = styled(TouchableWithoutFeedback)``;

const TouchableItemWrapper = styled(TouchableWithoutFeedback)``;

const OptionWrapper = styled.View``;

const SubOptionsWrapper = styled.View``;

const IconWrapper = styled.View``;

const SvgWrapper = styled.View``;

const AnimatedIconWrapper = Animated.createAnimatedComponent(IconWrapper);

export {
	FlyoutWrapper,
	Label,
	IconLabelTouchable,
	IconLabelWrapper,
	TouchableModalChildrenWrapper,
	ListContainer,
	ListWrapper,
	RowWrapper,
	HeaderContainer,
	Header,
	TouchableHeaderWrapper,
	TouchableItemWrapper,
	OptionWrapper,
	SubOptionsWrapper,
	AnimatedIconWrapper,
	SvgWrapper,
};
