import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Calendar from './index'

configure({ adapter: new Adapter() })

describe('Renders correctly, ', () => {
  it('Default Small Calendar', () => {
    const wrapper = shallow(<Calendar />)
    wrapper.setState({ currentDate: '2018-12-11', inputValue: '2018' })
    expect(wrapper).toMatchSnapshot()
  })
})
