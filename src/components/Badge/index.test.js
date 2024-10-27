import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Badge from './index';

configure({ adapter: new Adapter() });
describe('Renders correctly Badge, ', () => {
  it('with default props', () => {
    const wrapper = shallow(<Badge />);
    expect(wrapper).toMatchSnapshot();
  });
  it('with Icon on the left', () => {
    const wrapper = shallow(
      <Badge
        withIcon
        icpnPosition="left
      "
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('with Icon on the right', () => {
    const wrapper = shallow(<Badge withIcon icpnPosition="right" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('With Icon on the left, disabled', () => {
    const wrapper = shallow(
      <Badge iconPosition="left" badgeText="Disabled Badge" disabled withIcon />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('of type Simple', () => {
    const wrapper = shallow(<Badge badgeType="simple" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('simple type with Icon', () => {
    const wrapper = shallow(<Badge badgeType="simple" withIcon />);
    expect(wrapper).toMatchSnapshot();
  });
  it('simple type disabled', () => {
    const wrapper = shallow(<Badge badgeType="simple" disabled withIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
