import React from "react";
import { bool, node, number, string, PropTypes } from "prop-types";
import { ThemeProvider } from "styled-components";
import {
	QuoteWrapper,
	PhraseWrapper,
	AuthorWrapper,
	ImageWrapper,
	Image,
} from "./styled";
import { fonts, colors } from "../../config";
import TypographicQuote from "./TypographicQuote";
import { defaultThemeName, getThemeObject } from "../../config/theme";

const Quote = ({
	author,
	big,
	small,
	imagePath,
	quotation,
	borderRadius,
	width,
	fontFamily,
	fontSize,
	fontWeight,
	lineHeight,
	color,
	authorFontFamily,
	authorFontWeight,
	authorFontSize,
	authorColor,
	authorLineHeight,
	themeName,
}) => {
	const imgWrapperSize = (80 * width) / 100;
	let themeObj = getThemeObject(themeName);
	let themeColor = themeObj.colors.primary.base;
	const primaryColor = authorColor || themeColor;

	return (
		<ThemeProvider theme={themeObj}>
			{imagePath ? (
				<QuoteWrapper width={width}>
					<ImageWrapper
						borderRadius={borderRadius}
						height={imgWrapperSize}
						width={imgWrapperSize}
					>
						<Image source={imagePath} />
					</ImageWrapper>
					<AuthorWrapper
						fontFamily={authorFontFamily || fonts.Black}
						fontWeight={authorFontWeight || null}
						fontSize={authorFontSize || 18}
						lineHeight={authorLineHeight || 22.5}
						color={authorColor || colors.richBlackDefault}
					>
						{author}
					</AuthorWrapper>
					<PhraseWrapper
						fontFamily={fontFamily || fonts.Regular}
						fontWeight={fontWeight || null}
						fontSize={fontSize || 14}
						lineHeight={lineHeight || 17.5}
						color={color || colors.richBlackDefault}
					>
						{quotation}
					</PhraseWrapper>
				</QuoteWrapper>
			) : (
				<TypographicQuote
					width={width}
					author={author}
					big={big}
					small={small}
					quotation={quotation}
					fontFamily={fontFamily}
					fontWeight={fontWeight}
					fontSize={fontSize}
					lineHeight={lineHeight}
					color={color}
					authorColor={primaryColor}
					authorFontFamily={authorFontFamily}
					authorFontWeight={authorFontWeight}
					authorFontSize={authorFontSize}
				/>
			)}
		</ThemeProvider>
	);
};

Quote.propTypes = {
	quotation: string.isRequired,
	author: string.isRequired,
	big: bool,
	small: bool,
	/** if provided, will display a differently styled quote */
	imagePath: node,
	borderRadius: number,
	width: number,
	fontFamily: string,
	fontSize: number,
	fontWeight: number,
	color: string,
	lineHeight: string,
	authorFontFamily: string,
	authorFontWeight: string,
	authorFontSize: number,
	authorLineHeight: number,
	authorColor: string,
	themeName: PropTypes.oneOfType([
		string,
		PropTypes.shape({
			primary: PropTypes.shape({
				lightest: string,
				light: string,
				base: string,
				dark: string,
				darker: string,
			}).isRequired,
			secondary: PropTypes.shape({
				lightest: string,
				light: string,
				base: string,
				dark: string,
				darker: string,
			}).isRequired,
		}),
	]),
};

Quote.defaultProps = {
	big: false,
	small: true,
	imagePath: null,
	borderRadius: 100,
	width: 250,
	themeName: defaultThemeName,
};

export default Quote;
