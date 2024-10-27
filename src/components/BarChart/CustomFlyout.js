import React from "react";
import { number } from "prop-types";
import { Dimensions } from "react-native";
// import { VictoryTooltip } from 'victory-native';
import { G, Rect, Polygon } from "react-native-svg";
import { colors } from "../../config";
import { BoxShadow } from "../helpers/index";

const { width } = Dimensions.get("window");
const midBoundaryLeft = 90;
const midBoundaryRight = width <= 320 ? 190 : 230;

class CustomFlyout extends React.Component {
	// static defaultEvents = VictoryTooltip.defaultEvents;

	xSmallMidShadowPosition = () => {
		const { x } = this.props;

		if (x < midBoundaryLeft) {
			return x - 35;
		} else if (x > midBoundaryRight) {
			return x - 160;
		}

		return x - 95;
	};

	xLargeShadowPosition = () => {
		const { x } = this.props;

		if (x < 120) {
			return x - 27;
		} else if (x > 250) {
			return x - 157;
		}

		return x - 87;
	};

	xSmallMidPosition = () => {
		const { x } = this.props;

		if (x < midBoundaryLeft) {
			return x - 25;
		} else if (x > midBoundaryRight) {
			return x - 150;
		}

		return x - 87.5;
	};

	xLargePosition = () => {
		const { x } = this.props;
		if (x < 120) {
			return x - 20;
		} else if (x > 250) {
			return x - 150;
		}

		return x - 80;
	};

	render() {
		const { x, y } = this.props;
		const newY = y - 50;
		const shadowOptions = {
			color: colors.richBlackDefault,
			border: 23,
			opacity: 0.2,
			height: 50,
			width: 150,
			x:
				width < 380
					? this.xSmallMidShadowPosition()
					: this.xLargeShadowPosition(),
			y: newY - 33.5,
		};

		return (
			<G>
				<BoxShadow
					setting={{
						...shadowOptions,
					}}
				>
					<Rect
						x={width < 380 ? this.xSmallMidPosition() : this.xLargePosition()}
						y={newY - 29}
						rx={5}
						ry={5}
						width="175"
						height="70"
						fill={colors.white}
					/>
					<Polygon
						points={`${x - 10},${y - 10} ${x},${y} ${x + 10},${y - 10}`}
						fill={colors.white}
					/>
				</BoxShadow>
			</G>
		);
	}
}

CustomFlyout.propTypes = {
	x: number,
	y: number,
};

export default CustomFlyout;
