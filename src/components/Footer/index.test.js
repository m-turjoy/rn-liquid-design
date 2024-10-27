import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Footer from './index'

configure({ adapter: new Adapter() })
describe('Footer component', () => {
  describe('Renders correctly', () => {
    test('it renders default Footer', () => {
      const tree = shallow(
        <Footer
          labels={[{ key: 1, title: 'Label Text' }, { key: 2, title: 'Label Text' }, { key: 3, title: 'Label Text' }]}
        />
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
