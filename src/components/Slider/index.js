import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
  View,
} from 'react-native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import { bool, number, string, object, func, PropTypes } from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { defaultThemeName, getThemeObject } from '../../config/theme';
import SliderBody from './SliderBody';
import { fonts, colors } from '../../config';
import {
  LabelWrapper,
  SliderWrapper,
  IconWrapper,
  TextWrapper,
} from './styled';
import Icon from '../MerckIcons';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  opacity: {
    opacity: 1,
  },
  opacityDisabled: {
    opacity: 0.5,
  },
  opacityDisabledIcon: {
    opacity: 0.6,
  },
  left: {
    textAlign: 'left',
    marginLeft: 10,
    ...(Platform.OS === 'android'
      ? {
          marginTop: 27.5,
        }
      : {
          marginTop: 7.5,
        }),
  },
  right: {
    textAlign: 'right',
    marginRight: 10,
    ...(Platform.OS === 'android'
      ? {
          marginTop: 27.5,
        }
      : {
          marginTop: 7.5,
        }),
  },
  leftIcon: {
    textAlign: 'left',
    marginLeft: 10,
  },
  rightIcon: {
    textAlign: 'right',
    marginRight: 10,
  },
});

class Slider extends Component {
  state = {
    distance: this.props.value,
  };

  handleAdd = () => {
    if (this.state.distance < this.props.maximumValue) {
      this.setState({ distance: this.state.distance + this.props.step });
    }

    return null;
  };

  handleSubtract = () => {
    if (this.state.distance > this.props.minimumValue) {
      this.setState({ distance: this.state.distance - this.props.step });
    }

    return null;
  };

  render() {
    const {
      minimumValue,
      maximumValue,
      minimumTrackTintColor,
      maximumTrackTintColor,
      thumbTintColor,
      onSlidingStart,
      onSlidingComplete,
      trackStyle,
      thumbStyle,
      valueFontFamily,
      valueFontWeight,
      valueFontSize,
      valueLineHeight,
      valueColor,
      disabled,
      step,
      sliderWidth,
      fontFamily,
      fontSize,
      fontWeight,
      color,
      icon,
      iconSize,
      iconColor,
      sliderLabel,
      labelFontFamily,
      labelFontSize,
      labelFontWeight,
      labelLineHeight,
      labelColor,
      labelStyle,
      themeName,
    } = this.props;

    const themeObj = getThemeObject(themeName);
    const themeColor = themeObj.colors.primary.base;

    const value = valueColor || themeColor;
    const colorIcon = iconColor || themeColor;
    const minimum = minimumTrackTintColor || themeColor;

    const renderSlider = (
      <SliderBody
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        minimumTrackTintColor={disabled ? colors.white : minimum}
        maximumTrackTintColor={maximumTrackTintColor}
        step={step}
        value={this.state.distance}
        disabled={disabled}
        labelFontFamily={valueFontFamily}
        labelFontWeight={valueFontWeight}
        labelLineHeight={valueLineHeight}
        labelFontSize={valueFontSize}
        labelColor={value}
        thumbTintColor={thumbTintColor}
        thumbStyle={thumbStyle}
        trackStyle={disabled ? styles.opacityDisabled : trackStyle}
        onValueChange={(val) => this.setState({ distance: val })}
        onSlidingComplete={onSlidingComplete}
        onSlidingStart={onSlidingStart}
        distance={this.state.distance}
        animationType="timing"
        width={icon && width > 350 ? 240 : sliderWidth}
      />
    );

    const renderTextSlider = (
      <View>
        <TextWrapper
          fontFamily={labelFontFamily}
          fontSize={labelFontSize}
          fontWeight={labelFontWeight}
          lineHeight={labelLineHeight}
          color={labelColor}
          style={
            disabled
              ? [styles.opacityDisabled, labelStyle]
              : [styles.opacity, labelStyle]
          }
          allowFontScaling={false}
        >
          {sliderLabel}
        </TextWrapper>
        <SliderWrapper>
          <LabelWrapper
            fontFamily={fontFamily}
            fontSize={fontSize}
            fontWeight={fontWeight}
            color={color}
            style={
              disabled
                ? [styles.opacityDisabled, styles.right]
                : [styles.opacity, styles.right]
            }
            allowFontScaling={false}
          >
            {minimumValue}
          </LabelWrapper>
          {renderSlider}
          <LabelWrapper
            fontFamily={fontFamily}
            fontSize={fontSize}
            fontWeight={fontWeight}
            color={color}
            style={
              disabled
                ? [styles.opacityDisabled, styles.left]
                : [styles.opacity, styles.left]
            }
            allowFontScaling={false}
          >
            {maximumValue}
          </LabelWrapper>
        </SliderWrapper>
      </View>
    );

    const renderIconSlider = (
      <SliderWrapper>
        <TouchableWithoutFeedback onPress={() => this.handleSubtract()}>
          <IconWrapper>
            <Icon
              name="minus"
              size={iconSize}
              color={disabled ? colors.sensitiveGreyDarkest : colorIcon}
              style={[
                disabled ? styles.opacityDisabledIcon : styles.opacity,
                styles.rightIcon,
              ]}
            />
          </IconWrapper>
        </TouchableWithoutFeedback>
        {renderSlider}
        <TouchableWithoutFeedback onPress={() => this.handleAdd()}>
          <IconWrapper>
            <Icon
              name="plus"
              size={iconSize}
              color={disabled ? colors.sensitiveGreyDarkest : colorIcon}
              style={[
                disabled ? styles.opacityDisabledIcon : styles.opacity,
                styles.leftIcon,
              ]}
            />
          </IconWrapper>
        </TouchableWithoutFeedback>
      </SliderWrapper>
    );

    return (
      <ThemeProvider theme={themeObj}>
        {icon ? renderIconSlider : renderTextSlider}
      </ThemeProvider>
    );
  }
}

