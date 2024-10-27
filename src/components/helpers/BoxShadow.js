import React, { Component } from "react";
import { Platform } from "react-native";
import Svg, {
	Rect,
	Defs,
	LinearGradient,
	Stop,
	RadialGradient,
	Path,
	Circle,
	ClipPath,
} from "react-native-svg";

class BoxShadow extends Component {
	render = () => {
		// get the shadow settings and give them default values
		const {
			setting: {
				width = 0,
				height = 0,
				color = "#000",
				border = 0,
				radius = 0,
				opacity = 1,
				x,
				y,
				style = {},
			},
			children,
		} = this.props;

		// define the lengths
		const lineWidth = border,
			rectWidth = width - radius * 2,
			rectHeight = height - radius * 2;

		// the same parts for gradients
		const linear = (key) => [
			<Stop
				offset="0"
				stopColor={color}
				stopOpacity={opacity}
				key={`${key}Linear0`}
			/>,
			<Stop
				offset="1"
				stopColor={color}
				stopOpacity="0"
				key={`${key}Linear1`}
			/>,
		];
		const radial = (key) => [
			<Stop
				offset="0"
				stopColor={color}
				stopOpacity={opacity}
				key={`${key}Radial0`}
			/>,
			<Stop
				offset={(radius / (lineWidth + radius)).toString()}
				stopColor={color}
				stopOpacity={opacity}
				key={`${key}Radial1`}
			/>,
			<Stop
				offset="1"
				stopColor={color}
				stopOpacity="0"
				key={`${key}Radial2`}
			/>,
		];

		const outerWidth = lineWidth + radius;

		// return a view ,whose background is a svg picture
		return Platform.OS === "android" ? (
			<Svg height={height} width={width}>
				<Defs>
					<LinearGradient id="top" x1="0%" x2="0%" y1="100%" y2="0%">
						{linear("BoxTop")}
					</LinearGradient>
					<LinearGradient id="bottom" x1="0%" x2="0%" y1="0%" y2="100%">
						{linear("BoxBottom")}
					</LinearGradient>
					<LinearGradient id="left" x1="100%" y1="0%" x2="0%" y2="0%">
						{linear("BoxLeft")}
					</LinearGradient>
					<LinearGradient id="right" x1="0%" y1="0%" x2="100%" y2="0%">
						{linear("BoxRight")}
					</LinearGradient>

					<RadialGradient id="border-left-top">
						{radial("BoxLeftTop")}
					</RadialGradient>
					<RadialGradient
						id="border-left-bottom"
						r="100%"
						cx="100%"
						cy="0%"
						fx="100%"
						fy="0%"
					>
						{radial("BoxLeftBottom")}
					</RadialGradient>
					<RadialGradient
						id="border-right-top"
						r="100%"
						cx="0%"
						cy="100%"
						fx="0%"
						fy="100%"
					>
						{radial("BoxRightTop")}
					</RadialGradient>
					<RadialGradient
						id="border-right-bottom"
						r="100%"
						cx="0%"
						cy="0%"
						fx="0%"
						fy="0%"
					>
						{radial("BoxRightBottom")}
					</RadialGradient>
				</Defs>

				<Defs>
					<ClipPath id="clip">
						<Rect
							x={x}
							y={y}
							width={`${outerWidth}`}
							height={`${outerWidth}`}
						/>
					</ClipPath>
				</Defs>

				<Circle
					cx={`${outerWidth + x}`}
					cy={`${outerWidth + y}`}
					r={`${outerWidth}`}
					fill="url(#border-left-top)"
					clipPath="url(#clip)"
				/>
				<Path
					d={`M ${rectWidth + lineWidth + radius + x} ${y},q ${outerWidth} 0 ${outerWidth} ${outerWidth},h ${-lineWidth},q 0 ${-radius} ${-radius} ${-radius},v ${-lineWidth},z`}
					fill="url(#border-right-top)"
				/>
				<Path
					d={`M ${rectWidth + lineWidth + 2 * radius + x} ${rectHeight + lineWidth + radius + y},h ${lineWidth},q 0 ${outerWidth} -${outerWidth} ${outerWidth},v ${-lineWidth},q ${radius} 0 ${radius} ${-radius},z`}
					fill="url(#border-right-bottom)"
				/>
				<Path
					d={`M ${x} ${rectHeight + lineWidth + radius + y},q 0 ${outerWidth} ${outerWidth} ${outerWidth},v ${-lineWidth},q ${-radius} 0 ${-radius} ${-radius},h ${-lineWidth},z`}
					fill="url(#border-left-bottom)"
				/>

				<Rect
					x={outerWidth + x}
					y={y}
					width={rectWidth}
					height={lineWidth}
					fill="url(#top)"
				/>
				<Rect
					x={x}
					y={outerWidth + y}
					width={lineWidth}
					height={rectHeight}
					fill="url(#left)"
				/>
				<Rect
					x={rectWidth + lineWidth + 2 * radius + x}
					y={outerWidth + y}
					width={lineWidth}
					height={rectHeight}
					fill="url(#right)"
				/>
				<Rect
					x={outerWidth + x}
					y={rectHeight + lineWidth + 2 * radius + y}
					width={rectWidth}
					height={lineWidth}
					fill="url(#bottom)"
				/>

				{children}
			</Svg>
		) : (
			<Svg height={400} width={400} style={[style]}>
				<Svg height={height} width={width}>
					<Defs>
						<LinearGradient id="top" x1="0%" x2="0%" y1="100%" y2="0%">
							{linear("BoxTop")}
						</LinearGradient>
						<LinearGradient id="bottom" x1="0%" x2="0%" y1="0%" y2="100%">
							{linear("BoxBottom")}
						</LinearGradient>
						<LinearGradient id="left" x1="100%" y1="0%" x2="0%" y2="0%">
							{linear("BoxLeft")}
						</LinearGradient>
						<LinearGradient id="right" x1="0%" y1="0%" x2="100%" y2="0%">
							{linear("BoxRight")}
						</LinearGradient>

						<RadialGradient
							id="border-left-top"
							r="100%"
							cx="100%"
							cy="100%"
							fx="100%"
							fy="100%"
						>
							{radial("BoxLeftTop")}
						</RadialGradient>
						<RadialGradient
							id="border-left-bottom"
							r="100%"
							cx="100%"
							cy="0%"
							fx="100%"
							fy="0%"
						>
							{radial("BoxLeftBottom")}
						</RadialGradient>
						<RadialGradient
							id="border-right-top"
							r="100%"
							cx="0%"
							cy="100%"
							fx="0%"
							fy="100%"
						>
							{radial("BoxRightTop")}
						</RadialGradient>
						<RadialGradient
							id="border-right-bottom"
							r="100%"
							cx="0%"
							cy="0%"
							fx="0%"
							fy="0%"
						>
							{radial("BoxRightBottom")}
						</RadialGradient>
					</Defs>

					<Defs>
						<ClipPath id="clip">
							<Rect
								x={x}
								y={y}
								width={`${outerWidth}`}
								height={`${outerWidth}`}
							/>
						</ClipPath>
					</Defs>

					<Circle
						cx={`${outerWidth + x}`}
						cy={`${outerWidth + y}`}
						r={`${outerWidth}`}
						fill="url(#border-left-top)"
						clipPath="url(#clip)"
					/>
					<Path
						d={`M ${rectWidth + lineWidth + radius + x} ${y},q ${outerWidth} 0 ${outerWidth} ${outerWidth},h ${-lineWidth},q 0 ${-radius} ${-radius} ${-radius},v ${-lineWidth},z`}
						fill="url(#border-right-top)"
					/>
					<Path
						d={`M ${rectWidth + lineWidth + 2 * radius + x} ${rectHeight + lineWidth + radius + y},h ${lineWidth},q 0 ${outerWidth} -${outerWidth} ${outerWidth},v ${-lineWidth},q ${radius} 0 ${radius} ${-radius},z`}
						fill="url(#border-right-bottom)"
					/>
					<Path
						d={`M ${x} ${rectHeight + lineWidth + radius + y},q 0 ${outerWidth} ${outerWidth} ${outerWidth},v ${-lineWidth},q ${-radius} 0 ${-radius} ${-radius},h ${-lineWidth},z`}
						fill="url(#border-left-bottom)"
					/>

					<Rect
						x={outerWidth + x}
						y={y}
						width={rectWidth}
						height={lineWidth}
						fill="url(#top)"
					/>
					<Rect
						x={x}
						y={outerWidth + y}
						width={lineWidth}
						height={rectHeight}
						fill="url(#left)"
					/>
					<Rect
						x={rectWidth + lineWidth + 2 * radius + x}
						y={outerWidth + y}
						width={lineWidth}
						height={rectHeight}
						fill="url(#right)"
					/>
					<Rect
						x={outerWidth + x}
						y={rectHeight + lineWidth + 2 * radius + y}
						width={rectWidth}
						height={lineWidth}
						fill="url(#bottom)"
					/>

					{children}
				</Svg>
			</Svg>
		);
	};
}

export default BoxShadow;
