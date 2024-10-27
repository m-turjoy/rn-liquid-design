import React, { Component } from 'react';
import { array, string, number, bool, PropTypes } from 'prop-types';
import { Dimensions, Platform } from 'react-native';
import { ThemeProvider } from 'styled-components';
import {
  VictoryVoronoiContainer,
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryTooltip,
  VictoryGroup,
  VictoryScatter,
  VictoryLabel,
} from 'victory-native';
import { G, Rect, Polygon } from 'react-native-svg';
import {
  LegendWrapper,
  LegendsWrapper,
  Legend,
  LineGraphWrapper,
} from './styled';
import { fonts, colors } from '../../config';
import { defaultThemeName, getThemeObject } from '../../config/theme';
import data from './data';
import { BoxShadow } from '../helpers/index';

const { width } = Dimensions.get('window');

class CustomLabel extends React.Component {
  render() {
    return (
      <G>
        <VictoryTooltip
          {...this.props}
          renderInPortal
          flyoutComponent={<CustomFlyout />}
          labelComponent={
            <VictoryLabel
              {...this.props}
              dy={-40}
              dx={
                width < 380
                  ? this.props.x > 300
                    ? -28
                    : 0
                  : this.props.x > 340
                    ? -28
                    : 0
              }
              style={{
                fontSize: 12,
                fontFamily: fonts.Regular,
                color: colors.richBlackDefault,
                strokeWidth: 0.8,
                stroke: colors.richBlackDefault,
              }}
            />
          }
        />
      </G>
    );
  }
}

class CustomFlyout extends React.Component {
  // static defaultEvents = VictoryTooltip.defaultEvents

  render() {
    const { x, y } = this.props;
    const newY = y - 50;

    const shadowOptions = {
      color: colors.richBlackDefault,
      border: 23,
      opacity: 0.2,
      height: 15,
      width: 70,
      x: width < 380 ? (x > 300 ? x - 87 : x - 57) : x > 340 ? x - 87 : x - 57,
      y: newY - 14.5,
    };

    return (
      <G>
        <BoxShadow
          setting={{
            ...shadowOptions,
          }}
        >
          <Rect
            x={
              width < 380
                ? x > 300
                  ? x - 80
                  : x - 50
                : x > 340
                  ? x - 80
                  : x - 50
            }
            y={newY - 10}
            rx={5}
            ry={5}
            width="100"
            height="40"
            fill={colors.white}
          />
          <Polygon
            points={`${x - 10},${newY + 29} ${x},${newY + 40} ${x + 10},${newY + 29}`}
            fill={colors.white}
          />
        </BoxShadow>
      </G>
    );
  }
}

class LineGraph extends Component {
  renderLegend = (text) => {
    const { legendFontSize, legendColor } = this.props;

    return (
      <Legend
        color={legendColor}
        fontFamily={fonts.Regular}
        fontSize={legendFontSize}
        lineHeight={legendFontSize * 1.25}
      >
        {text}
      </Legend>
    );
  };

  renderLegendColumn = (label, label2, label3) => {
    const { legendColumnWidth, legendColor, legendOpacity } = this.props;

    return (
      <LegendWrapper
        opacity={legendOpacity}
        borderTopColor={legendColor}
        borderTopWidth={1}
        width={legendColumnWidth || width < 350 ? 52 : width > 375 ? 65 : 60}
      >
        {label}
        {label2}
        {label3}
      </LegendWrapper>
    );
  };

  renderVictoryGroup = (graphData, color, duration) => {
    const { onLoadAnimDuration, dotSize, lineSize } = this.props;

    return (
      <VictoryGroup
        color={color}
        data={graphData}
        animate={{
          duration,
          onLoad: { duration: onLoadAnimDuration },
        }}
      >
        <VictoryLine
          name="activeDots"
          interpolation="natural"
          style={{
            data: {
              strokeWidth: lineSize,
              strokeLinecap: 'round',
            },
          }}
        />
        <VictoryScatter
          size={(d, a) => (a ? dotSize : 0)}
          style={{
            data: {
              stroke: colors.sensitiveGreyDefault,
              strokeWidth: 4,
            },
          }}
        />
      </VictoryGroup>
    );
  };

