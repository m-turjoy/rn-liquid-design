import React, { Component } from "react";
import {
	Animated,
	PanResponder,
	Platform,
	TouchableWithoutFeedback,
} from "react-native";
import { func, bool, string, object, PropTypes } from "prop-types";
import { ThemeProvider } from "styled-components";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import { colors } from "../../config";
import icoMoonConfig from "../../config/selection.json";
import {
	AnimatedSliderWrapper,
	TogglWrapper,
	AnimatedIconWrapper,
	TouchableWrapper,
} from "./styled";
import { defaultThemeName, getThemeObject } from "../../config/theme";

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

class IconToggle extends Component {
	constructor(props) {
		super(props);

		this.minValue = 2;
		this.maxValue = 58;

		this.state = {
			startValue:
				props.defaultPosition === "right" ? this.maxValue : this.minValue,
		};
		this.animate = false;
		this.switchValue = this.state.startValue;
		this.animatedValue = new Animated.Value(this.switchValue);
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderTerminationRequest: (evt, gestureState) => true,
		});
	}

	// UNSAFE_componentWillMount() {
	//   this.panResponder = PanResponder.create({
	//     onStartShouldSetPanResponder: (evt, gestureState) => true,
	//     onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
	//     onMoveShouldSetPanResponder: (evt, gestureState) => true,
	//     onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
	//     onPanResponderTerminationRequest: (evt, gestureState) => true,
	//   });
	// }

	toggleState = (animate = true) => {
		const { startValue } = this.state;
		const { onLeftState, onRightState } = this.props;

		const idx = startValue === this.minValue ? 1 : 0;
		if (animate) {
			this.setActiveIndex(idx);
		}

		if (idx === 1) {
			onRightState();
		} else {
			onLeftState();
		}
	};

	setActiveIndex = (idx) => {
		const { disabled } = this.props;
		if (disabled) return null;
		if (idx === 0) {
			this.animateToSwitchItem(this.minValue);
		} else if (idx === 1) {
			this.animateToSwitchItem(this.maxValue);
		}
	};

	animateToSwitchItem = (toValue) => {
		Animated.timing(
			this.animatedValue,
			{
				toValue,
				duration: 200,
			},
			{ useNativeDrive: true }
		).start(() => {
			this.setState({ startValue: toValue });
		});
	};

	render() {
		const {
			tintColor,
			thumbTintColor,
			icon,
			disabled,
			disabledThumbTintColor,
			disabledIconColor,
			themeName,
		} = this.props;
		const themeObj = getThemeObject(themeName);
		const AnimatedIcon = Animated.createAnimatedComponent(Icon);

		const primaryColor = thumbTintColor || themeObj.colors.primary.base;

		const interpolateIconColor = this.animatedValue.interpolate({
			inputRange: [this.minValue, this.maxValue],
			outputRange: [icon.color, colors.sensitiveGreyDarker],
		});

		const interpolateSecondIconColor = this.animatedValue.interpolate({
			inputRange: [this.minValue, this.maxValue],
			outputRange: [colors.sensitiveGreyDarkest, icon.color],
		});

		const adjustIconSize = icon.size <= 40 ? icon.size : 20;

		return (
			<ThemeProvider theme={themeObj}>
				<TouchableWithoutFeedback onPress={() => this.toggleState()}>
					<TogglWrapper
						flexDirection="row"
						alignItems="center"
						backgroundColor={tintColor}
						overflow="hidden"
						borderRadius={20}
						width={110}
						height={40}
						opacity={disabled ? 0.5 : 1}
					>
						<AnimatedSliderWrapper
							{...this.panResponder.panHandlers}
							style={{ left: this.animatedValue }}
							position="absolute"
							backgroundColor={disabled ? disabledThumbTintColor : primaryColor}
							height={36}
							shadowColor={colors.richBlackDefault}
							shadowRadius={5}
							shadowOpacity={disabled ? 0 : 0.1}
							shadowOffset={{
								height: 2,
								width: 2,
							}}
							width={50}
							borderRadius={18}
							justifyContent="center"
							alignItems="center"
						/>
						<AnimatedSliderWrapper
							{...this.panResponder.panHandlers}
							style={{ left: this.animatedValue }}
							backgroundColor={colors.transparent}
							elevation={Platform.Version < 26 ? 0 : disabled ? 0 : 35}
							position="absolute"
							height={36}
							width={50}
							borderRadius={18}
						/>
						<TouchableWrapper
							flex={1}
							justifyContent="space-around"
							flexDirection="row"
						>
							<AnimatedIconWrapper
								style={{
									backgroundColor: colors.transparent,
								}}
								alignItems="center"
								justifyContent="center"
								onPress={() => this.toggleState()}
								height={36}
								width={50}
								activeOpacity={1}
							>
								<AnimatedIcon
									name={icon.name}
									size={adjustIconSize}
									style={{
										color: interpolateIconColor,
									}}
								/>
							</AnimatedIconWrapper>
							<AnimatedIconWrapper
								style={{
									backgroundColor: colors.transparent,
								}}
								alignItems="center"
								justifyContent="center"
								onPress={() => this.toggleState()}
								activeOpacity={1}
								height={36}
								width={50}
							>
								<AnimatedIcon
									name={icon.name}
									size={adjustIconSize}
									style={{
										color: disabled
											? disabledIconColor
											: interpolateSecondIconColor,
										paddingLeft: 4,
									}}
								/>
							</AnimatedIconWrapper>
						</TouchableWrapper>
					</TogglWrapper>
				</TouchableWithoutFeedback>
			</ThemeProvider>
		);
	}
}

IconToggle.propTypes = {
	onLeftState: func,
	onRightState: func,
	disabled: bool,
	disabledThumbTintColor: string,
	disabledIconColor: string,
	tintColor: string,
	thumbTintColor: string,
	icon: object,
	defaultPosition: string,
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

IconToggle.defaultProps = {
	onLeftState: () => {},
	onRightState: () => {},
	disabled: false,
	tintColor: colors.sensitiveGreyDefault,
	disabledThumbTintColor: colors.sensitiveGreyDarkest,
	disabledIconColor: colors.sensitiveGreyDarkest,
	icon: {
		name: "placeholder",
		size: 22,
		color: colors.white,
	},
	defaultPosition: "left",
	themeName: defaultThemeName,
};

export default IconToggle;
