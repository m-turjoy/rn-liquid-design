import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TableData from '.';
import { colors, fonts } from '../../../config';

// eslint-disable-next-line
const dropdownData = 'We\'ve been around for 350 years, yet our majority owners are still the descendants of Friedrich Jacob Merck,the man who founded our company in Darmstadt, Germany in 1668. Since then, we have become a truly global company with 52,000 employees in 66 countries working on breakthrough solutions and technologies. '

const data = {
  rowName: 'Name 02',
  rowLabel: 'Label 02',
  rowInfo: 'Info',
  rowData: [
    'Lorem Ipsum dolor2',
    'Lorem Ipsum dolor2',
    'Lorem Ipsum dolor2',
    'Lorem Ipsum dolor2',
    'Lorem Ipsum dolor2',
    'Lorem Ipsum dolor2',
    'Lorem Ipsum dolor2',
  ],
  rowDataLabel: [
    'Lorem Ipsum dolor2',
    'Lorem Ipsum dolor2',
    'Lorem Ipsum dolor2',
    'Lorem Ipsum dolor2',
    'Lorem Ipsum dolor2',
    'Lorem Ipsum dolor2',
    'Lorem Ipsum dolor2',
  ],
  dropdownInfo: dropdownData,
  imageUrl: require('../../../assets/circle.png'),
  dropdownInfoOpened: true,
  checked: true,
  disabled: false,
};
const props = {
  data,
  index: 0,
  cellWidth: 130,
  cellStyle: {},
  nameFontSize: 14,
  nameFontFamily: fonts.Bold,
  nameColor: colors.richBlackDefault,
  infoFontSize: 14,
  infoFontFamily: fonts.Regular,
  infoColor: colors.richBlackLightest,
  checkbox: false,
  checkboxIconSize: 24,
  checkboxIconColor: colors.vibrantCyanDefault,
  onCheckboxPress: () => {},
  checkboxChecked: false,
  rowTextFontFamily: fonts.Regular,
  rowTextFontSize: 14,
  rowTextColor: colors.richBlackDefault,
  rowBackgroundColor: colors.white,
  rowTextStyle: {},
  dropdown: false,
  handleDropdownOpened: () => {},
  optionOpened: false,
  arrowIconSize: 24,
  arrowIconColor: colors.vibrantCyanDefault,
  type: 'small',
  imageWidth: 40,
  imageHeight: 40,
  imageResizeMode: 'contain',
  imageBorderRadius: 20,
  spaceBetweenColumns: 30,
  dropdownInfoFontSize: 12,
  dropdownInfoFontFamily: fonts.Regular,
  dropdownInfoColor: colors.richBlackDefault,
  labelFontSize: 14,
  labelFontFamily: fonts.Regular,
  labelColor: colors.richBlackLightest,
  labelStyle: {},
  infoStyle: {},
  nameStyle: {},
  themeObj: {
    colors: {
      primary: {
        base: '#00000',
      },
    },
  },
};

const mediumTable = {
  ...props,
  type: 'medium',
};

const largeTable = {
  ...props,
  type: 'large',
};

const imageTable = {
  ...props,
  type: 'image',
};

const checkboxData = {
  ...props,
  checkbox: true,
  checkboxChecked: true,
};

const checkboxSmallTableData = {
  ...checkboxData,
  type: 'small',
};

const checkboxMediumTableData = {
  ...checkboxData,
  type: 'medium',
};

const checkboxLargeTableData = {
  ...checkboxData,
  type: 'large',
};

const dropdownOptionData = {
  ...props,
  dropdown: true,
  optionOpened: true,
};

const dropdownSmallTableData = {
  ...dropdownOptionData,
  type: 'small',
};

const dropdownMediumTableData = {
  ...dropdownOptionData,
  type: 'medium',
};

const dropdownLargeTableData = {
  ...dropdownOptionData,
  type: 'large',
};

configure({ adapter: new Adapter() });
describe('Table Data component', () => {
  describe('Renders correctly', () => {
    test('it renders Default small TableData', () => {
      const tree = shallow(<TableData {...props} />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders Default medium TableData', () => {
      const tree = shallow(<TableData {...mediumTable} />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders Default large TableData', () => {
      const tree = shallow(<TableData {...largeTable} />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders small checkbox TableData', () => {
      const tree = shallow(<TableData {...checkboxSmallTableData} />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders medium checkbox TableData', () => {
      const tree = shallow(<TableData {...checkboxMediumTableData} />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders large checkbox TableData', () => {
      const tree = shallow(<TableData {...checkboxLargeTableData} />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders small dropdown TableData', () => {
      const tree = shallow(<TableData {...dropdownSmallTableData} />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders medium dropdown TableData', () => {
      const tree = shallow(<TableData {...dropdownMediumTableData} />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders large dropdown TableData', () => {
      const tree = shallow(<TableData {...dropdownLargeTableData} />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders large dropdown TableData', () => {
      const tree = shallow(<TableData {...dropdownLargeTableData} />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders image TableData', () => {
      const tree = shallow(<TableData {...imageTable} />);
      expect(tree).toMatchSnapshot();
    });
  });
});
