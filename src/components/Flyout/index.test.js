import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Flyout from './index';

configure({ adapter: new Adapter() });

const options = [
  { name: 'Option 1 Option 1 Option 1 Option 1' },
  {
    name: 'Option 2',
    options: [
      { name: 'Sub Option 1 Sub Option 1 Sub Option 1' },
      { name: 'Sub Option 2' },
      { name: 'Sub Option 3' },
      { name: 'Sub Option 4' },
    ],
  },
  { name: 'Option 3' },
];

describe('Renders correctly, ', () => {
  it('FlyOut Right Aligned', () => {
    const wrapper = shallow(<Flyout options={options} aligned="right" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('FlyOut Right Aligned disabled', () => {
    const wrapper = shallow(
      <Flyout options={options} aligned="right" disabled />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('FlyOut Left Aligned', () => {
    const wrapper = shallow(<Flyout options={options} aligned="left" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('FlyOut Left Aligned disabled', () => {
    const wrapper = shallow(
      <Flyout options={options} aligned="left" disabled />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('FlyOut Center Aligned', () => {
    const wrapper = shallow(<Flyout options={options} aligned="center" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('FlyOut Center Aligned Disabled', () => {
    const wrapper = shallow(
      <Flyout options={options} aligned="center" disabled />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
