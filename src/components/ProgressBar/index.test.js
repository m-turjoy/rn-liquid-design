import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProgressBar from './index'

configure({ adapter: new Adapter() })

test('Renders correctly a default Progress Bar', () => {
  const wrapper = shallow(<ProgressBar />)
  expect(wrapper).toMatchSnapshot()
})
test('Renders correctly a Step Progress Bar', () => {
  const wrapper = shallow(<ProgressBar
    type='step'
  />)
  expect(wrapper).toMatchSnapshot()
})
test('Renders correctly a Circular Progress Bar', () => {
  const wrapper = shallow(<ProgressBar
    type='circular'
  />)
  expect(wrapper).toMatchSnapshot()
})
