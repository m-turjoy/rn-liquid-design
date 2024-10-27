import { StyleSheet, Platform } from "react-native";
import * as defaultStyle from "../utils/style";
import { colors, fonts } from "../../../../../config";

const FILLER_HEIGHT = 20;

export default function styleConstructor(theme = {}) {
	const appStyle = { ...defaultStyle, ...theme };
	return StyleSheet.create({
		wrapper: {
			alignItems: "center",
			alignSelf: "stretch",
			marginLeft: -1,
		},
		base: {
			width: 22,
			height: 36,
			alignItems: "center",
			justifyContent: "center",
		},
		fillers: {
			position: "absolute",
			height: FILLER_HEIGHT,
			flexDirection: "row",
			left: 0,
			right: 0,
			top: 8,
		},
		leftFiller: {
			height: FILLER_HEIGHT,
			flex: 1,
		},
		rightFiller: {
			height: FILLER_HEIGHT,
			flex: 1,
		},
		text: {
			marginTop: Platform.OS === "android" ? 4 : 6,
			fontSize: 12,
			fontFamily: fonts.Regular,
			color: colors.richBlackDefault,
			backgroundColor: "transparent",
			alignSelf: "center",
			...Platform.select({
				ios: {
					bottom: 3,
				},
				android: {
					bottom: 2,
				},
			}),
		},
		innerWrapper: {
			justifyContent: "center",
			width: 20,
			height: 20,
		},
		innerWrapperSelected: {
			borderRadius: 6,
			backgroundColor: theme.primaryColor,
		},
		innerWrapperToday: {
			borderWidth: 1,
			borderRadius: 6,
			borderColor: theme.primaryColor,
		},
		todayText: {
			alignSelf: "center",
			color: theme.primaryColor,
			fontFamily: fonts.Regular,
			fontSize: 12,
			...Platform.select({
				ios: {
					bottom: 3.2,
				},
				android: {
					bottom: 2,
				},
			}),
		},
		selectedText: {
			alignSelf: "center",
			color: colors.white,
			fontFamily: fonts.Black,
			...Platform.select({
				ios: {
					bottom: 3,
				},
				android: {
					bottom: 2,
				},
			}),
		},
		disabledText: {
			color: colors.sensitiveGreyDarkest,
		},
		// eslint-disable-next-line no-dupe-keys
		todayText: {
			alignSelf: "center",
			color: theme.primaryColor,
			fontFamily: fonts.Regular,
			fontSize: 12,
			...Platform.select({
				ios: {
					bottom: 3.2,
				},
				android: {
					bottom: 2,
				},
			}),
		},
		// eslint-disable-next-line no-dupe-keys
		disabledText: {
			color: appStyle.textDisabledColor,
		},
		quickAction: {
			backgroundColor: "white",
			borderWidth: 1,
			borderColor: "#c1e4fe",
		},
		quickActionText: {
			marginTop: 6,
			color: appStyle.textColor,
		},
		firstQuickAction: {
			backgroundColor: appStyle.textLinkColor,
		},
		firstQuickActionText: {
			color: colors.richBlackDefault,
		},
		naText: {
			color: "#b6c1cd",
		},
	});
}
