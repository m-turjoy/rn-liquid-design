import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TypographicQuote from './index'

configure({ adapter: new Adapter() })
describe('TypographicQuote component', () => {
  describe('Renders correctly', () => {
    test('it renders big TypographicQuote', () => {
      const tree = shallow(
        <TypographicQuote
          quotation='Test'
          author='Test'
          big
        />,
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
