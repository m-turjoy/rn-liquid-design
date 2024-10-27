import React, { Component } from 'react'
import {
  View,
  Dimensions
} from 'react-native'
import {
  bool,
  number,
  object,
  func,
  array,
  string,
  oneOfType,
  shape
} from 'prop-types'
import { ThemeProvider } from 'styled-components'
import {
  fonts,
  colors
} from '../../config'
import Carousel from './Carousel/Carousel'
import Pagination from './Pagination/Pagination'
import { defaultThemeName, getThemeObject } from '../../config/theme'

const { width } = Dimensions.get('window')

class PaginationCarousel extends Component {
  componentDidMount = () => {
    this.forceUpdate()
  }
  render() {
    const {
      dotsLength,
      activeDotIndex,
      carouselRef,
      windowSize,
      data,
      renderItem,
      onSnapToItem,
      refProp,
      fontFamily,
      fontSize,
      fontWeight,
      activeFontWeight,
      lineHeight,
      activeTextColor,
      inactiveTextColor,
      activeBackgroundColor,
      itemWidth,
      itemHeight,
      itemPaddingLeft,
      itemPaddingRight,
      paginationWidth,
      paginationHeight,
      innerWidth,
      iconPaddingLeft,
      iconPaddingRight,
      sliderHeight,
      disabled,
      themeName,
      iconSize
    } = this.props
    const themeObj = getThemeObject(themeName)
    const themeColor = themeObj.colors.primary.base
    const bgColor = activeBackgroundColor || themeColor

    const pagination =
      <Pagination
        dotsLength={dotsLength}
        activeDotIndex={activeDotIndex}
        carouselRef={carouselRef}
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontWeight={fontWeight}
        activeFontWeight={activeFontWeight}
        lineHeight={lineHeight}
        activeTextColor={activeTextColor}
        inactiveTextColor={inactiveTextColor}
        activeBackgroundColor={disabled ? colors.sensitiveGreyDarker : bgColor}
        itemWidth={itemWidth}
        itemHeight={itemHeight}
        itemPaddingLeft={itemPaddingLeft}
        itemPaddingRight={itemPaddingRight}
        paginationWidth={paginationWidth}
        paginationHeight={paginationHeight}
        innerWidth={innerWidth}
        iconPaddingLeft={iconPaddingLeft}
        iconPaddingRight={iconPaddingRight}
        disabled={disabled}
        iconColor={bgColor}
        iconSize={iconSize}
      />

    return (
      <ThemeProvider
        theme={themeObj}
      >
        <View>
          <Carousel
            windowSize={windowSize}
            ref={refProp}
            sliderWidth={width}
            sliderHeight={sliderHeight - paginationHeight}
            itemWidth={width}
            data={data}
            renderItem={renderItem}
            onSnapToItem={onSnapToItem}
            scrollEnabled={!disabled}
            useScrollView
          />
          {pagination}
        </View>
      </ThemeProvider>

    )
  }
}

PaginationCarousel.propTypes = {
  activeDotIndex: number.isRequired,
  dotsLength: number.isRequired,
  carouselRef: object,
  windowSize: number,
  data: array.isRequired,
  renderItem: func.isRequired,
  onSnapToItem: func.isRequired,
  refProp: func.isRequired,
  innerWidth: number,
  paginationWidth: oneOfType([
    string,
    number
  ]),
  paginationHeight: number,
  iconPaddingLeft: number,
  iconPaddingRight: number,
  sliderHeight: number,
  fontFamily: string,
  fontSize: number,
  fontWeight: number,
  lineHeight: number,
  activeTextColor: string,
  inactiveTextColor: string,
  activeBackgroundColor: string,
  itemWidth: number,
  itemHeight: number,
  itemPaddingLeft: number,
  itemPaddingRight: number,
  activeFontWeight: number,
  disabled: bool,
  iconSize: number,
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

PaginationCarousel.defaultProps = {
  innerWidth: width < 350 ? 130 : 210,
  paginationWidth: '100%',
  paginationHeight: 100,
  iconPaddingLeft: width === 360 ? 6 : 10,
  iconPaddingRight: width === 360 ? 6 : 10,
  sliderHeight: 500,
  fontFamily: fonts.Regular,
  fontSize: 16,
  lineHeight: 26.5,
  activeTextColor: colors.white,
  inactiveTextColor: colors.richBlackDefault,
  itemWidth: 26,
  itemHeight: 26,
  itemPaddingLeft: 8,
  itemPaddingRight: 8,
  activeFontWeight: null,
  disabled: false,
  themeName: defaultThemeName,
  iconSize: 24
}

export default PaginationCarousel
