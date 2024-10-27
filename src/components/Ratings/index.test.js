import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Rating from './index'

configure({ adapter: new Adapter() })
describe('Rating component', () => {
  describe('Renders correctly', () => {
    test('it renders Default Star Rating', () => {
      const tree = shallow(
        <Rating />,
      )
      expect(tree).toMatchSnapshot()
    })
    test('it renders Default dot Rating', () => {
      const tree = shallow(
        <Rating
          dot
        />,
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
