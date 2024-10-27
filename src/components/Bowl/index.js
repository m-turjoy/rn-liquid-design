import React, { PureComponent } from "react";
import { View, Animated, Easing } from "react-native";
import { number, bool } from "prop-types";
import extractBrush from "react-native-svg/lib/module/lib/extract/extractBrush";
import Svg, { Circle, Path } from "react-native-svg";
// import { Icon } from "../";
import Icon from "../MerckIcons";

import { colors } from "../../config";
import styles from "./styles";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

class Bowl extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			smallBubble: new Animated.Value(-100),
			largeBubble: new Animated.Value(-100),
			fillFrontWave: new Animated.Value(0),
			fillBackWave: new Animated.Value(0),
			moveValue: new Animated.Value(0),
			moveWaveValue: new Animated.Value(0),
			waveHeight: new Animated.Value(30),
			H: 0,
			waveParams: [
				{ A: 10, T: 140 },
				{ A: 15, T: 180 },
			],
		};

		this.animValues = [];
		this.animations = [];
		this.animTimeout = null;

		for (let i = 0; i < this.state.waveParams.length; i++) {
			this.animValues.push(new Animated.Value(0));
		}
	}

	componentDidMount() {
		const { smallBubble, largeBubble, fillFrontWave, fillBackWave } =
			this.state;

		smallBubble.addListener((smallBubble) => {
			this.smallBubble.setNativeProps({
				cy: smallBubble.value.toString(),
			});
		});

		largeBubble.addListener((largeBubble) => {
			this.largeBubble.setNativeProps({
				cy: largeBubble.value.toString(),
			});
		});

		fillFrontWave.addListener(() => {
			const color = fillFrontWave.interpolate({
				inputRange: [0, 0.25, 0.5, 1],
				outputRange: [
					colors.richRedDefault,
					colors.vibrantYellowDefault,
					colors.richPurpleDefault,
					colors.vibrantCyanDefault,
				],
			});

			this.pathFrontWave.setNativeProps({
				fill: extractBrush(color.__getAnimatedValue()),
			});
		});

		fillBackWave.addListener(() => {
			const color = fillBackWave.interpolate({
				inputRange: [0, 0.25, 0.5, 1],
				outputRange: [
					colors.richRedDarker,
					colors.vibrantYellowLightest,
					colors.richPurpleDarker,
					colors.vibrantCyanDarker,
				],
			});

			this.pathBackWave.setNativeProps({
				fill: extractBrush(color.__getAnimatedValue()),
			});
		});
	}

	componentDidUpdate(prevProps, prevState) {
		const { looped, H } = this.props;

		this.setState({ H });

		if (prevState !== this.state) {
			clearTimeout(this.animTimeout);
			this.waveHeightMove();
			this.moveWave();
			this.startAnim();
			if (looped) {
				null;
			} else {
				this.animTimeout = setTimeout(() => {
					this.stopAnim();
				}, 1800);
			}
		}

		this.bubbleXPosition(prevState.H);
		this.animate(prevState.H);
		this.move();
	}

	componentWillUnmount() {
		this.stopAnim();
		this.animValues = null;
		this.animations = null;
	}

	move = () => {
		const { moveValue } = this.state;
		moveValue.setValue(0);
		Animated.timing(moveValue, {
			toValue: 1,
			duration: 2000,
			easing: Easing.linear,
		}).start(() => moveValue.setValue(1));
	};

	moveWave = () => {
		const { moveWaveValue } = this.state;
		moveWaveValue.setValue(0);
		Animated.timing(moveWaveValue, {
			toValue: 1,
			duration: 3000,
			easing: Easing.linear,
		}).start(() => moveWaveValue.setValue(1));
	};

	animate = () => {
		const { fillFrontWave, fillBackWave, H } = this.state;
		Animated.timing(fillFrontWave, {
			toValue: H < 25 ? 0 : H < 40 ? 0.25 : H <= 50 ? 0.5 : 1,
			duration: 2000,
			easing: Easing.linear,
		}).start(({ finished }) => {
			if (finished) {
				this.state.fillFrontWave.setValue(
					H < 25 ? 0 : H < 40 ? 0.25 : H <= 50 ? 0.5 : 1
				);
			}
		});
		Animated.timing(fillBackWave, {
			toValue: H < 25 ? 0 : H < 40 ? 0.25 : H <= 50 ? 0.5 : 1,
			duration: 2000,
			easing: Easing.linear,
		}).start(({ finished }) => {
			if (finished) {
				this.state.fillBackWave.setValue(
					H < 25 ? 0 : H < 40 ? 0.25 : H <= 50 ? 0.5 : 1
				);
			}
		});
	};

	bubbleXPosition = (prevState) => {
		const { H, smallBubble, largeBubble } = this.state;

		return Animated.parallel([
			Animated.timing(smallBubble, {
				toValue: H < 50 ? H - 40 : 120 - H,
				duration: 1500,
				easing: Easing.linear,
			}).start(smallBubble.setValue(H < 50 ? H - 40 : 120 - prevState)),
			Animated.timing(largeBubble, {
				toValue: H < 50 ? H - 30 : H < 60 ? 125 - H : 130 - H,
				duration: 1800,
				easing: Easing.linear,
			}).start(
				largeBubble.setValue(
					H < 50 ? H - 30 : H < 60 ? 125 - prevState : 130 - prevState
				)
			),
		]);
	};

	waveHeightMove = () => {
		const { H, waveHeight } = this.state;

		return Animated.timing(waveHeight, {
			toValue: H + 30,
			duration: 2000,
			easing: Easing.linear,
		}).start();
	};

	startAnim() {
		this.stopAnim();

		for (let i = 0; i < this.animValues.length; i++) {
			const anim = Animated.loop(
				Animated.timing(this.animValues[i], {
					toValue: 1,
					duration: 2000 + i * 1000,
					easing: Easing.linear,
				})
			);
			this.animations.push(anim);
			anim.start();
		}
	}

	stopAnim() {
		for (const _anim of this.animations) {
			_anim.stop();
		}
	}

	render() {
		const { H, waveParams, moveValue, moveWaveValue, waveHeight } = this.state;

		const move = moveValue.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [0, 10, 0],
		});

		const moveWave = moveWaveValue.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [0, -5, 0],
		});

		const waves = [];

		for (let i = 0; i < waveParams.length; i++) {
			const { A, T } = waveParams[i];

			const translateX = this.animValues[i].interpolate({
				inputRange: [0, 1],
				outputRange: [0, -2 * T],
			});

			const wave = (
				<AnimatedSvg
					key={i}
					style={{
						width: 3 * T,
						height: waveHeight,
						position: "absolute",
						left: 0,
						bottom: H === 100 ? 0 : -23,
						transform: [
							{ translateX },
							i === 1
								? { translateY: H < 100 ? moveWave : 1 }
								: { translateY: 0 },
						],
					}}
					preserveAspectRatio="xMinYMin meet"
					viewBox={`0 0 ${2 * T} ${A + H + 10}`}
				>
					<Path
						ref={(ref) =>
							i === 0 ? (this.pathBackWave = ref) : (this.pathFrontWave = ref)
						}
						d={`M 0 0
                   Q ${T / 4} ${-A} ${T / 2} 0
                   T ${T} 0
                   T ${(3 * T) / 2} 0
                   T ${2 * T} 0
                   T ${(5 * T) / 2} 0
                   T ${3 * T} 0
                   V ${H + 100}
                   H 0
                   Z`}
						transform={`translate(0, ${A})`}
					/>
				</AnimatedSvg>
			);
			waves.push(wave);
		}

		return (
			<View>
				<View style={styles.waveBall}>
					{waves}
					<Svg style={styles.iconWrapper}>
						<Circle
							cx="70"
							cy="70"
							r="60"
							fill="transparent"
							stroke={colors.white}
							strokeWidth={24}
						/>
					</Svg>
					<AnimatedSvg
						style={{
							width: 100,
							height: 100,
							position: "absolute",
							left: 0,
							bottom: 0,
							transform: [{ translateY: move }],
						}}
					>
						<AnimatedCircle
							ref={(ref) => (this.largeBubble = ref)}
							cx={80}
							r="5"
							fill="rgba(255,255,255, 0.3)"
						/>
					</AnimatedSvg>
					<AnimatedSvg
						style={{
							width: 100,
							height: 100,
							position: "absolute",
							left: 0,
							bottom: 0,
							transform: [{ translateY: move }],
						}}
					>
						<AnimatedCircle
							ref={(ref) => (this.smallBubble = ref)}
							cx={70}
							r="3"
							fill="rgba(255,255,255, 0.3)"
						/>
					</AnimatedSvg>
				</View>
				<Svg style={styles.iconWrapper}>
					<Circle
						cx="70"
						cy="70"
						r="55"
						fill="transparent"
						stroke={colors.sensitiveGreyDarker}
						strokeWidth={4}
					/>
				</Svg>
				{this.state.H === 0 ? (
					<Animated.View style={styles.icon}>
						<Icon name="attention1" color="red" />
					</Animated.View>
				) : null}
			</View>
		);
	}
}

Bowl.defaultProps = {
	looped: false,
};

Bowl.propTypes = {
	H: number.isRequired,
	looped: bool,
};

export default Bowl;
