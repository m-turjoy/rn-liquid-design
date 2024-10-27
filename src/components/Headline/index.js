import React from "react";
import { string, object, number, oneOfType } from "prop-types";
import { ThemeProvider } from "styled-components";
import theme from "../../config/theme";
import colors from "../../config/colors";
import fonts from "../../config/fonts";
import { HeadlineText } from "./styled";

const adjustFontSize = (type, fontSize) =>
	(type === "B1" && 48) ||
	((type === "XH5" || type === "B2") && 40) ||
	((type === "XH6" || type === "B3") && 36) ||
	((type === "H1" || type === "B4") && 32) ||
	((type === "H2" || type === "B5") && 26) ||
	((type === "H3" || type === "B6") && 22) ||
	(type === "H4" && 18) ||
	(type === "H5" && 16) ||
	(type === "H6" && 14) ||
	fontSize;

const adjustFontFamily = (type, fontFamily) =>
	((type === "B1" ||
		type === "B2" ||
		type === "B3" ||
		type === "B4" ||
		type === "B5" ||
		type === "B6") &&
		fonts.Merck) ||
	fontFamily;

const setTextToUpperCase = (text, type) =>
	((type === "B1" ||
		type === "B2" ||
		type === "B3" ||
		type === "B4" ||
		type === "B5" ||
		type === "B6") &&
		text.toUpperCase()) ||
	text;
// eslint-disable-next-line
const adjustLineHeight = (type, fontSize, lineHeight) =>
	((type === "XH5" ||
		type === "XH6" ||
		type === "H1" ||
		type === "H2" ||
		type === "H3" ||
		type === "H4" ||
		type === "H5" ||
		type === "H6") &&
		adjustFontSize(type, fontSize) * 1.25) ||
	((type === "B1" ||
		type === "B2" ||
		type === "B3" ||
		type === "B4" ||
		type === "B5" ||
		type === "B6") &&
		adjustFontSize(type, fontSize) * 1.15) ||
	lineHeight;

const Headline = (props) => {
	const { text, type, textStyle, color, fontSize, fontFamily, lineHeight } =
		props;

	return (
		<ThemeProvider theme={theme}>
			<HeadlineText
				{...props}
				style={textStyle}
				color={color}
				fontSize={adjustFontSize(type, fontSize)}
				fontFamily={adjustFontFamily(type, fontFamily)}
				lineHeight={adjustLineHeight(type, fontSize, lineHeight)}
			>
				{setTextToUpperCase(text, type)}
			</HeadlineText>
		</ThemeProvider>
	);
};

Headline.defaultProps = {
	textStyle: {},
	color: colors.richBlackDefault,
	fontSize: 14,
	fontFamily: fonts.Black,
	lineHeight: 14,
};

Headline.propTypes = {
	text: string.isRequired,
	type: string.isRequired,
	textStyle: oneOfType([object, number, string]),
	color: string,
	fontSize: number,
	fontFamily: string,
	lineHeight: number,
};

export default Headline;
