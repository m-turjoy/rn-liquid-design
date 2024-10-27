import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Icon from '../MerckIcons';
import GhostButton from './index';

configure({ adapter: new Adapter() });
describe('GhostButton component', () => {
  describe('Renders correctly', () => {
    test('it renders Default GhostButton with Text', () => {
      const tree = shallow(<GhostButton onPress={() => {}} title="Text" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders Default GhostButton with Text and custom title style', () => {
      const titleStyles = { fontSize: 22 };
      const tree = shallow(
        <GhostButton onPress={() => {}} title="Text" titleStyle={titleStyles} />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders Disabled GhostButton with text', () => {
      const tree = shallow(
        <GhostButton disabled onPress={() => {}} title="Text" />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders GhostButton with text and left icon', () => {
      const tree = shallow(
        <GhostButton
          icon={<Icon color="white" name="placeholder" size={15} />}
          iconLeft
          onPress={() => {}}
          title="Text"
        />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders Disabled GhostButton with text and left icon', () => {
      const tree = shallow(
        <GhostButton
          disabled
          icon={<Icon color="white" name="placeholder" size={15} />}
          iconLeft
          onPress={() => {}}
          title="Text"
        />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders GhostButton with text and right icon', () => {
      const tree = shallow(
        <GhostButton
          icon={<Icon color="white" name="placeholder" size={15} />}
          iconRight
          onPress={() => {}}
          title="Text"
        />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders Disabled GhostButton with text and right icon', () => {
      const tree = shallow(
        <GhostButton
          disabled
          icon={<Icon color="white" name="placeholder" size={15} />}
          iconRight
          onPress={() => {}}
          title="Text"
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
