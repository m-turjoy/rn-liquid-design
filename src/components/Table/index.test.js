import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Table from '.'

// eslint-disable-next-line
const dropdownData = 'We\'ve been around for 350 years, yet our majority owners are still the descendants of Friedrich Jacob Merck,the man who founded our company in Darmstadt, Germany in 1668. Since then, we have become a truly global company with 52,000 employees in 66 countries working on breakthrough solutions and technologies. '

const rowsData = [
  {
    rowName: 'Name 02',
    rowLabel: 'Label 02',
    rowInfo: 'Info',
    rowData: ['Lorem Ipsum dolor2', 'Lorem Ipsum dolor2', 'Lorem Ipsum dolor2', 'Lorem Ipsum dolor2', 'Lorem Ipsum dolor2', 'Lorem Ipsum dolor2', 'Lorem Ipsum dolor2'],
    rowDataLabel: ['Lorem Ipsum dolor2', 'Lorem Ipsum dolor2', 'Lorem Ipsum dolor2', 'Lorem Ipsum dolor2', 'Lorem Ipsum dolor2', 'Lorem Ipsum dolor2', 'Lorem Ipsum dolor2'],
    dropdownInfo: dropdownData,
    imageUrl: require('../../assets/circle.png'),
    dropdownInfoOpened: true,
    checked: true,
    disabled: false
  },
  {
    rowName: 'Name 01',
    rowLabel: 'Label 01',
    rowInfo: 'Info',
    rowData: ['Lorem Ipsum dolor1', 'Lorem Ipsum dolor1', 'Lorem Ipsum dolor1', 'Lorem Ipsum dolor1', 'Lorem Ipsum dolor1', 'Lorem Ipsum dolor1', 'Lorem Ipsum dolor1'],
    rowDataLabel: ['Lorem Ipsum dolor1', 'Lorem Ipsum dolor1', 'Lorem Ipsum dolor1', 'Lorem Ipsum dolor1', 'Lorem Ipsum dolor1', 'Lorem Ipsum dolor1', 'Lorem Ipsum dolor1'],
    dropdownInfo: dropdownData,
    imageUrl: require('../../assets/circle.png'),
    dropdownInfoOpened: false,
    checked: false,
    disabled: true
  },
  {
    rowName: 'Name 04',
    rowLabel: 'Label 04',
    rowInfo: 'Info',
    rowData: ['Lorem Ipsum dolor4', 'Lorem Ipsum dolor4', 'Lorem Ipsum dolor4', 'Lorem Ipsum dolor4', 'Lorem Ipsum dolor4', 'Lorem Ipsum dolor4', 'Lorem Ipsum dolor4'],
    rowDataLabel: ['Lorem Ipsum dolor4', 'Lorem Ipsum dolor4', 'Lorem Ipsum dolor4', 'Lorem Ipsum dolor4', 'Lorem Ipsum dolor4', 'Lorem Ipsum dolor4', 'Lorem Ipsum dolor4'],
    dropdownInfo: dropdownData,
    imageUrl: require('../../assets/circle.png'),
    checked: true,
    dropdownInfoOpened: true,
    disabled: false
  },
  {
    rowName: 'Name 03',
    rowLabel: 'Label 03',
    rowInfo: 'Info',
    rowData: ['Lorem Ipsum dolor3', 'Lorem Ipsum dolor3', 'Lorem Ipsum dolor3', 'Lorem Ipsum dolor3', 'Lorem Ipsum dolor3', 'Lorem Ipsum dolor3', 'Lorem Ipsum dolor3'],
    rowDataLabel: ['Lorem Ipsum dolor3', 'Lorem Ipsum dolor3', 'Lorem Ipsum dolor3', 'Lorem Ipsum dolor3', 'Lorem Ipsum dolor3', 'Lorem Ipsum dolor3', 'Lorem Ipsum dolor3'],
    dropdownInfo: dropdownData,
    imageUrl: require('../../assets/circle.png'),
    checked: false,
    dropdownInfoOpened: false,
    disabled: false
  },
  {
    rowName: 'Name 06',
    rowLabel: 'Label 06',
    rowInfo: 'Info',
    rowData: ['Lorem Ipsum dolor6', 'Lorem Ipsum dolor6', 'Lorem Ipsum dolor6', 'Lorem Ipsum dolor6', 'Lorem Ipsum dolor6', 'Lorem Ipsum dolor6', 'Lorem Ipsum dolor6'],
    rowDataLabel: ['Lorem Ipsum dolor6', 'Lorem Ipsum dolor6', 'Lorem Ipsum dolor6', 'Lorem Ipsum dolor6', 'Lorem Ipsum dolor6', 'Lorem Ipsum dolor6', 'Lorem Ipsum dolor6'],
    dropdownInfo: dropdownData,
    imageUrl: require('../../assets/circle.png'),
    checked: true,
    dropdownInfoOpened: true,
    disabled: false
  },
  {
    rowName: 'Name 05',
    rowLabel: 'Label 05',
    rowInfo: 'Info',
    rowData: ['Lorem Ipsum dolor5', 'Lorem Ipsum dolor5', 'Lorem Ipsum dolor5', 'Lorem Ipsum dolor5', 'Lorem Ipsum dolor5', 'Lorem Ipsum dolor5', 'Lorem Ipsum dolor5'],
    rowDataLabel: ['Lorem Ipsum dolor5', 'Lorem Ipsum dolor5', 'Lorem Ipsum dolor5', 'Lorem Ipsum dolor5', 'Lorem Ipsum dolor5', 'Lorem Ipsum dolor5', 'Lorem Ipsum dolor5'],
    dropdownInfo: dropdownData,
    imageUrl: require('../../assets/circle.png'),
    checked: false,
    dropdownInfoOpened: false,
    disabled: false
  },
  {
    rowName: 'Name 08',
    rowLabel: 'Label 08',
    rowInfo: 'Info',
    rowData: ['Lorem Ipsum dolor8', 'Lorem Ipsum dolor8', 'Lorem Ipsum dolor8', 'Lorem Ipsum dolor8', 'Lorem Ipsum dolor8', 'Lorem Ipsum dolor8', 'Lorem Ipsum dolor8'],
    rowDataLabel: ['Lorem Ipsum dolor8', 'Lorem Ipsum dolor8', 'Lorem Ipsum dolor8', 'Lorem Ipsum dolor8', 'Lorem Ipsum dolor8', 'Lorem Ipsum dolor8', 'Lorem Ipsum dolor8'],
    dropdownInfo: dropdownData,
    imageUrl: require('../../assets/circle.png'),
    checked: false,
    dropdownInfoOpened: false,
    disabled: false
  },
  {
    rowName: 'Name 07',
    rowLabel: 'Label 07',
    rowInfo: 'Info',
    rowData: ['Lorem Ipsum dolor7', 'Lorem Ipsum dolor7', 'Lorem Ipsum dolor7', 'Lorem Ipsum dolor7', 'Lorem Ipsum dolor7', 'Lorem Ipsum dolor7', 'Lorem Ipsum dolor7'],
    rowDataLabel: ['Lorem Ipsum dolor7', 'Lorem Ipsum dolor7', 'Lorem Ipsum dolor7', 'Lorem Ipsum dolor7', 'Lorem Ipsum dolor7', 'Lorem Ipsum dolor7', 'Lorem Ipsum dolor7'],
    dropdownInfo: dropdownData,
    imageUrl: require('../../assets/circle.png'),
    checked: false,
    dropdownInfoOpened: false,
    disabled: false
  }
]

