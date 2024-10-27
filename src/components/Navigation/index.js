import React, { Component } from "react";
import {
	string,
	shape,
	arrayOf,
	func,
	node,
	bool,
	number,
	oneOfType,
} from "prop-types";
import SideMenu from "react-native-side-menu";
import { ThemeProvider } from "styled-components";
import NavigationBody from "./NavigationBody/NavigationBody";
// import imageExample from "../../assets/circle.png";
import imageExample from "../../assets/circle.png";
import { defaultThemeName, getThemeObject } from "../../config/theme";

export default class Navigation extends Component {
	state = {
		activeTabIndex: 0,
	};
	onTabChange = (index) => {
		this.setState({ activeTabIndex: index });
	};

	render() {
		const { title, tabs, imagePath, navigationBody, themeName } = this.props;
		const { activeTabIndex } = this.state;

		const themeObj = getThemeObject(themeName);
		const themeColor = themeObj.colors.primary.base;

		return (
			<ThemeProvider theme={themeObj}>
				<SideMenu
					ref={(d) => {
						this.drawer = d;
					}}
					{...this.props}
					menu={
						<NavigationBody
							title={title}
							tabs={tabs}
							imagePath={imagePath}
							onTabChange={this.onTabChange}
							activeTabIndex={activeTabIndex}
							{...navigationBody}
							activeTabFontColor={
								navigationBody.activeTabFontColor || themeColor
							}
							activeIconColor={navigationBody.activeIconColor || themeColor}
						/>
					}
				>
					{tabs[activeTabIndex].contentView}
				</SideMenu>
			</ThemeProvider>
		);
	}
}

Navigation.defaultProps = {
	isOpen: false,
	tabs: [
		{
			onPress: () => {},
		},
	],
	imagePath: imageExample,
	navigationBody: {},
	openMenuOffset: 60,
	edgeHitWidth: 300,
	bounceBackOnOverdraw: false,
	themeName: defaultThemeName,
};

Navigation.propTypes = {
	isOpen: bool,
	title: string.isRequired,
	tabs: arrayOf(
		shape({
			title: string.isRequired,
			icon: string.isRequired,
			label: string.isRequired,
			onPress: func,
			contentView: node,
		})
	),
	imagePath: node,
	openMenuOffset: number,
	edgeHitWidth: number,
	bounceBackOnOverdraw: bool,
	navigationBody: shape({
		navigationFontFamily: string,
		navigationFontSize: number,
		navigationFontColor: string,
		navigationLineHeight: number,
		activeTabFontFamily: string,
		activeTabFontColor: string,
		tabFontFamily: string,
		tabFontSize: number,
		tabFontColor: string,
		tabLineHeight: number,
		iconColor: string,
		iconSize: number,
		activeIconColor: string,
		bottomOffset: number,
	}),
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
