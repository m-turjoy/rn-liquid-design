import React, { Component } from "react";
import { bool, func, number, shape, string, PropTypes } from "prop-types";
import { ThemeProvider } from "styled-components";
import { defaultThemeName } from "../../config/theme";
import { colors, theme } from "../../config";
import { getThemeObject } from "../../config/theme";
import Icon from "../MerckIcons";
import {
	ButtonWrapper,
	ButtonTouchableWrapper,
	TitleIconWrapper,
	IconLeftWrapper,
	Title,
	TitleWrapper,
	IconWrapper,
} from "./styled";

class Button extends Component {
	constructor(props) {
		super(props);
		const theme = getThemeObject(this.props.themeName);
		const themeName = typeof theme === "string" ? theme : "";
		this.state = {
			themeName,
			theme,
			backgroundPrimaryActive: theme.colors.primary.base,
			backgroundSecondaryActive: colors.sensitiveGreyDefault,
			backgroundHighlightActive: theme.colors.secondary.base,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.themeName !== this.props.themeName) {
			const theme = getThemeObject(nextProps.themeName);
			const themeName = typeof theme === "string" ? theme : "";
			this.setState({
				themeName,
				theme,
				backgroundPrimaryActive: theme.colors.primary.base,
				backgroundHighlightActive: theme.colors.secondary.base,
			});
		}
	}

	adjustWrapperPaddingHorizontal = (icon, iconLeft, Big) =>
		(icon && iconLeft && 30) ||
		(icon && !iconLeft && !Big && 6) ||
		(icon && !iconLeft && Big && 13) ||
		30;

	adjustPrimaryBackground = (active, disabled) =>
		(active && this.state.theme.colors.primary.darker) ||
		(disabled && this.state.theme.colors.primary.lightest) ||
		this.state.backgroundPrimaryActive;

	adjustSecondaryBackground = (active, disabled) =>
		(active && colors.sensitiveGreyDarker) ||
		(disabled && colors.sensitiveGreyLight) ||
		this.state.backgroundSecondaryActive;

	adjustHighlightBackground = (active, disabled) =>
		(active && this.state.theme.colors.secondary.darker) ||
		(disabled && this.state.theme.colors.secondary.lightest) ||
		this.state.backgroundHighlightActive;

	handleShowHighlightUnderlay = () => {
		this.setState({
			backgroundHighlightActive: this.state.theme.colors.secondary.darker,
		});
	};

	handleHideHighlightUnderlay = () => {
		this.setState({
			backgroundHighlightActive: this.state.theme.colors.secondary.base,
		});
	};

	handleShowSecondaryUnderlay = () => {
		this.setState({ backgroundSecondaryActive: colors.sensitiveGreyDarker });
	};

	handleHideSecondaryUnderlay = () => {
		this.setState({ backgroundSecondaryActive: colors.sensitiveGreyDefault });
	};

	handleShowPrimaryUnderlay = () => {
		this.setState({
			backgroundPrimaryActive: this.state.theme.colors.primary.darker,
		});
	};

	handleHidePrimaryUnderlay = () => {
		this.setState({
			backgroundPrimaryActive: this.state.theme.colors.primary.base,
		});
	};

	handleShowUnderlay = (disabled, secondary, highlight) =>
		disabled
			? null
			: (secondary && this.handleShowSecondaryUnderlay()) ||
				(highlight && this.handleShowHighlightUnderlay(this.state.theme)) ||
				this.handleShowPrimaryUnderlay(this.state.theme);

	handleHideUnderlay = (disabled, secondary, highlight) =>
		disabled
			? null
			: (secondary && this.handleHideSecondaryUnderlay()) ||
				(highlight && this.handleHideHighlightUnderlay(this.state.theme)) ||
				this.handleHidePrimaryUnderlay(this.state.theme);

	renderIconWithTitle = (
		icon,
		disabled,
		titleStyle,
		fontSize,
		fontFamily,
		color,
		title
	) => (
		<TitleIconWrapper
			flexDirection="row"
			justifyContent="center"
			alignItems="center"
			opacity={1}
		>
			<IconLeftWrapper marginRight={8}>
				<Icon name={icon.name} color={color} />
			</IconLeftWrapper>
			<Title
				color={color}
				fontFamily={fontFamily}
				fontSize={fontSize}
				style={titleStyle}
			>
				{title}
			</Title>
		</TitleIconWrapper>
	);
	renderSecondaryIconWithTitle = (
		icon,
		disabled,
		titleStyle,
		fontSize,
		fontFamily,
		color,
		title,
		primaryIcon
	) => (
		<TitleIconWrapper
			flexDirection="row"
			justifyContent="center"
			alignItems="center"
		>
			<IconLeftWrapper marginRight={8} opacity={1}>
				<Icon
					name={icon.name}
					color={
						disabled ? colors.sensitiveGreyDarkest : primaryIcon || icon.color
					}
				/>
			</IconLeftWrapper>
			<Title
				color={
					disabled ? colors.sensitiveGreyDarkest : primaryIcon || icon.color
				}
				fontFamily={fontFamily}
				fontSize={fontSize}
				style={titleStyle}
			>
				{title}
			</Title>
		</TitleIconWrapper>
	);

