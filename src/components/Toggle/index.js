import React, { Component } from "react";
import { Animated, PanResponder, Easing, Platform } from "react-native";
import { bool, func, string, shape, oneOfType } from "prop-types";
import { ThemeProvider } from "styled-components";
import { colors } from "../../config";
import { defaultThemeName, getThemeObject } from "../../config/theme";
import { AnimatedTogglWrapper, AnimatedTogglGrip } from "./styled";

class Toggle extends Component {
	constructor(props) {
		super(props);
		this.offset = 23;

		this.state = {
			alignItems: this.props.value ? "flex-end" : "flex-start",
			value: this.props.value,
			switchAnimation: new Animated.Value(this.props.value ? -1 : 1),
		};

		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderTerminationRequest: (evt, gestureState) => true,
			onPanResponderRelease: this.onPanResponderRelease,
		});
	}

	// UNSAFE_componentWillMount() {
	//   this.panResponder = PanResponder.create({
	//     onStartShouldSetPanResponder: (evt, gestureState) => true,
	//     onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
	//     onMoveShouldSetPanResponder: (evt, gestureState) => true,
	//     onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
	//     onPanResponderTerminationRequest: (evt, gestureState) => true,
	//     onPanResponderRelease: this.onPanResponderRelease,
	//   });
	// }

	onPanResponderRelease = (evt, gestureState) => {
		const { disabled, onValueChange } = this.props;
		if (disabled) return;
		this.toggleSwitch(true, onValueChange);
	};

	toggleSwitch = (result, callback = () => null) => {
		const { value } = this.state;
		this.toggleSwitchToValue(result, !value, callback);
	};

	toggleSwitchToValue = (result, toValue, callback = () => null) => {
		const { switchAnimation } = this.state;
		if (result) {
			this.animateSwitch(toValue, () => {
				this.setState(
					{
						value: toValue,
						alignItems: toValue ? "flex-end" : "flex-start",
					},
					() => {
						callback(toValue);
					}
				);
				switchAnimation.setValue(toValue ? -1 : 1);
			});
		}
	};

	animateSwitch = (value, callback = () => null) => {
		const { switchAnimation } = this.state;

		Animated.timing(
			switchAnimation,
			{
				toValue: value ? this.offset : -this.offset,
				duration: 200,
				easing: Easing.linear,
			},
			{ useNativeDrive: true }
		).start(callback);
	};

	render() {
		const { onTintColor, thumbTintColor, tintColor, disabled, themeName } =
			this.props;
		const { switchAnimation, alignItems, value } = this.state;

		const themeObj = getThemeObject(themeName);

		const primaryColor = onTintColor || themeObj.colors.primary.base;

		const interpolatedBackgroundColor = switchAnimation.interpolate({
			inputRange: value ? [-this.offset, -1] : [1, this.offset],
			outputRange: [tintColor, primaryColor],
			extrapolate: "clamp",
		});

		const interpolatedTranslateX = switchAnimation.interpolate({
			inputRange: value ? [-this.offset, -1] : [1, this.offset],
			outputRange: value ? [-this.offset, -1] : [1, this.offset],
			extrapolate: "clamp",
		});

		return (
			<ThemeProvider theme={themeObj}>
				<AnimatedTogglWrapper
					{...this.panResponder.panHandlers}
					alignItems={alignItems}
					backgroundColor={interpolatedBackgroundColor}
					height={35}
					width={60}
					borderRadius={17.5}
					justifyContent="center"
					overflow="hidden"
					opacity={disabled ? 0.5 : 1}
				>
					<AnimatedTogglGrip
						style={{ transform: [{ translateX: interpolatedTranslateX }] }}
						shadowColor={colors.richBlackDefault}
						shadowRadius={8}
						shadowOpacity={disabled ? 0 : 0.05}
						shadowOffset={{
							width: 3,
							height: 3,
						}}
						height={31}
						width={31}
						elevation={Platform.Version < 26 ? 0 : (disabled && 0) || 35}
						backgroundColor={thumbTintColor}
						borderRadius={15.5}
						margin={2}
						opacity={disabled ? 0.5 : 1}
					/>
				</AnimatedTogglWrapper>
			</ThemeProvider>
		);
	}
}

Toggle.propTypes = {
	disabled: bool,
	onValueChange: func,
	value: bool,
	onTintColor: string,
	thumbTintColor: string,
	tintColor: string,
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
};

Toggle.defaultProps = {
	disabled: false,
	onValueChange: () => {},
	value: false,
	thumbTintColor: colors.white,
	tintColor: colors.sensitiveGreyDefault,
	themeName: defaultThemeName,
};

export default Toggle;
