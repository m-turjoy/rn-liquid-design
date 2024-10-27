import React, { Component } from "react";
import { Animated, Easing, Modal } from "react-native";
import {
	object,
	number,
	oneOfType,
	array,
	string,
	bool,
	func,
} from "prop-types";
import { ThemeProvider } from "styled-components";
import { colors, fonts, theme } from "../../config";
import { defaultThemeName } from "../../config/theme";
import Icon from "../MerckIcons";
import List from "../List";
import {
	PaginationWrapper,
	DropdownPerPageWrapper,
	ItemsPagesWrapper,
	PagesDropdownWrapper,
	ItemsWrapper,
	Items,
	ItemsDropdownWrapper,
	ItemsPerPage,
	IconWrapper,
	ItemsRange,
	PagesRange,
	IconPageWrapper,
	Page,
	AnimatedIconWrapper,
	DropdownTouchable,
	TouchableModalWrapper,
	ModalWrapper,
	Separator,
	Container,
	IconTouchable,
} from "./styled";
import RowItem from "./RowItem";

class TablePagination extends Component {
	state = {
		itemsPerPage: this.props.actualItemsPerPage,
		itemsAmount: this.props.itemsAmount,
		actualPageVisible: this.props.currentPage,
		spinItemsValue: new Animated.Value(0),
		spinPagesValue: new Animated.Value(0),
		dropdownItemsOpened: false,
		dropdownPagesOpened: false,
		dropdownItemPressed: 0,
		dropdownPagesPressed: 0,
	};
	// eslint-disable-next-line
	itemsPosition = {};
	itemsFrame = {};

	pagesPosition = {};
	pagesFrame = {};

	componentDidUpdate() {
		const { onChange } = this.props;
		const { itemsAmount, itemsPerPage, actualPageVisible } = this.state;
		const pageCount = Math.ceil(itemsAmount / itemsPerPage);
		if (actualPageVisible > pageCount) {
			onChange(pageCount);

			this.setState({
				actualPageVisible: pageCount,
			});
		}
	}

	updateItemsPosition = (callback) => {
		if (this.itemsPosition && this.itemsPosition.root) {
			this.itemsPosition.root.measure((fx, fy, width, height, px, py) => {
				this.itemsFrame = {
					x: px,
					y: py,
					w: width,
					h: height,
				};

				return callback && callback();
			});
		}
	};

	updatePagesPosition = (callback) => {
		if (this.pagesPosition && this.pagesPosition.root) {
			this.pagesPosition.root.measure((fx, fy, width, height, px, py) => {
				this.pagesFrame = {
					x: px,
					y: py,
					w: width,
					h: height,
				};

				return callback && callback();
			});
		}
	};

	spinItemsArrowUp = () => {
		this.updateItemsPosition(() => {
			Animated.timing(this.state.spinItemsValue, {
				toValue: 1,
				duration: 100,
				easing: Easing.linear,
				useNativeDriver: true,
			}).start(() => {
				this.setState({
					dropdownItemsOpened: true,
				});
			});
		});
	};

