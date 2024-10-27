import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SvgTriangle from './SvgTriangle';
import { colors } from '../../config';

configure({ adapter: new Adapter() });
describe('SvgTriangle component', () => {
  describe('Renders correctly', () => {
    test('it renders default SvgTriangle', () => {
      const tree = shallow(
        <SvgTriangle
          modalRenderSide="bottom-left"
          modalBackgroundColor={colors.white}
          positionX={0}
          positionY={0}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
