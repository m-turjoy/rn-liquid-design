import React, { Component } from 'react'
import { bool, number, func, string, PropTypes } from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { RatingWrapper } from './styled'
import StarDotRating from './StarDotRating'
import { colors } from '../../config'
import { defaultThemeName, getThemeObject } from '../../config/theme'

class Rating extends Component {
  state = {
    activeIndex: this.props.rating
  }

  roundIcon = (value) => {
    const remainder = value % 0.5

    return remainder > 0 ? value - remainder + 0.5 : value
  }

  adjustMaxIcons = maxIcons => Object.keys([...Array(maxIcons)]).map(v => parseInt(v))

  adjustHalfIcon = (index) => {
    const { rating } = this.props
    const roundedRating = this.roundIcon(rating)

    return roundedRating !== index && Math.round(roundedRating) === index
  }

  render() {
    const {
      activeIconColor,
      inactiveIconColor,
      iconSize,
      dot,
      maxIcons,
      disabled,
      onIconPress,
      themeName
    } = this.props
    const themeObj = getThemeObject(themeName)
    const themeColor = themeObj.colors.primary.base
    const interactive = onIconPress && !disabled
    const activeColor = activeIconColor || themeColor

    return (
      <ThemeProvider
        theme={themeObj}
      >
        <RatingWrapper
          justifyContent='center'
          alignItems='center'
          flexDirection='row'
        >
          {this.adjustMaxIcons(maxIcons).map((index) => {
            const ratingNumber = index + 1

            return (
              <StarDotRating
                key={index}
                onIconPress={
                  interactive
                    ? () => {
                        this.setState({ activeIndex: ratingNumber })
                        onIconPress(ratingNumber)
                      }
                    : null
                }
                dot={dot}
                halfIcon={this.adjustHalfIcon(ratingNumber)}
                disabled={disabled}
                active={ratingNumber <= this.state.activeIndex}
                iconSize={iconSize}
                activeIconColor={activeColor}
                inactiveIconColor={inactiveIconColor}
              />
            )
          })}
        </RatingWrapper>
      </ThemeProvider>
    )
  }
}

Rating.propTypes = {
  disabled: bool,
  dot: bool,
  activeIconColor: string,
  inactiveIconColor: string,
  iconSize: number,
  rating: number,
  maxIcons: number,
  onIconPress: func,
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

Rating.defaultProps = {
  disabled: false,
  maxIcons: 5,
  dot: false,
  inactiveIconColor: colors.sensitiveGreyDarkest,
  iconSize: 24,
  rating: 0,
  onIconPress: null,
  themeName: defaultThemeName
}

export default Rating
