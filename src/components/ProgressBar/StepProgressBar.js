import React from "react";
import { View, Animated, Platform } from "react-native";
import { bool, number, object, array } from "prop-types";
import styles from "./styles";
import Icon from "../MerckIcons";
import { colors } from "../../config";
// import { Paragraph } from '..';
import Paragraph from "../Paragraph";
import { ProgressBarWrapper, StepContainer } from "./styled";

const STEP_STATUS = {
	CURRENT: "current",
	FINISHED: "finished",
	UNFINISHED: "unfinished",
	DISABLED: "disabled",
};

// TODO: Rethink width of a whole step bar and stepProgressBarWidth props (onLayout width  ? )
class StepProgressBar extends React.Component {
	static propTypes = {
		inactive: bool,
		currentPosition: number,
		customStyles: object,
		stepCount: number.isRequired,
		labels: array,
		disabledStep: number,
		stepProgressBarWidth: number,
		animationDisabled: bool,
	};
	static defaultProps = {
		inactive: false,
		animationDisabled: false,
	};

	constructor(props) {
		super(props);

		const { stepCount } = this.props;
		this.state = {
			width: 0,
			height: 0,
			progressBarSize: 0,
			stepCount,
		};

		this.progressAnim = new Animated.Value(0);
	}

	componentWillReceiveProps(nextProps) {
		const { currentPosition } = this.props;
		if (nextProps.currentPosition !== currentPosition) {
			this.onCurrentPositionChanged(nextProps.currentPosition);
		}
	}

	onCurrentPositionChanged = (position) => {
		const { disabledStep, animationDisabled } = this.props;
		const { progressBarSize, stepCount } = this.state;
		if (position > stepCount - 1) {
			position = stepCount - 1;
		}
		const animateToPosition = (progressBarSize / (stepCount - 1)) * position;
		const animateToPositionWithDisabled =
			position >= disabledStep
				? (progressBarSize / (stepCount - 1)) * (position - 1)
				: animateToPosition;

		if (!animationDisabled) {
			Animated.timing(this.progressAnim, {
				toValue: animateToPositionWithDisabled,
				duration: 200,
			}).start(() => this.progressAnim.setValue(animateToPositionWithDisabled));
		}
	};

	getStepStatus = (stepPosition) => {
		const { currentPosition, inactive } = this.props;

		if (stepPosition === currentPosition) {
			return STEP_STATUS.CURRENT;
		} else if (stepPosition < currentPosition) {
			return STEP_STATUS.FINISHED;
		} else if (inactive) {
			return STEP_STATUS.DISABLED;
		}

		return STEP_STATUS.UNFINISHED;
	};

	renderProgressBarBackground = () => {
		const { customStyles, currentPosition, inactive } = this.props;
		const { height, width, stepCount } = this.state;

		const progressBarBackgroundStyle = {
			backgroundColor:
				currentPosition <= 0
					? customStyles.unfinishedStepProgressBarColor
					: inactive
						? customStyles.disabledStepProgressBarColor
						: customStyles.unfinishedStepProgressBarColor,
			position: "absolute",
			top: (height - customStyles.separatorStrokeWidth) / 2,
			left: width / (2 * stepCount),
			right: width / (2 * stepCount),
			height: customStyles.separatorStrokeWidth,
		};

		return (
			<View
				onLayout={(event) => {
					this.setState(
						{
							progressBarSize: event.nativeEvent.layout.width,
						},
						() => {
							this.onCurrentPositionChanged(currentPosition);
						}
					);
				}}
				style={progressBarBackgroundStyle}
			/>
		);
	};

	renderProgressBar = () => {
		const { stepCount, width, height, progressBarSize } = this.state;
		const { customStyles, inactive, currentPosition, animationDisabled } =
			this.props;

		const widthWithAnimation = animationDisabled
			? progressBarSize
			: this.progressAnim;
		const progressBarStyle = {
			backgroundColor:
				currentPosition <= 0
					? customStyles.unfinishedStepProgressBarColor
					: inactive
						? customStyles.disabledStepProgressBarColor
						: customStyles.primaryStepProgressBarColor,
			position: "absolute",
			top: (height - customStyles.separatorStrokeWidth) / 2,
			left: width / (2 * stepCount),
			right: width / (2 * stepCount),
			height: customStyles.separatorStrokeWidth,
			width: inactive ? 25 : widthWithAnimation,
		};

		return <Animated.View style={progressBarStyle} />;
	};

