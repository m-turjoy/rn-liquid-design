import React, { PureComponent } from 'react';
import { Animated, Platform, TouchableWithoutFeedback } from 'react-native';
import { bool, number, object, string, func } from 'prop-types';
import { fonts } from '../../../config';
import { TextWrapper, PaginationDotWrapper } from './styled';

class PaginationDot extends PureComponent {
  render() {
    const {
      active,
      carouselRef,
      index,
      fontSize,
      fontFamily,
      fontWeight,
      lineHeight,
      inactiveTextColor,
      activeTextColor,
      activeBackgroundColor,
      itemWidth,
      itemHeight,
      itemPaddingLeft,
      itemPaddingRight,
      activeFontWeight,
      disabled,
      onDotPress,
    } = this.props;

    const onPress = () => {
      if (onDotPress) {
        onDotPress(index);
      }
      setTimeout(
        () =>
          carouselRef &&
          carouselRef._snapToItem(carouselRef._getPositionIndex(index)),
        100
      );
    };

    const dotStyle = {
      backgroundColor: active ? activeBackgroundColor : null,
      width: itemWidth,
      height: itemHeight,
      borderRadius: 6,
      overflow: 'hidden',
    };

    return (
      <PaginationDotWrapper
        paddingLeft={itemPaddingLeft}
        paddingRight={itemPaddingRight}
        opacity={disabled ? 0.5 : 1}
      >
        <TouchableWithoutFeedback onPress={disabled ? null : onPress}>
          <Animated.View style={dotStyle}>
            <TextWrapper
              fontFamily={
                fontFamily !== fonts.Regular
                  ? fontFamily
                  : active
                    ? fonts.Black
                    : fonts.Regular
              }
              fontSize={fontSize}
              fontWeight={active ? activeFontWeight : fontWeight}
              lineHeight={lineHeight}
              color={active ? activeTextColor : inactiveTextColor}
              top={Platform.OS === 'android' ? -5 : -1}
            >
              {index + 1}
            </TextWrapper>
          </Animated.View>
        </TouchableWithoutFeedback>
      </PaginationDotWrapper>
    );
  }
}

PaginationDot.propTypes = {
  active: bool,
  index: number,
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
  carouselRef: object,
  activeFontWeight: number,
  disabled: bool,
  onDotPress: func,
};

export default PaginationDot;
