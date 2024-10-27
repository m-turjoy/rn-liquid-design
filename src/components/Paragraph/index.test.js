import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Paragraph from './index'

configure({ adapter: new Adapter() })
describe('Paragraph component', () => {
  describe('Renders correctly', () => {
    test('it renders default Paragraph', () => {
      const tree = shallow(
        <Paragraph
          text='Test'
          type='Medium'
        />,
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
