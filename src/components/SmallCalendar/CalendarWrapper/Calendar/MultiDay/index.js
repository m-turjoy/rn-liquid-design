import React, { Component } from 'react';
import { object, func, any, oneOf, number } from 'prop-types';
import { TouchableWithoutFeedback, Text, View } from 'react-native';
// import ViewOverflow from 'react-native-view-overflow'

import * as defaultStyle from '../utils/style';
import styleConstructor from './styles';

class Day extends Component {
  constructor(props) {
    super(props);
    this.theme = { ...defaultStyle, ...(props.theme || {}) };
    this.style = styleConstructor(props.theme);
    this.markingStyle = this.getDrawingStyle(props.markingMulti || []);
  }

  componentWillUpdate(nextProps, nextState) {
    const newMarkingStyle = this.getDrawingStyle(nextProps.markingMulti);

    if (this.markingStyle !== newMarkingStyle) {
      this.markingStyle = newMarkingStyle;
    }
  }

  onDayPress = () => {
    this.props.onPress(this.props.date);
  };

  onDayLongPress = () => {
    this.props.onLongPress(this.props.date);
  };

  getDrawingStyle(markingMulti) {
    const defaultStyle = { textStyle: {} };
    if (!markingMulti) {
      return defaultStyle;
    }

    const resultStyle = [markingMulti].reduce((prev, next) => {
      if (next.quickAction) {
        if (next.first || next.last) {
          prev.containerStyle = this.style.firstQuickAction;
          prev.textStyle = this.style.firstQuickActionText;
          if (next.endSelected && next.first && !next.last) {
            prev.rightFillerStyle = 'black';
          } else if (next.endSelected && next.last && !next.first) {
            prev.leftFillerStyle = 'black';
          }
        } else if (!next.endSelected) {
          prev.containerStyle = this.style.quickAction;
          prev.textStyle = this.style.quickActionText;
        } else if (next.endSelected) {
          prev.leftFillerStyle = 'black';
          prev.rightFillerStyle = 'black';
        }

        return prev;
      }

      const { color } = next;
      if (next.status === 'NotAvailable') {
        prev.textStyle = this.style.naText;
      }
      if (next.startingDay) {
        prev.startingDay = {
          color,
        };
      }
      if (next.endingDay) {
        prev.endingDay = {
          color,
        };
      }
      if (!next.startingDay && !next.endingDay) {
        prev.day = {
          color,
        };
      }
      if (next.textColor) {
        prev.textStyle.color = next.textColor;
      }

      return prev;
    }, defaultStyle);

    return resultStyle;
  }

  render() {
    const containerStyle = [this.style.base];
    const innerWrapper = [this.style.innerWrapper];
    const textStyle = [this.style.text];
    let leftFillerStyle = {};
    let rightFillerStyle = {};
    let fillerStyle = {};
    let fillers;

    if (this.props.state === 'disabled') {
      textStyle.push(this.style.disabledText);
    } else if (this.props.state === 'today') {
      innerWrapper.push(this.style.innerWrapperToday);
      textStyle.push(this.style.todayText);
    }
    if (this.props.markingMulti.selected) {
      textStyle.push(this.style.selectedText);
      innerWrapper.push(this.style.innerWrapperSelected);
    }

    if (this.props.markingMulti.rangeMode) {
      const flags = this.markingStyle;
      if (flags.textStyle) {
        if (this.props.state !== 'today') {
          textStyle.push(flags.textStyle);
        }
      }
      if (flags.containerStyle) {
        containerStyle.push(flags.containerStyle);
      }
      if (flags.leftFillerStyle) {
        leftFillerStyle.backgroundColor = flags.leftFillerStyle;
      }
      if (flags.rightFillerStyle) {
        rightFillerStyle.backgroundColor = flags.rightFillerStyle;
      }

      if (!flags.startingDay && flags.endingDay) {
        leftFillerStyle = {
          backgroundColor: this.props.id !== 0 ? flags.endingDay.color : null,
          left: -6,
        };
      } else if (!flags.endingDay && flags.startingDay) {
        rightFillerStyle = {
          backgroundColor: this.props.id !== 6 ? flags.startingDay.color : null,
          right: -6,
        };
      } else if (flags.day) {
        leftFillerStyle = {
          backgroundColor: flags.day.color,
          left: this.props.id !== 6 ? -6 : null,
          borderTopLeftRadius: this.props.id === 0 ? 6 : 0,
          borderBottomLeftRadius: this.props.id === 0 ? 6 : 0,
        };
        rightFillerStyle = {
          backgroundColor: flags.day.color,
          right: this.props.id === 6 ? -6 : null,
          borderTopRightRadius: this.props.id === 6 ? 6 : 0,
          borderBottomRightRadius: this.props.id === 6 ? 6 : 0,
        };

        fillerStyle = {
          backgroundColor: flags.day.color,
          width: this.props.id === 6 ? 22 : this.props.id === 0 ? 22 : null,
          marginLeft: this.props.id === 0 ? 13 : null,
        };
      }

      fillers = (
        <View style={[this.style.fillers, fillerStyle]}>
          <View style={[this.style.leftFiller, leftFillerStyle]} />
          <View style={[this.style.rightFiller, rightFillerStyle]} />
        </View>
      );
    }

    return (
      <TouchableWithoutFeedback
        onPress={this.props.state === 'disabled' ? null : this.onDayPress}
        onLongPress={this.onDayLongPress}
        hitSlop={{
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        }}
      >
        <View style={this.style.wrapper}>
          {fillers}
          <View style={containerStyle}>
            <View style={innerWrapper}>
              <Text style={textStyle}>{String(this.props.children)}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Day.propTypes = {
  state: oneOf(['selected', 'disabled', 'today', 'beforeCurrent', '']),
  theme: object,
  markingMulti: any,
  onPress: func,
  onLongPress: func,
  date: object,
  children: number,
};

export default Day;
