import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tag from './index';

configure({ adapter: new Adapter() });

describe('Renders correctly, ', () => {
  it('Solid Tag', () => {
    const wrapper = shallow(<Tag />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Disabled Solid Tag', () => {
    const wrapper = shallow(<Tag disabled />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Outline Tag', () => {
    const wrapper = shallow(<Tag outline />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Disabled Outline Tag', () => {
    const wrapper = shallow(<Tag outline disabled />);
    expect(wrapper).toMatchSnapshot();
  });
});
