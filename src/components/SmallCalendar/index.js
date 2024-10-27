import React, { Component } from "react";
import { string, object, number, bool, func } from "prop-types";
import { ThemeProvider } from "styled-components";
// import ViewOverflow from 'react-native-view-overflow';
import moment from "moment";
import XDate from "xdate";
import { Calendar } from "./CalendarWrapper";
import { defaultThemeName, getThemeObject } from "../../config/theme";
// import { Icon } from "../../../src/components";
import Icon from "../MerckIcons";
import styles from "./styles";
import { colors } from "../../config";
import { StyledCalendar } from "./styled";
import { View } from "react-native";

const dateNow = moment();
const format = "YYYY-MM-DD";
const today = moment().format(format);

class SmallCalendar extends Component {
	state = {
		inputValue: dateNow.format("YYYY"),
		currentDate: today,
		isFromDatePicked: false,
		isToDatePicked: false,
		markedMultiDates: {},
	};

	componentDidMount() {
		const { selected, startDay, endDay } = this.props;

		const { markedMultiDates, endDate } = this.state;

		if (selected !== undefined) {
			const year = selected.slice(0, 4);
			const month = selected.slice(5, 7);
			const day = selected.slice(8, 10);
			const formatedDate = `${year}-${month}-${day}`;

			this.setState({
				selected,
				inputValue: year,
				currentDate: formatedDate,
			});
		}

		if (startDay !== undefined && endDay !== undefined) {
			const year = startDay.slice(0, 4);
			const month = startDay.slice(5, 7);
			const day = startDay.slice(8, 10);
			const formatedDateDay = `${year}-${month}-${day}`;

			const markedMultiDates = { ...markedMultiDates };

			const [mMarkedMultiDates, range] = this.setupMarkedDates(
				startDay,
				endDay,
				markedMultiDates
			);
			this.setState({
				isFromDatePicked: true,
				isToDatePicked: true,
				markedMultiDates,
				endDate: endDay,
				startDate: startDay,
				inputValue: year,
				currentDate: formatedDateDay,
			});
		}
		if (startDay !== undefined && endDay === startDay) {
			this.setState({
				isFromDatePicked: true,
				isToDatePicked: true,
				markedMultiDates: { [startDay]: { startingDay: true, selected: true } },
			});
		}
	}

	onDayPress = (day) => {
		const { withTextField, onStartDay, onSuccess, onSelectedChange, multi } =
			this.props;
		if (multi) {
			if (
				!(typeof onStartDay === "function" && typeof onSuccess === "function")
			) {
				throw new Error(
					"onStartDay and onSuccess props are required when multi={true}."
				);
			}
			if (
				!this.state.isFromDatePicked ||
				(this.state.isFromDatePicked && this.state.isToDatePicked)
			) {
				this.setupStartMarker(day);
			} else if (!this.state.isToDatePicked) {
				const markedMultiDates = { ...this.state.markedMultiDates };

				const [mMarkedMultiDates, range] = this.setupMarkedDates(
					this.state.startDate,
					day.dateString,
					markedMultiDates
				);
				const [mMarkedMultiDates2] = this.setupMarkedDates(
					day.dateString,
					this.state.startDate,
					markedMultiDates
				);
				if (range > 0) {
					this.setState({
						isFromDatePicked: true,
						isToDatePicked: true,
						markedMultiDates: mMarkedMultiDates,
						endDate: day.dateString,
					});
					this.props.onSuccess(this.state.startDate, day.dateString);
				} else if (range < 0) {
					this.setState({
						isFromDatePicked: true,
						isToDatePicked: true,
						markedMultiDates: mMarkedMultiDates2,
						endDate: day.dateString,
					});
					onSuccess(day.dateString, this.state.startDate);
				} else {
					this.setupStartMarker(day);
				}
			}
		} else {
			this.setState({
				selected: day.dateString,
			});
			if (withTextField && typeof onSelectedChange === "function") {
				onSelectedChange(day.dateString);
			}
		}
	};

	setupStartMarker = (day) => {
		const { onStartDay } = this.props;
		const markedMultiDates = {
			[day.dateString]: { startingDay: true, selected: true },
		};
		onStartDay(day.dateString);

		this.setState({
			isFromDatePicked: true,
			isToDatePicked: false,
			startDate: day.dateString,
			markedMultiDates,
		});
	};

