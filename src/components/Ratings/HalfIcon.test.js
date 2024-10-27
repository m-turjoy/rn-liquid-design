import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import HalfIcon from './HalfIcon'

configure({ adapter: new Adapter() })
describe('HalfIcon component', () => {
  describe('Renders correctly', () => {
    test('it renders Default star HalfIcon', () => {
      const tree = shallow(
        <HalfIcon />,
      )
      expect(tree).toMatchSnapshot()
    })
    test('it renders Dot HalfIcon', () => {
      const tree = shallow(
        <HalfIcon
          type='dot'
        />,
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
