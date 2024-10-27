import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../config";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	headerWrapper: {
		flexDirection: "row",
		paddingHorizontal: 15,
		paddingVertical: 18,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		borderTopLeftRadius: 6,
		borderTopRightRadius: 6,
	},
	modalContent: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		borderBottomLeftRadius: 6,
		borderBottomRightRadius: 6,
		paddingTop: 35,
		paddingBottom: 40,
	},
	iconWrapper: {
		width: "20%",
		alignItems: "flex-end",
	},
	closeIcon: {
		width: 20,
	},
	bodyWrapper: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: width < 350 ? 25 : 50,
	},
	default: {
		marginTop: 40,
		paddingBottom: 10,
	},
	cta: {
		marginTop: 15.5,
		paddingBottom: 25,
	},
	textField: {
		marginTop: 15.5,
		paddingBottom: 20,
	},
	buttonsCta: {
		flexDirection: width < 350 ? "column-reverse" : "row",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonsTextField: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		width: "100%",
		paddingTop: 20,
	},
	imageContainer: {
		height: 150,
		width: 250,
		resizeMode: "cover",
		marginBottom: 27,
		marginTop: 15,
		borderRadius: 6,
	},
	shadow: {
		shadowOpacity: 0.25,
		shadowColor: colors.richBlackDefault,
		shadowRadius: 20,
		shadowOffset: { width: 0, height: 20 },
		elevation: 40,
		backgroundColor: colors.white,
		borderRadius: 6,
	},
});

export default styles;
