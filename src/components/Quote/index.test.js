import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Quote from "./index";
import imageTest from "../../assets/circle.png";

configure({ adapter: new Adapter() });
describe("Quote component", () => {
	describe("Renders correctly", () => {
		test("it renders default Quote", () => {
			const tree = shallow(
				<Quote quotation="Test" author="Test" imagePath={imageTest} />
			);
			expect(tree).toMatchSnapshot();
		});
	});
});
