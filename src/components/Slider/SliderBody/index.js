import React, { PureComponent } from "react";
import {
	Animated,
	Image,
	StyleSheet,
	PanResponder,
	View,
	Easing,
	I18nManager,
	Platform,
} from "react-native";
import { bool, func, number, string } from "prop-types";
import { LabelWrapper } from "./styled";
import thumbImg from "../../../assets/selected.png";
import { colors } from "../../../config";

import {
	ViewPropTypes,
	ImagePropTypes,
} from "deprecated-react-native-prop-types";

const TRACK_SIZE = 2;
const THUMB_SIZE = 30;
const THUMB_TOUCH_SIZE = { width: 40, height: 40 };

const DEFAULT_ANIMATION_CONFIGS = {
	timing: {
		duration: 100,
		easing: Easing.inOut(Easing.ease),
		delay: 0,
	},
};

function Rect(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}
/* eslint func-names: ["error", "never"] */
Rect.prototype.containsPoint = function (x, y) {
	return (
		x >= this.x &&
		y >= this.y &&
		x <= this.x + this.width &&
		y <= this.y + this.height
	);
};

class SliderBody extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			containerSize: { width: 0, height: 0 },
			thumbSize: { width: 0, height: 0 },
			allMeasured: false,
			value: new Animated.Value(this.props.value),
		};
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
			onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
			onPanResponderGrant: this.handlePanResponderGrant,
			onPanResponderMove: this.handlePanResponderMove,
			onPanResponderRelease: this.handlePanResponderEnd,
			onPanResponderTerminationRequest: this.handlePanResponderRequestEnd,
			onPanResponderTerminate: this.handlePanResponderEnd,
		});
	}

	// UNSAFE_componentDidMount() {
	//   this.panResponder = PanResponder.create({
	//     onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
	//     onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
	//     onPanResponderGrant: this.handlePanResponderGrant,
	//     onPanResponderMove: this.handlePanResponderMove,
	//     onPanResponderRelease: this.handlePanResponderEnd,
	//     onPanResponderTerminationRequest: this.handlePanResponderRequestEnd,
	//     onPanResponderTerminate: this.handlePanResponderEnd,
	//   });
	// }

	componentWillReceiveProps(nextProps) {
		const newValue = nextProps.value;

		if (this.props.value !== newValue) {
			this.setCurrentValue(newValue);
		}
	}

	getThumbTouchRect = () => {
		const touchOverflowSize = this.getTouchOverflowSize();

		return new Rect(
			touchOverflowSize.width / 2 +
				this.getThumbLeft(this.getCurrentValue()) +
				(this.state.thumbSize.width - THUMB_TOUCH_SIZE.width) / 2,
			touchOverflowSize.height / 2 +
				(this.state.containerSize.height - THUMB_TOUCH_SIZE.height) / 2,
			THUMB_TOUCH_SIZE.width,
			THUMB_TOUCH_SIZE.height
		);
	};

	getTouchOverflowSize = () => {
		const { allMeasured, thumbSize, containerSize } = this.state;

		const size = {};
		if (allMeasured === true) {
			size.width = Math.max(0, THUMB_TOUCH_SIZE.width - thumbSize.width);
			size.height = Math.max(0, THUMB_TOUCH_SIZE.height - containerSize.height);
		}

		return size;
	};

	setCurrentValueAnimated = (value) => {
		const { animationType } = "timing";
		const animationConfig = Object.assign(
			{},
			DEFAULT_ANIMATION_CONFIGS[animationType],
			{
				toValue: value,
			}
		);

		Animated[animationType](this.state.value, animationConfig).start();
	};

	setCurrentValue = (value) => {
		this.state.value.setValue(value);
	};

	getThumbLeft = (value) => {
		const nonRtlRatio = this.getRatio(value);
		const ratio = I18nManager.isRTL ? 1 - nonRtlRatio : nonRtlRatio;

		return (
			ratio * (this.state.containerSize.width - this.state.thumbSize.width)
		);
	};

	getRatio = (value) =>
		(value - this.props.minimumValue) /
		(this.props.maximumValue - this.props.minimumValue);

	getValue = (gestureState) => {
		const length = this.state.containerSize.width - this.state.thumbSize.width;
		const thumbLeft = this.previousLeft + gestureState.dx;

		const nonRtlRatio = thumbLeft / length;
		const ratio = I18nManager.isRTL ? 1 - nonRtlRatio : nonRtlRatio;

		if (this.props.step) {
			return Math.max(
				this.props.minimumValue,
				Math.min(
					this.props.maximumValue,
					this.props.minimumValue +
						Math.round(
							(ratio * (this.props.maximumValue - this.props.minimumValue)) /
								this.props.step
						) *
							this.props.step
				)
			);
		}

		return Math.max(
			this.props.minimumValue,
			Math.min(
				this.props.maximumValue,
				ratio * (this.props.maximumValue - this.props.minimumValue) +
					this.props.minimumValue
			)
		);
	};
	/* eslint no-underscore-dangle: ["error", { "allow": ["__getValue"] }] */
	getCurrentValue = () => this.state.value.__getValue();

	fireChangeEvent = (event) => {
		if (this.props[event]) {
			this.props[event](this.getCurrentValue());
		}
	};

	handleStartShouldSetPanResponder = (e) => this.thumbHitTest(e);

	handleMoveShouldSetPanResponder = () => false;

	handlePanResponderGrant = () => {
		this.previousLeft = this.getThumbLeft(this.getCurrentValue());
		this.fireChangeEvent("onSlidingStart");
	};

	handlePanResponderMove = (e, gestureState) => {
		if (this.props.disabled) {
			return;
		}

		this.setCurrentValue(this.getValue(gestureState));
		this.fireChangeEvent("onValueChange");
	};

	handlePanResponderRequestEnd = () => false;

	handlePanResponderEnd = (e, gestureState) => {
		if (this.props.disabled) {
			return;
		}

		this.setCurrentValue(this.getValue(gestureState));
		this.fireChangeEvent("onSlidingComplete");
	};

	measureContainer = (x) => {
		this.handleMeasure("containerSize", x);
	};

	measureTrack = (x) => {
		this.handleMeasure("trackSize", x);
	};

	measureThumb = (x) => {
		this.handleMeasure("thumbSize", x);
	};

	handleMeasure = (name, x) => {
		const { width, height } = x.nativeEvent.layout;
		const size = { width, height };

		const currentSize = this[`${name}`];
		if (
			currentSize &&
			width === currentSize.width &&
			height === currentSize.height
		) {
			return;
		}
		this[`${name}`] = size;

		if (this.containerSize && this.trackSize && this.thumbSize) {
			this.setState({
				containerSize: this.containerSize,
				thumbSize: this.thumbSize,
				allMeasured: true,
			});
		}
	};

	thumbHitTest = (e) => {
		const thumbTouchRect = this.getThumbTouchRect();

		return thumbTouchRect.containsPoint(
			e.nativeEvent.locationX,
			e.nativeEvent.locationY
		);
	};

	render() {
		const {
			minimumValue,
			maximumValue,
			minimumTrackTintColor,
			maximumTrackTintColor,
			thumbTintColor,
			trackStyle,
			thumbStyle,
			distance,
			labelFontFamily,
			labelFontWeight,
			labelFontSize,
			labelLineHeight,
			labelColor,
			width,
			disabled,
			...other
		} = this.props;
		const { value, containerSize, thumbSize } = this.state;
		const thumbLeft = value.interpolate({
			inputRange: [minimumValue, maximumValue],
			outputRange: I18nManager.isRTL
				? [0, -(containerSize.width - thumbSize.width)]
				: [0, containerSize.width - thumbSize.width],
		});
		const minimumTrackWidth = value.interpolate({
			inputRange: [minimumValue, maximumValue],
			outputRange: [0, containerSize.width - thumbSize.width],
		});
		const minimumTrackStyle = {
			position: "absolute",
			width: Animated.add(minimumTrackWidth, thumbSize.width / 2),
			backgroundColor: minimumTrackTintColor,
		};

		const defaultStyles = StyleSheet.create({
			container: {
				...(Platform.OS === "android"
					? {
							height: 80,
						}
					: {
							height: 40,
						}),
				justifyContent: "center",
				marginLeft: "1%",
			},
			track: {
				width: "99%",
				height: TRACK_SIZE,
				borderRadius: 20,
			},
			thumb: {
				width: THUMB_SIZE,
				height: THUMB_SIZE,
				position: "absolute",
				borderRadius: THUMB_SIZE / 2,
			},
			thumbStyle: {
				borderWidth: 1,
				borderColor: colors.sensitiveGreyDarker,
			},
			thumbImgContainer: {
				width: THUMB_SIZE,
				height: THUMB_SIZE,
				position: "absolute",
				borderRadius: THUMB_SIZE / 2,
			},
			touchArea: {
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
			},
			labelContainer: {
				...(Platform.OS === "android"
					? {
							bottom: 60,
							left: -2,
						}
					: {
							bottom: 40,
						}),
				left: -2,
				position: "absolute",
				width: THUMB_SIZE + 2,
				alignItems: "center",
			},
			thumbImg: {
				top: -2,
				left: -3.5,
			},
			thumbImgDisabled: {
				...(Platform.OS === "android"
					? {
							width: THUMB_SIZE + 8,
							height: THUMB_SIZE + 8,
							top: 7,
							left: -2.6,
							resizeMode: "contain",
						}
					: {
							top: -2,
							left: -3.5,
						}),
				opacity: 0.5,
			},
			disabledHelper: {
				...(Platform.OS === "android"
					? {
							top: 25,
						}
					: {
							top: 5,
						}),
				position: "absolute",
				width: THUMB_SIZE,
				height: THUMB_SIZE,
				backgroundColor: colors.white,
				borderRadius: THUMB_SIZE / 2,
			},
		});

		return (
			<View
				{...other}
				style={[{ width }, defaultStyles.container]}
				onLayout={this.measureContainer}
				clipChildren
			>
				<View
					style={[
						{ backgroundColor: maximumTrackTintColor },
						defaultStyles.track,
						trackStyle,
					]}
					renderToHardwareTextureAndroid
					onLayout={this.measureTrack}
					clipChildren
				/>
				<Animated.View
					renderToHardwareTextureAndroid
					style={[defaultStyles.track, trackStyle, minimumTrackStyle]}
				/>
				{disabled ? <View style={defaultStyles.disabledHelper} /> : null}
				<Animated.View
					onLayout={this.measureThumb}
					renderToHardwareTextureAndroid
					style={[
						// eslint-disable-next-line react-native/no-inline-styles
						{
							backgroundColor:
								Platform.OS === "android" && !thumbTintColor
									? colors.white
									: thumbTintColor,
							opacity: disabled ? 0.5 : 1,
						},
						thumbTintColor
							? defaultStyles.thumb
							: defaultStyles.thumbImgContainer,
						Platform.OS === "android" && !thumbTintColor
							? defaultStyles.thumbStyle
							: thumbStyle,
						{
							transform: [{ translateX: thumbLeft }, { translateY: 0 }],
						},
					]}
				>
					{Platform.OS === "ios" && !thumbTintColor ? (
						<Image
							source={thumbImg}
							style={
								disabled
									? defaultStyles.thumbImgDisabled
									: defaultStyles.thumbImg
							}
						/>
					) : null}
				</Animated.View>
				{disabled || distance === minimumValue ? null : (
					<Animated.View
						style={[
							defaultStyles.labelContainer,
							{
								transform: [{ translateX: thumbLeft }, { translateY: 0 }],
							},
						]}
						onLayout={this.measureThumb}
						renderToHardwareTextureAndroid
					>
						<LabelWrapper
							fontFamily={labelFontFamily}
							fontWeight={labelFontWeight}
							fontSize={labelFontSize}
							lineHeight={labelLineHeight}
							color={labelColor}
						>
							{distance}
						</LabelWrapper>
					</Animated.View>
				)}
				<View
					renderToHardwareTextureAndroid
					style={[defaultStyles.touchArea]}
					{...this.panResponder.panHandlers}
				/>
			</View>
		);
	}
}

SliderBody.propTypes = {
	value: number,
	disabled: bool,
	minimumValue: number,
	maximumValue: number,
	step: number,
	minimumTrackTintColor: string,
	maximumTrackTintColor: string,
	thumbTintColor: string,
	onValueChange: func,
	onSlidingStart: func,
	onSlidingComplete: func,
	distance: number,
	labelFontFamily: string,
	labelFontWeight: number,
	labelLineHeight: number,
	labelFontSize: number,
	labelColor: string,
	width: number,
	trackStyle: ViewPropTypes.style,
	thumbStyle: ViewPropTypes.style,
	thumbImage: ImagePropTypes.source,
};

SliderBody.defaultProps = {
	value: 0,
};

export default SliderBody;
