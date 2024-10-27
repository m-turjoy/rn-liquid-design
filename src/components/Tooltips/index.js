import React, { Component } from "react";
import { Modal, Platform, TouchableHighlight, View } from "react-native";
import {
	oneOfType,
	array,
	object,
	string,
	func,
	number,
	shape,
} from "prop-types";
import { ThemeProvider } from "styled-components";
import {
	TooltipWrapper,
	ModalWrapper,
	ContentWrapper,
	TouchableModalWrapper,
} from "./styled";
import Icon from "../MerckIcons";
import Headline from "../Headline";
import Paragraph from "../Paragraph";
import SvgTriangle from "./SvgTriangle";
import { colors, fonts } from "../../config";
import { defaultThemeName, getThemeObject } from "../../config/theme";

const OFFSET = Platform.select({ android: 10, ios: 11 });

class Tooltip extends Component {
	constructor(props) {
		super(props);
		this.state = {
			opened: false,
		};
		this.iconPosition = null;
		this.iconFrame = {};
	}

	adjustTopPosition = () => {
		const { modalRenderSide, modalHeight } = this.props;

		return (
			((modalRenderSide === "bottom-left" ||
				modalRenderSide === "bottom-right") &&
				this.iconFrame.y + this.iconFrame.h + OFFSET) ||
			((modalRenderSide === "top-left" || modalRenderSide === "top-right") &&
				this.iconFrame.y - modalHeight - OFFSET) ||
			((modalRenderSide === "left-top" || modalRenderSide === "right-top") &&
				this.iconFrame.y - modalHeight + this.iconFrame.h + OFFSET) ||
			((modalRenderSide === "left-bottom" ||
				modalRenderSide === "right-bottom") &&
				this.iconFrame.y - OFFSET)
		);
	};

	adjustLeftPosition = () => {
		const { modalRenderSide, modalWidth } = this.props;

		return (
			(modalRenderSide === "bottom-left" &&
				this.iconFrame.x + this.iconFrame.w + OFFSET - modalWidth) ||
			((modalRenderSide === "bottom-right" ||
				modalRenderSide === "top-right") &&
				this.iconFrame.x - OFFSET) ||
			(modalRenderSide === "top-left" &&
				this.iconFrame.x - modalWidth + this.iconFrame.w + OFFSET) ||
			((modalRenderSide === "left-top" || modalRenderSide === "left-bottom") &&
				this.iconFrame.x - modalWidth - OFFSET) ||
			((modalRenderSide === "right-top" ||
				modalRenderSide === "right-bottom") &&
				this.iconFrame.x + this.iconFrame.w + OFFSET)
		);
	};

	adjustParagraphLineHeight = () => {
		const { paragraphStyle, paragraphType } = this.props;
		const timesHeight = 1.75;

		return (
			paragraphStyle.fontSize * timesHeight ||
			(paragraphType === "XLarge" && 22 * timesHeight) ||
			(paragraphType === "Large" && 18 * timesHeight) ||
			((paragraphType === "Medium" || paragraphType === "Label") &&
				16 * timesHeight) ||
			(paragraphType === "Small" && 14 * timesHeight) ||
			((paragraphType === "XSmall" || paragraphType === "XLabel") &&
				12 * timesHeight)
		);
	};

	updatePosition = (callback) => {
		if (this.iconPosition && this.iconPosition.measure) {
			this.iconPosition.measure((fx, fy, width, height, px, py) => {
				this.iconFrame = {
					x: px,
					y: py,
					w: width,
					h: height,
				};

				return callback && callback();
			});
		}
	};

	showModal = () => {
		this.updatePosition(() => {
			this.setState({
				opened: true,
			});
		});
	};

	hideModal = () => {
		this.setState({
			opened: false,
		});
	};

