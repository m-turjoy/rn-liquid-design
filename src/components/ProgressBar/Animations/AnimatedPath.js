import React, { Component } from 'react';
import { Path } from 'react-native-svg';
import { Animated } from 'react-native';

const AnimatedSVG = (path) => Animated.createAnimatedComponent(path);

class AnimatedPath extends Component {
  setNativeProps = (props) => {
    this.component && this.component.setNativeProps(props);
  };

  render() {
    return (
      <Path ref={(component) => (this.component = component)} {...this.props} />
    );
  }
}

export default AnimatedSVG(AnimatedPath);