Slider.propTypes = {
  minimumValue: number,
  maximumValue: number,
  value: number,
  step: number,
  maximumTrackTintColor: string,
  minimumTrackTintColor: string,
  thumbTintColor: string,
  valueFontFamily: string,
  valueFontSize: number,
  valueFontWeight: number,
  valueLineHeight: number,
  onSlidingComplete: func,
  onSlidingStart: func,
  sliderWidth: number,
  valueColor: string,
  disabled: bool,
  fontFamily: string,
  fontSize: number,
  fontWeight: number,
  color: string,
  icon: bool,
  iconSize: number,
  trackStyle: ViewPropTypes.style,
  thumbStyle: ViewPropTypes.style,
  iconColor: string,
  sliderLabel: string,
  labelFontFamily: string,
  labelFontSize: number,
  labelFontWeight: number,
  labelLineHeight: number,
  labelColor: string,
  labelStyle: object,
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

Slider.defaultProps = {
  value: 0,
  step: 1,
  minimumValue: 0,
  maximumValue: 100,
  maximumTrackTintColor: colors.sensitiveGreyDarkest,
  valueFontFamily: fonts.Black,
  valueFontSize: 18,
  labelFontFamily: fonts.Regular,
  labelFontSize: 12,
  labelLineHeight: 15,
  labelColor: colors.richBlackDefault,
  sliderWidth: width < 350 ? 200 : 250,
  fontFamily: fonts.Regular,
  fontSize: 16,
  color: colors.richBlackLightest,
  iconSize: 24,
  themeName: defaultThemeName,
  labelStyle: {
    ...(Platform.OS === 'android'
      ? {
          marginBottom: 5,
          ...(width === 320
            ? {
                marginLeft: 15,
              }
            : {
                marginLeft: 20.5,
              }),
        }
      : {
          marginBottom: 25,
          ...(width < 350
            ? {
                marginLeft: 14,
              }
            : {
                paddingLeft: 20,
              }),
        }),
  },
};

export default Slider;
