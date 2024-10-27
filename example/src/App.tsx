// import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from "react-native";
import Func from "rn-liquid-design";
// import { Toggle } from 'rn-liquid-design';
// import { Toggle } from '@liquid-design/liquid-design-react-native';

export default function App() {
	// const [result, setResult] = useState<number | undefined>();

	// useEffect(() => {
	//   multiply(3, 9).then(setResult);
	// }, []);

	const { Toggle } = Func;
	console.log("stuff: ", Func, "and..", Toggle);

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
