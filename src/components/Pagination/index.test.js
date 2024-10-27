import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Pagination from './index';

configure({ adapter: new Adapter() });
describe('Pagination component', () => {
  describe('Renders correctly', () => {
    test('it renders simple Pagination', () => {
      const tree = shallow(<Pagination />);
      expect(tree).toMatchSnapshot();
    });
  });
});
