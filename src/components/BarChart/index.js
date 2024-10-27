import React, { Component } from "react";
import { array, string, number, func, bool } from "prop-types";
import { Platform, Dimensions, TouchableOpacity, View } from "react-native";

import {
	VictoryAxis,
	VictoryBar,
	VictoryChart,
	VictoryGroup,
	VictoryLabel,
	VictoryTooltip,
	// createContainer,
} from "victory-native";

import { createContainer } from "victory-create-container";

import Svg from "react-native-svg";

import { ThemeProvider } from "styled-components";

import { fonts, colors } from "../../config";

// import { Icon } from '../';
import Pagination from "../Pagination/Pagination/Pagination";
import { defaultThemeName, getThemeObject } from "../../config/theme";

import {
	ChartWrapper,
	LabelsContainer,
	LabelWrapper,
	LabelSquare,
	Label,
	ViewWrapper,
	ChartGroupWrapper,
	PaginationWrapper,
} from "./styled";

import CustomFlyout from "./CustomFlyout";
import CustomLabel from "./CustomLabel";
import CustomTick from "./CustomTick";

const { width } = Dimensions.get("window");

const MAX_ITEMS = 8;

const VictoryContainer = createContainer();

class BarChart extends Component {
	state = {
		pressed: false,
		page: 0,
	};

	formatTicksX = (x) => this.props.xAxisTickFormat || x;
	formatTicksY = (y) => this.props.yAxisTickFormat || y;
	formatTickLabelX = (x) => this.props.xTickLabelFormat || x;
	formatTickLabelY = (y) => this.props.yTickLabelFormat || y;

	renderBars = () => {
		const { data, labels, tickValuesX, defaultColors } = this.props;
		const { pressed, page } = this.state;
		const displayed = [];
		let barsCount = 0;

		data.map((coordinates) =>
			displayed.push(
				coordinates.filter((coordinate) => coordinate.x === tickValuesX[page])
			)
		);

		displayed.map((group, index) => {
			if (group.length > 0) {
				barsCount += 1;
			}

			return group.map((coordinate) => (coordinate.label = labels[index]));
		});
		let barWidthCalculated = -1.66 * barsCount + 28.3;
		barWidthCalculated = Math.min(barWidthCalculated, 20);
		barWidthCalculated = Math.max(barWidthCalculated, 15);

		let groupOffsetCalculated = -1.66 * barsCount + 33.3;
		groupOffsetCalculated =
			barsCount < 6
				? Math.max(groupOffsetCalculated, 29)
				: Math.max(groupOffsetCalculated, 25);

		return (
			<VictoryGroup offset={groupOffsetCalculated} colorScale={defaultColors}>
				{displayed.map((coordinates, index) => {
					// We allow the maximum of 8 bars to be displayed
					if (!coordinates[0] || index >= MAX_ITEMS) {
						return null;
					}

					return (
						<VictoryBar
							standalone={false}
							barWidth={barWidthCalculated}
							cornerRadius={{
								topRight: 6,
								topLeft: 0,
							}}
							alignment="middle"
							data={coordinates}
							style={{
								data: {
									opacity: pressed ? 0.2 : 1,
									strokeWidth: 0,
									stroke: "transparent",
									fill: defaultColors[
										labels.indexOf(coordinates[0].label) % defaultColors.length
									],
								},
							}}
							events={[
								{
									eventHandlers: {
										onResponderMove: () => {},
										onPressIn: () => [
											{
												target: "data",
												mutation: (props) => {
													const opacity = props.style && props.style.opacity;
													this.setState({ pressed: true });
													const active = props.activateData ? true : undefined;

													return opacity
														? {
																...props,
																style: { ...props.style, opacity: 1 },
																active,
															}
														: { ...props, active };
												},
											},
											{
												target: "labels",
												mutation: () => ({
													active: true,
												}),
											},
										],
										onPressOut: () => [
											{
												target: "data",
												mutation: () => {
													this.setState({ pressed: false });

													return { active: undefined };
												},
											},
											{
												target: "labels",
												mutation: () => ({
													active: undefined,
												}),
											},
										],
									},
								},
							]}
							key={index}
							labelComponent={
								<VictoryTooltip
									flyoutComponent={<CustomFlyout />}
									dy={data.length === 1 ? 15 : 0}
									labelComponent={
										<CustomLabel
											dataFormatter={this.formatTickLabelY()}
											labelColors={defaultColors}
											labels={labels}
										/>
									}
								/>
							}
						/>
					);
				})}
			</VictoryGroup>
		);
	};

