import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Favorites from './index'

configure({ adapter: new Adapter() })
describe('Favorites component', () => {
  describe('Renders correctly', () => {
    test('it renders clickable Favorites', () => {
      const tree = shallow(
        <Favorites />,
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
