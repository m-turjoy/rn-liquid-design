import React, { Component } from "react";
import { Image } from "react-native";
import {
	string,
	object,
	oneOfType,
	array,
	number,
	func,
	bool,
} from "prop-types";
import { ThemeProvider } from "styled-components";
import { colors } from "../../../config";
import { Icon } from "../../";
import {
	FirstColumnCellWrapper,
	NameWrapper,
	InfoWrapper,
	Info,
	Name,
	IconWrapperTouchable,
	IconWrapper,
	RowTouchable,
	RowList,
	DataWrapper,
	Data,
	RowWrapper,
	DropdownInfoWrapper,
	DropdownInfo,
	Separator,
	Container,
	Label,
} from "../styled";

const dataKeyExtractor = (item, index) => `${item}${index}`;

const handleCheckboxPressed = (onCheckboxPress, checkboxChecked) =>
	onCheckboxPress(!checkboxChecked);

const handleDropdownPressed = (handleDropdownOpened, optionOpened) =>
	handleDropdownOpened(!optionOpened);

const renderImage = (
	type,
	data,
	imageWidth,
	imageHeight,
	imageResizeMode,
	imageBorderRadius
) =>
	type === "image" && data.imageUrl ? (
		<Image
			source={data.imageUrl}
			resizeMode={imageResizeMode}
			borderRadius={imageBorderRadius}
			style={{
				width: imageWidth,
				height: imageHeight,
			}}
		/>
	) : null;

const renderCheckboxIcon = (
	checkbox,
	data,
	dropdown,
	checkboxIconColor,
	checkboxIconSize,
	type,
	themeObj,
	checkboxChecked,
	onCheckboxPress
) => {
	const handleIconColor =
		checkboxIconColor !== colors.vibrantCyanDefault
			? checkboxIconColor
			: themeObj.colors.primary.base;

	return checkbox &&
		data.checked !== undefined &&
		!dropdown &&
		type !== "image" ? (
		<IconWrapperTouchable
			onPress={() =>
				!data.disabled
					? handleCheckboxPressed(onCheckboxPress, checkboxChecked)
					: null
			}
		>
			<IconWrapper>
				{checkboxChecked && !data.disabled ? (
					<Icon
						name="checkboxFilled"
						size={checkboxIconSize}
						color={handleIconColor}
					/>
				) : (
					<Icon
						name="checkboxEmpty"
						size={checkboxIconSize}
						color={colors.sensitiveGreyDarker}
					/>
				)}
			</IconWrapper>
		</IconWrapperTouchable>
	) : null;
};

const renderDropdownIcon = (
	dropdown,
	data,
	checkbox,
	arrowIconSize,
	arrowIconColor,
	type,
	themeObj,
	optionOpened,
	handleDropdownOpened
) => {
	const handleIconColor =
		arrowIconColor !== colors.vibrantCyanDefault
			? arrowIconColor
			: themeObj.colors.primary.base;

	return dropdown &&
		!checkbox &&
		data.dropdownInfo !== undefined &&
		type !== "image" ? (
		<IconWrapperTouchable
			onPress={() =>
				!data.disabled
					? handleDropdownPressed(handleDropdownOpened, optionOpened)
					: null
			}
		>
			<IconWrapper>
				{optionOpened && !data.disabled ? (
					<Icon
						name="arrowUp"
						size={arrowIconSize}
						color={handleIconColor}
						// eslint-disable-next-line react-native/no-inline-styles
						style={{
							marginLeft: -3,
						}}
					/>
				) : (
					<Icon
						name="arrowDown"
						size={arrowIconSize}
						color={
							!data.disabled ? handleIconColor : colors.sensitiveGreyDarker
						}
						// eslint-disable-next-line react-native/no-inline-styles
						style={{
							marginLeft: -3,
						}}
					/>
				)}
			</IconWrapper>
		</IconWrapperTouchable>
	) : null;
};