	renderStepIndicator = () => {
		const steps = [];
		const { stepCount } = this.state;

		for (let position = 0; position < stepCount; position++) {
			steps.push(
				<StepContainer
					key={position}
					flex={1}
					flexDirection="row"
					alignItems="center"
					justifyContent="center"
				>
					{this.renderStep(position)}
				</StepContainer>
			);
		}

		return (
			<StepContainer
				flexDirection="row"
				alignItems="center"
				justifyContent="space-around"
				backgroundColor={colors.transparent}
				onLayout={(event) =>
					this.setState({
						width: event.nativeEvent.layout.width,
						height: event.nativeEvent.layout.height,
					})
				}
			>
				{steps}
			</StepContainer>
		);
	};

	renderStepLabels = () => {
		const { labels, currentPosition, customStyles, inactive, disabledStep } =
			this.props;

		const stepLabelContainers = labels.map((label, index) => {
			let selectedStepLabelStyle;
			if (index === currentPosition) {
				selectedStepLabelStyle = {
					color: inactive
						? customStyles.disabledStepProgressBarColor
						: customStyles.currentStepLabelColor,
				};
			} else if (index < currentPosition) {
				selectedStepLabelStyle = {
					color: inactive
						? customStyles.disabledStepProgressBarColor
						: customStyles.finishedStepLabelColor,
				};
			} else if (inactive) {
				selectedStepLabelStyle = {
					color: customStyles.unfinishedStepLabelColor,
					opacity: 0.3,
				};
			} else {
				selectedStepLabelStyle = {
					color: customStyles.unfinishedStepLabelColor,
					opacity: 0.4,
				};
			}
			const disabledStepLabelStyle = {
				color: customStyles.unfinishedStepLabelColor,
				opacity: 0.3,
			};

			return (
				<StepContainer
					flex={1}
					alignItems="center"
					justifyContent="center"
					key={`${index + 1}${label}`}
				>
					<Paragraph
						type="XLabel"
						fontSize={customStyles.labelSize}
						textStyle={[
							index === disabledStep
								? disabledStepLabelStyle
								: selectedStepLabelStyle,
							styles.stepLabel,
						]}
						text={label}
					/>
				</StepContainer>
			);
		});

		return (
			<StepContainer
				alignItems="center"
				justifyContent="space-around"
				flexDirection="row"
			>
				{stepLabelContainers}
			</StepContainer>
		);
	};

