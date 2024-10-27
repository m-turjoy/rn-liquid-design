import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Bowl from './index'

configure({ adapter: new Adapter() })
describe('Bowl component', () => {
  describe('Renders correctly', () => {
    test('it renders default Bowl', () => {
      const tree = shallow(
        <Bowl
          H={70}
        />
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
