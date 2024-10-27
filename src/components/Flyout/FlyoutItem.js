import React, { Component } from "react";
import { FlatList, Animated, Easing } from "react-native";
import { string, number, func, object, array, oneOfType } from "prop-types";
import {
	RowWrapper,
	Label,
	TouchableItemWrapper,
	OptionWrapper,
	AnimatedIconWrapper,
} from "./styled";
import Icon from "../MerckIcons";
import { colors, fonts } from "../../config";

class FlyoutItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			opened: false,
			spinValue: new Animated.Value(0),
		};
		this.subOptionsToDisplay = [];
	}

	openSubOptions = () => {
		this.setState({
			opened: true,
		});
		Animated.timing(this.state.spinValue, {
			toValue: 1,
			duration: 150,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start();
	};

	hideSubOptions = () => {
		this.setState({
			opened: false,
		});
		Animated.timing(this.state.spinValue, {
			toValue: 0,
			duration: 150,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start();
	};

	keyExtractor = (item, index) => item;

	renderSubOptionItem = ({ item }) => {
		const {
			subOptionTitleStyle,
			subOptionContainerStyle,
			onSubOptionPress,
			subOptionContainerBackgroundColorActive,
			subOptionContainerBackgroundColor,
			subOptionFontFamily,
			subOptionActiveFontFamily,
			subOptionActiveColor,
			subOptionColor,
			optionPressedWrapper,
			containerWidth,
			subOptionContainerHeight,
			subOptionFontSize,
		} = this.props;

		return (
			<RowWrapper>
				<TouchableItemWrapper
					onPress={() => {
						onSubOptionPress(item);
					}}
				>
					<OptionWrapper
						style={subOptionContainerStyle}
						height={subOptionContainerHeight}
						width={containerWidth}
						flexDirection="row"
						paddingLeft={10}
						paddingRight={16}
						justifyContent="space-between"
						alignItems="center"
						borderBottomWidth={1}
						borderColor={colors.sensitiveGreyDark}
						backgroundColor={
							optionPressedWrapper === item
								? subOptionContainerBackgroundColorActive
								: subOptionContainerBackgroundColor
						}
					>
						<Label
							style={[subOptionTitleStyle, { marginLeft: 10 }]}
							color={
								optionPressedWrapper === item
									? subOptionActiveColor
									: subOptionColor
							}
							fontFamily={
								optionPressedWrapper === item
									? subOptionActiveFontFamily
									: subOptionFontFamily
							}
							fontSize={subOptionFontSize}
							numberOfLines={1}
						>
							{item}
						</Label>
					</OptionWrapper>
				</TouchableItemWrapper>
			</RowWrapper>
		);
	};

	renderSubOptions = () => {
		const { opened } = this.state;
		if (!opened) return null;

		return (
			<FlatList
				data={this.subOptionsToDisplay}
				renderItem={this.renderSubOptionItem}
				keyExtractor={this.keyExtractor}
				style={{ flex: 1 }}
			/>
		);
	};

	render() {
		const {
			title,
			containerWidth,
			containerHeight,
			containerStyle,
			itemTitleStyle,
			itemTitleColor,
			itemTitleFontSize,
			itemTitleFontFamily,
			onItemPress,
			iconColor,
			iconSize,
			subOptions,
			rowBackgroundColor,
		} = this.props;
		if (subOptions[0]) {
			this.subOptionsToDisplay = subOptions[0].map((val) => val.name);
		}
		const rotateIcon = this.state.spinValue.interpolate({
			inputRange: [0, 1],
			outputRange: ["0deg", "-180deg"],
		});

		return (
			<RowWrapper>
				<TouchableItemWrapper
					onPress={() => {
						onItemPress();
						if (subOptions[0]) {
							this.openSubOptions();
							if (this.state.opened) {
								this.hideSubOptions();
							}
						}
					}}
				>
					<OptionWrapper
						width={containerWidth}
						height={containerHeight}
						style={containerStyle}
						flexDirection="row"
						paddingLeft={15}
						paddingRight={16}
						justifyContent="space-between"
						alignItems="center"
						borderBottomWidth={1}
						borderColor={
							this.state.opened
								? colors.sensitiveGreyDark
								: colors.sensitiveGreyDefault
						}
						backgroundColor={
							this.state.opened
								? colors.sensitiveGreyDefault
								: rowBackgroundColor
						}
					>
						<Label
							style={itemTitleStyle}
							color={itemTitleColor}
							fontSize={itemTitleFontSize}
							fontFamily={itemTitleFontFamily}
							numberOfLines={1}
						>
							{title}
						</Label>
						{subOptions[0] ? (
							<AnimatedIconWrapper
								style={{
									transform: [{ rotate: rotateIcon }],
								}}
							>
								<Icon name="arrowDown" color={iconColor} size={iconSize} />
							</AnimatedIconWrapper>
						) : null}
					</OptionWrapper>
				</TouchableItemWrapper>
				{this.renderSubOptions()}
			</RowWrapper>
		);
	}
}

FlyoutItem.defaultProps = {
	title: "Option 1",
	containerWidth: 250,
	containerHeight: 53,
	containerStyle: {},
	itemTitleStyle: {},
	itemTitleColor: colors.richBlackDefault,
	itemTitleFontSize: 16,
	itemTitleFontFamily: fonts.Regular,
	onItemPress: () => {},
	iconColor: colors.vibrantCyanDefault,
	iconSize: 24,
	subOptions: [],
	subOptionTitleStyle: {
		fontSize: 16,
		marginLeft: 10,
	},
	subOptionContainerStyle: {
		height: 50,
		width: 250,
		alignItems: "center",
	},
	onSubOptionPress: () => {},
	subOptionContainerBackgroundColorActive: colors.sensitiveGreyDark,
	subOptionContainerBackgroundColor: colors.sensitiveGreyDefault,
	subOptionFontFamily: fonts.Regular,
	subOptionActiveFontFamily: fonts.Black,
	subOptionActiveColor: colors.vibrantCyanDefault,
	subOptionColor: colors.richBlackDefault,
	rowBackgroundColor: colors.white,
	optionPressedWrapper: "",
	subOptionContainerHeight: 50,
	subOptionFontSize: 16,
};

FlyoutItem.propTypes = {
	title: string,
	containerWidth: number,
	containerHeight: number,
	containerStyle: oneOfType([object, array]),
	itemTitleStyle: oneOfType([object, array]),
	itemTitleColor: string,
	itemTitleFontSize: number,
	itemTitleFontFamily: string,
	onItemPress: func,
	iconColor: string,
	iconSize: number,
	subOptions: array,
	subOptionTitleStyle: oneOfType([object, array]),
	subOptionContainerStyle: oneOfType([object, array]),
	onSubOptionPress: func,
	subOptionContainerBackgroundColorActive: string,
	subOptionContainerBackgroundColor: string,
	subOptionFontFamily: string,
	subOptionActiveFontFamily: string,
	subOptionActiveColor: string,
	subOptionColor: string,
	rowBackgroundColor: string,
	optionPressedWrapper: string,
	subOptionContainerHeight: number,
	subOptionFontSize: number,
};

export default FlyoutItem;
