import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListHeader from './index';

configure({ adapter: new Adapter() });
describe('ListHeader component', () => {
  describe('Renders correctly', () => {
    test('it renders Default ListHeader without Icon', () => {
      const tree = shallow(<ListHeader />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders ListHeader with Icon', () => {
      const tree = shallow(
        <ListHeader
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