const renderNameInfo = (
	nameFontSize,
	nameFontFamily,
	nameColor,
	nameStyle,
	data,
	infoFontSize,
	infoFontFamily,
	infoColor,
	infoStyle,
	checkbox,
	dropdown,
	type
) => (
	<Container
		flexDirection="row"
		flex={checkbox || dropdown ? (type === "large" ? 0 : 3) : 0}
	>
		<NameWrapper
			flex={checkbox || dropdown ? 2 : type === "image" ? 2 : 1}
			justifyContent="center"
			alignItems="flex-start"
		>
			<Name
				fontSize={nameFontSize}
				fontFamily={nameFontFamily}
				color={nameColor}
				style={nameStyle}
			>
				{data.rowName}
			</Name>
		</NameWrapper>
		<InfoWrapper flex={1} justifyContent="center" alignItems="flex-start">
			<Info
				fontSize={infoFontSize}
				fontFamily={infoFontFamily}
				color={infoColor}
				// eslint-disable-next-line react-native/no-inline-styles
				style={[infoStyle, { paddingLeft: 3 }]}
			>
				{data.rowInfo}
			</Info>
		</InfoWrapper>
	</Container>
);

const renderLabel = (
	data,
	type,
	labelFontSize,
	labelFontFamily,
	labelColor,
	labelStyle
) =>
	(type === "large" || type === "image") && data.rowLabel ? (
		<Container
			marginBottom={3}
			justifyContent="flex-start"
			alignItems="flex-start"
		>
			<Label
				fontSize={labelFontSize}
				fontFamily={labelFontFamily}
				color={labelColor}
				style={labelStyle}
			>
				{data.rowLabel}
			</Label>
		</Container>
	) : null;

const renderFirstColumn = (
	type,
	spaceBetweenColumns,
	cellWidth,
	dropdown,
	checkbox,
	cellStyle,
	data,
	arrowIconSize,
	arrowIconColor,
	themeObj,
	optionOpened,
	checkboxIconColor,
	checkboxIconSize,
	checkboxChecked,
	imageWidth,
	imageHeight,
	imageResizeMode,
	imageBorderRadius,
	labelFontSize,
	labelFontFamily,
	labelColor,
	labelStyle,
	nameFontSize,
	nameFontFamily,
	nameColor,
	nameStyle,
	infoFontSize,
	infoFontFamily,
	infoColor,
	infoStyle,
	onCheckboxPress,
	handleDropdownOpened
) => (
	<FirstColumnCellWrapper
		width={type === "image" ? cellWidth + 30 : cellWidth}
		flexDirection="row"
		justifyContent="center"
		alignItems="center"
		marginRight={spaceBetweenColumns}
		style={cellStyle}
		minHeight={
			(type === "small" && 32) ||
			(type === "medium" && 48) ||
			((type === "large" || type === "image") && 80)
		}
	>
		<Container
			flex={checkbox || dropdown ? 1 : 0}
			alignItems="flex-start"
			justifyContent="center"
		>
			{renderDropdownIcon(
				dropdown,
				data,
				checkbox,
				arrowIconSize,
				arrowIconColor,
				type,
				themeObj,
				optionOpened,
				handleDropdownOpened
			)}
			{renderCheckboxIcon(
				checkbox,
				data,
				dropdown,
				checkboxIconColor,
				checkboxIconSize,
				type,
				themeObj,
				checkboxChecked,
				onCheckboxPress
			)}
			{renderImage(
				type,
				data,
				imageWidth,
				imageHeight,
				imageResizeMode,
				imageBorderRadius
			)}
		</Container>
		<Container
			flex={3}
			marginLeft={type === "image" ? 15 : checkbox || dropdown ? -5 : 0}
			paddingVertical={
				(type === "small" && 8) ||
				(type === "medium" && 14) ||
				((type === "large" || type === "image") && 21)
			}
		>
			{renderLabel(
				data,
				type,
				labelFontSize,
				labelFontFamily,
				labelColor,
				labelStyle
			)}
			{renderNameInfo(
				nameFontSize,
				nameFontFamily,
				nameColor,
				nameStyle,
				data,
				infoFontSize,
				infoFontFamily,
				infoColor,
				infoStyle,
				checkbox,
				dropdown,
				type
			)}
		</Container>
	</FirstColumnCellWrapper>
);

