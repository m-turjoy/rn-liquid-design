import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Slider from './index'

configure({ adapter: new Adapter() })
describe('Slider component', () => {
  describe('Renders correctly', () => {
    test('it renders default Slider', () => {
      const tree = shallow(
        <Slider />
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