	spinItemsArrowDown = () => {
		Animated.timing(this.state.spinItemsValue, {
			toValue: 0,
			duration: 100,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start(() => {
			this.setState({
				dropdownItemsOpened: false,
			});
		});
	};

	spinPagesArrowUp = () => {
		this.updatePagesPosition(() => {
			Animated.timing(this.state.spinPagesValue, {
				toValue: 1,
				duration: 100,
				easing: Easing.linear,
				useNativeDriver: true,
			}).start(() => {
				this.setState({
					dropdownPagesOpened: true,
				});
			});
		});
	};

	spinPagesArrowDown = () => {
		Animated.timing(this.state.spinPagesValue, {
			toValue: 0,
			duration: 100,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start(() => {
			this.setState({
				dropdownPagesOpened: false,
			});
		});
	};

	hideItemsDropdown = () => {
		this.spinItemsArrowDown();
	};

	hidePagesDropdown = () => {
		this.spinPagesArrowDown();
	};

	onItemRowPress = (index, item) => {
		const { onItemRowPressed, onItemsDropdownRowPressed } = this.props;
		this.setState(
			{
				dropdownItemPressed: index,
				itemsPerPage: item,
			},
			() => {
				onItemRowPressed(item);
				onItemsDropdownRowPressed(index);
			}
		);
	};

	onPagesRowPress = (index, item) => {
		const { onPageChange, onPagesDropdownRowPressed } = this.props;
		this.setState(
			{
				dropdownPagesPressed: index,
				actualPageVisible: item,
			},
			() => {
				onPageChange(item);
				onPagesDropdownRowPressed(index);
			}
		);
	};

	getPagesRange = (pageNumber, actualPagesNumber) => {
		const { onPageChange } = this.props;
		const newPagesNumber = Math.min(Math.max(1, pageNumber), actualPagesNumber);
		this.setState(
			{
				actualPageVisible: newPagesNumber,
			},
			() => {
				onPageChange(newPagesNumber);
			}
		);
	};

	renderSeparator = () => (
		<Separator
			backgroundColor={colors.sensitiveGreyDefault}
			height={1}
			width="100%"
		/>
	);

	renderItemsRow = ({ item, index }) => {
		const {
			dropdownItemsRowWidth,
			dropdownItemsRowHeight,
			dropdownItemsRowBackgroundColorActive,
			dropdownItemsRowBackgroundColor,
			dropdownItemsRowTextFontFamily,
			dropdownItemsRowTextFontFamilyActive,
			dropdownItemsRowTextColorActive,
			dropdownItemsRowTextColor,
			dropdownItemsRowTextFontSize,
			themeName,
		} = this.props;
		const { dropdownItemPressed } = this.state;

		return (
			<RowItem
				item={item}
				index={index}
				isItem
				indexPressed={dropdownItemPressed}
				onItemRowPressed={this.onItemRowPress}
				dropdownRowWidth={dropdownItemsRowWidth}
				dropdownRowHeight={dropdownItemsRowHeight}
				dropdownRowBackgroundColorActive={dropdownItemsRowBackgroundColorActive}
				dropdownRowBackgroundColor={dropdownItemsRowBackgroundColor}
				dropdownRowTextFontFamily={dropdownItemsRowTextFontFamily}
				dropdownRowTextFontFamilyActive={dropdownItemsRowTextFontFamilyActive}
				dropdownRowTextColorActive={dropdownItemsRowTextColorActive}
				dropdownRowTextColor={dropdownItemsRowTextColor}
				dropdownRowTextFontSize={dropdownItemsRowTextFontSize}
				hideItemsDropdown={this.hideItemsDropdown}
				themeName={themeName}
			/>
		);
	};

	renderPagesRow = ({ item, index }) => {
		const {
			dropdownPagesRowWidth,
			dropdownPagesRowHeight,
			dropdownPagesRowBackgroundColorActive,
			dropdownPagesRowBackgroundColor,
			dropdownPagesRowTextFontFamily,
			dropdownPagesRowTextFontFamilyActive,
			dropdownPagesRowTextColorActive,
			dropdownPagesRowTextColor,
			dropdownPagesRowTextFontSize,
			themeName,
		} = this.props;
		const { dropdownPagesPressed, actualPageVisible } = this.state;

		return (
			<RowItem
				item={item}
				index={index}
				isPage
				indexPressed={dropdownPagesPressed}
				actualPageVisible={actualPageVisible}
				onItemRowPressed={this.onPagesRowPress}
				dropdownRowWidth={dropdownPagesRowWidth}
				dropdownRowHeight={dropdownPagesRowHeight}
				dropdownRowBackgroundColorActive={dropdownPagesRowBackgroundColorActive}
				dropdownRowBackgroundColor={dropdownPagesRowBackgroundColor}
				dropdownRowTextFontFamily={dropdownPagesRowTextFontFamily}
				dropdownRowTextFontFamilyActive={dropdownPagesRowTextFontFamilyActive}
				dropdownRowTextColorActive={dropdownPagesRowTextColorActive}
				dropdownRowTextColor={dropdownPagesRowTextColor}
				dropdownRowTextFontSize={dropdownPagesRowTextFontSize}
				hideItemsDropdown={this.hidePagesDropdown}
				themeName={themeName}
			/>
		);
	};

	renderItemsDropdown = () => {
		const {
			itemsDropdownWidth,
			itemsDropdownBackgroundColor,
			itemsDropdownStyle,
			itemsPerPage,
			dropdownItemsRowHeight,
			paginationBelow,
		} = this.props;

		const topPositionWhenBelow =
			this.itemsFrame.y - itemsPerPage.length * dropdownItemsRowHeight;
		const topPositionWhenAbove = this.itemsFrame.y + this.itemsFrame.h;

		return (
			<Modal
				animationType="fade"
				visible
				transparent
				onRequestClose={() => this.hideItemsDropdown()}
			>
				<TouchableModalWrapper onPress={() => this.hideItemsDropdown()}>
					<ModalWrapper
						flexGrow={1}
						shadowColor={colors.richBlackDefault}
						shadowOffset={{
							width: 2,
							height: 10,
						}}
						shadowOpacity={0.15}
						shadowRadius={6}
						elevation={15}
					>
						<List
							data={itemsPerPage}
							renderRow={this.renderItemsRow}
							keyExtractor={(item, index) => `${item}${index}`}
							renderSeparator={this.renderSeparator}
							listContainerStyle={[
								itemsDropdownStyle,
								// eslint-disable-next-line
								{
									width: itemsDropdownWidth,
									maxHeight: dropdownItemsRowHeight * 4,
									backgroundColor: itemsDropdownBackgroundColor,
									elevation: 15,
									position: "absolute",
									borderRadius: 6,
									flex: 1,
									top: paginationBelow
										? topPositionWhenBelow
										: topPositionWhenAbove,
									left:
										this.itemsFrame.x +
										this.itemsFrame.w -
										itemsDropdownWidth +
										15,
									overflow: "hidden",
								},
							]}
							showsVerticalScrollIndicator={false}
						/>
					</ModalWrapper>
				</TouchableModalWrapper>
			</Modal>
		);
	};

	renderPagesDropdown = (pageCount) => {
		const {
			pagesDropdownWidth,
			pagesDropdownBackgroundColor,
			pagesDropdownStyle,
			paginationBelow,
			dropdownPagesRowHeight,
		} = this.props;

		const buildPagesNumberArray = Object.keys([...Array(pageCount)])
			// eslint-disable-next-line
			.map((v) => parseInt(v))
			.map((item) => item + 1);
		const topPositionWhenBelow =
			buildPagesNumberArray.length < 4
				? this.pagesFrame.y -
					buildPagesNumberArray.length * dropdownPagesRowHeight
				: this.pagesFrame.y - dropdownPagesRowHeight * 4;
		const topPositionWhenAbove = this.pagesFrame.y + this.pagesFrame.h;

		return (
			<Modal
				animationType="fade"
				visible
				transparent
				onRequestClose={() => this.hidePagesDropdown()}
			>
				<TouchableModalWrapper onPress={() => this.hidePagesDropdown()}>
					<ModalWrapper
						flexGrow={1}
						shadowColor={colors.richBlackDefault}
						shadowOffset={{
							width: 2,
							height: 10,
						}}
						shadowOpacity={0.15}
						shadowRadius={6}
						elevation={15}
					>
						<List
							data={buildPagesNumberArray}
							renderRow={this.renderPagesRow}
							keyExtractor={(item, index) => `${item}${index}`}
							renderSeparator={this.renderSeparator}
							listContainerStyle={[
								pagesDropdownStyle,
								// eslint-disable-next-line
								{
									width: pagesDropdownWidth,
									maxHeight: dropdownPagesRowHeight * 4,
									backgroundColor: pagesDropdownBackgroundColor,
									elevation: 15,
									position: "absolute",
									borderRadius: 6,
									flex: 1,
									top: paginationBelow
										? topPositionWhenBelow
										: topPositionWhenAbove,
									left:
										this.pagesFrame.x +
										this.pagesFrame.w -
										pagesDropdownWidth +
										15,
									overflow: "hidden",
								},
							]}
							showsVerticalScrollIndicator={false}
						/>
					</ModalWrapper>
				</TouchableModalWrapper>
			</Modal>
		);
	};

	renderItemsPerPageContent = () => {
		const {
			itemsPerPageLabel,
			itemsPerPageLabelStyle,
			itemsPerPageLabelFontFamily,
			itemsPerPageLabelFontSize,
			itemsPerPageLabelColor,
			itemsPerPageNumberFontSize,
			itemsPerPageNumberFontFamily,
			itemsPerPageNumberColor,
			itemsPerPageNumberStyle,
			iconSize,
			iconColor,
			amountAndRangeSplittingLabel,
			itemsRangeFontSize,
			itemsRangeFontFamily,
			itemsRangeColor,
			itemsRangeStyle,
			amountItemsLabel,
			itemsPerPageWrapperStyle,
			themeName,
		} = this.props;

		const {
			actualPageVisible,
			itemsPerPage,
			itemsAmount,
			dropdownItemsOpened,
			spinItemsValue,
		} = this.state;

		const itemsVisible = itemsPerPage * (actualPageVisible - 1) + 1;

		const lastItemIndex = Math.min(
			itemsAmount,
			itemsPerPage * actualPageVisible
		);

		const rotateIcon = spinItemsValue.interpolate({
			inputRange: [0, 1],
			outputRange: ["0deg", "-180deg"],
		});

		return (
			<Container
				flex={1}
				justifyContent="flex-start"
				flexDirection="row"
				style={itemsPerPageWrapperStyle}
			>
				<DropdownPerPageWrapper
					flexDirection="row"
					justifyContent="flex-start"
					paddingLeft={10}
				>
					<ItemsWrapper justifyContent="center" alignItems="center">
						<Items
							fontSize={itemsPerPageLabelFontSize}
							fontFamily={itemsPerPageLabelFontFamily}
							color={itemsPerPageLabelColor}
							style={itemsPerPageLabelStyle}
						>
							{itemsPerPageLabel}
						</Items>
					</ItemsWrapper>
					<DropdownTouchable
						onPress={() =>
							dropdownItemsOpened
								? this.spinItemsArrowDown()
								: this.spinItemsArrowUp()
						}
					>
						<ItemsDropdownWrapper
							ref={(ref) => {
								this.itemsPosition = ref;
							}}
							justifyContent="center"
							alignItems="center"
							flexDirection="row"
							paddingLeft={16}
						>
							<ItemsWrapper>
								<ItemsPerPage
									fontSize={itemsPerPageNumberFontSize}
									fontFamily={itemsPerPageNumberFontFamily}
									color={
										theme.themes[themeName].colors.primary.base ||
										itemsPerPageNumberColor
									}
									style={itemsPerPageNumberStyle}
								>
									{itemsPerPage}
								</ItemsPerPage>
							</ItemsWrapper>
							<AnimatedIconWrapper
								style={{
									transform: [{ rotate: rotateIcon }],
								}}
								marginLeft={3}
							>
								<Icon
									name="arrowDown"
									size={iconSize}
									color={
										theme.themes[themeName].colors.primary.base || iconColor
									}
								/>
							</AnimatedIconWrapper>
						</ItemsDropdownWrapper>
					</DropdownTouchable>
					{dropdownItemsOpened ? this.renderItemsDropdown() : null}
				</DropdownPerPageWrapper>
				<ItemsWrapper
					justifyContent="center"
					alignItems="center"
					paddingLeft={30}
					flexDirection="row"
				>
					<ItemsRange
						fontSize={itemsRangeFontSize}
						fontFamily={itemsRangeFontFamily}
						color={itemsRangeColor}
						style={itemsRangeStyle}
					>
						|
					</ItemsRange>
					<ItemsRange
						fontSize={itemsRangeFontSize}
						fontFamily={itemsRangeFontFamily}
						color={itemsRangeColor}
						// eslint-disable-next-line
						style={[
							itemsRangeStyle,
							{
								paddingLeft: 25,
							},
						]}
					>
						{`${itemsVisible}-${lastItemIndex} ${amountAndRangeSplittingLabel} ${itemsAmount} ${amountItemsLabel}`}
					</ItemsRange>
				</ItemsWrapper>
			</Container>
		);
	};

	renderPagesContent = () => {
		const {
			horizontalIconSize,
			horizontalIconColor,
			pageNumberFontSize,
			pageNumberFontFamily,
			pageNumberColor,
			pageNumberStyle,
			iconSize,
			iconColor,
			amountAndRangeSplittingLabel,
			pagesRangeFontSize,
			pagesRangeFontFamily,
			pagesRangeColor,
			pagesRangeStyle,
			amountPagesLabel,
			pagesWrapperStyle,
			themeName,
		} = this.props;

		const {
			dropdownPagesOpened,
			spinPagesValue,
			actualPageVisible,
			itemsPerPage,
			itemsAmount,
		} = this.state;

		const rotateIcon = spinPagesValue.interpolate({
			inputRange: [0, 1],
			outputRange: ["0deg", "-180deg"],
		});

		const pageCount = Math.ceil(itemsAmount / itemsPerPage);

		const isDisabledLeft = actualPageVisible === 1;

		const isDisabledRight = actualPageVisible === pageCount;

		return (
			<Container
				flex={1}
				justifyContent="flex-end"
				flexDirection="row"
				style={pagesWrapperStyle}
			>
				<ItemsPagesWrapper
					justifyContent="center"
					alignItems="center"
					flexDirection="row"
					paddingRight={8}
				>
					<PagesRange
						fontSize={pagesRangeFontSize}
						fontFamily={pagesRangeFontFamily}
						color={pagesRangeColor}
						style={pagesRangeStyle}
					>
						{`${actualPageVisible} ${amountAndRangeSplittingLabel} ${pageCount} ${amountPagesLabel}`}
					</PagesRange>
				</ItemsPagesWrapper>
				<PagesDropdownWrapper flexDirection="row">
					<IconTouchable
						onPress={() => {
							const pageNumber = actualPageVisible - 1;
							this.getPagesRange(pageNumber, pageCount);
						}}
						disabled={isDisabledLeft}
					>
						<IconWrapper
							justifyContent="center"
							alignItems="center"
							borderLeftWidth={2}
							borderLeftColor={colors.sensitiveGreyDefault}
							paddingRight={8}
							paddingLeft={8}
						>
							<Icon
								name="arrowLeft"
								size={horizontalIconSize}
								color={
									isDisabledLeft
										? colors.sensitiveGreyDark
										: theme.themes[themeName].colors.primary.base ||
											horizontalIconColor
								}
							/>
						</IconWrapper>
					</IconTouchable>
					<DropdownTouchable
						onPress={() =>
							dropdownPagesOpened
								? this.spinPagesArrowDown()
								: this.spinPagesArrowUp()
						}
					>
						<IconPageWrapper
							// eslint-disable-next-line
							ref={(ref) => (this.pagesPosition = ref)}
							width={45}
							flexDirection="row"
							alignItems="center"
							justifyContent="center"
							borderLeftWidth={2}
							borderRightWidth={2}
							borderLeftColor={colors.sensitiveGreyDefault}
							borderRightColor={colors.sensitiveGreyDefault}
							paddingLeft={5}
							paddingRight={5}
						>
							<Page
								fontSize={pageNumberFontSize}
								fontFamily={pageNumberFontFamily}
								color={
									theme.themes[themeName].colors.primary.base || pageNumberColor
								}
								style={pageNumberStyle}
							>
								{actualPageVisible}
							</Page>
							<AnimatedIconWrapper
								style={{
									transform: [{ rotate: rotateIcon }],
									marginLeft: 1,
								}}
							>
								<Icon
									name="arrowDown"
									size={iconSize}
									color={
										theme.themes[themeName].colors.primary.base || iconColor
									}
								/>
							</AnimatedIconWrapper>
						</IconPageWrapper>
					</DropdownTouchable>
					<IconTouchable
						onPress={() => {
							const pageNumber = actualPageVisible + 1;
							this.getPagesRange(pageNumber, pageCount);
						}}
						disabled={isDisabledRight}
					>
						<IconWrapper
							justifyContent="center"
							alignItems="center"
							paddingLeft={8}
							paddingRight={18}
						>
							<Icon
								name="arrowRight"
								size={horizontalIconSize}
								color={
									isDisabledRight
										? colors.sensitiveGreyDark
										: theme.themes[themeName].colors.primary.base ||
											horizontalIconColor
								}
							/>
						</IconWrapper>
					</IconTouchable>
				</PagesDropdownWrapper>
				{dropdownPagesOpened ? this.renderPagesDropdown(pageCount) : null}
			</Container>
		);
	};

	render() {
		const { themeName, width, height, backgroundColor, paginationBelow } =
			this.props;

		return (
			<ThemeProvider theme={theme.themes[themeName]}>
				<PaginationWrapper
					width={width}
					height={height}
					minWidth={550}
					backgroundColor={backgroundColor}
					borderBottomRightRadius={paginationBelow ? 6 : 0}
					borderBottomLeftRadius={paginationBelow ? 6 : 0}
					borderTopLeftRadius={paginationBelow ? 0 : 6}
					borderTopRightRadius={paginationBelow ? 0 : 6}
					flexDirection="row"
				>
					{this.renderItemsPerPageContent()}
					{this.renderPagesContent()}
				</PaginationWrapper>
			</ThemeProvider>
		);
	}
}
TablePagination.propTypes = {
	itemsPerPage: array.isRequired,
	themeName: string,
	width: oneOfType([number, string]),
	height: oneOfType([number, string]),
	backgroundColor: string,
	itemsPerPageLabel: string,
	itemsPerPageLabelStyle: oneOfType([object, array]),
	itemsPerPageLabelFontFamily: string,
	itemsPerPageLabelFontSize: number,
	itemsPerPageLabelColor: string,
	itemsPerPageNumberFontSize: number,
	itemsPerPageNumberFontFamily: string,
	itemsPerPageNumberColor: string,
	itemsPerPageNumberStyle: oneOfType([object, array]),
	iconSize: number,
	iconColor: string,
	amountAndRangeSplittingLabel: string,
	itemsRangeFontSize: number,
	itemsRangeFontFamily: string,
	itemsRangeColor: string,
	itemsRangeStyle: oneOfType([object, array]),
	pagesRangeFontSize: number,
	pagesRangeFontFamily: string,
	pagesRangeColor: string,
	pagesRangeStyle: oneOfType([object, array]),
	horizontalIconSize: number,
	horizontalIconColor: string,
	pageNumberFontSize: number,
	pageNumberFontFamily: string,
	pageNumberColor: string,
	pageNumberStyle: oneOfType([object, array]),
	itemsDropdownWidth: number,
	itemsDropdownBackgroundColor: string,
	itemsDropdownStyle: oneOfType([object, array]),
	dropdownItemsRowBackgroundColorActive: string,
	dropdownItemsRowBackgroundColor: string,
	dropdownItemsRowTextFontFamily: string,
	dropdownItemsRowTextFontFamilyActive: string,
	dropdownItemsRowTextColorActive: string,
	dropdownItemsRowTextColor: string,
	dropdownItemsRowWidth: number,
	dropdownItemsRowHeight: number,
	dropdownItemsRowTextFontSize: number,
	onItemRowPressed: func,
	amountItemsLabel: string,
	amountPagesLabel: string,
	itemsAmount: number,
	paginationBelow: bool,
	actualItemsPerPage: number,
	pagesDropdownWidth: number,
	pagesDropdownBackgroundColor: string,
	pagesDropdownStyle: oneOfType([object, array]),
	dropdownPagesRowBackgroundColorActive: string,
	dropdownPagesRowBackgroundColor: string,
	dropdownPagesRowTextFontFamily: string,
	dropdownPagesRowTextFontFamilyActive: string,
	dropdownPagesRowTextColorActive: string,
	dropdownPagesRowTextColor: string,
	dropdownPagesRowWidth: number,
	dropdownPagesRowHeight: number,
	dropdownPagesRowTextFontSize: number,
	currentPage: number,
	onPageChange: func,
	onChange: func,
	pagesWrapperStyle: oneOfType([object, array]),
	itemsPerPageWrapperStyle: oneOfType([object, array]),
	onItemsDropdownRowPressed: func,
	onPagesDropdownRowPressed: func,
};

TablePagination.defaultProps = {
	themeName: defaultThemeName,
	width: 600,
	height: 32,
	backgroundColor: colors.white,
	itemsPerPageLabel: "Items per page:",
	itemsPerPageLabelStyle: {},
	itemsPerPageLabelFontFamily: fonts.Regular,
	itemsPerPageLabelFontSize: 12,
	itemsPerPageLabelColor: colors.richBlackDefault,
	itemsPerPageNumberFontSize: 14,
	itemsPerPageNumberFontFamily: fonts.Black,
	itemsPerPageNumberColor: colors.vibrantCyanDefault,
	itemsPerPageNumberStyle: {},
	iconSize: 20,
	iconColor: colors.vibrantCyanDefault,
	amountAndRangeSplittingLabel: "of",
	itemsRangeFontSize: 12,
	itemsRangeFontFamily: fonts.Regular,
	itemsRangeColor: colors.richBlackDefault,
	itemsRangeStyle: {},
	pagesRangeFontSize: 12,
	pagesRangeFontFamily: fonts.Regular,
	pagesRangeColor: colors.richBlackDefault,
	pagesRangeStyle: {},
	horizontalIconSize: 24,
	horizontalIconColor: colors.vibrantCyanDefault,
	pageNumberFontSize: 14,
	pageNumberFontFamily: fonts.Black,
	pageNumberColor: colors.vibrantCyanDefault,
	pageNumberStyle: {},
	itemsDropdownWidth: 145,
	itemsDropdownBackgroundColor: colors.white,
	itemsDropdownStyle: {},
	dropdownItemsRowBackgroundColorActive: colors.sensitiveGreyDark,
	dropdownItemsRowBackgroundColor: colors.white,
	dropdownItemsRowTextFontFamily: fonts.Regular,
	dropdownItemsRowTextFontFamilyActive: fonts.Black,
	dropdownItemsRowTextColorActive: colors.vibrantCyanDark,
	dropdownItemsRowTextColor: colors.richBlackDefault,
	dropdownItemsRowWidth: 145,
	dropdownItemsRowHeight: 40,
	dropdownItemsRowTextFontSize: 14,
	onItemRowPressed: () => {},
	amountItemsLabel: "items",
	amountPagesLabel: "pages",
	itemsAmount: 100,
	paginationBelow: false,
	actualItemsPerPage: 10,
	pagesDropdownWidth: 145,
	pagesDropdownBackgroundColor: colors.white,
	pagesDropdownStyle: {},
	dropdownPagesRowBackgroundColorActive: colors.sensitiveGreyDark,
	dropdownPagesRowBackgroundColor: colors.white,
	dropdownPagesRowTextFontFamily: fonts.Regular,
	dropdownPagesRowTextFontFamilyActive: fonts.Black,
	dropdownPagesRowTextColorActive: colors.vibrantCyanDark,
	dropdownPagesRowTextColor: colors.richBlackDefault,
	dropdownPagesRowWidth: 145,
	dropdownPagesRowHeight: 40,
	dropdownPagesRowTextFontSize: 14,
	currentPage: 1,
	onPageChange: () => {},
	onChange: () => {},
	pagesWrapperStyle: {},
	itemsPerPageWrapperStyle: {
		paddingLeft: 20,
	},
	onItemsDropdownRowPressed: () => {},
	onPagesDropdownRowPressed: () => {},
};

export default TablePagination;
