import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Svg, Path, Text } from 'react-native-svg';
import { bool, string, number, array, PropTypes } from 'prop-types';
import { Bar } from 'react-native-progress';
import { ThemeProvider } from 'styled-components';
import AnimatedPath from './Animations';
import { colors, fonts } from '../../config';
import { defaultThemeName, getThemeObject } from '../../config/theme';
import styles from './styles';
import { ProgressBarWrapper } from './styled';

import StepProgressBar from './StepProgressBar';

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    const { circleRadius, progress } = this.props;

    this.arcStartAngle = 0;
    // this.arcRadius = 70
    this.arcEndAngle = 0;
    this.arcWidth = 10;
    this.arcColor = props.primaryProgressBarColor;
    this.arcDiameter = circleRadius * 2;

    this.state = {
      arcD: this.describeArc(
        circleRadius,
        circleRadius,
        circleRadius,
        this.arcStartAngle + this.arcWidth / 2,
        Math.round(progress * 3.6) || this.arcEndAngle - this.arcWidth / 4
      ),
      arcDBack: this.describeArc(
        circleRadius,
        circleRadius,
        circleRadius,
        this.arcStartAngle + this.arcWidth / 2,
        360 - this.arcWidth / 4
      ),
      arcDoverdue: this.describeArc(
        circleRadius,
        circleRadius,
        circleRadius,
        this.arcStartAngle + this.arcWidth / 2,
        Math.round(progress - 100) * 3.6 || this.arcEndAngle - this.arcWidth / 4
      ),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { progress, circleRadius } = this.props;

    if (nextProps.progress !== progress) {
      if (nextProps.progress >= 100) {
        this.setState({
          arcDoverdue: this.describeArc(
            circleRadius,
            circleRadius,
            circleRadius,
            this.arcStartAngle + this.arcWidth / 2,
            Math.round((nextProps.progress - 100) * 3.6) - this.arcWidth / 4
          ),
        });
      }

      this.setState({
        arcD: this.describeArc(
          circleRadius,
          circleRadius,
          circleRadius,
          this.arcStartAngle + this.arcWidth / 2,
          Math.round(nextProps.progress * 3.6) - this.arcWidth / 4
        ),
      });
    }
  }

  polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = this.polarToCartesian(x, y, radius, endAngle);
    const end = this.polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    // eslint-disable-next-line
    const d = [
      'M',
      start.x,
      start.y,
      'A',
      radius + 0.1,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(' ');

    return d;
  };

  roundProgress = (value, decimals) =>
    Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);

  render() {
    const {
      type,
      inactive,
      progress,
      linearProgressBarWidth,
      primaryProgressBarColor,
      overdueProgressBarColor,
      overdueProgressBarUnfilledColor,
      inactiveProgressBarColor,
      inactiveProgressBarUnfilledColor,
      labels,
      currentPosition,
      labelStepProgressBarColor,
      stepProgressBarWidth,
      circularProgressBarLabel,
      stepCount,
      disabledStep,
      themeName,
    } = this.props;
    const themeObj = getThemeObject(themeName);
    const progressRounded = this.roundProgress(progress / 100, 2);
    const overdueProgress = progressRounded - 1;
    const overdueProgressRounded = this.roundProgress(overdueProgress, 2);
    // eslint-disable-next-line
    const primaryColor = themeName
      ? themeObj.colors.primary.base
      : type === 'step'
        ? colors.vibrantCyanDefault
        : primaryProgressBarColor;
    const primaryColorUnfilled = themeName
      ? themeObj.colors.primary.lightest
      : inactiveProgressBarUnfilledColor;
    const secondaryColor = themeName
      ? themeObj.colors.secondary.base
      : overdueProgressBarColor;
    const secondaryColorUnfilled = themeName
      ? themeObj.colors.secondary.lightest
      : overdueProgressBarUnfilledColor;

    const renderProgressBar = (component) =>
      themeName ? (
        <ThemeProvider theme={themeObj}>{component}</ThemeProvider>
      ) : (
        component
      );

    const defaultLinearProgressBar = (
      <Bar
        width={linearProgressBarWidth}
        animated
        progress={progressRounded <= 0 ? 0 : progressRounded}
        height={10}
        borderRadius={10}
        unfilledColor={primaryColorUnfilled}
        borderWidth={0}
        color={inactive ? inactiveProgressBarColor : primaryColor}
      />
    );

    const overdueLinearProgressBar = (
      <View>
        <Bar
          width={linearProgressBarWidth}
          animated
          progress={
            overdueProgressRounded >= 2 ? 2 : 1 - overdueProgressRounded
          }
          height={10}
          unfilledColor={inactive ? inactiveProgressBarColor : secondaryColor}
          borderRadius={10}
          borderWidth={0}
          color={
            inactive ? inactiveProgressBarUnfilledColor : secondaryColorUnfilled
          }
        />
      </View>
    );

    const customStyles = {
      stepIndicatorSize: 26,
      currentStepIndicatorSize: 26,
      separatorStrokeWidth: 2,
      borderWidth: 0,
      primaryStepProgressBarColor: primaryColor,
      unfinishedStepProgressBarColor: colors.sensitiveGreyDarkest,
      disabledStepProgressBarColor: colors.sensitiveGreyDark,
      labelStepProgressBarColor: colors.richBlackDefault,
      stepIndicatorFinishedBackgroundColor: colors.white,
      stepIndicatorUnFinishedBackgroundColor: colors.white,
      stepIndicatorCurrentBackgroundColor: colors.white,
      stepIndicatorLabelFontSize: 12,
      labelSize: 12,
      currentStepIndicatorLabelFontSize: 12,
      currentStepLabelColor: labelStepProgressBarColor,
      finishedStepLabelColor: labelStepProgressBarColor,
      unfinishedStepLabelColor: colors.richBlackLight,
    };

    const stepProgressBar = (
      <StepProgressBar
        currentPosition={currentPosition}
        inactive={inactive}
        labels={labels}
        customStyles={customStyles}
        stepCount={stepCount}
        disabledStep={disabledStep}
        stepProgressBarWidth={stepProgressBarWidth}
        {...this.props}
      />
    );

    const defaultCircularProgressBar = (
      <ProgressBarWrapper
        style={Platform.select({
          ios: styles.circleWrapper,
          android: styles.circleWrapperAndroid,
        })}
      >
        <Svg height={this.arcDiameter} width={this.arcDiameter}>
          <Path
            d={this.state.arcDBack}
            fill={colors.transparent}
            stroke={
              inactive ? inactiveProgressBarUnfilledColor : primaryColorUnfilled
            }
            strokeWidth={this.arcWidth * 2}
            strokeLinecap="square"
          />
          <AnimatedPath
            progress={progress}
            fill={colors.transparent}
            strokeColor={
              // eslint-disable-next-line
              inactive
                ? inactiveProgressBarColor
                : progress === 0
                  ? colors.transparent
                  : primaryColor
            }
            strokeWidth={this.arcWidth * 2}
            d={this.state.arcD}
            strokeLinecap={progress === 100 ? 'square' : 'round'}
          />
          <Text
            fill={inactive ? inactiveProgressBarColor : primaryColor}
            fontSize={34}
            fontFamily={fonts.Merck}
            lineHeight={1.25}
            x={70}
            y={75}
            textAnchor="middle"
          >
            {`${progress}%`}
          </Text>
          <Text
            fill={
              inactive ? inactiveProgressBarColor : labelStepProgressBarColor
            }
            fontSize={12}
            fontFamily={fonts.Regular}
            lineHeight={1.25}
            x={70}
            y={100}
            textAnchor="middle"
          >
            {circularProgressBarLabel}
          </Text>
        </Svg>
      </ProgressBarWrapper>
    );

    const overdueCircularProgressBar = (
      <ProgressBarWrapper
        style={Platform.select({
          ios: styles.circleWrapper,
          android: styles.circleWrapperAndroid,
        })}
      >
        <Svg height={this.arcDiameter} width={this.arcDiameter}>
          <Path
            d={this.state.arcDBack}
            fill={colors.transparent}
            stroke={
              inactive
                ? inactiveProgressBarUnfilledColor
                : secondaryColorUnfilled
            }
            strokeWidth={this.arcWidth * 2}
            strokeLinecap="square"
          />
          <AnimatedPath
            progress={progress}
            fill={colors.transparent}
            d={this.state.arcDoverdue}
            strokeColor={
              // eslint-disable-next-line
              inactive
                ? inactiveProgressBarColor
                : progress === 0
                  ? colors.transparent
                  : secondaryColor
            }
            strokeWidth={this.arcWidth * 2}
            strokeLinecap={progress === 200 ? 'square' : 'round'}
          />
          <Text
            fill={inactive ? inactiveProgressBarColor : secondaryColor}
            fontSize={34}
            strokeWidth={0}
            fontFamily={fonts.Merck}
            lineHeight={1.25}
            x={70}
            y={75}
            textAnchor="middle"
          >
            {`${progress}%`}
          </Text>
          <Text
            fill={
              inactive ? inactiveProgressBarColor : labelStepProgressBarColor
            }
            fontSize={12}
            fontFamily={fonts.Regular}
            lineHeight={1.25}
            x={70}
            y={100}
            textAnchor="middle"
          >
            {circularProgressBarLabel}
          </Text>
        </Svg>
      </ProgressBarWrapper>
    );

    let progressBar;
    // eslint-disable-next-line
    switch (type) {
      case 'circular':
        progressBar =
          progress > 100
            ? renderProgressBar(overdueCircularProgressBar)
            : renderProgressBar(defaultCircularProgressBar);
        break;
      case 'linear':
        progressBar =
          progress > 100
            ? renderProgressBar(overdueLinearProgressBar)
            : renderProgressBar(defaultLinearProgressBar);
        break;
      case 'step':
        progressBar = stepProgressBar;
        break;
      default:
        progressBar = 'linear';
    }

    return progressBar;
  }
}

ProgressBar.propTypes = {
  inactive: bool,
  type: string,
  progress: number,
  linearProgressBarWidth: number,
  currentPosition: number,
  circleRadius: number,
  labels: array,
  stepCount: number,
  stepProgressBarWidth: number,
  primaryProgressBarColor: string,
  labelStepProgressBarColor: string,
  overdueProgressBarColor: string,
  overdueProgressBarUnfilledColor: string,
  inactiveProgressBarColor: string,
  inactiveProgressBarUnfilledColor: string,
  disabledStep: number,
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
  circularProgressBarLabel: string,
};

ProgressBar.defaultProps = {
  inactive: false,
  linearProgressBarWidth: 300,
  stepProgressBarWidth: 320,
  stepCount: 4,
  circleRadius: 70,
  overdueProgressBarColor: colors.richRedDefault,
  overdueProgressBarUnfilledColor: colors.richRedLightest,
  primaryProgressBarColor: colors.vibrantGreenDefault,
  inactiveProgressBarUnfilledColor: colors.sensitiveGreyDefault,
  inactiveProgressBarColor: colors.sensitiveGreyDarker,
  circularProgressBarLabel: 'Label',
  type: 'linear',
  themeName: defaultThemeName,
};
export default ProgressBar;
