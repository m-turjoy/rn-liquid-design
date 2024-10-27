import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LineGraph from './index';

configure({ adapter: new Adapter() });
describe('LineGraph module', () => {
  describe('Renders correctly', () => {
    test('it renders default LineGraph', () => {
      const tree = shallow(<LineGraph />);
      expect(tree).toMatchSnapshot();
    });
  });
});
