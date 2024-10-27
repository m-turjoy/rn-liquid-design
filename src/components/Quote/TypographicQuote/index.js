import React from "react";
import { bool, number, string } from "prop-types";
import { fonts, colors } from "../../../config";
import { QuoteWrapper, PhraseWrapper, AuthorWrapper } from "./styled";

const TypographicQuote = ({
	author,
	big,
	small,
	quotation,
	width,
	fontFamily,
	fontSize,
	fontWeight,
	lineHeight,
	color,
	authorFontFamily,
	authorFontSize,
	authorFontWeight,
	authorLineHeight,
	authorColor,
}) => (
	<QuoteWrapper width={width}>
		<PhraseWrapper
			fontFamily={fontFamily || fonts.Black}
			fontSize={big ? 32 : small ? 22 : fontSize}
			fontWeight={fontWeight || null}
			lineHeight={big ? 40 : small ? 27.5 : lineHeight}
			color={color || colors.richBlackDefault}
		>
			{`»${quotation}«`}
		</PhraseWrapper>
		<AuthorWrapper
			fontFamily={authorFontFamily || fonts.Regular}
			fontSize={authorFontSize || 12}
			fontWeight={authorFontWeight || null}
			lineHeight={authorLineHeight || 15}
			color={authorColor || colors.vibrantCyanDefault}
		>
			{`– ${author}`}
		</AuthorWrapper>
	</QuoteWrapper>
);

TypographicQuote.propTypes = {
	quotation: string.isRequired,
	author: string.isRequired,
	big: bool,
	small: bool,
	width: number,
	fontFamily: string,
	fontSize: number,
	fontWeight: number,
	lineHeight: number,
	color: string,
	authorFontFamily: string,
	authorFontSize: number,
	authorFontWeight: number,
	authorLineHeight: number,
	authorColor: string,
};

TypographicQuote.defaultProps = {
	big: false,
	width: 250,
};

export default TypographicQuote;