	renderHighlightIconWithTitle = (
		icon,
		disabled,
		titleStyle,
		fontSize,
		fontFamily,
		color,
		title
	) => (
		<TitleIconWrapper
			flexDirection="row"
			justifyContent="center"
			alignItems="center"
			opacity={1}
		>
			<IconLeftWrapper marginRight={8}>
				<Icon
					name={icon.name}
					color={
						(disabled && this.state.themeName === "vibrantMagenta") ||
						this.state.themeName === "richPurple"
							? colors.white
							: this.state.themeName === "vibrantMagenta" ||
								  this.state.themeName === "richPurple"
								? colors.white
								: colors.richBlackDefault || icon.color
					}
				/>
			</IconLeftWrapper>
			<Title
				color={
					(disabled && this.state.themeName === "vibrantMagenta") ||
					this.state.themeName === "richPurple"
						? colors.white
						: this.state.themeName === "vibrantMagenta" ||
							  this.state.themeName === "richPurple"
							? colors.white
							: colors.richBlackDefault || icon.color
				}
				fontFamily={fontFamily}
				fontSize={fontSize}
				style={titleStyle}
			>
				{title}
			</Title>
		</TitleIconWrapper>
	);

	renderButtonHighlight = (
		borderRadius,
		Big,
		height,
		disabled,
		buttonStyle,
		color,
		fontFamily,
		fontSize,
		titleStyle,
		title,
		active,
		icon,
		iconLeft
	) => (
		<ButtonWrapper
			backgroundColor={this.adjustHighlightBackground(active, disabled)}
			borderRadius={borderRadius}
			style={buttonStyle}
			height={Big ? 50 : height}
			width={!iconLeft && icon && !Big ? height : null}
			paddingHorizontal={this.adjustWrapperPaddingHorizontal(
				icon,
				iconLeft,
				Big
			)}
		>
			{(iconLeft &&
				icon &&
				this.renderHighlightIconWithTitle(
					icon,
					disabled,
					titleStyle,
					fontSize,
					fontFamily,
					color,
					title
				)) ||
				(icon && !iconLeft && (
					<IconWrapper opacity={1}>
						<Icon
							name={icon.name}
							color={
								(disabled && this.state.themeName === "vibrantMagenta") ||
								this.state.themeName === "richPurple"
									? colors.white
									: this.state.themeName === "vibrantMagenta" ||
										  this.state.themeName === "richPurple"
										? colors.white
										: colors.richBlackDefault || icon.color
							}
						/>
					</IconWrapper>
				)) || (
					<TitleWrapper opacity={1}>
						<Title
							color={
								(disabled && this.state.themeName === "vibrantMagenta") ||
								this.state.themeName === "richPurple"
									? colors.white
									: this.state.themeName === "vibrantMagenta" ||
										  this.state.themeName === "richPurple"
										? colors.white
										: colors.richBlackDefault || icon.color
							}
							fontFamily={fontFamily}
							fontSize={fontSize}
							style={titleStyle}
						>
							{title}
						</Title>
					</TitleWrapper>
				)}
		</ButtonWrapper>
	);

	renderButtonSecondary = (
		borderRadius,
		Big,
		height,
		disabled,
		buttonStyle,
		color,
		fontFamily,
		fontSize,
		titleStyle,
		title,
		active,
		icon,
		iconLeft,
		primaryIcon
	) => (
		<ButtonWrapper
			backgroundColor={this.adjustSecondaryBackground(active, disabled)}
			borderRadius={borderRadius}
			style={buttonStyle}
			height={Big ? 50 : height}
			width={!iconLeft && icon && !Big ? height : null}
			paddingHorizontal={this.adjustWrapperPaddingHorizontal(
				icon,
				iconLeft,
				Big
			)}
		>
			{(iconLeft &&
				icon &&
				this.renderSecondaryIconWithTitle(
					icon,
					disabled,
					titleStyle,
					fontSize,
					fontFamily,
					color,
					title,
					primaryIcon
				)) ||
				(icon && !iconLeft && (
					<IconWrapper opacity={1}>
						<Icon
							name={icon.name}
							color={
								disabled ? colors.sensitiveGreyDarkest : primaryIcon || color
							}
						/>
					</IconWrapper>
				)) || (
					<TitleWrapper>
						<Title
							color={
								disabled ? colors.sensitiveGreyDarkest : primaryIcon || color
							}
							fontFamily={fontFamily}
							fontSize={fontSize}
							style={titleStyle}
						>
							{title}
						</Title>
					</TitleWrapper>
				)}
		</ButtonWrapper>
	);

