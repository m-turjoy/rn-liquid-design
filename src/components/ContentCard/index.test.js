import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ContentCard from './index'

configure({ adapter: new Adapter() })

describe('Renders correctly, ', () => {
  it('with default props', () => {
    const wrapper = shallow(<ContentCard />)
    expect(wrapper).toMatchSnapshot()
  })
  it('with active shadow style', () => {
    const wrapper = shallow(<ContentCard
      shadowStyle='active'
    />)
    expect(wrapper).toMatchSnapshot()
  })
  it('with stacked Content Cards', () => {
    const wrapper = shallow(
      <ContentCard
        stacked
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('with Cards and details', () => {
    const wrapper = shallow(
      <ContentCard
        withDetail
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('with stacked Cards and detail stacked', () => {
    const wrapper = shallow(
      <ContentCard
        stacked
        withDetail
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('with Cards and a badge', () => {
    const wrapper = shallow(
      <ContentCard
        withBadge
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('with Cards and a badge and details', () => {
    const wrapper = shallow(
      <ContentCard
        withBadge
        withDetail
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
