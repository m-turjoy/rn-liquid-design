import React from 'react'
import { StyleSheet, Animated, View } from 'react-native'
import {
  string,
  bool
} from 'prop-types'
import Icon from '../../MerckIcons'

const styles = StyleSheet.create({
  heart: {
    width: 50,
    height: 50,
    overflow: 'hidden'
  },
  heartShape: {
    position: 'absolute',
    top: 12,
    left: 12
  },
  decorative: {
    height: 7,
    width: 2,
    borderRadius: 2
  }
})

const AnimatedHeart = ({
  filled,
  style,
  isHeart,
  activeColor,
  defaultColor
}) => {
  const fillStyle = filled ? { color: activeColor } : { color: defaultColor }
  const decorativeStyle = filled ? { backgroundColor: activeColor } : null

  if (!isHeart) {
    return (
      <Animated.View
        style={style}
      >
        <View
          style={[styles.decorative, decorativeStyle]}
        />
      </Animated.View>
    )
  }

  return (
    <Animated.View
      style={[styles.heart, style]}
    >
      <Icon
        name='favorite'
        style={[styles.heartShape, fillStyle]}
      />
    </Animated.View>
  )
}

AnimatedHeart.propTypes = {
  filled: bool,
  isHeart: bool,
  activeColor: string,
  defaultColor: string
}

export default AnimatedHeart