	renderStep = (position) => {
		const { customStyles, inactive, disabledStep } = this.props;

		let stepStyle;
		// eslint-disable-next-line
		const separatorStyle = {
			height: customStyles.separatorStrokeWidth,
		};
		let name = "";
		let color = "";

		switch (this.getStepStatus(position)) {
			case STEP_STATUS.CURRENT: {
				stepStyle = {
					backgroundColor: customStyles.stepIndicatorCurrentBackgroundColor,
					borderWidth: Platform.OS === "android" ? 0 : customStyles.borderWidth,
					borderColor: inactive
						? customStyles.disabledStepProgressBarColor
						: customStyles.primaryStepProgressBarColor,
					height:
						Platform.OS === "android"
							? customStyles.stepIndicatorSize + 1
							: customStyles.stepIndicatorSize,
					width:
						Platform.OS === "android"
							? customStyles.stepIndicatorSize
							: customStyles.stepIndicatorSize - 0.5,
					borderRadius: customStyles.stepIndicatorSize / 2,
				};
				name = "progressBarIndicator";
				color = inactive
					? customStyles.disabledStepProgressBarColor
					: customStyles.primaryStepProgressBarColor;
				break;
			}
			case STEP_STATUS.FINISHED: {
				stepStyle = {
					backgroundColor: customStyles.stepIndicatorFinishedBackgroundColor,
					borderWidth: Platform.OS === "android" ? 0 : customStyles.borderWidth,
					borderColor: inactive
						? customStyles.disabledStepProgressBarColor
						: customStyles.primaryStepProgressBarColor,
					height:
						Platform.OS === "android"
							? customStyles.stepIndicatorSize + 1
							: customStyles.stepIndicatorSize,
					width:
						Platform.OS === "android"
							? customStyles.stepIndicatorSize
							: customStyles.stepIndicatorSize - 0.5,
					borderRadius: customStyles.stepIndicatorSize / 2,
				};
				name = "progressBarCheck";
				color = inactive
					? customStyles.disabledStepProgressBarColor
					: customStyles.primaryStepProgressBarColor;
				break;
			}
			case STEP_STATUS.UNFINISHED: {
				stepStyle = {
					backgroundColor: customStyles.stepIndicatorUnFinishedBackgroundColor,
					borderWidth: Platform.OS === "android" ? 0 : customStyles.borderWidth,
					borderColor: inactive
						? customStyles.disabledStepProgressBarColor
						: customStyles.unfinishedStepProgressBarColor,
					height:
						Platform.OS === "android"
							? customStyles.stepIndicatorSize + 1
							: customStyles.stepIndicatorSize,
					width:
						Platform.OS === "android"
							? customStyles.stepIndicatorSize
							: customStyles.stepIndicatorSize - 0.5,
					borderRadius: customStyles.stepIndicatorSize / 2,
				};
				name = "progressBarComing";
				color = inactive
					? customStyles.disabledStepProgressBarColor
					: customStyles.unfinishedStepProgressBarColor;
				break;
			}
			case STEP_STATUS.DISABLED: {
				stepStyle = {
					backgroundColor: customStyles.stepIndicatorUnFinishedBackgroundColor,
					borderWidth: Platform.OS === "android" ? 0 : customStyles.borderWidth,
					borderColor: customStyles.disabledStepProgressBarColor,
					height:
						Platform.OS === "android"
							? customStyles.stepIndicatorSize + 1
							: customStyles.stepIndicatorSize,
					width:
						Platform.OS === "android"
							? customStyles.stepIndicatorSize
							: customStyles.stepIndicatorSize - 0.5,
					borderRadius: customStyles.stepIndicatorSize / 2,
				};
				name = "progressBarComing";
				color = customStyles.disabledStepProgressBarColor;
				break;
			}
			default:
		}

		const disabledStyle = {
			backgroundColor: customStyles.stepIndicatorUnFinishedBackgroundColor,
			borderWidth: customStyles.borderWidth,
			borderColor: customStyles.disabledStepProgressBarColor,
			height:
				Platform.OS === "android"
					? customStyles.stepIndicatorSize + 1
					: customStyles.stepIndicatorSize,
			width:
				Platform.OS === "android"
					? customStyles.stepIndicatorSize
					: customStyles.stepIndicatorSize - 1,
			borderRadius: customStyles.stepIndicatorSize / 2,
		};
		const iconConfig = {
			name: position === disabledStep ? "progressBarComing" : name,
			color:
				position === disabledStep
					? customStyles.disabledStepProgressBarColor
					: color,
			size: customStyles.stepIndicatorSize,
			style: {
				textAlign: "center",
				lineHeight: customStyles.stepIndicatorSize,
			},
		};

		return (
			<View
				key="step-indicator"
				style={[
					styles.step,
					position === disabledStep ? disabledStyle : stepStyle,
				]}
			>
				<Icon {...iconConfig} />
			</View>
		);
	};

	render() {
		const { labels, stepProgressBarWidth } = this.props;
		const { width } = this.state;

		return (
			<ProgressBarWrapper
				flexDirection="column"
				backgroundColor={colors.transparent}
				width={stepProgressBarWidth}
			>
				{width !== 0 && this.renderProgressBarBackground()}
				{width !== 0 && this.renderProgressBar()}
				{this.renderStepIndicator()}
				{!!labels && this.renderStepLabels()}
			</ProgressBarWrapper>
		);
	}
}
export default StepProgressBar;
