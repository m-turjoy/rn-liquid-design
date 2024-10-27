import React from 'react'
import {
  number,
  string,
  object,
  PropTypes
} from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../config/'
import { IconWrapper } from './styled'
import { defaultThemeName, getThemeObject } from '../../config/theme'

const Icon = ({
  color,
  name,
  size,
  themeName,
  style
}) => {
  let themeObj = getThemeObject(themeName)
  let themeColor = themeObj.colors.primary.base
  return (
    <ThemeProvider
      theme={themeObj}
    >
      <IconWrapper
        size={size}
        name={name}
        color={color || themeColor}
        style={style}
      />
    </ThemeProvider>
  )
}

Icon.propTypes = {
  name: string,
  size: number,
  color: string,
  themeName: PropTypes.oneOfType([
    string,
    PropTypes.shape({
      primary: PropTypes.shape({
        lightest: string,
        light: string,
        base: string,
        dark: string,
        darker: string
      }).isRequired,
      secondary: PropTypes.shape({
        lightest: string,
        light: string,
        base: string,
        dark: string,
        darker: string
      }).isRequired
    })
  ]),
  style: object
}

Icon.defaultProps = {
  themeName: defaultThemeName,
  name: 'home',
  size: 24
}

export default Icon
