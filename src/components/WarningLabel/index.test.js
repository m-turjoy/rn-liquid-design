import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WarningLabel from "./index";

configure({ adapter: new Adapter() });
describe("WarningLabel component", () => {
	describe("Renders correctly", () => {
		test("it renders default WarningLabel", () => {
			const tree = shallow(<WarningLabel name="explosive" />);
			expect(tree).toMatchSnapshot();
		});
	});
});
