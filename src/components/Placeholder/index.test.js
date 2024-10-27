import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Placeholder from './index';

configure({ adapter: new Adapter() });
describe('Placeholder component', () => {
  describe('Renders correctly', () => {
    test('it renders default Placeholder', () => {
      const tree = shallow(<Placeholder />);
      expect(tree).toMatchSnapshot();
    });
  });
});
