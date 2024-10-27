import React from 'react';
import { Dimensions, TouchableWithoutFeedback, View } from 'react-native';
import { array, bool, func, number, string, PropTypes } from 'prop-types';
import { ThemeProvider } from 'styled-components';
import Icon from '../MerckIcons';
import SearchBar from '../SearchBar';
import Button from '../Button';
import {
  HeaderWrapper,
  LogoWrapper,
  IconsWrapper,
  IconWrapper,
  LabelWrapper,
  Label,
  SearchWrapper,
  BackgroundWrapper,
  ButtonWrapper,
} from './styled';
import { fonts, colors } from '../../config';
import { defaultThemeName, getThemeObject } from '../../config/theme';

const { width } = Dimensions.get('window');

const Header = ({
  headerWidth,
  headerHeight,
  backgroundColor,
  logoColor,
  searchOptions,
  searchTerm,
  onChangeText,
  searchProperty,
  iconsColor,
  withIcons,
  withLabel,
  withButton,
  buttonIconName,
  leftIconName,
  middleIconName,
  rightIconName,
  onLeftIconPress,
  onMiddleIconPress,
  onRightIconPress,
  labelFontFamily,
  labelFontSize,
  labelLineHeight,
  labelColor,
  label1,
  label2,
  onButtonPress,
  themeName,
}) => {
  const themeObj = getThemeObject(themeName);
  const background = backgroundColor || themeObj.colors.primary.base;
  const logo = logoColor || themeObj.colors.secondary.base;

  return (
    <View>
      <BackgroundWrapper
        height={headerHeight}
        width={headerWidth}
        backgroundColor={background}
      />
      <ThemeProvider theme={themeObj}>
        <HeaderWrapper width={headerWidth}>
          <SearchWrapper>
            <LogoWrapper>
              <Icon name="merckLogo" color={logo} size={42} />
            </LogoWrapper>
            <SearchBar
              themeName={themeName}
              height={headerHeight}
              searchOptions={searchOptions}
              searchProperty={searchProperty}
              searchTerm={searchTerm}
              onChangeText={onChangeText}
              keyExtractor={(item) => item.text}
              ghost
              isHeader
              placeholderTextColor={colors.white}
              inputTextColor={colors.white}
              iconColorActive={colors.white}
              width={
                withIcons && width < 350
                  ? 125
                  : width < 350
                    ? 180
                    : withIcons
                      ? 180
                      : withLabel
                        ? 230
                        : 250
              }
              rowStyle={{
                width:
                  withIcons && width < 350
                    ? 125
                    : width < 350
                      ? 180
                      : withIcons
                        ? 180
                        : withLabel
                          ? 230
                          : 250,
              }}
              iconSize={20}
              iconColor={colors.white}
              withHeader
            />
          </SearchWrapper>
          {withIcons ? (
            <IconsWrapper>
              <TouchableWithoutFeedback onPress={onLeftIconPress}>
                <IconWrapper>
                  <Icon name={leftIconName} color={iconsColor} />
                </IconWrapper>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={onMiddleIconPress}>
                <IconWrapper>
                  <Icon name={middleIconName} color={iconsColor} />
                </IconWrapper>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={onRightIconPress}>
                <IconWrapper>
                  <Icon name={rightIconName} color={iconsColor} />
                </IconWrapper>
              </TouchableWithoutFeedback>
            </IconsWrapper>
          ) : withButton ? (
            <ButtonWrapper>
              <Button
                onPress={onButtonPress}
                secondary
                icon={{
                  name: buttonIconName,
                }}
                themeName={themeName}
              />
            </ButtonWrapper>
          ) : withLabel ? (
            <LabelWrapper height={headerHeight}>
              <Label
                fontFamily={fonts.Black || labelFontFamily}
                fontSize={labelFontSize}
                color={labelColor}
                lineHeight={labelLineHeight}
              >
                {label1}
              </Label>
              <Label
                fontFamily={labelFontFamily}
                fontSize={labelFontSize}
                color={labelColor}
                lineHeight={labelLineHeight}
              >
                {label2}
              </Label>
            </LabelWrapper>
          ) : null}
        </HeaderWrapper>
      </ThemeProvider>
    </View>
  );
};

Header.propTypes = {
  headerWidth: number,
  headerHeight: number,
  backgroundColor: string,
  logoColor: string,
  searchOptions: array.isRequired,
  searchTerm: string,
  onChangeText: func,
  searchProperty: string.isRequired,
  onButtonPress: func,
  iconsColor: string,
  withIcons: bool,
  withLabel: bool,
  withButton: bool,
  buttonIconName: string,
  leftIconName: string,
  middleIconName: string,
  rightIconName: string,
  onLeftIconPress: func,
  onMiddleIconPress: func,
  onRightIconPress: func,
  labelFontFamily: string,
  labelFontSize: number,
  labelLineHeight: number,
  labelColor: string,
  label1: string,
  label2: string,
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

Header.defaultProps = {
  headerWidth: width,
  headerHeight: 60,
  iconsColor: colors.white,
  leftIconName: 'bell',
  middleIconName: 'information1',
  rightIconName: 'settings',
  buttonIconName: 'placeholder',
  onLeftIconPress: () => {},
  onMiddleIconPress: () => {},
  onRightIconPress: () => {},
  labelFontFamily: fonts.Regular,
  labelFontSize: 12,
  labelLineHeight: 15,
  labelColor: colors.white,
  onButtonPress: () => {},
  themeName: defaultThemeName,
};

export default Header;
