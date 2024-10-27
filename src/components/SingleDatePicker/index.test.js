import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SingleDatePicker from './index';

configure({ adapter: new Adapter() });
describe('SingleDatePicker component', () => {
  describe('Renders correctly', () => {
    test('it renders default Slider', () => {
      const tree = shallow(<SingleDatePicker />);
      expect(tree).toMatchSnapshot();
    });
  });
});