	renderButtonPrimary = (
		borderRadius,
		Big,
		height,
		disabled,
		buttonStyle,
		color,
		fontFamily,
		fontSize,
		titleStyle,
		title,
		active,
		icon,
		iconLeft
	) => (
		<ButtonWrapper
			backgroundColor={this.adjustPrimaryBackground(active, disabled)}
			borderRadius={borderRadius}
			height={Big ? 50 : height}
			width={!iconLeft && icon && !Big ? height : null}
			style={buttonStyle}
			paddingHorizontal={this.adjustWrapperPaddingHorizontal(
				icon,
				iconLeft,
				Big
			)}
		>
			{(iconLeft &&
				icon &&
				this.renderIconWithTitle(
					icon,
					disabled,
					titleStyle,
					fontSize,
					fontFamily,
					color,
					title
				)) ||
				(icon && !iconLeft && (
					<IconWrapper opacity={1}>
						<Icon name={icon.name} color={icon.color} />
					</IconWrapper>
				)) || (
					<TitleWrapper opacity={1}>
						<Title
							color={color}
							fontFamily={fontFamily}
							fontSize={fontSize}
							style={titleStyle}
						>
							{title}
						</Title>
					</TitleWrapper>
				)}
		</ButtonWrapper>
	);

	render() {
		const {
			secondary,
			highlight,
			title,
			disabled,
			active,
			onPress,
			icon,
			iconLeft,
			Big,
			borderRadius,
			color,
			fontFamily,
			fontSize,
			buttonStyle,
			titleStyle,
			height,
			themeName,
		} = this.props;

		const primaryIcon = this.state.theme.colors.primary.base;
		const secondaryIcon = this.state.theme.colors.secondary.base;

		return (
			<ThemeProvider theme={this.state.theme}>
				<ButtonTouchableWrapper
					activeOpacity={1}
					underlayColor="transparent"
					onShowUnderlay={() => {
						this.handleShowUnderlay(disabled, secondary, highlight);
					}}
					onHideUnderlay={() => {
						this.handleHideUnderlay(disabled, secondary, highlight);
					}}
					onPress={onPress}
				>
					{(secondary &&
						this.renderButtonSecondary(
							borderRadius,
							Big,
							height,
							disabled,
							buttonStyle,
							color,
							fontFamily,
							fontSize,
							titleStyle,
							title,
							active,
							icon,
							iconLeft,
							primaryIcon
						)) ||
						(highlight &&
							this.renderButtonHighlight(
								borderRadius,
								Big,
								height,
								disabled,
								buttonStyle,
								color,
								fontFamily,
								fontSize,
								titleStyle,
								title,
								active,
								icon,
								iconLeft,
								secondaryIcon
							)) ||
						this.renderButtonPrimary(
							borderRadius,
							Big,
							height,
							disabled,
							buttonStyle,
							color,
							fontFamily,
							fontSize,
							titleStyle,
							title,
							active,
							icon,
							iconLeft
						)}
				</ButtonTouchableWrapper>
			</ThemeProvider>
		);
	}
}

Title.propTypes = {
	fontSize: number,
	fontFamily: string,
	color: string,
};
Title.defaultProps = {
	fontSize: 4,
	fontFamily: "Black",
	color: "white",
};

Button.propTypes = {
	icon: shape({}),
	buttonStyle: shape({}),
	titleStyle: shape({}),
	iconLeft: bool,
	highlight: bool,
	secondary: bool,
	title: string,
	onPress: func,
	disabled: bool,
	Big: bool,
	borderRadius: number,
	color: string,
	fontSize: number,
	fontFamily: string,
	active: bool,
	height: number,
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

Button.defaultProps = {
	title: "Text",
	buttonStyle: {},
	titleStyle: {},
	icon: null,
	secondary: false,
	highlight: false,
	iconLeft: false,
	onPress: () => {},
	Big: false,
	height: 40,
	borderRadius: 6,
	color: colors.white,
	fontSize: 4,
	fontFamily: "Black",
	disabled: false,
	active: false,
	themeName: defaultThemeName,
};

export default Button;
