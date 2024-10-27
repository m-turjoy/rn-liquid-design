import { StyleSheet, Platform } from "react-native";
import * as defaultStyle from "../utils/style";
import { colors, fonts } from "../../../../../config";

export default function (theme = {}) {
	const appStyle = { ...defaultStyle, ...theme };

	return StyleSheet.create({
		header: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
		monthText: {
			fontFamily: fonts.Regular,
			fontSize: 12,
			color: colors.richBlackDefault,
			marginRight: 11,
		},
		arrow: {
			paddingVertical: 20,
		},
		arrowImage: {
			...Platform.select({
				ios: {
					tintColor: appStyle.arrowColor,
				},
				android: {
					tintColor: appStyle.arrowColor,
				},
			}),
		},
		week: {
			flexDirection: "row",
			justifyContent: "space-around",
		},
		dayHeader: {
			marginTop: 2,
			marginBottom: 7,
			width: 32,
			textAlign: "center",
			fontSize: 10,
			fontFamily: fonts.Regular,
			color: theme.primaryColor,
		},
		inputWrapperStyle: {
			...Platform.select({
				ios: {
					paddingLeft: 6,
				},
				android: {
					paddingLeft: 3,
				},
			}),
		},
		centerWrapper: {
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
		},
	});
}
