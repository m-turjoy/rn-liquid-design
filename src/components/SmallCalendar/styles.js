import { StyleSheet } from "react-native";
import { colors } from "../../config";

const styles = StyleSheet.create({
	calendarContainer: {
		borderRadius: 6,
		width: 280,
		minHeight: 240,
	},
	calendar: {
		borderRadius: 6,
		backgroundColor: colors.white,
	},
});

export default styles;
