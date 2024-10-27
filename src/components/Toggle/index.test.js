import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Toggle from './index'

configure({ adapter: new Adapter() })
describe('Toggle component', () => {
  describe('Renders correctly', () => {
    test('it renders Default Toggle', () => {
      const tree = shallow(
        <Toggle />,
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
