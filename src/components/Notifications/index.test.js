import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Notification from './index';

configure({ adapter: new Adapter() });
describe('Notification component', () => {
  describe('Renders correctly', () => {
    test('it renders simple Notification', () => {
      const tree = shallow(<Notification />);
      expect(tree).toMatchSnapshot();
    });
  });
});
