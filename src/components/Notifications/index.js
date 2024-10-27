import React, { Component } from "react";
import { Dimensions, Animated, Easing, Platform } from "react-native";
import { ThemeProvider } from "styled-components";
// import uuidv1 from "uuid/v1";
import { v1 as uuidv1 } from "uuid";
import {
	string,
	bool,
	func,
	object,
	oneOfType,
	array,
	number,
	PropTypes,
} from "prop-types";
import Icon from "../MerckIcons";
import {
	IconWrapper,
	IconTouchable,
	Label,
	IconLabelWrapper,
	LabelWrapper,
	Container,
} from "./styled";
import { colors, fonts } from "../../config";
import Toast from "./Toast/Toast";
import { defaultThemeName, getThemeObject } from "../../config/theme";
import styles from "./styles";

const { width, height } = Dimensions.get("window");

const IPHONE_X =
	Platform.OS === "ios" &&
	!Platform.isPad &&
	!Platform.isTVOS &&
	(height === 812 || width === 812);

const getTransformationAnimation = (animation, y) => {
	const yAnimation = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [-20, IPHONE_X ? y + 12 : y],
	});

	return {
		transform: [{ translateY: yAnimation }],
	};
};

class Notification extends Component {
	constructor(props) {
		super(props);
		let themeObj = getThemeObject(this.props.themeName);
		this.state = {
			elements: [],
			opacity: new Animated.Value(0),
			top: new Animated.Value(0),
			theme: themeObj,
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState !== this.state) {
			this.state.elements.forEach((item) => this.show(item));
		}
	}

	adjustBackgrounColor = (item) => {
		let themeColor = this.state.theme.colors.primary.base;
		return (
			(item === "simple" && themeColor) ||
			(item === "reminder" && colors.richBlueDefault) ||
			(item === "error" && colors.richRedDefault) ||
			(item === "info" && colors.vibrantYellowDefault)
		);
	};

	showNotification = (type, notificationLabel) => {
		const { onShow } = this.props;
		const { elements, opacity, top } = this.state;
		const item = {
			type,
			notificationLabel,
			key: uuidv1(),
			id: elements.length,
		};
		// eslint-disable-next-line
		const check = elements.filter(
			(el) => el.type === type && el.notificationLabel === notificationLabel
		);
		if (check.length === 0) {
			this.setState(
				{
					elements: [...elements, item],
					opacity: [...opacity, new Animated.Value(0)],
					top: [...top, new Animated.Value(0)],
				},
				() => {
					onShow();
				}
			);
		}
	};

	handleRemovingElement = (index) => {
		const { onDismiss } = this.props;
		const { elements, top } = this.state;
		const itemId = index + 1;
		const elementsCopy = [...elements];
		const elemCp = elementsCopy.slice();
		elemCp.splice(index, 1);
		const filteredElements = elemCp.filter((item) => {
			if (item.id >= itemId) {
				item.id -= 1;
			}

			return item;
		});
		this.setState({ elements: filteredElements }, () => {
			onDismiss();
		});
		top[filteredElements.length].setValue(0);
	};

	show = (item) => {
		item.type !== "error"
			? (this.hideTimeout = setTimeout(() => {
					this.hide(item);
				}, this.props.notificationRemoveTimeout))
			: null;
		Animated.parallel([
			Animated.timing(this.state.opacity[item.id], {
				toValue: 1,
				duration: 200,
				easing: Easing.out(Easing.ease),
			}).start(),
			Animated.timing(this.state.top[item.id], {
				toValue: 1,
				duration: 150,
				easing: Easing.out(Easing.ease),
			}).start(() => {
				this.state.opacity[item.id].setValue(1);
			}),
		]);
	};

	hide = (item) => {
		if (!this.state.elements.filter((e) => e.key === item.key).length)
			return null;

		Animated.parallel([
			Animated.timing(this.state.opacity[item.id], {
				toValue: 0,
				duration: 200,
				easing: Easing.in(Easing.ease),
			}).start(),
			Animated.timing(this.state.top[item.id], {
				toValue: 0,
				duration: 150,
				easing: Easing.linear,
			}).start(({ finished }) => {
				if (finished) {
					this.handleRemovingElement(item.id);
					this.state.top[item.id].setValue(1);
					this.state.top[this.state.elements.length].setValue(0);
				}
			}),
		]);
	};

