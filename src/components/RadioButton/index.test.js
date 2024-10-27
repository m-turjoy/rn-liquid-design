import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import RadioButton from './index'

configure({ adapter: new Adapter() })
describe('RadioButton component', () => {
  describe('Renders correctly', () => {
    test('it renders Default RadioButton with Text', () => {
      const tree = shallow(
        <RadioButton
          selected={false}
          onPress={() => {}}
          title='Radio Button Label'
        />,
      )
      expect(tree).toMatchSnapshot()
    })
    test('it renders RadioButton with Active state', () => {
      const tree = shallow(
        <RadioButton
          selected
          onPress={() => {}}
          title='Radio Button Label'
        />,
      )
      expect(tree).toMatchSnapshot()
    })
    test('it renders RadioButton with Disabled state', () => {
      const tree = shallow(
        <RadioButton
          disabled
          onPress={() => {}}
          title='Radio Button Label'
        />,
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
