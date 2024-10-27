import React, { Component } from "react";
import {
	Animated,
	TouchableWithoutFeedback,
	StyleSheet,
	View,
	Easing,
} from "react-native";
import { ThemeProvider } from "styled-components";
import { bool, func, string, number } from "prop-types";
import theme from "../../config/theme";
import AnimatedHeart from "./AnimatedHeart";
import Icon from "../MerckIcons";
import { colors } from "../../config";

const getTransformationAnimation = (animation, y, x, rotate) => {
	const xAnimation = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [0, x],
	});

	const yAnimation = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [0, y],
	});

	const heightAnimation = animation.interpolate({
		inputRange: [0, 0.3, 0.5, 0.7, 1],
		outputRange: [1, 1, 1, 1, 0.3],
	});

	return {
		transform: [
			{ translateX: xAnimation },
			{ translateY: yAnimation },
			{ rotate },
			{ scaleY: heightAnimation },
		],
	};
};

const styles = StyleSheet.create({
	heart: {
		position: "absolute",
		top: 20,
		left: 22.5,
	},
});

class Favorites extends Component {
	state = {
		liked: false,
		explosion: true,
		scale: new Animated.Value(0),
		bgDisabled: colors.sensitiveGreyDark,
		animations: [
			new Animated.Value(0),
			new Animated.Value(0),
			new Animated.Value(0),
			new Animated.Value(0),
			new Animated.Value(0),
			new Animated.Value(0),
			new Animated.Value(0),
		],
		fadeAnim: new Animated.Value(1),
	};

	triggerLike = () => {
		this.setState({
			liked: !this.state.liked,
			explosion: !this.state.explosion,
		});

		const showAnimations = this.state.animations.map((animation) =>
			Animated.timing(animation, {
				toValue: 1,
				duration: this.props.duration,
				easing: Easing.inOut(Easing.quad),
			})
		);

		const hideAnimations = this.state.animations
			.map((animation) =>
				Animated.timing(animation, {
					toValue: 0,
					duration: 10,
				})
			)
			.reverse();

		const heartAnimations = this.state.explosion
			? Animated.parallel([
					Animated.spring(this.state.scale, {
						toValue: 2,
						friction: 3,
					}),
					Animated.sequence([
						Animated.parallel(showAnimations),
						Animated.timing(this.state.fadeAnim, {
							toValue: 0,
							duration: 50,
							easing: Easing.linear,
						}),
						Animated.parallel(hideAnimations),
					]),
				]).start(() => {
					this.state.scale.setValue(0);
					this.state.fadeAnim.setValue(1);
				})
			: null;

		return heartAnimations;
	};

	renderAnimated = (onPress, activeColor, defaultColor) => {
		const bouncyHeart = this.state.scale.interpolate({
			inputRange: [0, 1, 2],
			outputRange: [1, 0.8, 1],
		});
		const heartButtonStyle = {
			transform: [{ scale: bouncyHeart }],
		};

		return (
			<TouchableWithoutFeedback onPressIn={this.triggerLike} onPress={onPress}>
				<View>
					{!this.state.explosion ? (
						<View>
							<AnimatedHeart
								filled={this.state.liked}
								activeColor={activeColor}
								style={[
									styles.heart,
									getTransformationAnimation(
										this.state.animations[6],
										-12,
										-17,
										"300deg"
									),
									{ opacity: this.state.fadeAnim },
								]}
							/>
							<AnimatedHeart
								filled={this.state.liked}
								activeColor={activeColor}
								style={[
									styles.heart,
									getTransformationAnimation(
										this.state.animations[5],
										5,
										-19,
										"250deg"
									),
									{ opacity: this.state.fadeAnim },
								]}
							/>
							<AnimatedHeart
								filled={this.state.liked}
								activeColor={activeColor}
								style={[
									styles.heart,
									getTransformationAnimation(
										this.state.animations[4],
										17,
										-9,
										"210deg"
									),
									{ opacity: this.state.fadeAnim },
								]}
							/>
							<AnimatedHeart
								filled={this.state.liked}
								activeColor={activeColor}
								style={[
									styles.heart,
									getTransformationAnimation(
										this.state.animations[3],
										17,
										9,
										"150deg"
									),
									{ opacity: this.state.fadeAnim },
								]}
							/>
							<AnimatedHeart
								filled={this.state.liked}
								activeColor={activeColor}
								style={[
									styles.heart,
									getTransformationAnimation(
										this.state.animations[2],
										5,
										19,
										"110deg"
									),
									{ opacity: this.state.fadeAnim },
								]}
							/>
							<AnimatedHeart
								filled={this.state.liked}
								activeColor={activeColor}
								style={[
									styles.heart,
									getTransformationAnimation(
										this.state.animations[1],
										-12,
										17,
										"60deg"
									),
									{ opacity: this.state.fadeAnim },
								]}
							/>
							<AnimatedHeart
								filled={this.state.liked}
								activeColor={activeColor}
								style={[
									styles.heart,
									getTransformationAnimation(
										this.state.animations[0],
										-21,
										0,
										"0deg"
									),
									{ opacity: this.state.fadeAnim },
								]}
							/>
						</View>
					) : null}

					<Animated.View style={heartButtonStyle}>
						<AnimatedHeart
							filled={this.state.liked}
							activeColor={activeColor}
							defaultColor={defaultColor}
							isHeart
							explosion={this.state.explosion}
						/>
					</Animated.View>
				</View>
			</TouchableWithoutFeedback>
		);
	};

	renderPrimary = (onPress, color) => (
		<TouchableWithoutFeedback onPress={onPress}>
			<Icon name="favorite" color={color} />
		</TouchableWithoutFeedback>
	);

	renderActive = (onPress, activeColor) => (
		<TouchableWithoutFeedback onPress={onPress}>
			<Icon name="favorite" color={activeColor} />
		</TouchableWithoutFeedback>
	);

	renderDisabled = () => <Icon name="favorite" color={this.state.bgDisabled} />;

	render() {
		const { onPress, activeColor, color, primary, active, disabled } =
			this.props;
		let favorite;

		if (primary) {
			favorite = this.renderPrimary(onPress, color);
		} else if (active) {
			favorite = this.renderActive(onPress, activeColor);
		} else if (disabled) {
			favorite = this.renderDisabled(color);
		} else {
			favorite = this.renderAnimated(onPress, activeColor, color);
		}

		return <ThemeProvider theme={theme}>{favorite}</ThemeProvider>;
	}
}

Favorites.propTypes = {
	activeColor: string,
	color: string,
	onPress: func,
	primary: bool,
	active: bool,
	disabled: bool,
	duration: number,
};

Favorites.defaultProps = {
	primary: false,
	active: false,
	disabled: false,
	color: colors.sensitiveGreyDarkest,
	activeColor: colors.richRedDefault,
	duration: 525,
	onPress: () => {},
};

export default Favorites;
