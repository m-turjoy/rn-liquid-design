import { Platform } from 'react-native'
import colors from './colors'
import fonts from './fonts'

const theme = {
  fontWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  widths: [50, 100, 130],
  heights: {
    Default: 40,
    Big: 50
  },
  fontSizes: [8, 10, 12, 14, 16, 18, 20, 24, 36],
  space: [0, 1, 2, 5, 10, 15, 20, 24, 50, 8, 7, 4, 9, 6],
  fonts,
  shadows: {
    default: {},
    active: {
      shadowColor: colors.richBlackDefault,
      shadowOpacity: 0.3,
      shadowOffset: '0px 30px',
      shadowRadius: 20,
      elevation: 40
    },
    stacked: {
      shadowColor: colors.richBlackDefault,
      shadowOpacity: 0.3,
      shadowOffset: '0px 30px',
      shadowRadius: 20,
      elevation: 25
    }
  },
  stacked: {
    stackedFirst: {
      position: 'absolute',
      zIndex: 10,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.sensitiveGreyDark,
      ...(Platform.OS === 'android'
        ? {
          borderLeftWidth: 1,
          borderRightColor: colors.sensitiveGreyDark,
          borderLeftColor: colors.white,
          borderBottomColor: colors.sensitiveGreyDark,
          borderBottomLeftRadius: 10
        }
        : {})
    },
    stackedSecond: {
      position: 'absolute',
      zIndex: 9,
      top: 3,
      left: 3,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.sensitiveGreyDark,
      ...(Platform.OS === 'android'
        ? {
          borderLeftWidth: 1,
          borderRightColor: colors.sensitiveGreyDark,
          borderLeftColor: colors.white,
          borderBottomColor: colors.sensitiveGreyDark,
          borderBottomLeftRadius: 10
        }
        : {})
    },
    stackedThird: {
      zIndex: 8,
      top: 6,
      left: 6,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.sensitiveGreyDark,
      ...(Platform.OS === 'android'
        ? {
          borderLeftWidth: 1,
          borderRightColor: colors.sensitiveGreyDark,
          borderLeftColor: colors.white,
          borderBottomColor: colors.sensitiveGreyDark,
          borderBottomLeftRadius: 10
        }
        : {})
    }
  }
}

const themeColors = {
  richPurple: {
    lightest: colors.richPurpleLightest,
    lighter: colors.richPurpleLighter,
    light: colors.richPurpleLight,
    base: colors.richPurpleDefault,
    dark: colors.richPurpleDark,
    darker: colors.richPurpleDarker,
    darkest: colors.richPurpleDarkest
  },
  vibrantMagenta: {
    lightest: colors.vibrantMagentaLightest,
    lighter: colors.vibrantMagentaLighter,
    light: colors.vibrantMagentaLight,
    base: colors.vibrantMagentaDefault,
    dark: colors.vibrantMagentaDark,
    darker: colors.vibrantMagentaDarker,
    darkest: colors.vibrantMagentaDarkest
  },
  richBlue: {
    lightest: colors.richBlueLightest,
    lighter: colors.richBlueLighter,
    light: colors.richBlueLight,
    base: colors.richBlueDefault,
    dark: colors.richBlueDark,
    darker: colors.richBlueDarker,
    darkest: colors.richBlueDarkest
  },
  vibrantCyan: {
    lightest: colors.vibrantCyanLightest,
    lighter: colors.vibrantCyanLighter,
    light: colors.vibrantCyanLight,
    base: colors.vibrantCyanDefault,
    dark: colors.vibrantCyanDark,
    darker: colors.vibrantCyanDarker,
    darkest: colors.vibrantCyanDarkest
  },
  vibrantYellow: {
    lightest: colors.vibrantYellowLightest,
    lighter: colors.vibrantYellowLighter,
    light: colors.vibrantYellowLight,
    base: colors.vibrantYellowDefault,
    dark: colors.vibrantYellowDark,
    darker: colors.vibrantYellowDarker,
    darkest: colors.vibrantYellowDarkest
  },
  vibrantGreen: {
    lightest: colors.vibrantgGreenLightest,
    lighter: colors.vibrantgGreenLighter,
    light: colors.vibrantgGreenLight,
    base: colors.vibrantgGreenDefault,
    dark: colors.vibrantgGreenDark,
    darker: colors.vibrantgGreenDarker,
    darkest: colors.vibrantgGreenDarkest
  },
  richRed: {
    lightest: colors.richRedLightest,
    lighter: colors.richRedLighter,
    light: colors.richRedLight,
    base: colors.richRedDefault,
    dark: colors.richRedDark,
    darker: colors.richRedDarker,
    darkest: colors.richRedDarkest
  },
  richBlack: {
    lightest: colors.richBlackCyanLightest,
    lighter: colors.richBlackCyanLighter,
    light: colors.richBlackCyanLight,
    base: colors.richBlackCyanDefault,
    dark: colors.richBlackCyanDark,
    darker: colors.richBlackCyanDarker,
    darkest: colors.richBlackCyanDarkest
  },
  sensitiveGrey: {
    lightest: colors.sensitiveGreyLightest,
    lighter: colors.sensitiveGreyLighter,
    light: colors.sensitiveGreyLight,
    base: colors.sensitiveGreyDefault,
    dark: colors.sensitiveGreyDark,
    darker: colors.sensitiveGreyDarker,
    darkest: colors.sensitiveGreyDarkest
  },
  white: {
    base: colors.white
  },
  richGreen: {
    lightest: colors.richGreenLightest,
    lighter: colors.richGreenLighter,
    light: colors.richGreenLight,
    base: colors.richGreenDefault,
    dark: colors.richGreenDark,
    darker: colors.richGreenDarker,
    darkest: colors.richGreenDarkest
  },
  black: {
    base: colors.black
  }
}

const getTheme = ({ primary, secondary }, props = {}) => ({
  colors: {
    primary: {
      lightest: colors[`${primary}Lightest`],
      light: colors[`${primary}Light`],
      base: colors[`${primary}Default`],
      dark: colors[`${primary}Dark`],
      darker: colors[`${primary}Darker`]
    },
    secondary: {
      lightest: colors[`${secondary}Lightest`],
      light: colors[`${secondary}Light`],
      base: colors[`${secondary}Default`],
      dark: colors[`${secondary}Dark`],
      darker: colors[`${secondary}Darker`]
    },
    ...themeColors
  },
  ...theme,
  ...props
})

const themes = {
  vibrantCyan: getTheme({
    primary: 'vibrantCyan',
    secondary: 'vibrantYellow'
  }),
  richBlue: getTheme({
    primary: 'richBlue',
    secondary: 'vibrantYellow'
  }),
  richPurple: getTheme(
    {
      primary: 'richPurple',
      secondary: 'vibrantCyan'
    }
  ),
  vibrantMagenta: getTheme(
    {
      primary: 'vibrantMagenta',
      secondary: 'richPurple'
    }
  )
}

export const defaultThemeName = 'vibrantCyan'
export const defaultTheme = themes[defaultThemeName]

export const getThemeObject = (theme) => {
  let themeObject = null
  if (theme && typeof theme === 'object') {
    themeObject = { ...themes[defaultThemeName] }
    themeObject.colors = { ...theme, ...themeColors }
  }
  if (typeof theme === 'string') {
    themeObject = themes[theme]
    if (!themeObject) {
      const themesString = Object.keys(themes).join(', ')
      throw new Error(
        `Invalid theme name specified. Choose one from following: ${themesString}.`
      )
    }
  }

  return themeObject
}

export default { theme, themes }
