import { StyleSheet } from "react-native";
import { colors } from "../../config";

const styles = StyleSheet.create({
	progressBar: {},
	circleProgressBarLabelStyle: {
		lineHeight: 26,
	},
	circleTextWrapper: {
		textAlign: "center",
		paddingTop: 20,
	},
	// container: {
	//   backgroundColor: colors.transparent,
	//   width: 300,
	//   height: 30
	// },
	step: {
		alignItems: "center",
		justifyContent: "center",
		zIndex: 2,
	},
	stepLabel: {
		textAlign: "center",
		paddingTop: 3,
	},
	horizontal: {
		flexDirection: "row",
	},
	circleContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	circleWrapper: {
		borderRadius: 100,
		overflow: "hidden",
	},
	circleWrapperAndroid: {
		borderRadius: 100,
		overflow: "hidden",
		borderWidth: 20,
		borderColor: colors.transparent,
	},
});

export default styles;
