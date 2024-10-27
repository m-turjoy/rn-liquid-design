import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SimpleDatePicker from './index'

configure({ adapter: new Adapter() })
describe('SimpleDatePicker component', () => {
  describe('Renders correctly', () => {
    test('it renders default Slider', () => {
      const tree = shallow(
        <SimpleDatePicker />
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
