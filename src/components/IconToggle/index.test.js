import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import IconToggle from './index';

configure({ adapter: new Adapter() });
describe('IconToggle component', () => {
  describe('Renders correctly', () => {
    test('it renders Default IconToggle with Icon', () => {
      const tree = shallow(<IconToggle />);
      expect(tree).toMatchSnapshot();
    });
  });
});
