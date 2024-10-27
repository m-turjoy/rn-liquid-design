import React, { Component } from 'react';
import { string, number } from 'prop-types';
import { Animated } from 'react-native';
import Path from './AnimatedPath';

class AnimatedPath extends Component {
  state = {
    strokeDashoffset: new Animated.Value(-20),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.progress > this.props.progress) {
      this.animate();
    }
    if (nextProps.progress < this.props.progress) {
      this.animateBack();
    }
  }

  animate = () => {
    const { strokeDashoffset } = this.state;
    strokeDashoffset.setValue(-20);
    Animated.sequence([
      Animated.timing(strokeDashoffset, {
        toValue: 0,
        duration: 200,
      }),
    ]).start(() => {
      strokeDashoffset.setValue(0);
    });
  };

  animateBack = () => {
    const { strokeDashoffset } = this.state;
    strokeDashoffset.setValue(1);
    Animated.sequence([
      Animated.timing(strokeDashoffset, {
        toValue: -10,
        duration: 200,
      }),
    ]).start(() => {
      strokeDashoffset.setValue(-10);
    });
  };

  render() {
    const { d, fill, strokeColor, strokeWidth, strokeLinecap } = this.props;

    return (
      <Path
        strokeDasharray={[500, 100]}
        strokeDashoffset={this.state.strokeDashoffset}
        strokeLinecap={strokeLinecap}
        strokeWidth={strokeWidth}
        stroke={strokeColor}
        fill={fill}
        d={d}
      />
    );
  }
}

AnimatedPath.propTypes = {
  d: string.isRequired,
  strokeColor: string,
  strokeWidth: number,
  strokeLinecap: string,
  fill: string,
  progress: number,
};

export default AnimatedPath;
