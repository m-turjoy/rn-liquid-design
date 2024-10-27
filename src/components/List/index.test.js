import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import List from './index'

configure({ adapter: new Adapter() })

const data = [
  {
    title: 'List 01'
  },
  {
    title: 'List 02'
  },
  {
    title: 'List 03'
  },
  {
    title: 'List 04'
  },
  {
    title: 'List 05'
  }
]

const dataIcons = [
  {
    title: 'List 01',
    icon: {
      name: 'circleX',
      size: 14
    }
  },
  {
    title: 'List 02',
    icon: {
      name: 'circleX',
      size: 14
    }
  },
  {
    title: 'List 03',
    icon: {
      name: 'circleX',
      size: 14
    }
  },
  {
    title: 'List 04',
    icon: {
      name: 'circleX',
      size: 14
    }
  },
  {
    title: 'List 05',
    icon: {
      name: 'circleX',
      size: 14
    }
  }
]

const props = {
  renderRow: () => {},
  data
}
const propsIcon = {
  renderRow: () => {},
  data: dataIcons
}

describe('Renders correctly, ', () => {
  it('Default List without icons', () => {
    const wrapper = shallow(<List
      {...props}
    />)
    expect(wrapper).toMatchSnapshot()
  })
  it('Default List with icons', () => {
    const wrapper = shallow(<List
      {...propsIcon}
    />)
    expect(wrapper).toMatchSnapshot()
  })
})
