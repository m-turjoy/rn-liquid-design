import React from "react";
import { bool, func, object, number, string, PropTypes } from "prop-types";
import { ThemeProvider } from "styled-components";
import Icon from "../MerckIcons";
import { colors } from "../../config";
import {
	RadioButtonWrapper,
	RadioButtonTouchableWrapper,
	RadioButtonTitle,
	RadioButtonTitleWrapper,
} from "./styled";
import { defaultThemeName, getThemeObject } from "../../config/theme";

const pressArea = {
	top: 10,
	bottom: 10,
	left: 10,
	right: 10,
};

const RadioButton = ({
	disabled,
	selected,
	onPress,
	title,
	titleContainerStyle,
	fontFamily,
	fontSize,
	fontWeight,
	iconSize,
	titleStyle,
	iconColor,
	iconContainerStyle,
	themeName,
}) => {
	const themeObj = getThemeObject(themeName);
	const themeColor = themeObj.colors.primary.base;

	return (
		<ThemeProvider theme={themeObj}>
			<RadioButtonWrapper opacity={disabled ? 0.5 : 1}>
				<RadioButtonTouchableWrapper
					disabled={disabled}
					activeOpacity={1}
					onPress={onPress}
					style={iconContainerStyle}
					hitSlop={pressArea}
				>
					{selected ? (
						<Icon
							name="radioBtnActive"
							size={iconSize}
							color={iconColor || themeColor}
						/>
					) : (
						<Icon
							name="radioBtnEmpty"
							size={iconSize}
							color={colors.sensitiveGreyDarkest}
						/>
					)}
				</RadioButtonTouchableWrapper>
				<RadioButtonTouchableWrapper
					disabled={disabled}
					activeOpacity={1}
					onPress={onPress}
					hitSlop={pressArea}
				>
					<RadioButtonTitleWrapper
						ml={titleContainerStyle.marginLeft}
						style={titleContainerStyle}
					>
						<RadioButtonTitle
							color={titleStyle.color}
							fontFamily={fontFamily}
							fontSize={fontSize}
							fontWeight={fontWeight}
							style={titleStyle}
						>
							{title}
						</RadioButtonTitle>
					</RadioButtonTitleWrapper>
				</RadioButtonTouchableWrapper>
			</RadioButtonWrapper>
		</ThemeProvider>
	);
};

RadioButtonTitle.defaultProps = {
	color: "black",
};

RadioButtonTitle.propTypes = {
	color: string,
};

RadioButtonTitleWrapper.defaultProps = {
	ml: 4,
};

RadioButtonTitleWrapper.propTypes = {
	ml: number,
};

RadioButton.defaultProps = {
	disabled: false,
	onPress: () => {},
	title: "Radio Button Label",
	fontFamily: "Regular",
	fontWeight: 100,
	fontSize: 3,
	iconSize: 24,
	titleStyle: {
		color: colors.richBlackDefault,
	},
	titleContainerStyle: {},
	iconContainerStyle: {},
	themeName: defaultThemeName,
};

RadioButton.propTypes = {
	disabled: bool,
	selected: bool.isRequired,
	onPress: func,
	title: string,
	fontFamily: string,
	fontWeight: number,
	fontSize: number,
	iconSize: number,
	titleStyle: object,
	titleContainerStyle: object,
	iconContainerStyle: object,
	iconColor: string,
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

export default RadioButton;