	renderChart = () => {
		const {
			axisOffset,
			legendColor,
			legendOpacity,
			graphHeight,
			tickValuesX,
			tickValuesY,
			data,
			tickData,
		} = this.props;

		const { page } = this.state;

		return (
			<VictoryChart
				height={graphHeight}
				width={0.9 * width}
				containerComponent={
					<VictoryContainer
						standalone={false}
						disableContainerEvents
						height={graphHeight + 70}
					/>
				}
			>
				<VictoryAxis
					crossAxis
					offsetX={axisOffset}
					style={{
						axis: {
							stroke: "transparent",
						},
						tickLabels: {
							fontSize: 12,
							lineHeight: 15,
							paddingTop: 10,
							fontFamily: fonts.Regular,
							color: legendColor,
							opacity:
								Platform.OS === "android"
									? legendOpacity - 0.1
									: legendOpacity + 0.1,
						},
					}}
					height={10}
					labelComponent={<VictoryLabel />}
					tickValues={[tickValuesX[page]]}
					tickFormat={this.formatTicksX}
					tickLabelComponent={
						<CustomTick
							data={data}
							tickData={tickData}
							tickValuesX={tickValuesX}
							dataFormatter={this.formatTickLabelX()}
						/>
					}
				/>
				<VictoryAxis
					dependentAxis
					crossAxis
					offsetY={axisOffset}
					style={{
						axis: { stroke: "transparent" },
						tickLabels: {
							fontSize: 12,
							lineHeight: 15,
							padding: 5,
							marginTop: 100,
							fontFamily: fonts.Regular,
							color: legendColor,
							opacity:
								Platform.OS === "android"
									? legendOpacity - 0.1
									: legendOpacity + 0.1,
						},
					}}
					labelComponent={<VictoryLabel />}
					tickValues={tickValuesY}
					tickFormat={this.formatTicksY}
					tickLabelComponent={
						<VictoryLabel
							textAnchor="middle"
							angle={0}
							transform="translate(-25 0)"
						/>
					}
				/>
				{this.renderBars()}
			</VictoryChart>
		);
	};

	renderSvgChart = () => {
		const { graphHeight } = this.props;

		return (
			<Svg width={0.8 * width} height={graphHeight}>
				{this.renderChart()}
			</Svg>
		);
	};

	render() {
		const {
			graphWrapperPadding,
			labels,
			themeName,
			data,
			defaultColors,
			tickValuesX,
		} = this.props;

		const { page } = this.state;
		const themeObj = getThemeObject(themeName);
		const themeColor = themeObj.colors.primary.base;

		const pagination = (
			<Pagination
				activeDotIndex={page}
				dotsLength={tickValuesX.length}
				fontFamily={fonts.Regular}
				fontSize={16}
				lineHeight={26.5}
				activeTextColor={colors.white}
				inactiveTextColor={colors.richBlackDefault}
				activeBackgroundColor={themeColor}
				itemWidth={26}
				itemHeight={26}
				itemPaddingLeft={8}
				itemPaddingRight={8}
				innerWidth={width < 350 ? 130 : 210}
				paginationWidth={0.9 * width}
				paginationHeight={100}
				iconPaddingLeft={width === 360 ? 6 : 10}
				iconPaddingRight={width === 360 ? 6 : 10}
				iconColor={themeColor}
				iconSize={24}
				onPressAdd={() =>
					this.setState({ page: Math.min(page + 1, tickValuesX.length - 1) })
				}
				onPressSubtract={() => this.setState({ page: Math.max(page - 1, 0) })}
				onPressStart={() => this.setState({ page: 0 })}
				onPressEnd={() => this.setState({ page: tickValuesX.length - 1 })}
				onDotPress={(index) => this.setState({ page: index })}
			/>
		);

		return (
			<ThemeProvider theme={themeObj}>
				<ViewWrapper>
					<ChartGroupWrapper>
						<ChartWrapper paddingLeft={graphWrapperPadding}>
							{Platform.OS === "android"
								? this.renderChart()
								: this.renderSvgChart()}
						</ChartWrapper>
					</ChartGroupWrapper>
					<LabelsContainer>
						{labels.slice(0, MAX_ITEMS).map((label, index) => (
							<LabelWrapper key={`${label}-${index}`}>
								<LabelSquare
									backgroundColor={defaultColors[index % defaultColors.length]}
								/>
								<Label
									fontSize={12}
									fontFamily={fonts.Regular}
									lineHeight={15}
									color={colors.sensitiveGreyLabel}
								>
									{label}
								</Label>
							</LabelWrapper>
						))}
					</LabelsContainer>

					<PaginationWrapper>{pagination}</PaginationWrapper>
				</ViewWrapper>
			</ThemeProvider>
		);
	}
}

BarChart.defaultProps = {
	unit: "",
	graphWrapperPadding: 20,
	axisOffset: Platform.OS === "android" ? 57 : 55,
	legendColor: colors.richBlackDefault,
	legendOpacity: Platform.OS === "android" ? 0.4 : 0.3,
	graphHeight: 360,
	tickValuesX: [],
	tickValuesY: [],
	data: [],
	labels: [],
	themeName: defaultThemeName,
	defaultColors: [
		colors.vibrantCyanDefault,
		colors.vibrantMagentaDefault,
		colors.vibrantYellowDefault,
		colors.richPurpleDefault,
		colors.vibrantGreenDefault,
	],
	tickData: [],
};

BarChart.propTypes = {
	unit: string,
	graphWrapperPadding: number,
	axisOffset: number,
	legendColor: string,
	legendOpacity: number,
	graphHeight: number,
	tickValuesX: array,
	tickValuesY: array,
	data: array,
	xAxisTickFormat: func,
	yAxisTickFormat: func,
	xTickLabelFormat: func,
	yTickLabelFormat: func,
	labels: array,
	themeName: string,
	defaultColors: array,
	tickData: array,
};

export default BarChart;
