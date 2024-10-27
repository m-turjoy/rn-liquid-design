import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import { bool, func, node, number } from 'prop-types';

class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measuring: false,
      measured: false,
      height: new Animated.Value(props.collapsedHeight),
      animating: false,
      easing: 'easeInOut',
    };
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.collapsed !== this.props.collapsed) {
      this.setState({ measured: false }, () =>
        this.componentDidUpdate(prevProps)
      );
    } else {
      this.componentDidUpdate(prevProps);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.collapsed !== this.props.collapsed) {
      this.toggleCollapsed(this.props.collapsed);
    } else if (
      this.props.collapsed &&
      prevProps.collapsedHeight !== this.props.collapsedHeight
    ) {
      this.state.height.setValue(this.props.collapsedHeight);
    }
  }

  contentHandle = null;

  handleRef = (ref) => {
    this.contentHandle = ref;
  };

  measureContent = (callback) => {
    this.setState({ measuring: true }, () => {
      global.requestAnimationFrame(() => {
        if (!this.contentHandle) {
          this.setState({ measuring: false }, () =>
            callback(this.props.collapsedHeight)
          );
        } else {
          this.contentHandle.getNode().measure((x, y, width, height) => {
            this.setState(
              {
                measuring: false,
                contentHeight: height,
                measured: true,
              },
              () => callback(height)
            );
          });
        }
      });
    });
  };

  toggleCollapsed = (collapsed) => {
    if (collapsed) {
      this.transitionToHeight(this.props.collapsedHeight);
    } else if (!this.contentHandle) {
      if (this.state.measured) {
        this.transitionToHeight(this.state.contentHeight);
      }
    } else {
      this.measureContent((contentHeight) => {
        this.transitionToHeight(contentHeight + 20);
      });
    }
  };

  transitionToHeight = (height) => {
    const { duration } = this.props;
    let { easing } = this.state;
    if (typeof easing === 'string') {
      easing = Easing[easing];
    }

    if (this.animation) {
      this.animation.stop();
    }
    this.setState({ animating: true });
    this.animation = Animated.timing(this.state.height, {
      toValue: height,
      duration,
      easing,
    }).start(() =>
      this.setState({ animating: false }, this.props.onAnimationEnd)
    );
  };

  handleLayoutChange = (event) => {
    const contentHeight = event.nativeEvent.layout.height + 20;
    if (
      this.state.animating ||
      this.props.collapsed ||
      this.state.measuring ||
      this.state.contentHeight === contentHeight
    ) {
      return;
    }

    this.state.height.setValue(contentHeight);
    this.setState({ contentHeight });
  };

  render() {
    const { collapsed } = this.props;
    const { height, measuring, measured } = this.state;
    const hasKnownHeight = !measuring && (measured || collapsed);
    const style = hasKnownHeight && {
      overflow: 'hidden',
      height,
    };
    const contentStyle = {};
    if (measuring) {
      contentStyle.position = 'absolute';
      contentStyle.opacity = 0;
    }

    return (
      <Animated.View style={style} pointerEvents={collapsed ? 'none' : 'auto'}>
        <Animated.View
          ref={this.handleRef}
          style={contentStyle}
          onLayout={this.state.animating ? undefined : this.handleLayoutChange}
        >
          {this.props.children}
        </Animated.View>
      </Animated.View>
    );
  }
}

Collapsible.propTypes = {
  collapsed: bool,
  collapsedHeight: number,
  duration: number,
  onAnimationEnd: func,
  children: node,
};

Collapsible.defaultProps = {
  collapsed: true,
  collapsedHeight: 0,
  onAnimationEnd: () => null,
};

export default Collapsible;
