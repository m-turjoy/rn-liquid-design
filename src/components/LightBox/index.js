import React from "react";
import { bool, func, node, number, string } from "prop-types";
import { ThemeProvider } from "styled-components";
import { theme } from "../../config";
import { defaultThemeName } from "../../config/theme";
import { ModalBody } from "./ModalBody";
// import { Modal } from '../';
import Modal from "../Modal";

const LightBox = ({
	headerTitle,
	headerColor,
	headerFontFamily,
	headerFontWeight,
	headerLineHeight,
	headerFontSize,
	headerBgColor,
	headlineText,
	contentText,
	contentFontFamily,
	contentFontSize,
	contentFontWeight,
	contentLineHeight,
	contentColor,
	contentBgColor,
	buttonText,
	cancelText,
	modalWidth,
	onButtonPress,
	onCancelPress,
	onChangeText,
	placeholder,
	onBlur,
	onFocus,
	errorMessage,
	withGraphic,
	withCta,
	withTextField,
	imagePath,
	onError,
	iconSize,
	headlineType,
	isVisible,
	needScroll,
	duration,
	backdropColor,
	backdropOpacity,
	onBackButtonPress,
	onBackdropPress,
	themeName,
}) => (
	<ThemeProvider theme={theme.themes[themeName]}>
		<ModalBody
			isVisible={isVisible}
			onBackdropPress={onBackdropPress}
			needScroll={needScroll}
			duration={duration}
			backdropColor={backdropColor}
			backdropOpacity={backdropOpacity}
			onBackButtonPress={onBackButtonPress}
			withTextField={withTextField}
			withGraphic={withGraphic}
		>
			<Modal
				headerTitle={headerTitle}
				headerColor={headerColor}
				headerFontFamily={headerFontFamily}
				headerFontWeight={headerFontWeight}
				headerLineHeight={headerLineHeight}
				headerFontSize={headerFontSize}
				headerBgColor={headerBgColor}
				headlineText={headlineText}
				contentText={contentText}
				contentFontFamily={contentFontFamily}
				contentFontSize={contentFontSize}
				contentFontWeight={contentFontWeight}
				contentLineHeight={contentLineHeight}
				contentColor={contentColor}
				contentBgColor={contentBgColor}
				buttonText={buttonText}
				cancelText={cancelText}
				modalWidth={modalWidth}
				onButtonPress={onButtonPress}
				onCancelPress={onCancelPress}
				onChangeText={onChangeText}
				placeholder={placeholder}
				onBlur={onBlur}
				onFocus={onFocus}
				errorMessage={errorMessage}
				withGraphic={withGraphic}
				withCta={withCta}
				withTextField={withTextField}
				imagePath={imagePath}
				onError={onError}
				iconSize={iconSize}
				headlineType={headlineType}
				onBackdropPress={onBackdropPress}
				themeName={themeName}
			/>
		</ModalBody>
	</ThemeProvider>
);

LightBox.defaultProps = {
	themeName: defaultThemeName,
};

LightBox.propTypes = {
	headerTitle: string,
	headerColor: string,
	headerFontFamily: string,
	headerFontWeight: number,
	headerLineHeight: number,
	headerFontSize: number,
	headerBgColor: string,
	headlineText: string,
	contentText: string,
	contentFontFamily: string,
	contentFontSize: number,
	contentFontWeight: number,
	contentLineHeight: number,
	contentColor: string,
	contentBgColor: string,
	buttonText: string,
	cancelText: string,
	modalWidth: number,
	onButtonPress: func,
	onCancelPress: func,
	onChangeText: func,
	placeholder: string,
	onBlur: func,
	onFocus: func,
	errorMessage: string,
	withGraphic: bool,
	withCta: bool,
	withTextField: bool,
	imagePath: node,
	onError: bool,
	iconSize: number,
	headlineType: string,
	needScroll: bool,
	isVisible: bool,
	duration: number,
	backdropColor: number,
	backdropOpacity: number,
	onBackButtonPress: func,
	onBackdropPress: func,
	themeName: string,
};

export default LightBox;
