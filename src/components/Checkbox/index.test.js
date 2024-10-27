import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Checkbox from './index'

configure({ adapter: new Adapter() })
describe('Checkbox component', () => {
  describe('Renders correctly', () => {
    test('it renders Default Checkbox with Text', () => {
      const tree = shallow(
        <Checkbox
          checked={false}
          onPress={() => {}}
          title='Checkbox text'
        />,
      )
      expect(tree).toMatchSnapshot()
    })
    test('it renders Checkbox with Active state', () => {
      const tree = shallow(
        <Checkbox
          checked
          onPress={() => {}}
          title='Checkbox text'
        />,
      )
      expect(tree).toMatchSnapshot()
    })
    test('it renders Checkbox with Disabled state', () => {
      const tree = shallow(
        <Checkbox
          disabled
          onPress={() => {}}
          title='Checkbox text'
        />,
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
