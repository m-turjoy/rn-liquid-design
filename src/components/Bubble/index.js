import React from 'react'
import { Animated, Easing } from 'react-native'
import { ThemeProvider } from 'styled-components'
import { string, number, bool, PropTypes } from 'prop-types'
import { StyledBubble, StyledIcon, AnimatedBubble } from './styled'
import { colors, fonts, theme } from '../../config'
import { defaultThemeName, getThemeObject } from '../../config/theme'
import Icon from '../MerckIcons'
import styles from './styles'

class Bubble extends React.Component {
  constructor(props) {
    super(props)
    this.animatedBubble = new Animated.Value(0)
  }

  componentDidMount() {
    const { size } = this.props
    this.animationSequence(size)
  }

  animationSequence = (size) => {
    const animationDuration = 225
    Animated.timing(this.animatedBubble, {
      easing: Easing.elastic(0.9),
      toValue: size,
      duration: animationDuration,
      delay: animationDuration
    }).start()
  }

  renderNotificationIcon = (color, fontSize, fontFamily, textAlign, notifications) => (
    <StyledIcon
      color={color}
      fontSize={fontSize}
      fontFamily={fontFamily}
      textAlign={textAlign}
    >
      {/* eslint-disable-next-line */
      notifications > 0 ? (notifications > 99 ? '99' : notifications) : '0'}
    </StyledIcon>
  )

  renderInfoIcon = () => {
    const { iconSize } = this.props

    return <Icon
      color={colors.white}
      name='information'
      size={iconSize}
      style={styles.iconStyle}
    />
  }
  renderWarningIcon = () => {
    const { iconSize } = this.props

    return <Icon
      color={colors.white}
      name='attention'
      size={iconSize}
      style={styles.iconStyle}
    />
  }
  render() {
    const animatedBubble = { width: this.animatedBubble, height: this.animatedBubble }

    const {
      alignItems,
      backgroundColor,
      borderRadius,
      color,
      disabled,
      fontSize,
      fontFamily,
      info,
      justifyContent,
      notifications,
      right,
      size,
      textAlign,
      top,
      warning,
      disabledAnimation,
      themeName
    } = this.props

    const themeObj = getThemeObject(themeName)
    const primaryColor = backgroundColor || themeObj.colors.primary.base

    return (
      <ThemeProvider
        theme={themeObj}
      >
        <StyledBubble
          alignItems='center'
          height={size}
          justifyContent='center'
          width={size}
        >
          <AnimatedBubble
            alignItems={alignItems}
            bg={
              (info && colors.vibrantYellowDefault) ||
              (warning && colors.richRedDefault) ||
              (disabled && colors.richBlackLightest) ||
              primaryColor
            }
            borderRadius={borderRadius}
            justifyContent={justifyContent}
            right={right}
            style={[{ width: size, height: size }, !disabledAnimation && animatedBubble]}
            top={top}
          >
            {(notifications &&
              this.renderNotificationIcon(color, fontSize, fontFamily, textAlign, notifications)) ||
              (info && this.renderInfoIcon()) ||
              (warning && this.renderWarningIcon())}
          </AnimatedBubble>
        </StyledBubble>
      </ThemeProvider>
    )
  }
}

Bubble.defaultProps = {
  alignItems: 'center',
  borderRadius: 50,
  color: colors.white,
  disabled: false,
  fontSize: 3,
  fontFamily: fonts.Black,
  info: false,
  justifyContent: 'center',
  size: 30,
  iconSize: 14,
  textAlign: 'center',
  warning: false,
  disabledAnimation: false,
  themeName: defaultThemeName
}

Bubble.propTypes = {
  alignItems: string,
  backgroundColor: string,
  borderRadius: number,
  color: string,
  disabled: bool,
  fontSize: number,
  fontFamily: string,
  iconSize: number,
  info: bool,
  justifyContent: string,
  notifications: number,
  right: number,
  size: number,
  textAlign: string,
  top: number,
  warning: bool,
  disabledAnimation: bool,
  themeName: string
}

export default Bubble
