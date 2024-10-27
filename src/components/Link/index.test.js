import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Link from './index';

configure({ adapter: new Adapter() });
describe('Link component', () => {
  describe('Renders correctly', () => {
    test('it renders Link', () => {
      const tree = shallow(<Link test="Test" source="Test" active href />);
      expect(tree).toMatchSnapshot();
    });
  });
});
