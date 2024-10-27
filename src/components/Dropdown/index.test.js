import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dropdown from './index';

configure({ adapter: new Adapter() });

const props = {
  fontFamily: 'Lato-Regular',
  fontSize: 3,
  options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  width: 250,
  height: 40,
  onOptionPress: () => {},
  multiselect: false,
  disabled: false,
  inline: false,
  dropdownLabel: 'Dropdown Label',
  dropdownStyle: {
    borderWidth: 0,
    borderRadius: 6,
    elevation: 20,
    shadowOpacity: 0.25,
    shadowColor: '#1B1B1B',
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 20 },
    width: 250,
  },
};

describe('Renders correctly, ', () => {
  it('Default Dropdown', () => {
    const wrapper = shallow(<Dropdown {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Disabled Dropdown', () => {
    const wrapper = shallow(<Dropdown {...props} disabled />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Multiselect Dropdown', () => {
    const wrapper = shallow(<Dropdown {...props} multiselect />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Inline Default Dropdown', () => {
    const wrapper = shallow(<Dropdown {...props} multiselect />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Inline Multiselect Dropdown', () => {
    const wrapper = shallow(<Dropdown {...props} multiselect />);
    expect(wrapper).toMatchSnapshot();
  });
});
