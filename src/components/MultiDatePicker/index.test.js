import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MultiDatePicker from './index'

configure({ adapter: new Adapter() })
describe('MultiDatePicker component', () => {
  describe('Renders correctly', () => {
    test('it renders default Slider', () => {
      const tree = shallow(
        <MultiDatePicker />
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
