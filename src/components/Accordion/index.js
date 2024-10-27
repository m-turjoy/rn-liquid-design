import React, { Component } from 'react';
import {
  array,
  arrayOf,
  func,
  oneOfType,
  oneOf,
  bool,
  number,
  string,
  shape,
} from 'prop-types';
import { View, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { ThemeProvider } from 'styled-components';
import Collapsible from './Collapsible';
import Icon from '../MerckIcons';
import {
  AccordionWrapper,
  TitleWrapper,
  TitleText,
  DescriptionWrapper,
  DescriptionText,
} from './styled';
import { colors, fonts, theme } from '../../config';
import { getThemeObject, defaultThemeName } from '../../config/theme';

const getTransformationAnimation = (animation) => {
  const spin = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  return {
    transform: [{ rotate: spin }],
  };
};

class Accordion extends Component {
  state = {
    activeSections:
      this.props.activeSections !== undefined
        ? this.props.activeSections
        : [this.props.initiallyActiveSection],
    spinValue: [],
  };

  componentDidMount() {
    this.setState({
      spinValue: Array.from(
        Array(this.props.sections.length),
        () => new Animated.Value(0)
      ),
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeSection !== undefined) {
      this.setState({
        activeSection: nextProps.activeSection,
        activeSections: nextProps.activeSections,
      });
    }
  }

  onPress = (key) => {
    if (!this.props.disabled) {
      this.toggleSection(key);

      const animations =
        this.state.activeSections.indexOf(key) === -1
          ? Animated.timing(this.state.spinValue[key], {
              toValue: 1,
              duration: 150,
              easing: Easing.linear,
            }).start()
          : Animated.timing(this.state.spinValue[key], {
              toValue: 0,
              duration: 150,
              easing: Easing.linear,
            }).start();

      return animations;
    }

    return null;
  };

  toggleSection(section) {
    const activeSection =
      this.state.activeSection === section ? false : section;
    const baseSet = this.state.activeSections;
    const pos = baseSet.indexOf(section);
    const activeSections =
      pos !== -1
        ? baseSet.slice(0, pos) + baseSet.slice(pos + 1, baseSet.length)
        : this.props.expandMultiple
          ? this.state.activeSections + [section]
          : [section];

    if (this.props.activeSection === undefined) {
      this.setState({ activeSection, activeSections });
    }
    if (this.props.onChange) {
      this.props.onChange(activeSection);
      this.props.onChange(activeSections);
    }
  }

  handleErrors = () => {
    if (!Array.isArray(this.props.sections)) {
      throw new Error('Sections should be an array');
    }
  };

  renderHeader = (section, key) => {
    const { iconColor, themeName, activeTitleColor } = this.props;

    const themeObj = getThemeObject(themeName);

    const icon = iconColor || themeObj.colors.primary.base;
    const title = activeTitleColor || themeObj.colors.primary.base;

    return (
      <TitleWrapper borderColor={this.props.borderColor}>
        <Animated.View
          style={getTransformationAnimation(this.state.spinValue[key])}
        >
          <Icon name="arrowDown" color={icon} size={this.props.iconSize} />
        </Animated.View>
        <TitleText
          fontFamily={this.props.titleFontFamily}
          fontSize={this.props.titleFontSize}
          fontWeight={this.props.titleFontWeight}
          lineHeight={this.props.titleLineHeight}
          color={
            this.state.activeSections.indexOf(key) === -1
              ? this.props.inactiveTitleColor
              : title
          }
        >
          {section.title}
        </TitleText>
      </TitleWrapper>
    );
  };

  renderContent = (section) => (
    <DescriptionWrapper
      width={this.props.contentWidth}
      height={this.props.contentHeight}
    >
      <DescriptionText
        fontFamily={this.props.contentFontFamily}
        fontSize={this.props.contentFontSize}
        lineHeight={this.props.contentLineHeight}
        fontWeight={this.props.contentFontWeight}
        color={this.props.contentColor}
      >
        {section.content}
      </DescriptionText>
    </DescriptionWrapper>
  );

  render() {
    this.handleErrors();

    const renderCollapsible = (section, key) => (
      <Collapsible
        collapsed={this.state.activeSections.indexOf(key) === -1}
        onAnimationEnd={() => this.props.onAnimationEnd(section, key)}
        duration={this.props.duration}
      >
        {this.renderContent(
          section,
          key,
          this.state.activeSections.indexOf(key) !== -1,
          this.props.sections
        )}
      </Collapsible>
    );

    return (
      <ThemeProvider theme={getThemeObject(this.props.themeName)}>
        <AccordionWrapper
          width={this.props.width}
          borderColor={this.props.borderColor}
        >
          {this.props.sections.map((section, key) => (
            <View key={key.toString()}>
              <TouchableWithoutFeedback onPress={() => this.onPress(key)}>
                {this.renderHeader(
                  section,
                  key,
                  this.state.activeSections.indexOf(key) !== -1,
                  this.props.sections
                )}
              </TouchableWithoutFeedback>

              {renderCollapsible(section, key)}
            </View>
          ))}
        </AccordionWrapper>
      </ThemeProvider>
    );
  }
}

Accordion.propTypes = {
  sections: array.isRequired,
  onChange: func,
  duration: number,
  initiallyActiveSection: number,
  activeSection: oneOfType([bool, number]),
  disabled: bool,
  onAnimationEnd: func,
  width: number,
  borderColor: string,
  titleFontFamily: string,
  titleFontSize: number,
  titleLineHeight: number,
  titleFontWeight: number,
  iconColor: string,
  iconSize: number,
  contentFontFamily: string,
  contentColor: string,
  inactiveTitleColor: string,
  activeTitleColor: string,
  contentFontSize: number,
  contentLineHeight: number,
  contentFontWeight: number,
  contentWidth: string,
  contentHeight: number,
  expandMultiple: bool,
  activeSections: oneOf(arrayOf(string)),
  themeName: oneOfType([
    string,
    shape({
      primary: shape({
        lightest: string,
        light: string,
        base: string,
        dark: string,
        darker: string,
      }).isRequired,
      secondary: shape({
        lightest: string,
        light: string,
        base: string,
        dark: string,
        darker: string,
      }).isRequired,
    }),
  ]),
};

Accordion.defaultProps = {
  disabled: false,
  duration: 200,
  onAnimationEnd: () => null,
  width: 335,
  borderColor: colors.sensitiveGreyDarker,
  titleFontFamily: fonts.Black,
  titleFontSize: 16,
  titleLineHeight: 20,
  contentFontFamily: fonts.Regular,
  inactiveTitleColor: colors.richBlackDefault,
  contentColor: colors.richBlackDefault,
  contentFontSize: 14,
  contentLineHeight: 24.5,
  contentWidth: '100%',
  contentHeight: 125,
  themeName: defaultThemeName,
};

export default Accordion;
