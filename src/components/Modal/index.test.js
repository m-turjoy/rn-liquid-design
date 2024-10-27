import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Modal from './index';

configure({ adapter: new Adapter() });
describe('Modal component', () => {
  describe('Renders correctly', () => {
    test('it renders default Modal', () => {
      const tree = shallow(<Modal />);
      expect(tree).toMatchSnapshot();
    });
  });
});
