import styled from "styled-components";
import {
	width,
	borderRadius,
	fontFamily,
	fontSize,
	fontWeight,
	color,
	lineHeight,
} from "styled-system";
import { colors, fonts } from "../../config";

const QuoteWrapper = styled.View`
	${width};
	flexdirection: column;
	justify-content: center;
	align-items: center;
`;

const ImageWrapper = styled.View`
	${borderRadius};
	overflow: hidden;
`;

const Image = styled.Image`
	resize-mode: contain;
	width: 100%;
	height: 100%;
`;

const AuthorWrapper = styled.Text`
	${fontSize}
	${fontFamily}
${fontWeight}
${lineHeight}
${color}
  width: 80%;
	margin-top: 20px;
	margin-bottom: 10px;
	text-align: center;
`;
const PhraseWrapper = styled.Text`
	width: 100%;
	font-size: 14px;
	line-height: 17.5px;
	text-align: center;
	font-family: "${fonts.Regular}";
	color: ${colors.richBlackDefault};
`;

export { QuoteWrapper, AuthorWrapper, PhraseWrapper, ImageWrapper, Image };
