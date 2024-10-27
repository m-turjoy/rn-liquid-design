import React, { Component } from 'react'
import { bool, number, func, object, oneOfType, shape, string } from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { colors, fonts } from '../../config'
import {
  ButtonTouchableWrapper,
  Title,
  GhostButtonWrapper,
  TitleIconWrapper,
  IconWrapper,
  TitleWrapper
} from './styled'
import Icon from '../MerckIcons'
import { defaultThemeName, getThemeObject } from '../../config/theme'

class GhostButton extends Component {
  constructor(props) {
    super(props)
    const theme = getThemeObject(this.props.themeName)
    this.state = {
      theme,
      defaultActive: fonts.Bold,
      titleIconActive: 'normal',
      titleIconColor: colors.richBlackDefault,
      icon: this.props.icon,
      color: this.props.color
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.themeName !== this.props.themeName) {
      const theme = getThemeObject(nextProps.themeName)
      this.setState({
        theme
      })
    }
    if (nextProps.icon !== this.props.icon) {
      this.setState({
        icon: nextProps.icon
      })
    }
    if (nextProps.color !== this.props.color) {
      this.setState({
        color: nextProps.color
      })
    }
  }

  handleDefaultActiveBoldShow = () => {
    this.setState({ defaultActive: fonts.Black })
  }

  handleDefaultActiveBoldHide = () => {
    this.setState({ defaultActive: fonts.Bold })
  }

  handleIconActiveBoldShow = (color) => {
    this.setState({ titleIconActive: 900, titleIconColor: color })
  }

  handleIconActiveBoldHide = () => {
    this.setState({ titleIconActive: 'normal', titleIconColor: colors.richBlackDefault })
  }

  handleShowUnderlay = (iconLeft, iconRight, primaryColor) => {
    const { active } = this.props
    if (active) return null
    if (iconLeft || iconRight) {
      this.handleIconActiveBoldShow(primaryColor)
    } else {
      this.handleDefaultActiveBoldShow()
    }
  }

  handleHideUnderlay = (iconLeft, iconRight) => {
    const { active } = this.props
    if (active) return null
    if (iconLeft || iconRight) {
      this.handleIconActiveBoldHide()
    } else {
      this.handleDefaultActiveBoldHide()
    }
  }

  renderDefaultButton = (
    title,
    primaryColor,
    fontFamily,
    fontSize,
    titleStyle,
    disabled,
    Big,
    fontWeight,
    active,
    containerStyle
  ) => (
    <GhostButtonWrapper
      alignItems='center'
      justifyContent='center'
      paddingHorizontal={30}
      style={containerStyle}
    >
      <Title
        color={disabled ? colors.sensitiveGreyDarkest : primaryColor}
        fontFamily={active ? fonts.Black : this.state.defaultActive || fontFamily}
        fontSize={Big ? 16 : fontSize}
        fontWeight={fontWeight}
        style={titleStyle}
      >
        {title}
      </Title>
    </GhostButtonWrapper>
  )

  renderButtonWithLeftIcon = (
    title,
    primaryColor,
    fontFamily,
    fontSize,
    titleStyle,
    disabled,
    Big,
    fontWeight,
    active,
    icon,
    iconLeft,
    containerStyle,
    titleIconWrapperStyle
  ) => (
    <TitleIconWrapper
      alignItems='center'
      flexDirection='row'
      justifyContent='center'
      style={containerStyle}
    >
      <IconWrapper
        alignItems='center'
        justifyContent='center'
        marginRight={5}
        marginLeft={0}
      >
        <Icon
          color={
            disabled
              ? colors.sensitiveGreyDarkest
              : this.state.icon.color !== undefined
                ? this.state.icon.color
                : primaryColor
          }
          name={this.state.icon.name || 'placeholder'}
          size={icon.size || Big ? 18 : 16}
        />
      </IconWrapper>
      <TitleWrapper
        style={titleIconWrapperStyle}
      >
        <Title
          color={
            disabled
              ? colors.sensitiveGreyDarkest
              : (active && primaryColor) || this.state.titleIconColor || colors.richBlackDefault
          }
          fontFamily={fontFamily}
          fontSize={Big ? 16 : fontSize}
          fontWeight={active ? 900 : this.state.titleIconActive || fontWeight}
          style={titleStyle}
          numberOfLines={1}
        >
          {title}
        </Title>
      </TitleWrapper>
    </TitleIconWrapper>
  )

