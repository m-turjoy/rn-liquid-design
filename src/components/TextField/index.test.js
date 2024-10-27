import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TextField from './index'
import colors from '../../../src/config/colors'

configure({ adapter: new Adapter() })
describe('TextField component', () => {
  describe('Renders correctly', () => {
    test('it renders Default TextField', () => {
      const tree = shallow(
        <TextField />,
      )
      expect(tree).toMatchSnapshot()
    })
    test('it renders Default TextField with background', () => {
      const tree = shallow(
        <TextField
          backgroundColor={colors.sensitiveGreyDefault}
        />,
      )
      expect(tree).toMatchSnapshot()
    })
    test('it renders Multiline TextField', () => {
      const tree = shallow(
        <TextField
          multiline
        />,
      )
      expect(tree).toMatchSnapshot()
    })
    test('it renders Multiline TextField with background', () => {
      const tree = shallow(
        <TextField
          backgroundColor={colors.sensitiveGreyDefault}
          multiline
        />,
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
