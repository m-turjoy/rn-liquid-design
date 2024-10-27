import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Logo from '.';

configure({ adapter: new Adapter() });
describe('Logo component', () => {
  describe('Renders correctly', () => {
    test('it renders Default Logo', () => {
      const tree = shallow(<Logo />);
      expect(tree).toMatchSnapshot();
    });
  });
});
