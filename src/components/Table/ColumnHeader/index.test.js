import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ColumnHeader from '.';
import { colors, fonts } from '../../../config';

const props = {
  item: 'Column 01',
  index: 1,
  cellStyle: {},
  headerStyle: {},
  headerWidth: 130,
  headerWrapperStyle: {},
  headerFontFamily: fonts.Regular,
  headerFontSize: 14,
  headerColor: colors.richBlackDefault,
  checkbox: false,
  dropdown: false,
  arrowIconSize: 24,
  arrowIconColor: colors.vibrantCyanDefault,
  checkboxIconColor: colors.vibrantCyanDefault,
  checkboxUnchecked: false,
  handleMainCheckboxPressed: () => {},
  mainCheckboxChecked: false,
  mainOptionOpened: false,
  handleMainOptionPressed: () => {},
  type: 'small',
  onIconPress: () => {},
  spaceBetweenColumns: 30,
  themeObj: {
    colors: {
      primary: {
        base: '#00000',
      },
    },
  },
};

const checkboxTrueProps = {
  ...props,
  checkbox: true,
};

const dropdownTrueProps = {
  ...props,
  dropdown: true,
};

configure({ adapter: new Adapter() });
describe('Column Header component', () => {
  describe('Renders correctly', () => {
    test('it renders Default Header', () => {
      const tree = shallow(<ColumnHeader {...props} />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders checkbox Header', () => {
      const tree = shallow(<ColumnHeader {...checkboxTrueProps} />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders dropdown Header', () => {
      const tree = shallow(<ColumnHeader {...dropdownTrueProps} />);
      expect(tree).toMatchSnapshot();
    });
  });
});
