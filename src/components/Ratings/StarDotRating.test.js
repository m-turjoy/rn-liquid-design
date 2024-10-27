import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StarDotRating from './StarDotRating';

configure({ adapter: new Adapter() });
describe('StarDotComponent component', () => {
  describe('Renders correctly', () => {
    test('it renders Default star icon', () => {
      const tree = shallow(<StarDotRating />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders Default dot icon', () => {
      const tree = shallow(<StarDotRating dot />);
      expect(tree).toMatchSnapshot();
    });
  });
});