  render() {
    const {
      themeName,
      primaryLineColor,
      primaryLineAnimDuration,
      primaryChart,
      secondaryLineColor,
      secondaryLineAnimDuration,
      secondaryChart,
      tickValues,
      label1,
      label2,
      label3,
      label4,
      legendMonth,
      legendYear,
      unit,
      graphWidth,
      graphWrapperPadding,
      axisOffset,
      legendMargin,
      legendWidth,
      legendColor,
      legendOpacity,
      graphHeight,
      additionalChart1,
      additionalColor1,
      additionalLineAnimDuration1,
      additionalChart2,
      additionalColor2,
      additionalLineAnimDuration2,
      singleChart,
      additionalCharts,
      additionalChart,
    } = this.props;

    const themeObj = getThemeObject(themeName);
    const themeColor = themeObj.colors.primary;
    const themeSecondColor = themeObj.colors.secondary;

    const primaryColor = primaryLineColor || themeColor.base;
    const secondaryColor = secondaryLineColor || themeSecondColor.base;

    return (
      <ThemeProvider theme={themeObj}>
        <LineGraphWrapper
          paddingLeft={graphWrapperPadding || width < 350 ? 55 : 55}
        >
          <VictoryChart
            width={graphWidth || width < 350 ? width + 40 : width + 15}
            height={graphHeight}
            domainPadding={{ x: 15, y: 20 }}
            containerComponent={
              <VictoryVoronoiContainer
                activateLabels
                voronoiPadding={1}
                labels={(d) => `${Math.round(d.y)} ${unit}`}
                voronoiBlacklist={['activeDots']}
                labelComponent={<CustomLabel />}
              />
            }
          >
            <VictoryAxis
              dependentAxis
              offsetX={axisOffset || Platform.OS === 'android' ? 57 : 55}
              style={{
                axis: { stroke: 'transparent' },
                tickLabels: {
                  fontSize: 12,
                  lineHeight: 15,
                  padding: 5,
                  marginTop: 100,
                  fontFamily: fonts.Regular,
                  color: legendColor,
                  opacity:
                    Platform.OS === 'android'
                      ? legendOpacity - 0.1
                      : legendOpacity + 0.1,
                },
              }}
              labelComponent={<VictoryLabel />}
              tickValues={tickValues}
              tickFormat={(t) => `${Math.round(t)} ${unit}`}
            />
            {singleChart
              ? this.renderVictoryGroup(
                  primaryChart,
                  primaryColor,
                  primaryLineAnimDuration
                )
              : additionalCharts
                ? this.renderVictoryGroup(
                    primaryChart,
                    primaryColor,
                    primaryLineAnimDuration
                  )
                : this.renderVictoryGroup(
                    primaryChart,
                    primaryColor,
                    primaryLineAnimDuration
                  )}
            {singleChart
              ? null
              : additionalCharts
                ? this.renderVictoryGroup(
                    secondaryChart,
                    secondaryColor,
                    secondaryLineAnimDuration
                  )
                : this.renderVictoryGroup(
                    secondaryChart,
                    secondaryColor,
                    secondaryLineAnimDuration
                  )}
            {singleChart
              ? null
              : additionalCharts || additionalChart
                ? this.renderVictoryGroup(
                    additionalChart1,
                    additionalColor1,
                    additionalLineAnimDuration1
                  )
                : null}
            {singleChart
              ? null
              : additionalCharts
                ? this.renderVictoryGroup(
                    additionalChart2,
                    additionalColor2,
                    additionalLineAnimDuration2
                  )
                : null}
          </VictoryChart>
          <LegendsWrapper
            width={legendWidth || width < 350 ? 232 : width > 375 ? 300 : 260}
            marginLeft={legendMargin || width < 350 ? 2 : 0}
          >
            {this.renderLegendColumn(
              this.renderLegend(label1),
              this.renderLegend(legendMonth),
              this.renderLegend(legendYear)
            )}
            {this.renderLegendColumn(this.renderLegend(label2))}
            {this.renderLegendColumn(this.renderLegend(label3))}
            {this.renderLegendColumn(this.renderLegend(label4))}
          </LegendsWrapper>
        </LineGraphWrapper>
      </ThemeProvider>
    );
  }
}

LineGraph.defaultProps = {
  themeName: defaultThemeName,
  primaryLineAnimDuration: 2000,
  secondaryLineAnimDuration: 2000,
  onLoadAnimDuration: 500,
  label1: data.label1,
  label2: data.label2,
  label3: data.label3,
  label4: data.label4,
  legendMonth: data.legendMonth,
  legendYear: data.legendYear,
  legendFontSize: 12,
  tickValues: data.tickValues,
  unit: 'ml',
  dotSize: 3.5,
  lineSize: 3,
  legendlColor: colors.richBlackDefault,
  legendOpacity: Platform.OS === 'android' ? 0.4 : 0.3,
  graphHeight: 360,
  primaryChart: data.primaryChart,
  secondaryChart: data.secondaryChart,
  additionalChart1: data.additionalChart,
  additionalChart2: data.additionalChart2,
  singleChart: false,
  additionalChart: false,
  additionalCharts: false,
};

LineGraph.propTypes = {
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
  primaryLineColor: string,
  primaryLineAnimDuration: number,
  secondaryLineColor: string,
  secondaryLineAnimDuration: number,
  onLoadAnimDuration: number,
  label1: string,
  label2: string,
  label3: string,
  label4: string,
  legendMonth: string,
  legendYear: string,
  legendFontSize: number,
  primaryChart: array,
  secondaryChart: array,
  tickValues: array,
  unit: string,
  graphWrapperPadding: number,
  graphWidth: number,
  axisOffset: number,
  legendColumnWidth: number,
  legendMargin: number,
  legendWidth: number,
  dotSize: number,
  lineSize: number,
  legendColor: string,
  legendOpacity: number,
  graphHeight: number,
  additionalChart1: array,
  additionalChart2: array,
  singleChart: bool,
  additionalChart: bool,
  additionalCharts: bool,
  additionalColor1: string,
  additionalColor2: string,
  additionalLineAnimDuration1: number,
  additionalLineAnimDuration2: number,
};

export default LineGraph;
