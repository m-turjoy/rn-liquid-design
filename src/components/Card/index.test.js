import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from './index';

configure({ adapter: new Adapter() });

describe('Renders correctly, ', () => {
  it('with default props', () => {
    const wrapper = shallow(<Card />);
    expect(wrapper).toMatchSnapshot();
  });
  it('with active shadow style', () => {
    const wrapper = shallow(<Card shadowStyle="active" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('with stacked Cards', () => {
    const wrapper = shallow(<Card stacked />);
    expect(wrapper).toMatchSnapshot();
  });
});
