import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  number,
  oneOfType,
  array,
  object,
  string,
  PropTypes,
} from 'prop-types';
import { colors, theme } from '../../config';
import { getThemeObject } from '../../config/theme';
import { Icon } from '../';

const Logo = ({ color, size, style, themeName }) => {
  let themeObj = getThemeObject(themeName);
  let themeColor = themeObj.colors.primary.base;
  return (
    <ThemeProvider theme={themeObj}>
      <Icon
        name="merckLogo"
        size={size}
        style={style}
        color={color !== colors.richPurpleDefault ? color : themeColor}
      />
    </ThemeProvider>
  );
};

Logo.defaultProps = {
  size: 90,
  style: {},
  color: colors.richPurpleDefault,
  themeName: 'richPurple',
};

Logo.propTypes = {
  size: number,
  style: oneOfType([array, object]),
  color: string,
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

export default Logo;
