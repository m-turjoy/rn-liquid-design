import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Header from './index'

const searchOptions = [
  { text: 'Search Result 1 Search Result 1 Search Result 1' },
  { text: 'Search Result 2' },
  { text: 'Search Result 3' },
  { text: 'Search Result 4' },
  { text: 'Search Result 5' },
  { text: 'Search Result 6' },
  { text: 'Search Result 7' }
]

configure({ adapter: new Adapter() })
describe('Header component', () => {
  describe('Renders correctly', () => {
    test('it renders default Header', () => {
      const tree = shallow(
        <Header
          searchOptions={searchOptions}
          searchProperty='text'
        />,
      )
      expect(tree).toMatchSnapshot()
    })
    test('it renders with icons Header', () => {
      const tree = shallow(
        <Header
          searchOptions={searchOptions}
          searchProperty='text'
          withIcons
        />,
      )
      expect(tree).toMatchSnapshot()
    })
    test('it renders with label Header', () => {
      const tree = shallow(
        <Header
          searchOptions={searchOptions}
          searchProperty='text'
          withLabel
        />,
      )
      expect(tree).toMatchSnapshot()
    })
    test('it renders with button Header', () => {
      const tree = shallow(
        <Header
          searchOptions={searchOptions}
          searchProperty='text'
          withButton
        />,
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
