import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tooltip from './index';

configure({ adapter: new Adapter() });
describe('Tooltip component', () => {
  describe('Renders correctly', () => {
    test('it renders default bottom-left tooltip', () => {
      const tree = shallow(<Tooltip modalRenderSide="bottom-left" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default bottom-right tooltip', () => {
      const tree = shallow(<Tooltip modalRenderSide="bottom-right" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default right-top tooltip', () => {
      const tree = shallow(<Tooltip modalRenderSide="right-top" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default left-top tooltip', () => {
      const tree = shallow(<Tooltip modalRenderSide="left-top" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default right-bottom tooltip', () => {
      const tree = shallow(<Tooltip modalRenderSide="right-bottom" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default left-bottom tooltip', () => {
      const tree = shallow(<Tooltip modalRenderSide="left-bottom" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default top-right tooltip', () => {
      const tree = shallow(<Tooltip modalRenderSide="top-right" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default top-left tooltip', () => {
      const tree = shallow(<Tooltip modalRenderSide="top-left" />);
      expect(tree).toMatchSnapshot();
    });
  });
});
