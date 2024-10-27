import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import FAQ from './index'

const SECTIONS = [
  {
    title: 'Section Title',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elita.'
  },
  {
    title: 'Section Title',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing.'
  }
]

configure({ adapter: new Adapter() })
describe('FAQ component', () => {
  describe('Renders correctly', () => {
    test('it renders default FAQ', () => {
      const tree = shallow(
        <FAQ
          sections={SECTIONS}
        />,
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
