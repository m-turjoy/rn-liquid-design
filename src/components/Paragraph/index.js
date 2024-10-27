import React from 'react'
import {
  bool,
  object,
  number,
  oneOfType,
  array,
  string
} from 'prop-types'
import { Platform } from 'react-native'
import { ThemeProvider } from 'styled-components'
import {
  colors,
  fonts,
  theme
} from '../../config'
import { ParagraphText } from './styled'
import Link from '../Link'
import { defaultThemeName } from '../../config/theme'

const adjustFontSize = (
  type,
  fontSize
) => (type === 'XLarge' && 22) ||
    (type === 'Large' && 18) ||
    (type === 'Medium' && 16) ||
    (type === 'Small' && 14) ||
    (type === 'XSmall' && 12) ||
    (type === 'Label' && 16) ||
    (type === 'XLabel' && 12) ||
    fontSize

const Paragraph = (props) => {
  const {
    text,
    linkText,
    source,
    withLink,
    active,
    type,
    textStyle,
    color,
    fontSize,
    fontWeight,
    fontFamily,
    letterSpacing,
    themeName
  } = props

  const renderLink = (
    <Link
      themeName={themeName}
      text={linkText}
      source={source}
      inline
      active={active}
      fontSize={adjustFontSize(type, fontSize)}
      fontWeight={Platform.OS === 'ios' && active ? 900 : fontWeight}
      href
    />
  )

  return (
    <ThemeProvider
      theme={theme.themes[themeName]}
    >
      <ParagraphText
        {...props}
        style={textStyle}
        color={color}
        fontSize={adjustFontSize(type, fontSize)}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
        letterSpacing={(type === 'Label' && 0.3) || (type === 'XLabel' && 0.2) || letterSpacing}
      >
        {text}
        {'  '}
        {
          (withLink ?
            renderLink
            : null
          )
        }
      </ParagraphText>
    </ThemeProvider>
  )
}

Paragraph.defaultProps = {
  textStyle: {},
  color: colors.richBlackDefault,
  fontSize: 2,
  fontWeight: 400,
  fontFamily: fonts.Regular,
  letterSpacing: 0,
  themeName: defaultThemeName
}

Paragraph.propTypes = {
  type: string.isRequired,
  text: string.isRequired,
  textStyle: oneOfType([object, number, array]),
  color: string,
  fontSize: number,
  fontWeight: number,
  fontFamily: string,
  letterSpacing: number,
  linkText: string,
  source: string,
  active: bool,
  withLink: bool,
  themeName: string
}

export default Paragraph
