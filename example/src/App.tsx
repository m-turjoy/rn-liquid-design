import { StyleSheet, View, Text } from "react-native";
import Components, { Tooltip } from "rn-liquid-design";
import { Toggle } from "rn-liquid-design";

export default function App() {
	console.log("stuff: ", Components, "t: ", Tooltip);

	return (
		<View style={styles.container}>
			<Text>Result: </Text>
			<Toggle value={true} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	box: {
		width: 60,
		height: 60,
		marginVertical: 20,
	},
});
