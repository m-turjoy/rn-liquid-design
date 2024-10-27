import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AnimatedHeart from './index'
import { colors } from '../../../config'

configure({ adapter: new Adapter() })
describe('AnimatedHeart component', () => {
  describe('Renders correctly', () => {
    test('it renders default AnimatedHeart', () => {
      const tree = shallow(
        <AnimatedHeart
          isHeart
          color={colors.vibrantCyanDefault}
        />,
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