	setupMarkedDates = (fromDate, toDate, markedMultiDates) => {
		const mFromDate = new XDate(fromDate);
		const mToDate = new XDate(toDate);
		const range = mFromDate.diffDays(mToDate);

		const { themeName } = this.props;
		const primaryLightestColor =
			getThemeObject(themeName).colors.primary.lightest;

		if (range > 0) {
			if (range == 0) {
				markedMultiDates = {
					[toDate]: {
						color: primaryLightestColor,
						textColor: primaryLightestColor,
					},
				};
			} else {
				for (let i = 1; i <= range; i++) {
					const tempDate = mFromDate.addDays(1).toString("yyyy-MM-dd");
					if (i < range) {
						markedMultiDates[tempDate] = {
							rangeMode: true,
							color: primaryLightestColor,
							textColor: colors.richBlackDefault,
						};
					} else {
						markedMultiDates[toDate] = {
							endingDay: true,
							color: primaryLightestColor,
							selected: true,
							rangeMode: true,
						};
						markedMultiDates[fromDate] = {
							startingDay: true,
							color: primaryLightestColor,
							selected: true,
							rangeMode: true,
						};
					}
				}
			}
		}

		return [markedMultiDates, range];
	};

	render() {
		const { inputValue, currentDate, markedMultiDates } = this.state;

		const { themeName, appointments, firstDay } = this.props;

		const themeObj = getThemeObject(themeName);
		const themeColor = themeObj.colors.primary.base;
		const themeSecondaryColor = themeObj.colors.secondary.base;

		const calendarTheme = {
			primaryColor: themeColor,
			secondaryColor: themeSecondaryColor,
		};

		return (
			<ThemeProvider theme={themeObj}>
				<View>
					<StyledCalendar borderRadius={6} width={280} minHeight={240}>
						<Calendar
							onDayPress={this.onDayPress}
							inputValue={inputValue}
							themeName={themeName}
							onChangeText={(yearText) => {
								const yearInt = parseInt(yearText, 10);
								if (yearText.length === 4) {
									const year =
										yearInt > 1900 && yearInt < 2100 ? yearText : 2018;

									return this.setState({
										inputValue: yearText,
										currentDate: `${year}-${moment(this.state.currentDate).format("MM-DD")}`,
									});
								}

								return this.setState({
									inputValue: yearText,
								});
							}}
							onBlur={(yearText) => {
								const yearInt = parseInt(yearText, 10);
								if (
									!yearText ||
									yearText.length !== 4 ||
									yearInt <= 1900 ||
									yearInt >= 2100
								) {
									this.setState({
										inputValue: moment(this.state.currentDate).format("YYYY"),
									});
								}
							}}
							markedDates={appointments}
							markingType={this.props.multi ? "period" : null}
							markedMultiDates={markedMultiDates}
							selectedDates={{
								[this.state.selected]: {
									selected: true,
									marked: false,
									disableTouchEvent: true,
								},
							}}
							current={currentDate}
							minDate="1901-01-01"
							maxDate="2099-12-31"
							disableMonthChange
							firstDay={firstDay}
							renderArrow={(direction) => (
								<Icon name={`arrow${direction}`} color={themeColor} />
							)}
							style={styles.calendar}
							theme={calendarTheme}
							color={themeColor}
							onPressArrowLeft={(substractMonth) => {
								const newDate = moment(currentDate).subtract(1, "M");
								this.setState({
									inputValue: newDate.format("YYYY"),
									currentDate: newDate.format("YYYY-MM-DD"),
								});
								substractMonth();
							}}
							onPressArrowRight={(addMonth) => {
								const newDate = moment(currentDate).add(1, "M");
								this.setState({
									inputValue: newDate.format("YYYY"),
									currentDate: newDate.format("YYYY-MM-DD"),
								});
								addMonth();
							}}
						/>
					</StyledCalendar>
				</View>
			</ThemeProvider>
		);
	}
}

SmallCalendar.defaultProps = {
	themeName: defaultThemeName,
	firstDay: 1,
};

SmallCalendar.propTypes = {
	themeName: string,
	firstDay: number,
	appointments: object,
	withTextField: bool,
	onStartDay: func,
	onSuccess: func,
	onSelectedChange: func,
	multi: bool,
};

export default SmallCalendar;
