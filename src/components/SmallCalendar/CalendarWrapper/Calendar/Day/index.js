import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  View,
  Platform,
  Modal,
  Dimensions,
} from 'react-native';
import {
  oneOf,
  object,
  bool,
  array,
  func,
  number,
  oneOfType,
} from 'prop-types';
import Svg, { Polygon } from 'react-native-svg';
// import ViewOverflow from 'react-native-view-overflow'
import styleConstructor from './styles';
import { colors } from '../../../../../config';
import {
  TooltipContainer,
  TooltipWrapper,
  TouchableModalChildrenWrapper,
} from './styled';

const { height } = Dimensions.get('window');

class Day extends Component {
  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
    this.state = {
      positionX: 0,
      positionY: 0,
    };
  }

  componentDidMount() {
    this.forceUpdate();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.theme !== this.props.theme) {
      this.style = styleConstructor(nextProps.theme);
    }
  }

  onDayPress = () => {
    this.props.onPress(this.props.date);
    if (this.refs.component !== undefined) {
      this.refs.component.measure((x, y, width, height, px, py) =>
        this.setState({
          positionX: px,
          positionY: py,
        })
      );
      this.showModal();
    }
  };

  showModal = () => {
    this.setState({
      tooltipVisible: true,
    });
  };

  hideModal = () => {
    this.setState({
      tooltipVisible: false,
    });
  };

  checkDarkThemes = (color) => {
    if (color === colors.richPurpleDefault) {
      return colors.white;
    } else if (color === colors.vibrantCyanDefault) {
      return colors.white;
    }

    return colors.richBlackDefault;
  };

  checkPosition = (id) => {
    switch (id) {
      case 6:
        return -56;
      case 5:
        return -20;
      case 0:
        return 56;
      case 1:
        return 20;
      default:
        return 0;
    }
  };

  render() {
    const containerStyle = [this.style.base];
    const textStyle = [this.style.text];
    const dotStyle = [this.style.dot];
    const tooltipStyle = [this.style.tooltip];
    const tooltipWrapper = [this.style.tooltipWrapper];
    const tooltipBoldText = [this.style.tooltipBoldText];
    const tooltipText = [this.style.tooltipText];
    const innerWrapper = [this.style.innerWrapper];

    const { id, theme, state } = this.props;

    const { positionX, positionY } = this.state;

    let marking = this.props.marking || {};
    let selecting = this.props.selecting || {};
    if (marking && marking.constructor === Array && marking.length) {
      marking = {
        marking: true,
      };
    }
    if (selecting && selecting.constructor === Array && selecting.length) {
      selecting = {
        selecting: true,
      };
    }
    const markingUndefined = typeof marking.disabled !== 'undefined';
    const isDisabled = markingUndefined
      ? marking.disabled
      : state === 'disabled';
    const elevation = {
      elevation: 50,
      bottom: Platform.OS === 'android' ? 1 : 0,
    };
    let dot;
    let tooltip;

    if (marking.description) {
      dotStyle.push(this.style.visibleDot);
      tooltipStyle.push(this.style.visibleTooltip);
      dot = (
        <View
          style={dotStyle}
          ref="component"
          collapsable={false}
          onLayout={() => {}}
        />
      );
      tooltip = (
        <Modal
          transparent
          animationType="fade"
          visible={this.state.tooltipVisible}
          onRequestClose={() => {
            this.setState({ tooltipVisible: false });
          }}
        >
          <TouchableModalChildrenWrapper onPress={this.hideModal}>
            <TooltipContainer flexGrow={1}>
              <TooltipWrapper
                justifyContent="flex-end"
                position="absolute"
                bottom={
                  Platform.OS === 'android'
                    ? height - positionY - 7
                    : height - positionY + 16
                }
                left={positionX - 82}
              >
                <View
                  style={[tooltipWrapper, { left: this.checkPosition(id) }]}
                >
                  <Text
                    style={[
                      tooltipBoldText,
                      { color: this.checkDarkThemes(theme.secondaryColor) },
                    ]}
                  >
                    {marking.time}
                  </Text>
                  <Text
                    style={[
                      tooltipText,
                      { color: this.checkDarkThemes(theme.secondaryColor) },
                    ]}
                  >
                    {marking.description}
                  </Text>
                </View>
                <Svg style={elevation} height="20" width="170">
                  <Polygon
                    points="75,0  85,10  95,0"
                    fill={theme.secondaryColor}
                  />
                </Svg>
              </TooltipWrapper>
            </TooltipContainer>
          </TouchableModalChildrenWrapper>
        </Modal>
      );
    }

    if (selecting.selected) {
      dotStyle.push(this.style.selectedDot);
      tooltipStyle.push(this.style.selectedTooltip);
      textStyle.push(this.style.selectedText);
      innerWrapper.push(this.style.innerWrapperSelected);
    } else if (isDisabled) {
      textStyle.push(this.style.disabledText);
      dotStyle.push(this.style.disabledDot);
    } else if (this.props.state === 'today') {
      innerWrapper.push(this.style.innerWrapperToday);
      textStyle.push(this.style.todayText);
      dotStyle.push(this.style.todayDot);
    } else if (this.props.state === 'beforeCurrent') {
      dotStyle.push(this.style.disabledDot);
    }

    return (
      <TouchableWithoutFeedback
        onPress={isDisabled ? null : this.onDayPress}
        activeOpacity={selecting.activeOpacity}
        disabled={selecting.disableTouchEvent}
        hitSlop={{
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        }}
      >
        <View style={this.style.wrapper}>
          <View style={containerStyle}>
            <View style={innerWrapper}>
              <Text style={textStyle}>{String(this.props.children)}</Text>
            </View>
            {dot}
            {this.state.tooltipVisible ? tooltip : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Day.propTypes = {
  state: oneOf(['disabled', 'today', 'beforeCurrent', '']),
  theme: object,
  marking: oneOfType([bool, number, array, object]),
  selecting: oneOfType([bool, number, array, object]),
  onPress: func,
  date: object,
  children: number,
  id: number,
};

export default Day;
