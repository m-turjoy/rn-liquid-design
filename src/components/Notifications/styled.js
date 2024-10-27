import { TouchableWithoutFeedback } from "react-native";
import styled from "styled-components";
import { fontFamily, color, fontSize, lineHeight } from "styled-system";

const NotificationWrapper = styled.View``;

const Label = styled.Text`
	${fontFamily}
	${color}
  ${fontSize}
  ${lineHeight}
`;

const IconWrapper = styled.View``;

const IconLabelWrapper = styled.View``;

const LabelWrapper = styled.View``;

const Container = styled.View``;

const IconTouchable = styled(TouchableWithoutFeedback)``;

export {
	NotificationWrapper,
	Label,
	IconWrapper,
	IconLabelWrapper,
	LabelWrapper,
	Container,
	IconTouchable,
};