	renderModal = () => {
		const {
			headlineLabel,
			headlineStyle,
			headlineColor,
			headlineFontFamily,
			headlineType,
			paragraphText,
			paragraphType,
			paragraphStyle,
			paragraphColor,
			paragraphFontFamily,
			numberOfParagraphLines,
			modalStyle,
			modalHeight,
			modalWidth,
			modalBackgroundColor,
			modalRenderSide,
		} = this.props;

		return (
			<Modal
				animationType="fade"
				visible
				transparent
				onRequestClose={this.hideModal}
			>
				<TouchableModalWrapper onPress={this.hideModal}>
					<ModalWrapper
						flexGrow={1}
						shadowColor={colors.richBlackDefault}
						shadowOffset={{
							width: 2,
							height: 10,
						}}
						shadowOpacity={0.15}
						shadowRadius={6}
						elevation={15}
					>
						<ContentWrapper
							width={modalWidth}
							height={modalHeight}
							backgroundColor={modalBackgroundColor}
							elevation={15}
							position="absolute"
							borderRadius={3}
							paddingLeft={25}
							paddingRight={25}
							paddingTop={20}
							paddingBottom={24}
							flex={1}
							style={modalStyle}
							top={this.adjustTopPosition()}
							left={this.adjustLeftPosition()}
						>
							<Headline
								type={headlineType}
								text={headlineLabel}
								textStyle={headlineStyle}
								numberOfLines={1}
								color={headlineColor}
								fontFamily={headlineFontFamily}
							/>
							<Paragraph
								type={paragraphType}
								text={paragraphText}
								textStyle={[
									paragraphStyle,
									{
										paddingTop: 10,
										lineHeight: this.adjustParagraphLineHeight(),
										textAlign: paragraphStyle.textAlign || "left",
									},
								]}
								fontFamily={paragraphFontFamily}
								color={paragraphColor}
								numberOfLines={numberOfParagraphLines}
							/>
						</ContentWrapper>
						<SvgTriangle
							modalRenderSide={modalRenderSide}
							modalBackgroundColor={modalBackgroundColor}
							positionX={this.iconFrame.x}
							positionY={this.iconFrame.y}
							iconWidth={this.iconFrame.w}
							iconHeight={this.iconFrame.h}
						/>
					</ModalWrapper>
				</TouchableModalWrapper>
			</Modal>
		);
	};

	render() {
		const {
			inactiveIconColor,
			activeIconColor,
			iconSize,
			onIconPress,
			themeName,
		} = this.props;

		const themeObj = getThemeObject(themeName);

		return (
			<ThemeProvider theme={themeObj}>
				<TooltipWrapper>
					<TouchableHighlight
						ref={(ref) => {
							this.iconPosition = ref;
						}}
						activeOpacity={1}
						underlayColor={colors.transparent}
						onPress={() => {
							onIconPress();
							this.showModal();
						}}
					>
						<View>
							{this.state.opened ? (
								<Icon
									name="tooltipFilled"
									size={iconSize}
									color={activeIconColor || themeObj.colors.primary.darker}
								/>
							) : (
								<Icon
									name="tooltipEmpty"
									size={iconSize}
									color={inactiveIconColor || themeObj.colors.primary.base}
								/>
							)}
						</View>
					</TouchableHighlight>
					{this.state.opened ? this.renderModal() : null}
				</TooltipWrapper>
			</ThemeProvider>
		);
	}
}

Tooltip.propTypes = {
	inactiveIconColor: string,
	activeIconColor: string,
	iconSize: number,
	onIconPress: func,
	headlineLabel: string,
	headlineStyle: oneOfType([object, array]),
	headlineColor: string,
	headlineFontFamily: string,
	paragraphText: string,
	paragraphStyle: oneOfType([object, array]),
	paragraphColor: string,
	paragraphFontFamily: string,
	numberOfParagraphLines: number,
	modalStyle: oneOfType([object, array]),
	modalHeight: number,
	modalWidth: number,
	modalBackgroundColor: string,
	modalRenderSide: string.isRequired,
	headlineType: string,
	paragraphType: string,
	themeName: oneOfType([
		string,
		shape({
			primary: shape({
				lightest: string,
				light: string,
				base: string,
				dark: string,
				darker: string,
			}).isRequired,
			secondary: shape({
				lightest: string,
				light: string,
				base: string,
				dark: string,
				darker: string,
			}).isRequired,
		}),
	]),
};

Tooltip.defaultProps = {
	iconSize: 24,
	onIconPress: () => {},
	headlineLabel: "Headline",
	headlineType: "H6",
	headlineStyle: {},
	headlineColor: colors.richBlackDefault,
	headlineFontFamily: fonts.Black,
	paragraphText:
		"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam\
    nonumy eirmod tempor invidunt ut\
    labore et dolore magna.",
	paragraphType: "XSmall",
	paragraphStyle: {},
	paragraphColor: colors.richBlackDefault,
	paragraphFontFamily: fonts.Regular,
	numberOfParagraphLines: 4,
	modalStyle: {},
	modalHeight: 165,
	modalWidth: 250,
	modalBackgroundColor: colors.white,
	themeName: defaultThemeName,
};

export default Tooltip;
