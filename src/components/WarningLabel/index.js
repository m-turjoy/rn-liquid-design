import React, { Component } from "react";
import { number, string } from "prop-types";
import { View } from "react-native";
import {
	CompressedGas,
	Corrosive,
	EnvHazard,
	Explosive,
	Flammable,
	Harmful,
	HealthHazard,
	Oxidizing,
	Toxic,
} from "./Illustrations";

class WarningLabel extends Component {
	render() {
		const { name, size } = this.props;

		const warningLabel = () => {
			switch (name) {
				case "compressedGas":
					return <CompressedGas size={size} />;
				case "corrosive":
					return <Corrosive size={size} />;
				case "environmentalHazard":
					return <EnvHazard size={size} />;
				case "explosive":
					return <Explosive size={size} />;
				case "flammable":
					return <Flammable size={size} />;
				case "harmful":
					return <Harmful size={size} />;
				case "healthHazard":
					return <HealthHazard size={size} />;
				case "oxidizing":
					return <Oxidizing size={size} />;
				case "toxic":
					return <Toxic size={size} />;
				default:
					return null;
			}
		};

		return <View>{warningLabel()}</View>;
	}
}

WarningLabel.propTypes = {
	name: string.isRequired,
	size: number,
};

WarningLabel.defaultProps = {
	size: 90,
};

export default WarningLabel;
