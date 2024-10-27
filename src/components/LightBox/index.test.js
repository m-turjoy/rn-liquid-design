import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import LightBox from './index'

configure({ adapter: new Adapter() })
describe('LightBox module', () => {
  describe('Renders correctly', () => {
    test('it renders default LightBox', () => {
      const tree = shallow(
        <LightBox
          isVisible='true'
        />
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
