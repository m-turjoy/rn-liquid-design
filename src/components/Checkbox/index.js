import React from "react";
import { bool, func, string, object, number, PropTypes } from "prop-types";
import { ThemeProvider } from "styled-components";
import Icon from "../MerckIcons";
import { colors, theme } from "../../config";
import { defaultThemeName, getThemeObject } from "../../config/theme";
import {
	CheckboxWrapper,
	CheckboxTouchableWrapper,
	CheckboxTitle,
	CheckboxTitleWrapper,
} from "./styled";

const pressArea = {
	top: 10,
	bottom: 10,
	left: 10,
	right: 10,
};

const Checkbox = ({
	disabled,
	checked,
	onPress,
	title,
	titleContainerStyle,
	fontFamily,
	fontSize,
	fontWeight,
	iconSize,
	iconColor,
	titleStyle,
	iconContainerStyle,
	themeName,
}) => {
	const themeObj = getThemeObject(themeName);

	return (
		<ThemeProvider theme={themeObj}>
			<CheckboxWrapper opacity={1}>
				<CheckboxTouchableWrapper
					activeOpacity={1}
					disabled={disabled}
					onPress={onPress}
					style={iconContainerStyle}
					hitSlop={pressArea}
				>
					{checked ? (
						<Icon
							name="checkboxFilled"
							size={iconSize}
							color={iconColor || themeObj.colors.primary.base}
						/>
					) : (
						<Icon
							name="checkboxEmpty"
							size={iconSize}
							color={colors.sensitiveGreyDarkest}
						/>
					)}
				</CheckboxTouchableWrapper>
				<CheckboxTouchableWrapper
					disabled={disabled}
					activeOpacity={1}
					onPress={onPress}
					hitSlop={pressArea}
				>
					<CheckboxTitleWrapper
						ml={titleContainerStyle.marginLeft}
						style={titleContainerStyle}
					>
						<CheckboxTitle
							color={titleStyle.color}
							fontFamily={fontFamily}
							fontSize={fontSize}
							fontWeight={fontWeight}
							style={titleStyle}
						>
							{title}
						</CheckboxTitle>
					</CheckboxTitleWrapper>
				</CheckboxTouchableWrapper>
			</CheckboxWrapper>
		</ThemeProvider>
	);
};

CheckboxTitle.defaultProps = {
	color: "black",
};

CheckboxTitle.propTypes = {
	color: string,
};

CheckboxTitleWrapper.defaultProps = {
	ml: 4,
};

CheckboxTitleWrapper.propTypes = {
	ml: number,
};

Checkbox.defaultProps = {
	disabled: false,
	onPress: () => {},
	title: "Checkbox text",
	fontFamily: "Regular",
	fontWeight: 100,
	fontSize: 5,
	iconSize: 30,
	titleStyle: {
		color: colors.richBlackDefault,
	},
	titleContainerStyle: {},
	iconContainerStyle: {},
	themeName: defaultThemeName,
};

Checkbox.propTypes = {
	disabled: bool,
	checked: bool.isRequired,
	onPress: func,
	title: string,
	fontFamily: string,
	fontWeight: number,
	fontSize: number,
	iconSize: number,
	titleStyle: object,
	iconColor: string,
	titleContainerStyle: object,
	iconContainerStyle: object,
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

export default Checkbox;
