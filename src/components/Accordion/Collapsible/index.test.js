import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Collapsible from './index';

configure({ adapter: new Adapter() });
describe('Collapsible', () => {
  describe('Renders correctly', () => {
    test('it renders default Collapsible', () => {
      const tree = shallow(<Collapsible />);
      expect(tree).toMatchSnapshot();
    });
  });
});
