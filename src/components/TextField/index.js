import React, { Component } from "react";
import { Platform } from "react-native";
import {
	bool,
	object,
	string,
	func,
	number,
	shape,
	oneOfType,
	array,
} from "prop-types";
import { ThemeProvider } from "styled-components";
import { theme, colors, fonts } from "../../config";
import {
	TextInput,
	ErrorMessage,
	TextInputWrapper,
	TextInputContainer,
	Label,
	TextInputErrorWrapper,
	ErrorContainer,
} from "./styled";
import { defaultThemeName, getThemeObject } from "../../config/theme";

class TextField extends Component {
	state = {
		active: false,
	};

	render() {
		const {
			disabled,
			error,
			errorMessage,
			placeholder,
			placeholderTextColor,
			backgroundColor,
			onFocus,
			onBlur,
			errorMessageStyle,
			multiline,
			textInputLabel,
			textInputLabelColor,
			textInputLabelFontFamily,
			textInputLabelFontSize,
			textInputLabelStyle,
			textInputLabelVisible,
			color,
			fontFamily,
			fontSize,
			borderRadius,
			themeName,
			multilineWrapperHeight,
			wrapperHeight,
			multilineWrapperWidth,
			wrapperWidth,
			errorMessageColor,
			errorMessageFontFamily,
			errorMessageFontSize,
			bothTypesWrapperStyle,
		} = this.props;

		const themeObj = getThemeObject(themeName);

		return (
			<ThemeProvider theme={themeObj}>
				<TextInputContainer>
					{textInputLabelVisible ? (
						<Label
							color={textInputLabelColor}
							fontSize={textInputLabelFontSize}
							fontFamily={textInputLabelFontFamily}
							style={[
								textInputLabelStyle,
								{
									paddingBottom: 5,
									opacity: disabled ? 0.6 : 1,
								},
							]}
						>
							{textInputLabel}
						</Label>
					) : null}
					<TextInputErrorWrapper
						height={multiline ? multilineWrapperHeight : wrapperHeight}
					>
						<TextInputContainer
							height={multiline ? multilineWrapperHeight : wrapperHeight}
							width={multiline ? multilineWrapperWidth : wrapperWidth}
							borderRadius={borderRadius}
							opacity={disabled ? 0.6 : 1}
							overflow="hidden"
						>
							<TextInputWrapper
								flex={1}
								minWidth={multiline ? 300 : null}
								maxWidth={multiline ? 250 : null}
								paddingRight={multiline ? 15 : null}
								paddingTop={
									multiline ? (Platform.OS === "android" ? 6 : 10) : null
								}
								paddinbBottom={
									multiline ? (Platform.OS === "android" ? 6 : 10) : null
								}
								style={bothTypesWrapperStyle}
								borderColor={
									error
										? colors.richRedDefault
										: this.state.active
											? themeObj.colors.primary.base
											: colors.transparent
								}
								borderBottomWidth={disabled ? 0 : 2}
								backgroundColor={backgroundColor}
								justifyContent={!multiline ? "center" : null}
								opacity={disabled ? 0.6 : 1}
							>
								<TextInput
									{...this.props}
									editable={!disabled}
									multiline={multiline}
									underlineColorAndroid={colors.transparent}
									placeholder={placeholder}
									textAlignVertical={multiline ? "top" : "bottom"}
									style={[
										{
											height: multiline
												? multilineWrapperHeight - 20
												: wrapperHeight,
											top: 1,
											backgroundColor: "transparent",
											color,
											fontFamily,
											fontSize,
										},
									]}
									placeholderTextColor={placeholderTextColor}
									onFocus={() => {
										onFocus();
										this.setState({ active: true });
									}}
									onBlur={() => {
										onBlur();
										this.setState({ active: false });
									}}
								/>
							</TextInputWrapper>
						</TextInputContainer>
						{error ? (
							<ErrorContainer paddingLeft={2} paddingTop={5} paddingRight={2}>
								<ErrorMessage
									style={errorMessageStyle}
									color={errorMessageColor}
									fontFamily={errorMessageFontFamily}
									fontSize={errorMessageFontSize}
									letterSpacing={0.2}
								>
									{errorMessage}
								</ErrorMessage>
							</ErrorContainer>
						) : null}
					</TextInputErrorWrapper>
				</TextInputContainer>
			</ThemeProvider>
		);
	}
}

TextField.propTypes = {
	disabled: bool,
	error: bool,
	textInputStyle: object,
	placeholder: string,
	placeholderTextColor: string,
	onFocus: func,
	onBlur: func,
	errorMessage: string,
	errorMessageStyle: object,
	multiline: bool,
	multilineTextInputStyle: object,
	backgroundColor: string,
	textInputLabel: string,
	textInputLabelColor: string,
	textInputLabelFontFamily: string,
	textInputLabelFontSize: number,
	textInputLabelStyle: object,
	textInputLabelVisible: bool,
	color: string,
	fontFamily: string,
	fontSize: number,
	borderRadius: number,
	themeName: oneOfType([
		string,
		shape({
			primary: shape({
				lightest: string,
				light: string,
				base: string,
				dark: string,
				darker: string,
			}).isRequired,
			secondary: shape({
				lightest: string,
				light: string,
				base: string,
				dark: string,
				darker: string,
			}).isRequired,
		}),
	]),
	multilineWrapperHeight: number,
	wrapperHeight: number,
	multilineWrapperWidth: number,
	wrapperWidth: number,
	errorMessageColor: string,
	errorMessageFontFamily: string,
	errorMessageFontSize: number,
	bothTypesWrapperStyle: oneOfType([object, array]),
};

TextField.defaultProps = {
	errorMessageColor: colors.richRedDefault,
	errorMessageFontFamily: fonts.Regular,
	errorMessageFontSize: 12,
	multilineWrapperHeight: 200,
	wrapperHeight: 40,
	multilineWrapperWidth: 300,
	wrapperWidth: 300,
	disabled: false,
	error: false,
	errorMessage: "Error Message",
	placeholder: "Add Placeholder Text here",
	placeholderTextColor: colors.richBlackLightest,
	onFocus: () => {},
	onBlur: () => {},
	errorMessageStyle: {},
	multiline: false,
	backgroundColor: colors.transparent,
	textInputLabel: "Text Area label",
	textInputLabelColor: colors.richBlackLightest,
	textInputLabelFontFamily: fonts.Regular,
	textInputLabelFontSize: 12,
	textInputLabelStyle: {},
	textInputLabelVisible: true,
	color: colors.richBlackDefault,
	fontFamily: fonts.Regular,
	fontSize: 16,
	borderRadius: 6,
	themeName: defaultThemeName,
	bothTypesWrapperStyle: {
		paddingLeft: Platform.OS === "android" ? 13.5 : 15,
	},
};

export default TextField;
