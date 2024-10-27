import React, { Component } from 'react'
import {
  bool,
  string,
  number,
  PropTypes
} from 'prop-types'
import {
  Linking,
  Platform
} from 'react-native'
import { ThemeProvider } from 'styled-components'
import {
  fonts,
  theme
} from '../../config'
import {
  LinkText,
  TouchableWrapper,
  ViewWrapper
} from './styled'
import Icon from '../../../src/components/MerckIcons'
import { defaultThemeName, getThemeObject } from '../../config/theme'

class Link extends Component {
  state = {
    changeFontWeight: 400
  }
  render() {
    const {
      text,
      color,
      fontSize,
      fontWeight,
      fontFamily,
      source,
      active,
      inline,
      themeName
    } = this.props
    let themeObj = getThemeObject(themeName)
    let themeColor = themeObj.colors.primary.base
    const primaryColor = color || themeColor

    const adjustFontFamily = () => (active && fonts.Black) || fontFamily
    const adjustFontWeight = () => (active && Platform.OS === 'ios' ? 900
      : this.state.changeFontWeight)

    const renderInline = (
      <LinkText
        {...this.props}
        color={primaryColor}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontFamily={adjustFontFamily(active)}
        source={source}
        onPress={() => Linking.openURL(source)}
        suppressHighlighting
      >
        {text}
      </LinkText>
    )

    const renderLink = (
      <ViewWrapper
        onPress={() => Linking.openURL(source)}
        onShowUnderlay={() => (Platform.OS === 'ios' ?
        this.setState({ changeFontWeight: 900 }) : null)}
        onHideUnderlay={() => (Platform.OS === 'ios' ?
        this.setState({ changeFontWeight: 400 }) : null)}
        underlayColor='transparent'
        activeOpacity={1}
      >
        <TouchableWrapper>
          <Icon
            name='arrowRight'
            size={16}
            color={primaryColor}
          />
          <LinkText
            {...this.props}
            color={primaryColor}
            fontSize={fontSize}
            fontWeight={adjustFontWeight(active)}
            fontFamily={adjustFontFamily(active)}
            source={source}
          >
            {text}
          </LinkText>
        </TouchableWrapper>
      </ViewWrapper>
    )

    return (
      <ThemeProvider
        theme={themeObj}
      >
        {(inline ?
        renderInline
        :
        renderLink
      )}
      </ThemeProvider>
    )
  }
}

Link.defaultProps = {
  fontSize: 16,
  fontFamily: fonts.Regular,
  inline: false,
  android: false,
  themeName: defaultThemeName
}

Link.propTypes = {
  text: string,
  source: string,
  color: string,
  fontSize: number,
  fontFamily: string,
  fontWeight: number,
  active: bool,
  inline: bool,
  android: bool,
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
  ])
}

export default Link
