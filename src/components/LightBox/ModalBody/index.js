import React, { Component } from "react";
import {
	Dimensions,
	Modal,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Platform,
	Animated,
	StyleSheet,
	Image,
	ScrollView,
	Easing,
} from "react-native";
import { bool, func, string, number, node } from "prop-types";
import { BlurredView } from "../BlurredView/index";
import { colors } from "../../../config";

const styles = StyleSheet.create({
	backdrop: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		opacity: 0,
	},
	content: {
		flex: 1,
		justifyContent: "center",
	},
	absolute: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	blurredImg: {
		opacity: 0,
		height: 0,
	},
});

const { height, width } = Dimensions.get("window");

const getSlideAnimation = (animation, value) => {
	const yAnimation = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [height, value],
	});

	return {
		transform: [{ translateY: yAnimation }],
	};
};

class ModalBody extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deviceWidth: width,
			deviceHeight: height,
			slideAnim: new Animated.Value(0),
			backAnim: new Animated.Value(0),
			viewRef: this.backgroundImage,
		};
		if (this.props.isVisible) {
			this.state = {
				...this.state,
				isVisible: true,
				showContent: true,
			};
		}
	}

	componentDidMount() {
		const { isVisible } = this.state;
		if (isVisible) {
			this.open();
		} else this.close();
	}

	componentWillReceiveProps(nextProps) {
		const { isVisible } = this.state;
		if (!isVisible && nextProps.isVisible) {
			this.setState({ isVisible: true, showContent: true });
		}
	}

	componentDidUpdate(prevProps) {
		const { isVisible } = this.props;
		if (isVisible && !prevProps.isVisible) {
			this.open();
		} else if (!isVisible && prevProps.isVisible) {
			this.close();
		}
	}

	open = () => {
		const { slideAnim, backAnim } = this.state;
		const { duration, backdropOpacity } = this.props;
		Animated.parallel([
			Animated.timing(backAnim, {
				toValue: backdropOpacity,
				duration,
				easing: Easing.linear,
			}),
			Animated.timing(slideAnim, {
				toValue: 1,
				duration,
				easing: Easing.linear,
			}),
		]).start(() => {
			backAnim.setValue(backdropOpacity);
			slideAnim.setValue(1);
		});
	};

	close = () => {
		const { slideAnim, backAnim } = this.state;
		const { duration } = this.props;
		Animated.parallel([
			Animated.timing(slideAnim, {
				toValue: 0,
				duration,
				easing: Easing.linear,
			}),
			Animated.timing(backAnim, {
				toValue: 0,
				duration,
				easing: Easing.linear,
			}),
		]).start(() => {
			this.setState(
				{
					showContent: false,
				},
				() => {
					this.setState({
						isVisible: false,
					});
				}
			);
			slideAnim.setValue(0);
			backAnim.setValue(0);
		});
	};

	render() {
		const {
			backdropColor,
			children,
			onBackButtonPress,
			onBackdropPress,
			needScroll,
			withGraphic,
			withTextField,
		} = this.props;
		const { deviceWidth, deviceHeight } = this.state;

		const computedStyle = [
			{ margin: deviceWidth * 0.05 },
			{ transform: [{ translateY: 0 }] },
			styles.content,
		];

		const scrollStyle = needScroll
			? { marginTop: Platform.OS === "ios" ? 25 : 0 }
			: {
					padding: withGraphic
						? 35
						: deviceWidth < 330 && withTextField
							? deviceWidth * 0.1
							: deviceWidth * 0.3,
				};

		const alignment = { alignItems: "center" };

		const backdrop = {
			backgroundColor: this.state.showContent ? backdropColor : "transparent",
			width: deviceWidth,
			height: deviceHeight,
		};

		const containerView = (
			<Animated.View
				style={[
					getSlideAnimation(this.state.slideAnim, 0),
					scrollStyle,
					alignment,
				]}
				pointerEvents="box-none"
			>
				{children}
			</Animated.View>
		);

		const containerScrollView = (
			<Animated.View
				style={[
					getSlideAnimation(this.state.slideAnim, 0),
					scrollStyle,
					alignment,
				]}
				pointerEvents="box-none"
			>
				<ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
			</Animated.View>
		);

		return Platform.OS === "ios" ? (
			<Modal
				transparent
				animationType="none"
				visible={this.state.isVisible}
				onRequestClose={onBackButtonPress}
			>
				<Image
					source={require("../../../assets/merck-logo.png")}
					style={styles.blurredImg}
					ref={(c) => (this.backgroundImage = c)}
				/>
				<BlurredView
					style={styles.absolute}
					viewRef={this.state.viewRef}
					isVisible={this.state.isVisible}
				/>
				<TouchableWithoutFeedback onPress={onBackdropPress}>
					<Animated.View
						style={[
							styles.backdrop,
							backdrop,
							{ opacity: this.state.backAnim },
						]}
					/>
				</TouchableWithoutFeedback>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : null}
					pointerEvents="box-none"
					style={computedStyle.concat([{ margin: 0 }])}
				>
					{needScroll ? containerScrollView : containerView}
				</KeyboardAvoidingView>
			</Modal>
		) : (
			<Modal
				transparent
				animationType="none"
				visible={this.state.isVisible}
				onRequestClose={onBackButtonPress}
			>
				<TouchableWithoutFeedback onPress={onBackdropPress}>
					<Animated.View
						style={[
							styles.backdrop,
							backdrop,
							{ opacity: this.state.backAnim },
						]}
					/>
				</TouchableWithoutFeedback>
				<KeyboardAvoidingView
					behavior={null}
					pointerEvents="box-none"
					style={computedStyle.concat([{ margin: 0 }])}
				>
					{needScroll ? containerScrollView : containerView}
				</KeyboardAvoidingView>
			</Modal>
		);
	}
}

ModalBody.defaultProps = {
	backdropColor: colors.richBlackDefault,
	backdropOpacity: 0.7,
	duration: 200,
	onBackButtonPress: () => null,
};

ModalBody.propTypes = {
	backdropColor: string,
	backdropOpacity: number,
	isVisible: bool.isRequired,
	onBackButtonPress: func,
	duration: number,
	needScroll: bool,
	onBackdropPress: func,
	children: node,
	withGraphic: bool,
	withTextField: bool,
};

export default ModalBody;
export { ModalBody };
