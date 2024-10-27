import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import RowItem from ".";
import { colors, fonts } from "../../../config";

const props = {
	item: 10,
	index: 0,
	indexPressed: 0,
	hideItemsDropdown: () => {},
	dropdownRowWidth: 140,
	dropdownRowHeight: 32,
	dropdownRowBackroundColorActive: colors.sensitiveGreyDark,
	dropdownRowBackroundColor: colors.white,
	dropdownRowTextFontSize: 14,
	dropdownRowTextFontFamily: fonts.Regular,
	dropdownRowTextColor: colors.richBlackDefault,
	dropdownRowTextFontFamilyActive: fonts.Black,
	dropdownRowTextColorActive: colors.vibrantCyanDefault,
	onItemRowPressed: () => {},
};

configure({ adapter: new Adapter() });
describe("RowItem component", () => {
	describe("Renders correctly", () => {
		test("it renders Default RowItem", () => {
			const tree = shallow(<RowItem {...props} />);
			expect(tree).toMatchSnapshot();
		});
	});
});