const renderHorizontalData = (
	item,
	index,
	rowTextFontFamily,
	rowTextFontSize,
	rowTextColor,
	rowTextStyle,
	type,
	labelFontSize,
	labelFontFamily,
	labelColor,
	spaceBetweenColumns,
	cellWidth,
	cellStyle,
	labelStyle
) => {
	const labels = item.rowDataLabel;

	return (
		<DataWrapper
			width={type === "image" ? cellWidth + 30 : cellWidth}
			marginRight={spaceBetweenColumns}
			justifyContent="center"
			alignItems="flex-start"
			style={cellStyle}
			minHeight={
				(type === "small" && 32) ||
				(type === "medium" && 48) ||
				((type === "large" || type === "image") && 80)
			}
		>
			<Container
				paddingVertical={
					(type === "small" && 8) ||
					(type === "medium" && 14) ||
					((type === "large" || type === "image") && 21)
				}
			>
				{(type === "large" || type === "image") && labels ? (
					<Container marginBottom={3}>
						<Label
							fontFamily={labelFontFamily}
							fontSize={labelFontSize}
							color={labelColor}
							style={labelStyle}
						>
							{labels[index]}
						</Label>
					</Container>
				) : null}
				<Container justifyContent="center" alignItems="flex-start">
					<Data
						fontFamily={rowTextFontFamily}
						fontSize={rowTextFontSize}
						color={rowTextColor}
						style={rowTextStyle}
					>
						{item}
					</Data>
				</Container>
			</Container>
		</DataWrapper>
	);
};
class TableData extends Component {
	state = {
		pressStatus: false,
	};

	render() {
		const {
			cellStyle,
			nameFontFamily,
			nameFontSize,
			nameColor,
			data,
			infoFontFamily,
			infoFontSize,
			infoColor,
			checkbox,
			checkboxIconColor,
			checkboxIconSize,
			onCheckboxPress,
			rowTextFontFamily,
			rowTextFontSize,
			rowTextColor,
			rowTextStyle,
			dropdown,
			arrowIconSize,
			arrowIconColor,
			dropdownInfoFontSize,
			dropdownInfoFontFamily,
			dropdownInfoColor,
			type,
			labelFontSize,
			labelFontFamily,
			labelColor,
			imageWidth,
			imageHeight,
			imageResizeMode,
			imageBorderRadius,
			checkboxChecked,
			handleDropdownOpened,
			optionOpened,
			spaceBetweenColumns,
			cellWidth,
			labelStyle,
			infoStyle,
			nameStyle,
			themeObj,
			wrapperColor,
		} = this.props;

		return (
			<ThemeProvider theme={themeObj}>
				<RowTouchable
					onPress={() =>
						checkbox
							? handleCheckboxPressed(onCheckboxPress, checkboxChecked)
							: dropdown
								? handleDropdownPressed(handleDropdownOpened, optionOpened)
								: null
					}
					underlayColor={
						checkbox || dropdown
							? colors.transparent
							: colors.sensitiveGreyDefault
					}
					activeOpacity={1}
					onHideUnderlay={() => this.setState({ pressStatus: false })}
					onShowUnderlay={() => this.setState({ pressStatus: true })}
					disabled={data.disabled}
				>
					<RowWrapper
						backgroundColor={
							this.state.pressStatus
								? colors.sensitiveGreyDefault
								: wrapperColor
						}
					>
						<RowList
							opacity={data.disabled ? 0.5 : 1}
							data={data.rowData}
							keyExtractor={dataKeyExtractor}
							horizontal
							removeClippedSubviews
							// eslint-disable-next-line react-native/no-inline-styles
							contentContainerStyle={{
								justifyContent: "center",
								alignItems: "center",
							}}
							style={{
								paddingLeft: spaceBetweenColumns,
							}}
							backgroundColor={
								(checkbox && checkboxChecked) || (dropdown && optionOpened)
									? type === "image"
										? null
										: colors.sensitiveGreyDark
									: null
							}
							scrollEnabled={false}
							ListHeaderComponent={renderFirstColumn(
								type,
								spaceBetweenColumns,
								cellWidth,
								dropdown,
								checkbox,
								cellStyle,
								data,
								arrowIconSize,
								arrowIconColor,
								themeObj,
								optionOpened,
								checkboxIconColor,
								checkboxIconSize,
								checkboxChecked,
								imageWidth,
								imageHeight,
								imageResizeMode,
								imageBorderRadius,
								labelFontSize,
								labelFontFamily,
								labelColor,
								labelStyle,
								nameFontSize,
								nameFontFamily,
								nameColor,
								nameStyle,
								infoFontSize,
								infoFontFamily,
								infoColor,
								infoStyle,
								onCheckboxPress,
								handleDropdownOpened
							)}
							renderItem={({ item, index }) =>
								renderHorizontalData(
									item,
									index,
									rowTextFontFamily,
									rowTextFontSize,
									rowTextColor,
									rowTextStyle,
									type,
									labelFontSize,
									labelFontFamily,
									labelColor,
									spaceBetweenColumns,
									cellWidth,
									cellStyle,
									labelStyle
								)
							}
						/>
						{optionOpened && dropdown && !data.disabled ? (
							<Container>
								<Separator
									backgroundColor={colors.sensitiveGreyDarker}
									height={1}
									width="100%"
								/>
								<DropdownInfoWrapper
									backgroundColor={colors.sensitiveGreyDefault}
									paddingLeft={spaceBetweenColumns}
									paddingRight={spaceBetweenColumns}
									paddingBottom={30}
									paddingTop={16}
								>
									<DropdownInfo
										fontSize={dropdownInfoFontSize}
										fontFamily={dropdownInfoFontFamily}
										color={dropdownInfoColor}
										textAlign="left"
										lineHeight={dropdownInfoFontSize * 1.75}
									>
										{data.dropdownInfo}
									</DropdownInfo>
								</DropdownInfoWrapper>
							</Container>
						) : null}
					</RowWrapper>
				</RowTouchable>
			</ThemeProvider>
		);
	}
}

