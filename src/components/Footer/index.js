import React, { Component } from 'react';
import { Dimensions, TouchableWithoutFeedback, FlatList } from 'react-native';
import { arrayOf, number, string, func, shape } from 'prop-types';
import { ThemeProvider } from 'styled-components';
import {
  FooterWrapper,
  LineWrapper,
  LabelWrapper,
  IconsWrapper,
  SecondaryIconsWrapper,
  SecondaryCenterIcon,
} from './styled';
import Headline from '../Headline';
import Icon from '../MerckIcons';
import { theme, fonts, colors } from '../../config';

const { width } = Dimensions.get('window');

class Footer extends Component {
  renderItem = ({ item }) => {
    const { labelFontFamily, labelFontSize, labelLineHeight, labelColor } =
      this.props;

    return (
      <TouchableWithoutFeedback onPress={item.onPress}>
        <LabelWrapper
          fontFamily={labelFontFamily}
          fontSize={labelFontSize}
          lineHeight={labelLineHeight}
          color={labelColor}
        >
          {item.title}
        </LabelWrapper>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {
      backgroundColor,
      headlineType,
      headlineText,
      lineColor,
      lineWidth,
      lineHeight,
      footerWidth,
      labels,
      primaryIconName,
      primaryIconColor,
      primaryIconSize,
      onPrimaryIconPress,
      secondaryLeftIconName,
      secondaryLeftIconColor,
      secondaryLeftIconSize,
      onSecondaryLeftIconPress,
      secondaryCenterIconName,
      secondaryCenterIconColor,
      secondaryCenterIconSize,
      onSecondaryCenterIconPress,
      secondaryRightIconName,
      secondaryRightIconColor,
      secondaryRightIconSize,
      onSecondaryRightIconPress,
    } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <FooterWrapper backgroundColor={backgroundColor} width={footerWidth}>
          <Headline type={headlineType} text={headlineText} />
          <LineWrapper
            backgroundColor={lineColor}
            width={lineWidth}
            height={lineHeight}
          />
          <FlatList
            data={labels}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.key.toString()}
            scrollEnabled={false}
          />
          <IconsWrapper>
            <TouchableWithoutFeedback onPress={onPrimaryIconPress}>
              <Icon
                name={primaryIconName}
                color={primaryIconColor}
                size={primaryIconSize}
              />
            </TouchableWithoutFeedback>
            <SecondaryIconsWrapper>
              <TouchableWithoutFeedback onPress={onSecondaryLeftIconPress}>
                <Icon
                  name={secondaryLeftIconName}
                  color={secondaryLeftIconColor}
                  size={secondaryLeftIconSize}
                />
              </TouchableWithoutFeedback>
              <SecondaryCenterIcon>
                <TouchableWithoutFeedback onPress={onSecondaryCenterIconPress}>
                  <Icon
                    name={secondaryCenterIconName}
                    color={secondaryCenterIconColor}
                    size={secondaryCenterIconSize}
                  />
                </TouchableWithoutFeedback>
              </SecondaryCenterIcon>
              <TouchableWithoutFeedback onPress={onSecondaryRightIconPress}>
                <Icon
                  name={secondaryRightIconName}
                  color={secondaryRightIconColor}
                  size={secondaryRightIconSize}
                />
              </TouchableWithoutFeedback>
            </SecondaryIconsWrapper>
          </IconsWrapper>
        </FooterWrapper>
      </ThemeProvider>
    );
  }
}

Footer.propTypes = {
  backgroundColor: string,
  headlineType: string,
  headlineText: string,
  lineColor: string,
  lineWidth: string,
  lineHeight: number,
  footerWidth: number,
  labels: arrayOf(
    shape({
      key: number.isRequired,
      title: string.isRequired,
      onPress: func,
    })
  ),
  labelFontFamily: string,
  labelFontSize: number,
  labelLineHeight: number,
  labelColor: string,
  primaryIconName: string,
  primaryIconColor: string,
  primaryIconSize: number,
  onPrimaryIconPress: func,
  secondaryLeftIconName: string,
  secondaryLeftIconColor: string,
  secondaryLeftIconSize: number,
  onSecondaryLeftIconPress: func,
  secondaryCenterIconName: string,
  secondaryCenterIconColor: string,
  secondaryCenterIconSize: number,
  onSecondaryCenterIconPress: func,
  secondaryRightIconName: string,
  secondaryRightIconColor: string,
  secondaryRightIconSize: number,
  onSecondaryRightIconPress: func,
};

Footer.defaultProps = {
  backgroundColor: colors.sensitiveGreyDefault,
  headlineType: 'H4',
  headlineText: 'Get started today and bring your business idea to life.',
  lineColor: colors.sensitiveGreyDarkest,
  lineWidth: '100%',
  lineHeight: 1,
  footerWidth: width,
  labelFontFamily: fonts.Regular,
  labelFontSize: 12,
  labelLineHeight: 15,
  labelColor: colors.richBlackDefault,
  primaryIconName: 'placeholder',
  primaryIconColor: colors.richBlackDefault,
  primaryIconSize: 24,
  onPrimaryIconPress: () => {},
  secondaryLeftIconName: 'placeholder',
  secondaryLeftIconColor: colors.richBlackDefault,
  secondaryLeftIconSize: 24,
  onSecondaryLeftIconPress: () => {},
  secondaryCenterIconName: 'placeholder',
  secondaryCenterIconColor: colors.richBlackDefault,
  secondaryCenterIconSize: 24,
  onSecondaryCenterIconPress: () => {},
  secondaryRightIconName: 'placeholder',
  secondaryRightIconColor: colors.richBlackDefault,
  secondaryRightIconSize: 24,
  onSecondaryRightIconPress: () => {},
};

export default Footer;
