import React, { Component } from 'react';
import { View } from 'react-native';
import XDate from 'xdate';
// import ViewOverflow from 'react-native-view-overflow'
import { bool, func, object, string, number } from 'prop-types';
import moment from 'moment';
import dateutils from './utils/dateutils';
import { xdateToData, parseDate } from './utils/interface';
import styleConstructor from './style';
import Day from './Day';
import MultiDay from './MultiDay';
import CalendarHeader from './Header';
import shouldComponentUpdate from './updater';

const EmptyArray = [];

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.style = styleConstructor(this.props.theme);
    let currentMonth;
    if (props.current) {
      currentMonth = parseDate(props.current);
    } else {
      currentMonth = XDate();
    }
    this.state = {
      currentMonth,
    };

    this.shouldComponentUpdate = shouldComponentUpdate;
  }

  componentDidMount() {
    this.forceUpdate();
  }

  componentWillReceiveProps(nextProps) {
    const current = parseDate(nextProps.current);
    if (
      current &&
      current.toString('yyyy MM') !==
        this.state.currentMonth.toString('yyyy MM')
    ) {
      this.setState({
        currentMonth: current.clone(),
      });
    }
  }

  getDateMarking(day) {
    if (!this.props.markedDates) {
      return false;
    }
    const dates =
      this.props.markedDates[day.toString('yyyy-MM-dd')] || EmptyArray;
    if (dates.length || dates) {
      return dates;
    }

    return false;
  }

  getDateMarkingMulti(day) {
    if (!this.props.markedMultiDates) {
      return false;
    }
    const dates =
      this.props.markedMultiDates[day.toString('yyyy-MM-dd')] || EmptyArray;
    if (dates.length || dates) {
      return dates;
    }

    return false;
  }

  getDateSelecting(day) {
    if (!this.props.selectedDates) {
      return false;
    }
    const dates =
      this.props.selectedDates[day.toString('yyyy-MM-dd')] || EmptyArray;
    if (dates.length || dates) {
      return dates;
    }

    return false;
  }

  getDayComponent() {
    if (this.props.dayComponent) {
      return this.props.dayComponent;
    }

    switch (this.props.markingType) {
      case 'period':
        return MultiDay;
      default:
        return Day;
    }
  }

  addMonth = (count) => {
    this.updateMonth(this.state.currentMonth.clone().addMonths(count, true));
  };

  pressDay = (date) => {
    this.handleDayInteraction(date, this.props.onDayPress);
  };

  longPressDay = (date) => {
    this.handleDayInteraction(date, this.props.onDayLongPress);
  };

  updateMonth = (day, doNotTriggerListeners) => {
    if (
      day.toString('yyyy MM') === this.state.currentMonth.toString('yyyy MM')
    ) {
      return;
    }
    this.setState(
      {
        currentMonth: day.clone(),
      },
      () => {
        if (!doNotTriggerListeners) {
          const currMont = this.state.currentMonth.clone();
          if (this.props.onMonthChange) {
            this.props.onMonthChange(xdateToData(currMont));
          }
          if (this.props.onVisibleMonthsChange) {
            this.props.onVisibleMonthsChange([xdateToData(currMont)]);
          }
        }
      }
    );
  };

  handleDayInteraction(date, interaction) {
    const day = parseDate(date);
    const minDate = parseDate(this.props.minDate);
    const maxDate = parseDate(this.props.maxDate);
    const minGTE = dateutils.isGTE(day, minDate);
    const maxLTE = dateutils.isLTE(day, maxDate);
    if (!(minDate && !minGTE) && !(maxDate && !maxLTE)) {
      if (
        this.props.disableMonthChange === undefined ||
        !this.props.disableMonthChange
      ) {
        this.updateMonth(day);
      }
      if (interaction) {
        interaction(xdateToData(day));
      }
    }
  }

  renderDay(day, id) {
    const minDate = parseDate(this.props.minDate);
    const maxDate = parseDate(this.props.maxDate);
    const minGTE = dateutils.isGTE(day, minDate);
    const maxLTE = dateutils.isLTE(day, maxDate);
    let state = '';
    if (this.props.disabledByDefault) {
      state = 'disabled';
    } else if ((minDate && !minGTE) || (maxDate && !maxLTE)) {
      state = 'disabled';
    } else if (!dateutils.sameMonth(day, this.state.currentMonth)) {
      state = 'disabled';
    } else if (dateutils.sameDate(day, XDate())) {
      state = 'today';
    } else if (dateutils.beforeCurrentDate(day, XDate())) {
      state = 'beforeCurrent';
    }

    if (
      !dateutils.sameMonth(day, this.state.currentMonth) &&
      this.props.hideExtraDays
    ) {
      return <View key={id} style={this.style.flexContainer} />;
    }

    const DayComp = this.getDayComponent();
    const date = day.getDate();

    return (
      <View style={this.style.flexContainerCentered} key={id}>
        <DayComp
          id={id}
          state={state}
          theme={this.props.theme}
          onPress={this.pressDay}
          onLongPress={this.longPressDay}
          date={xdateToData(day)}
          marking={this.getDateMarking(day)}
          selecting={this.getDateSelecting(day)}
          markingMulti={this.getDateMarkingMulti(day)}
        >
          {date}
        </DayComp>
      </View>
    );
  }

  renderWeekNumber(weekNumber) {
    return (
      <Day
        key={`week-${weekNumber}`}
        theme={this.props.theme}
        marking={{ disableTouchEvent: true }}
        state="disabled"
      >
        {weekNumber}
      </Day>
    );
  }

  renderWeek(days, id) {
    const week = [];
    days.forEach((day, id2) => {
      week.push(this.renderDay(day, id2));
    }, this);

    if (this.props.showWeekNumbers) {
      week.unshift(this.renderWeekNumber(days[days.length - 1].getWeek()));
    }

    return (
      <View style={this.style.week} key={id}>
        {week}
      </View>
    );
  }

  render() {
    const {
      inputValue,
      themeName,
      onChangeText,
      onBlur,
      theme,
      hideArrows,
      renderArrow,
      onPressArrowLeft,
      onPressArrowRight,
      firstDay,
      monthFormat,
    } = this.props;

    const { currentMonth } = this.state;

    const days = dateutils.page(this.state.currentMonth, this.props.firstDay);

    const weeks = [];
    while (days.length) {
      weeks.push(this.renderWeek(days.splice(0, 7), weeks.length));
    }

    let indicator;
    const current = parseDate(this.props.current);

    if (current) {
      const lastMonthOfDay = current
        .clone()
        .addMonths(1, true)
        .setDate(1)
        .addDays(-1)
        .toString('yyyy-MM-dd');
      if (
        this.props.displayLoadingIndicator &&
        !(this.props.markedDates && this.props.markedDates[lastMonthOfDay])
      ) {
        indicator = true;
      }
    }

    return (
      <View style={[this.style.container]}>
        <CalendarHeader
          theme={theme}
          themeName={themeName}
          inputValue={inputValue}
          onChangeText={onChangeText}
          onBlur={onBlur}
          hideArrows={hideArrows}
          month={currentMonth}
          addMonth={this.addMonth}
          showIndicator={indicator}
          firstDay={firstDay}
          renderArrow={renderArrow}
          monthFormat={monthFormat}
          onPressArrowLeft={onPressArrowLeft}
          onPressArrowRight={onPressArrowRight}
        />
        <View style={this.style.monthView}>{weeks}</View>
      </View>
    );
  }
}

Calendar.defaultProps = {
  minDate: moment().format('YYYY-MM-DD'),
  maxDate: moment().format('YYYY-MM-DD'),
  current: moment().format('YYYY-MM-DD'),
};

Calendar.propTypes = {
  theme: object,
  markedDates: object,
  markedMultiDates: object,
  markingType: string,
  selectedDates: object,
  current: string,
  minDate: string,
  maxDate: string,
  firstDay: number,
  hideArrows: bool,
  displayLoadingIndicator: bool,
  hideExtraDays: bool,
  onDayPress: func,
  onDayLongPress: func,
  onMonthChange: func,
  onVisibleMonthsChange: func,
  renderArrow: func,
  disableMonthChange: bool,
  disabledByDefault: bool,
  showWeekNumbers: bool,
  onPressArrowLeft: func,
  onPressArrowRight: func,
  inputValue: string,
  themeName: string,
  onChangeText: func,
  onBlur: func,
  monthFormat: string,
};

export default Calendar;
