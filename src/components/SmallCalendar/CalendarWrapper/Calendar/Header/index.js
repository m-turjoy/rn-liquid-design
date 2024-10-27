import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import XDate from 'xdate';
import { bool, func, number, object, instanceOf, string } from 'prop-types';
import styleConstructor from './styles';
import { weekDayNames } from '../utils/dateutils';
import { TextField } from '../../../../../components';
import { colors, fonts } from '../../../../../config';

class CalendarHeader extends Component {
  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.month.toString('yyyy MM') !==
      this.props.month.toString('yyyy MM')
    ) {
      return true;
    }
    if (nextProps.theme !== this.props.theme) {
      this.style = styleConstructor(nextProps.theme);

      return true;
    }

    return false;
  }

  onPressLeft = () => {
    const { onPressArrowLeft } = this.props;

    return onPressArrowLeft(this.substractMonth);
  };

  onPressRight = () => {
    const { onPressArrowRight } = this.props;

    return onPressArrowRight(this.addMonth);
  };

  addMonth = () => {
    this.props.addMonth(1);
  };

  substractMonth = () => {
    this.props.addMonth(-1);
  };

  render() {
    const { inputValue, themeName, onChangeText, onBlur } = this.props;

    const weekDaysNames = weekDayNames(this.props.firstDay);

    return (
      <View>
        <View style={this.style.header}>
          <TouchableOpacity
            onPress={this.onPressLeft}
            activeOpacity={1}
            style={this.style.arrow}
            hitSlop={{
              left: 20,
              right: 20,
              top: 20,
              bottom: 20,
            }}
          >
            {this.props.renderArrow('Left')}
          </TouchableOpacity>
          <View style={this.style.centerWrapper}>
            <Text
              allowFontScaling={false}
              style={this.style.monthText}
              accessibilityTraits="header"
            >
              {this.props.month.toString('MMM')}
            </Text>
            <TextField
              textInputLabelVisible={false}
              placeholder=""
              value={inputValue}
              themeName={themeName}
              onChangeText={onChangeText}
              onBlur={onBlur}
              maxLength={4}
              wrapperWidth={42}
              wrapperHeight={24}
              fontSize={12}
              height={22}
              paddingBottom={Platform.OS === 'android' ? 5.5 : 6}
              paddingTop={6}
              bothTypesWrapperStyle={[this.style.inputWrapperStyle]}
              fontFamily={fonts.Black}
              backgroundColor={colors.sensitiveGreyDefault}
            />
          </View>
          <TouchableOpacity
            onPress={this.onPressRight}
            style={this.style.arrow}
            activeOpacity={1}
            hitSlop={{
              left: 20,
              right: 20,
              top: 20,
              bottom: 20,
            }}
          >
            {this.props.renderArrow('Right')}
          </TouchableOpacity>
        </View>
        {!this.props.hideDayNames && (
          <View style={this.style.week}>
            {this.props.weekNumbers && (
              <Text allowFontScaling={false} style={this.style.dayHeader} />
            )}
            {weekDaysNames.map((day) => (
              <Text
                allowFontScaling={false}
                key={day}
                accessible={false}
                style={this.style.dayHeader}
                numberOfLines={1}
                importantForAccessibility="no"
              >
                {day}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  }
}

CalendarHeader.propTypes = {
  theme: object,
  month: instanceOf(XDate),
  addMonth: func,
  firstDay: number,
  renderArrow: func,
  hideDayNames: bool,
  weekNumbers: bool,
  onPressArrowLeft: func,
  onPressArrowRight: func,
  themeName: string,
  inputValue: string,
  onChangeText: func,
  onBlur: func,
};

export default CalendarHeader;
