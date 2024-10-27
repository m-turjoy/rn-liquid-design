import { StyleSheet, Platform } from "react-native";
import { colors } from "../../config";

const styles = StyleSheet.create({
	dropdownStyle: {
		borderWidth: 0,
		borderBottomLeftRadius: 6,
		borderBottomRightRadius: 6,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		overflow: "hidden",
		borderRadius: 6,
	},
	dropdownContainerStyle: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderTopLeftRadius: 6,
		borderTopRightRadius: 6,
		height: 50,
		width: 250,
		backgroundColor: colors.white,
	},
	inlineMultiselectDropdownStyle: {
		borderWidth: 0,
		borderRadius: 6,
		overflow: "hidden",
	},
	inlineDropdownStyle: {
		borderWidth: 0,
		borderRadius: 6,
		overflow: "hidden",
	},
	inlineMultiSelectContainerStyle: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	inlineDropdownContainerStyle: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	greyLine: {
		width: "100%",
		position: "absolute",
		height: 1,
		backgroundColor: colors.sensitiveGreyDark,
		bottom: 0,
	},
});

export default styles;