  renderButtonWithRightIcon = (
    title,
    primaryColor,
    fontFamily,
    fontSize,
    titleStyle,
    disabled,
    Big,
    fontWeight,
    active,
    icon,
    containerStyle,
    titleIconWrapperStyle
  ) => (
    <TitleIconWrapper
      alignItems='center'
      flexDirection='row'
      justifyContent='center'
      style={containerStyle}
    >
      <TitleWrapper
        alignItems='flex-end'
        style={titleIconWrapperStyle}
      >
        <Title
          color={
            disabled
              ? colors.sensitiveGreyDarkest
              : (active && primaryColor) || this.state.titleIconColor || colors.richBlackDefault
          }
          fontFamily={fontFamily}
          fontSize={Big ? 16 : fontSize}
          fontWeight={active ? 900 : this.state.titleIconActive || fontWeight}
          style={titleStyle}
        >
          {title}
        </Title>
      </TitleWrapper>
      <IconWrapper
        alignItems='center'
        justifyContent='center'
        paddingRight={0}
        paddingLeft={5}
      >
        <Icon
          color={disabled ? colors.sensitiveGreyDarkest : primaryColor}
          name={this.state.icon.name || 'placeholder'}
          size={icon.size || Big ? 18 : 16}
        />
      </IconWrapper>
    </TitleIconWrapper>
  )

  render() {
    const {
      title,
      onPress,
      titleStyle,
      disabled,
      active,
      icon,
      iconLeft,
      iconRight,
      fontFamily,
      fontSize,
      fontWeight,
      Big,
      containerStyle,
      titleIconWrapperStyle,
      themeName
    } = this.props

    const { theme, color } = this.state

    const themeObj = getThemeObject(themeName)
    const primaryColor = color || theme.colors.primary.base

    return (
      <ThemeProvider
        theme={themeObj}
      >
        <ButtonTouchableWrapper
          disabled={disabled}
          onPress={onPress}
          onShowUnderlay={() => {
            this.handleShowUnderlay(iconLeft, iconRight, primaryColor)
          }}
          onHideUnderlay={() => {
            this.handleHideUnderlay(iconLeft, iconRight)
          }}
          activeOpacity={1}
          underlayColor='transparent'
        >
          {(iconLeft &&
            !iconRight &&
            icon &&
            this.renderButtonWithLeftIcon(
              title,
              primaryColor,
              fontFamily,
              fontSize,
              titleStyle,
              disabled,
              Big,
              fontWeight,
              active,
              icon,
              iconLeft,
              containerStyle,
              titleIconWrapperStyle
            )) ||
            (iconRight &&
              !iconLeft &&
              icon &&
              this.renderButtonWithRightIcon(
                title,
                primaryColor,
                fontFamily,
                fontSize,
                titleStyle,
                disabled,
                Big,
                fontWeight,
                active,
                icon,
                containerStyle,
                titleIconWrapperStyle
              )) ||
            this.renderDefaultButton(
              title,
              primaryColor,
              fontFamily,
              fontSize,
              titleStyle,
              disabled,
              Big,
              fontWeight,
              active,
              containerStyle
            )}
        </ButtonTouchableWrapper>
      </ThemeProvider>
    )
  }
}

Title.propTypes = {
  color: string
}

GhostButton.defaultProps = {
  onPress: () => {},
  Big: false,
  iconLeft: false,
  iconRight: false,
  icon: {},
  title: 'Text',
  disabled: false,
  fontSize: 3,
  fontFamily: 'Regular',
  titleStyle: {},
  active: false,
  themeName: defaultThemeName,
  fontWeight: '',
  containerStyle: {
    paddingHorizontal: 30,
    height: 30
  }
}

GhostButton.propTypes = {
  icon: shape({}),
  titleStyle: shape({}),
  iconLeft: bool,
  iconRight: bool,
  onPress: func,
  disabled: bool,
  Big: bool,
  title: string,
  fontSize: number,
  fontFamily: string,
  color: string,
  active: bool,
  fontWeight: oneOfType([string, number]),
  titleIconWrapperStyle: object,
  containerStyle: object,
  themeName: oneOfType([
    string,
    shape({
      primary: shape({
        lightest: string,
        light: string,
        base: string,
        dark: string,
        darker: string
      }).isRequired,
      secondary: shape({
        lightest: string,
        light: string,
        base: string,
        dark: string,
        darker: string
      }).isRequired
    })
  ])
}

export default GhostButton
