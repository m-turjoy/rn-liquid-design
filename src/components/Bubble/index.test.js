import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Bubble from './index';

configure({ adapter: new Adapter() });
describe('Renders correctly, ', () => {
  it('with default props', () => {
    const wrapper = shallow(<Bubble />);
    expect(wrapper).toMatchSnapshot();
  });
  it('with info props style', () => {
    const wrapper = shallow(<Bubble info />);
    expect(wrapper).toMatchSnapshot();
  });
  it('with warning props style', () => {
    const wrapper = shallow(<Bubble warning />);
    expect(wrapper).toMatchSnapshot();
  });
  it('with disabled props style', () => {
    const wrapper = shallow(<Bubble disabled />);
    expect(wrapper).toMatchSnapshot();
  });
  it('with a specified amount of notifications style ', () => {
    const wrapper = shallow(<Bubble notifications={1} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('with over 99 notifications style', () => {
    const wrapper = shallow(<Bubble notifications={100} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('with animation disabled', () => {
    const wrapper = shallow(<Bubble disabledAnimations />);
    expect(wrapper).toMatchSnapshot();
  });
});
