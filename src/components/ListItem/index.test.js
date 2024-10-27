import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListItem from './index';

configure({ adapter: new Adapter() });
describe('ListItem component', () => {
  describe('Renders correctly', () => {
    test('it renders Default ListItem without Icon', () => {
      const tree = shallow(<ListItem />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders ListItem with Icon', () => {
      const tree = shallow(
        <ListItem
          iconLeft
          icon={{
            name: 'circleX',
            size: 16,
          }}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