const headersData = ['Column 01', 'Column 02', 'Column 03', 'Column 04', 'Column 05', 'Column 06', 'Column 07', 'Column 08']

configure({ adapter: new Adapter() })
describe('Table component', () => {
  describe('Renders correctly', () => {
    test('it renders Default small Table', () => {
      const tree = shallow(
        <Table
          rowsData={rowsData}
          headersData={headersData}
          type='small'
        />,
      )
      expect(tree).toMatchSnapshot()
    })
    test('it renders medium Table', () => {
      const tree = shallow(
        <Table
          rowsData={rowsData}
          headersData={headersData}
          type='medium'
        />,
      )
      expect(tree).toMatchSnapshot()
    })
    test('it renders large Table', () => {
      const tree = shallow(
        <Table
          rowsData={rowsData}
          headersData={headersData}
          type='large'
        />,
      )
      expect(tree).toMatchSnapshot()
    })
    test('it renders small Table with Checkboxes', () => {
      const tree = shallow(
        <Table
          rowsData={rowsData}
          headersData={headersData}
          type='small'
          checkbox
        />
      )
      expect(tree).toMatchSnapshot()
    })
    test('it renders medium Table with Checkboxes', () => {
      const tree = shallow(
        <Table
          rowsData={rowsData}
          headersData={headersData}
          type='medium'
          checkbox
        />
      )
      expect(tree).toMatchSnapshot()
    })
    test('it renders large Table with Checkboxes', () => {
      const tree = shallow(
        <Table
          rowsData={rowsData}
          headersData={headersData}
          type='large'
          checkbox
        />
      )
      expect(tree).toMatchSnapshot()
    })
    test('it renders small Table with Dropdowns', () => {
      const tree = shallow(
        <Table
          rowsData={rowsData}
          headersData={headersData}
          type='small'
          dropdown
        />
      )
      expect(tree).toMatchSnapshot()
    })
    test('it renders medium Table with Dropdowns', () => {
      const tree = shallow(
        <Table
          rowsData={rowsData}
          headersData={headersData}
          type='medium'
          dropdown
        />
      )
      expect(tree).toMatchSnapshot()
    })
    test('it renders large Table with Dropdowns', () => {
      const tree = shallow(
        <Table
          rowsData={rowsData}
          headersData={headersData}
          type='large'
          dropdown
        />
      )
      expect(tree).toMatchSnapshot()
    })
    test('it renders Table with Images', () => {
      const tree = shallow(
        <Table
          rowsData={rowsData}
          headersData={headersData}
          type='image'
        />
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
