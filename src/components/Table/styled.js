import styled from "styled-components";
import {
	fontSize,
	fontFamily,
	color,
	lineHeight,
	backgroundColor,
	height,
	width,
} from "styled-system";
import { Animated, TouchableWithoutFeedback } from "react-native";

const TableWrapper = styled.View``;

const VerticalScrollView = styled.ScrollView``;

const HorizontalScrollView = styled.ScrollView``;

const TableDataList = styled.FlatList``;

const ColumnHeaderList = styled.FlatList``;

const RowList = styled.FlatList``;

const Name = styled.Text`
	${fontSize}
	${fontFamily}
  ${color}
`;

const Info = styled.Text`
	${fontSize}
	${fontFamily}
  ${color}
`;

const HeaderWrapper = styled.View``;

const HeaderWrapperTouchable = styled(TouchableWithoutFeedback)``;

const Header = styled.Text`
	${fontSize}
	${fontFamily}
  ${color}
`;
const Separator = styled.View``;

const IconWrapper = styled.View``;

const IconWrapperTouchable = styled(TouchableWithoutFeedback)``;

const RowTouchable = styled.TouchableHighlight``;

const FirstColumnCellWrapper = styled.View``;

const NameWrapper = styled.View``;

const InfoWrapper = styled.View``;

const DataWrapper = styled.View``;

const IndicatorWrapper = styled.View`
	justify-content: center;
	${backgroundColor};
	${width};
	${height}
`;

const Data = styled.Text`
	${fontSize}
	${fontFamily}
  ${color}
`;
const RowWrapper = styled.View``;

const DropdownInfoWrapper = styled.View``;

const DropdownInfo = styled.Text`
	${fontSize}
	${fontFamily}
  ${color}
  ${lineHeight}
`;
const Container = styled.View``;

const Label = styled.Text`
	${fontSize}
	${fontFamily}
  ${color}
`;
const AnimatedIconWrapper = Animated.createAnimatedComponent(IconWrapper);

const HeaderTouchable = styled.View``;

export {
	TableWrapper,
	VerticalScrollView,
	HorizontalScrollView,
	TableDataList,
	ColumnHeaderList,
	Separator,
	HeaderWrapper,
	Header,
	IconWrapper,
	IconWrapperTouchable,
	AnimatedIconWrapper,
	HeaderTouchable,
	FirstColumnCellWrapper,
	NameWrapper,
	InfoWrapper,
	Info,
	Name,
	RowTouchable,
	RowList,
	DataWrapper,
	Data,
	RowWrapper,
	DropdownInfoWrapper,
	DropdownInfo,
	Container,
	Label,
	IndicatorWrapper,
	HeaderWrapperTouchable,
};