	renderToast = (item) => {
		const {
			notificationHeight,
			notificationWidth,
			labelFontFamily,
			labelFontSize,
			labelColor,
			notificationLabel,
			closingIconSize,
			closingIconColor,
			notificationIconSize,
			notificationIconColor,
			closingInfoIconColor,
			notificationInfoIconColor,
			labelInfoColor,
			labelStyle,
		} = this.props;

		const wrapperStyle = {
			height: notificationHeight,
			width: notificationWidth,
			backgroundColor: this.adjustBackgrounColor(item.type),
			opacity: this.state.opacity[item.id],
		};

		return (
			<Animated.View
				key={item.key}
				style={[
					styles.containerStyle,
					styles.wrapperStyle,
					wrapperStyle,
					getTransformationAnimation(this.state.top[item.id], 20),
				]}
				pointerEvents="auto"
				ref={(item) => (this._root = item)}
			>
				{item.type === "simple" ? (
					<LabelWrapper flex={12}>
						<Label
							fontFamily={labelFontFamily}
							fontSize={labelFontSize}
							color={labelColor}
							style={labelStyle}
							lineHeight={labelFontSize * 1.25}
							numberOfLines={1}
						>
							{notificationLabel}
						</Label>
					</LabelWrapper>
				) : (
					<IconLabelWrapper flexDirection="row" flex={5}>
						<IconWrapper marginRight={10}>
							<Icon
								name={
									(item.type === "reminder" && "bell") ||
									(item.type === "error" && "attention1") ||
									(item.type === "info" && "information1")
								}
								size={notificationIconSize}
								color={
									item.type === "info"
										? notificationInfoIconColor
										: notificationIconColor
								}
							/>
						</IconWrapper>
						<LabelWrapper>
							<Label
								fontFamily={labelFontFamily}
								fontSize={labelFontSize}
								color={item.type === "info" ? labelInfoColor : labelColor}
								style={labelStyle}
								lineHeight={labelFontSize * 1.25}
								numberOfLines={1}
							>
								{item.notificationLabel}
							</Label>
						</LabelWrapper>
					</IconLabelWrapper>
				)}
				<IconTouchable onPress={() => this.hide(item)}>
					<IconWrapper flex={1} alignItems="flex-end" justifyContent="center">
						<Icon
							name="closingX"
							size={closingIconSize}
							color={
								item.type === "info" ? closingInfoIconColor : closingIconColor
							}
						/>
					</IconWrapper>
				</IconTouchable>
			</Animated.View>
		);
	};

	render() {
		return (
			<ThemeProvider theme={this.state.theme}>
				<Container {...this.props}>
					<Toast>
						{this.state.elements.map((item, index) =>
							this.renderToast(item, index)
						)}
					</Toast>
				</Container>
			</ThemeProvider>
		);
	}
}

Notification.propTypes = {
	notificationHeight: number,
	notificationWidth: number,
	minWidth: number,
	type: string,
	containerStyle: oneOfType([object, array]),
	labelFontFamily: string,
	labelFontSize: number,
	labelColor: string,
	notificationLabel: string,
	closingIconSize: number,
	closingIconColor: string,
	notificationIconSize: number,
	notificationIconColor: string,
	closingInfoIconColor: string,
	notificationInfoIconColor: string,
	labelInfoColor: string,
	labelStyle: oneOfType([object, array]),
	onShow: func,
	onDismiss: func,
	notificationRemoveTimeout: number,
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

Notification.defaultProps = {
	notificationHeight: 40,
	notificationWidth: width - 20,
	type: "simple",
	containerStyle: {},
	labelFontFamily: fonts.Black,
	labelFontSize: 14,
	labelColor: colors.white,
	notificationLabel: "Notification text",
	closingIconSize: 20,
	closingIconColor: colors.white,
	notificationIconSize: 20,
	notificationIconColor: colors.white,
	closingInfoIconColor: colors.richBlackDefault,
	notificationInfoIconColor: colors.richBlackDefault,
	labelInfoColor: colors.richBlackDefault,
	labelStyle: {},
	notificationRemoveTimeout: 2500,
	onShow: () => {},
	onDismiss: () => {},
	themeName: defaultThemeName,
};

export default Notification;
