import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Filter from './index';

configure({ adapter: new Adapter() });

const props = {
  options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  filterPrimaryAccent: 'red',
  filterSecondaryAccent: '#FFEEFF',
  filterDisabledColor: '#EEFFEE',
  filterLabel: 'Test Filter',
  handleOnSelect: jest.fn(),
  handleClearSelect: jest.fn(),
  handleClearMultiSelection: jest.fn(),
  handleMultiOnSelect: jest.fn(),
};
describe('Renders correctly, ', () => {
  it('Singleselect Filter', () => {
    const wrapper = shallow(<Filter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Disabled filter', () => {
    const wrapper = shallow(<Filter {...props} disabled />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Multiselect filter', () => {
    const wrapper = shallow(<Filter {...props} multiSelect />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Actions on Singleselect Filter, ', () => {
  const wrapper = shallow(<Filter {...props} />);
  const instance = wrapper.instance();
  const spyOnSelect = jest.spyOn(instance, 'handleOnSelect');
  const spyOnClearSelect = jest.spyOn(instance, 'handleClearSelect');
  it('fire handleonSelect method and set state of filterText to Option 2', () => {
    instance.handleOnSelect(props.options[1]);

    expect(spyOnSelect).toHaveBeenCalled();
    expect(wrapper.state('filterText')).toBe('Option 2');
    expect(wrapper.state('isSelected')).toBeTruthy();
    expect(wrapper.state('multiSelectedList')).toEqual([]);
  });
  it('fire handleClearSelect method and set state to default', () => {
    wrapper.setState({ filterText: 'Changed Filter' });
    expect(wrapper.state('filterText')).toBe('Changed Filter');
    instance.handleClearSelect();
    expect(spyOnClearSelect).toHaveBeenCalled();
    expect(wrapper.state('filterText')).toBe(props.filterLabel);
  });
});

describe('Multiselect Filter Actions, ', () => {
  const wrapper = shallow(<Filter {...props} multiSelect />);
  const instance = wrapper.instance();
  const spyOnMultiSelect = jest.spyOn(instance, 'handleMultiOnSelect');
  const spyOnClearMultiSelected = jest.spyOn(
    instance,
    'handleClearMultiSelection'
  );
  it('handleMultiOnSelect method twice and adds 2 options to multiselectedState', () => {
    instance.handleMultiOnSelect(props.options[0]);
    instance.handleMultiOnSelect(props.options[2]);
    expect(wrapper.state('multiSelectedList')).toHaveLength(2);
    expect(wrapper.state('multiSelectedList')).toEqual([
      props.options[0],
      props.options[2],
    ]);
    expect(spyOnMultiSelect).toHaveBeenCalledTimes(2);
  });
  it('fire handleMultiOnSelect method and expects to remove selected option from state', () => {
    wrapper.setState({
      multiSelectedList: [props.options[0], props.options[1]],
    });
    expect(wrapper.state('multiSelectedList')).toHaveLength(2);
    instance.handleMultiOnSelect(props.options[0]);
    expect(spyOnMultiSelect).toHaveBeenCalled();
    expect(wrapper.state('multiSelectedList')).toHaveLength(1);
    expect(wrapper.state('multiSelectedList')).toEqual([props.options[1]]);
  });
  it('fire handleClearMultiSelection and it removes all selected items from list ', () => {
    wrapper.setState({
      multiSelectedList: [
        props.options[0],
        props.options[1],
        props.options[2],
        props.options[3],
      ],
    });

    expect(wrapper.state('multiSelectedList')).toEqual([
      props.options[0],
      props.options[1],
      props.options[2],
      props.options[3],
    ]);

    instance.handleClearMultiSelection();
    expect(wrapper.state('multiSelectedList')).toEqual([]);
    expect(spyOnClearMultiSelected).toHaveBeenCalled();
  });
});
