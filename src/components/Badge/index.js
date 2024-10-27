import React from "react";
import { ThemeProvider } from "styled-components";
import { string, bool, number, PropTypes } from "prop-types";
import { StyledBadge, StyledBadgeText } from "./styled";
import { colors, fonts } from "../../config";
import Icon from "../MerckIcons";
import styles from "./styles";
import { defaultThemeName, getThemeObject } from "../../config/theme";

class Badge extends React.Component {
	state = {
		themeName: this.props.themeName,
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.themeName !== this.props.themeName) {
			this.setState({ themeName: nextProps.themeName });
		}
	}

	renderSimpleBadge = () => {
		const { badgeText, withIcon, disabled, simpleMaxWidth, themeName } =
			this.props;
		const icon = (
			<Icon
				name="placeholder"
				size={14}
				color={
					this.state.themeName === "vibrantMagenta" ||
					this.state.themeName === "richPurple"
						? colors.white
						: colors.richBlackDefault
				}
				style={styles.iconSimple}
			/>
		);
		let themeObj = getThemeObject(themeName);

		return (
			<StyledBadge
				alignItems="center"
				justifyContent="center"
				backgroundColor={themeObj.colors.secondary.base}
				borderRadius={6}
				maxWidth={simpleMaxWidth}
				opacity={disabled ? 0.5 : 1}
				height={20}
			>
				<StyledBadge
					flexDirection="row"
					alignItems="center"
					style={styles.simpleBadge}
				>
					{withIcon && icon}
					<StyledBadgeText
						color={
							this.state.themeName === "vibrantMagenta" ||
							this.state.themeName === "richPurple"
								? colors.white
								: colors.richBlackDefault
						}
						fontSize="12"
						fontFamily={fonts.Regular}
					>
						{badgeText}
					</StyledBadgeText>
				</StyledBadge>
			</StyledBadge>
		);
	};

	renderContentBadge = () => {
		const {
			badgeText,
			withIcon,
			iconPosition,
			disabled,
			contentBadgeWidth,
			themeName,
		} = this.props;
		const icon = (
			<Icon
				name="placeholder"
				size={16}
				color={
					this.state.themeName === "vibrantMagenta" ||
					this.state.themeName === "richPurple"
						? colors.white
						: colors.richBlackDefault
				}
				style={
					iconPosition === "left"
						? styles.iconContentRight
						: styles.iconContentLeft
				}
			/>
		);
		let themeObj = getThemeObject(themeName);
		return (
			<StyledBadge
				alignItems="center"
				flexDirection="row"
				justifyContent="space-around"
				backgroundColor={themeObj.colors.secondary.base}
				borderBottomRightRadius={6}
				borderBottomLeftRadius={6}
				opacity={disabled ? 0.5 : 1}
				width={contentBadgeWidth}
				height={30}
			>
				<StyledBadge
					alignItems="center"
					flexDirection="row"
					justifyContent="space-between"
					style={styles.contentBadge}
				>
					{iconPosition === "left" && withIcon && icon}
					<StyledBadgeText
						fontSize="12"
						fontFamily={fonts.Regular}
						minWidth="220"
						color={
							this.state.themeName === "vibrantMagenta" ||
							this.state.themeName === "richPurple"
								? colors.white
								: colors.richBlackDefault
						}
					>
						{badgeText}
					</StyledBadgeText>
					{iconPosition === "right" && withIcon && icon}
				</StyledBadge>
			</StyledBadge>
		);
	};
	render() {
		const { badgeType, themeName } = this.props;
		let themeObj = getThemeObject(themeName);
		return (
			<ThemeProvider theme={themeObj}>
				{badgeType === "simple"
					? this.renderSimpleBadge()
					: this.renderContentBadge()}
			</ThemeProvider>
		);
	}
}

Badge.defaultProps = {
	badgeText: "Delivery in 3-4 days",
	withIcon: true,
	iconPosition: "right",
	disabled: false,
	simpleMaxWidth: 152,
	contentBadgeWidth: 300,
	themeName: defaultThemeName,
};

Badge.propTypes = {
	disabled: bool,
	simpleMaxWidth: number,
	contentBadgeWidth: number,
	badgeText: string,
	withIcon: bool,
	iconPosition: string,
	badgeType: string,
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

export default Badge;
