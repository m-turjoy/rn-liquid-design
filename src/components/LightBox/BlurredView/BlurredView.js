/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { oneOf, number } from 'prop-types';
import { View, requireNativeComponent } from 'react-native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

class BlurredView extends Component {
  setNativeProps = (nativeProps) => {
    /* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
    if (this._root) {
      this._root.setNativeProps(nativeProps);
    }
  };

  render() {
    return (
      <BlurView
        ref={(e) => (this._root = e)}
        {...this.props}
        style={[this.props.style, { opacity: this.props.isVisible ? 1 : 0 }]}
      />
    );
  }
}

BlurredView.propTypes = {
  ...(ViewPropTypes || View.propTypes),
  blurType: oneOf([
    'dark',
    'light',
    'xlight',
    'prominent',
    'regular',
    'extraDark',
  ]),
  blurAmount: number,
};

BlurredView.defaultProps = {
  blurType: 'light',
  blurAmount: 5,
};

const BlurView = requireNativeComponent('BlurView', BlurView);

module.exports = BlurredView;
