import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Headline from './index';

configure({ adapter: new Adapter() });
describe('Headline component', () => {
  describe('Renders correctly', () => {
    test('it renders default Headline', () => {
      const tree = shallow(<Headline type="H1" text="Test" />);
      expect(tree).toMatchSnapshot();
    });
  });
});
