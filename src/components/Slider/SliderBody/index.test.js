import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SliderBody from './index'

configure({ adapter: new Adapter() })
describe('SliderBody component', () => {
  describe('Renders correctly', () => {
    test('it renders default SliderBody', () => {
      const tree = shallow(
        <SliderBody
          width={250}
          minimumValue={0}
          maximumValue={100}
          step={1}
        />
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
