import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Icon from './index';

configure({ adapter: new Adapter() });
describe('Icon component', () => {
  describe('Renders correctly', () => {
    test('it renders default Icon', () => {
      const tree = shallow(<Icon name="arrowDown" size={24} />);
      expect(tree).toMatchSnapshot();
    });
  });
});
