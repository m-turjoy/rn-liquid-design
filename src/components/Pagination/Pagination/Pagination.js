import React, { Component } from "react";
import { View, FlatList, TouchableWithoutFeedback } from "react-native";
import { bool, number, object, string, func, oneOfType } from "prop-types";
import { InnerWrapper, PaginationContainer, IconWrapper } from "./styled";
import PaginationDot from "./PaginationDot";
import Icon from "../../MerckIcons";
import { colors } from "../../../config";

class Pagination extends Component {
	dots = [];

	constructor(props) {
		super(props);
		this.state = {
			dots: [],
		};
	}

	componentWillMount() {
		this.setState({ activeItem: this.activeDotIndex, dots: this.dots });
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ activeItem: nextProps.activeDotIndex, dots: this.dots });
	}

	componentDidUpdate(prevState) {
		const { activeItem, dots } = this.state;
		const { disabled } = this.props;
		if (
			activeItem > 1 &&
			activeItem < dots.length - 2 &&
			prevState.activeItem !== activeItem &&
			!disabled
		) {
			setTimeout(
				() =>
					this.scroller.scrollToIndex({
						animated: true,
						index: activeItem,
						viewPosition: 0.5,
					}),
				100
			);
		} else if (
			activeItem === 1 &&
			prevState.activeItem !== activeItem &&
			!disabled
		) {
			setTimeout(
				() =>
					this.scroller.scrollToOffset({
						animated: true,
						offset: 0,
					}),
				100
			);
		} else if (
			activeItem === dots.length - 2 &&
			prevState.activeItem !== activeItem &&
			!disabled
		) {
			setTimeout(
				() =>
					this.scroller.scrollToEnd({
						animated: true,
					}),
				100
			);
		}
	}

	get activeDotIndex() {
		const { activeDotIndex } = this.props;

		return activeDotIndex;
	}

	// eslint-disable-next-line no-dupe-class-members
	get dots() {
		const dots = [];

		for (let i = 0; i < this.props.dotsLength; i += 1) {
			dots.push(React.cloneElement(<View key={i} />));
		}

		return dots;
	}

	handleAdd = () => {
		const { activeItem } = this.state;
		const { carouselRef, dotsLength, onPressAdd } = this.props;
		if (onPressAdd) {
			return onPressAdd();
		}
		const add =
			activeItem === dotsLength - 1
				? null
				: this.setState({ activeItem: activeItem + 1 });

		carouselRef &&
			carouselRef._snapToItem(carouselRef._getPositionIndex(activeItem + 1));

		return add;
	};

	handleSubtract = () => {
		const { activeItem } = this.state;
		const { carouselRef, onPressSubtract } = this.props;
		if (onPressSubtract) {
			return onPressSubtract();
		}
		const subtract =
			activeItem === 0 ? null : this.setState({ activeItem: activeItem - 1 });

		carouselRef &&
			carouselRef._snapToItem(carouselRef._getPositionIndex(activeItem - 1));

		return subtract;
	};

	handleStart = () => {
		const { carouselRef, onPressStart } = this.props;
		if (onPressStart) {
			return onPressStart();
		}

		const start = this.setState({ activeItem: 0 });

		carouselRef && carouselRef._snapToItem(carouselRef._getPositionIndex(0));
		setTimeout(
			() =>
				this.scroller.scrollToOffset({
					animated: true,
					offset: 0,
				}),
			100
		);

		return start;
	};

	handleEnd = () => {
		const { dots } = this.state;
		const { carouselRef, onPressEnd } = this.props;
		const end = this.setState({ activeItem: dots.length - 1 });

		if (onPressEnd) {
			return onPressEnd();
		}

		carouselRef &&
			carouselRef._snapToItem(carouselRef._getPositionIndex(dots.length - 1));
		setTimeout(
			() =>
				this.scroller.scrollToEnd({
					animated: true,
				}),
			100
		);

		return end;
	};

	keyExtractor = (item) => item.key;

	renderItem = ({ index }) => {
		const {
			carouselRef,
			fontFamily,
			fontSize,
			fontWeight,
			activeFontWeight,
			lineHeight,
			activeTextColor,
			inactiveTextColor,
			activeBackgroundColor,
			itemWidth,
			itemHeight,
			itemPaddingLeft,
			itemPaddingRight,
			disabled,
			onDotPress,
		} = this.props;

		return (
			<PaginationDot
				active={index === this.state.activeItem}
				key={`pagination-dot-${index}`}
				index={index}
				carouselRef={carouselRef}
				fontFamily={fontFamily}
				fontSize={fontSize}
				fontWeight={fontWeight}
				activeFontWeight={activeFontWeight}
				lineHeight={lineHeight}
				activeTextColor={activeTextColor}
				inactiveTextColor={inactiveTextColor}
				activeBackgroundColor={activeBackgroundColor}
				itemWidth={itemWidth}
				itemHeight={itemHeight}
				itemPaddingLeft={itemPaddingLeft}
				itemPaddingRight={itemPaddingRight}
				disabled={disabled}
				onDotPress={onDotPress}
			/>
		);
	};

	render() {
		const {
			dotsLength,
			paginationWidth,
			paginationHeight,
			iconPaddingLeft,
			iconPaddingRight,
			disabled,
			iconColor,
			iconSize,
		} = this.props;

		if (!dotsLength || dotsLength < 2) {
			return false;
		}

		const isFirst = this.state.activeItem === 0;
		const isLast = this.props.dotsLength - 1 === this.state.activeItem;

		return (
			<PaginationContainer width={paginationWidth} height={paginationHeight}>
				<TouchableWithoutFeedback
					onPress={disabled || isFirst ? null : this.handleStart}
				>
					<IconWrapper
						paddingLeft={iconPaddingLeft}
						paddingRight={iconPaddingRight}
						style={{
							opacity: this.state.activeItem === 0 ? 0.5 : 1,
						}}
					>
						<Icon
							name="doubleArrowLeft"
							size={iconSize}
							color={
								this.state.activeItem === 0 || disabled
									? colors.sensitiveGreyDarker
									: iconColor
							}
						/>
					</IconWrapper>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback
					onPress={disabled || isFirst ? null : this.handleSubtract}
				>
					<IconWrapper
						paddingLeft={iconPaddingLeft}
						paddingRight={iconPaddingRight}
						style={{
							opacity: this.state.activeItem === 0 || disabled ? 0.5 : 1,
						}}
					>
						<Icon
							name="arrowLeft"
							size={iconSize}
							color={
								this.state.activeItem === 0 || disabled
									? colors.sensitiveGreyDarker
									: iconColor
							}
						/>
					</IconWrapper>
				</TouchableWithoutFeedback>
				<InnerWrapper width={this.props.innerWidth}>
					<FlatList
						ref={(c) => {
							this.scroller = c;
						}}
						data={this.state.dots}
						horizontal
						renderItem={this.renderItem}
						extraData={this.state}
						keyExtractor={this.keyExtractor}
						scrollEventThrottle={16}
						showsHorizontalScrollIndicator={false}
						scrollEnabled={!disabled}
					/>
				</InnerWrapper>
				<TouchableWithoutFeedback
					onPress={disabled || isLast ? null : this.handleAdd}
				>
					<IconWrapper
						paddingLeft={iconPaddingLeft}
						paddingRight={iconPaddingRight}
						style={{
							opacity:
								this.props.dotsLength - 1 === this.state.activeItem || disabled
									? 0.5
									: 1,
						}}
					>
						<Icon
							name="arrowRight"
							size={iconSize}
							color={
								this.props.dotsLength - 1 === this.state.activeItem || disabled
									? colors.sensitiveGreyDarker
									: iconColor
							}
						/>
					</IconWrapper>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback
					onPress={disabled || isLast ? null : this.handleEnd}
				>
					<IconWrapper
						paddingLeft={iconPaddingLeft}
						paddingRight={iconPaddingRight}
						style={{
							opacity:
								this.props.dotsLength - 1 === this.state.activeItem || disabled
									? 0.5
									: 1,
						}}
					>
						<Icon
							name="doubleArrowRight"
							size={iconSize}
							color={
								this.props.dotsLength - 1 === this.state.activeItem || disabled
									? colors.sensitiveGreyDarker
									: iconColor
							}
						/>
					</IconWrapper>
				</TouchableWithoutFeedback>
			</PaginationContainer>
		);
	}
}

Pagination.propTypes = {
	activeDotIndex: number,
	dotsLength: number,
	fontFamily: string,
	fontSize: number,
	fontWeight: number,
	activeFontWeight: number,
	lineHeight: number,
	activeTextColor: string,
	inactiveTextColor: string,
	activeBackgroundColor: string,
	itemWidth: number,
	itemHeight: number,
	itemPaddingLeft: number,
	itemPaddingRight: number,
	carouselRef: object,
	innerWidth: number,
	paginationWidth: oneOfType([string, number]),
	paginationHeight: number,
	iconPaddingLeft: number,
	iconPaddingRight: number,
	disabled: bool,
	iconColor: string,
	iconSize: number,
	onPressAdd: func,
	onPressSubtract: func,
	onPressStart: func,
	onPressEnd: func,
};

export default Pagination;
