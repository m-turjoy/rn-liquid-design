import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { func, number, string, bool, shape, oneOfType } from 'prop-types';
import Icon from '../MerckIcons';
import { colors, fonts } from '../../config';
import { TagContainer, TagText } from './styled';
import { defaultThemeName, getThemeObject } from '../../config/theme';

class Tag extends React.Component {
  colorOption = (option) => {
    const { outline, disabled, tagColor, disabledColor, themeName } =
      this.props;

    const themeObj = getThemeObject(themeName);
    const themeColor = themeObj.colors.primary.base;
    const primaryColor = tagColor || themeColor;

    switch (option) {
      case 'background':
        if (outline) {
          return colors.transparent;
        }

        if (disabled) {
          return disabledColor;
        }

        return primaryColor;

      case 'border':
        if (outline) {
          if (disabled) {
            return disabledColor;
          }

          return primaryColor;
        }

        return primaryColor;
      default:
        return primaryColor;
    }
  };

  render() {
    const {
      outline,
      borderRadius,
      borderWidth,
      color,
      text,
      width,
      height,
      fontSize,
      fontFamily,
      onPress,
      themeName,
    } = this.props;

    const themeObj = getThemeObject(themeName);

    return (
      <ThemeProvider theme={themeObj}>
        <TagContainer
          width={width}
          height={height}
          backgroundColor={this.colorOption('background')}
          borderColor={this.colorOption('border')}
          borderWidth={outline ? borderWidth : 0}
          justifyContent="space-around"
          flexDirection="row"
          alignItems="center"
          borderRadius={borderRadius}
        >
          <TagText
            color={outline ? this.colorOption('border') : color}
            fontSize={fontSize}
            fontFamily={fontFamily}
            textAlignVertical="center"
          >
            {text}
          </TagText>
          <TouchableOpacity onPress={onPress} activeOpacity={1}>
            <Icon
              size={16}
              color={outline ? this.colorOption('border') : color}
              name="closingX"
              stroke={outline ? this.colorOption('border') : color}
              strokeWidth={1.0}
            />
          </TouchableOpacity>
        </TagContainer>
      </ThemeProvider>
    );
  }
}

Tag.defaultProps = {
  text: 'Tag Label',
  borderRadius: 16,
  borderWidth: 1.5,
  fontSize: 2,
  fontFamily: fonts.Black,
  disabledColor: colors.sensitiveGreyDarkest,
  disabled: false,
  color: colors.white,
  width: 100,
  height: 24,
  outline: false,
  themeName: defaultThemeName,
};

Tag.propTypes = {
  onPress: func,
  text: string,
  borderRadius: number,
  borderWidth: number,
  fontFamily: string,
  fontSize: number,
  disabledColor: string,
  outline: bool,
  disabled: bool,
  color: string,
  tagColor: string,
  width: number,
  height: number,
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
export default Tag;