TableData.propTypes = {
	cellStyle: oneOfType([object, array]),
	nameFontFamily: string.isRequired,
	nameFontSize: number.isRequired,
	nameColor: string.isRequired,
	data: object.isRequired,
	infoFontFamily: string.isRequired,
	infoFontSize: number.isRequired,
	infoColor: string.isRequired,
	checkbox: bool.isRequired,
	checkboxIconColor: string.isRequired,
	checkboxIconSize: number.isRequired,
	onCheckboxPress: func.isRequired,
	rowTextFontFamily: string.isRequired,
	rowTextFontSize: number.isRequired,
	rowTextColor: string.isRequired,
	rowTextStyle: oneOfType([object, array]).isRequired,
	dropdown: bool.isRequired,
	arrowIconSize: number.isRequired,
	arrowIconColor: string.isRequired,
	dropdownInfoFontSize: number.isRequired,
	dropdownInfoFontFamily: string.isRequired,
	dropdownInfoColor: string.isRequired,
	type: string.isRequired,
	labelFontSize: number.isRequired,
	labelFontFamily: string.isRequired,
	labelColor: string.isRequired,
	imageWidth: number.isRequired,
	imageHeight: number.isRequired,
	imageResizeMode: string.isRequired,
	imageBorderRadius: number.isRequired,
	checkboxChecked: bool.isRequired,
	handleDropdownOpened: func.isRequired,
	optionOpened: bool.isRequired,
	spaceBetweenColumns: number.isRequired,
	cellWidth: number.isRequired,
	labelStyle: oneOfType([object, array]).isRequired,
	infoStyle: oneOfType([object, array]).isRequired,
	nameStyle: oneOfType([object, array]).isRequired,
	themeObj: object.isRequired,
	wrapperColor: string.isRequired,
};

TableData.defaultProps = {
	cellStyle: {},
};

export default TableData;
