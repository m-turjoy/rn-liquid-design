import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Icon from '../MerckIcons';
import Button from './index';

configure({ adapter: new Adapter() });
describe('Button component', () => {
  describe('Renders correctly', () => {
    test('it renders Default Button with Text', () => {
      const tree = shallow(<Button onPress={() => {}} title="Text" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders Default Button with Text and custom styles', () => {
      const buttonWrapperStyles = { flex: 1 };
      const titleStyles = { fontSize: 20 };
      const tree = shallow(
        <Button
          buttonWrapperStyle={buttonWrapperStyles}
          onPress={() => {}}
          title="Text"
          titleStyle={titleStyles}
        />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders Default Button with Icon', () => {
      const tree = shallow(
        <Button
          icon={<Icon color="white" name="placeholder" size={15} />}
          onPress={() => {}}
          title="Log In"
        />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders Default Button with Icon Left', () => {
      const tree = shallow(
        <Button
          icon={<Icon color="white" name="placeholder" size={15} />}
          iconLeft
          onPress={() => {}}
          title="Log In"
        />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders Secondary Button with Text', () => {
      const tree = shallow(
        <Button onPress={() => {}} secondary title="Log In" />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders Secondary Button with Icon', () => {
      const tree = shallow(
        <Button
          icon={<Icon color="white" name="placeholder" size={15} />}
          onPress={() => {}}
          secondary
          title="Log In"
        />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders Secondary Button with Icon Left', () => {
      const tree = shallow(
        <Button
          icon={<Icon color="white" name="placeholder" size={15} />}
          iconLeft
          onPress={() => {}}
          secondary
          title="Log In"
        />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders HighLight Button with Text', () => {
      const tree = shallow(
        <Button highlight onPress={() => {}} title="Log In" />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders HighLight Button with Icon', () => {
      const tree = shallow(
        <Button
          highlight
          icon={<Icon color="white" name="placeholder" size={15} />}
          onPress={() => {}}
          title="Log In"
        />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders HighLight Button with Icon Left', () => {
      const tree = shallow(
        <Button
          highlight
          icon={<Icon color="white" name="placeholder" size={15} />}
          iconLeft
          onPress={() => {}}
          title="Log In"
        />
      );
      expect(tree).toMatchSnapshot();
    }); // /
    test('it renders Disabled Default Button with Text', () => {
      const tree = shallow(<Button disabled onPress={() => {}} title="Text" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders Disabled Default Button with Icon', () => {
      const tree = shallow(
        <Button
          disabled
          icon={<Icon color="white" name="placeholder" size={15} />}
          onPress={() => {}}
          title="Log In"
        />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders Disabled Default Button with Icon Left', () => {
      const tree = shallow(
        <Button
          disabled
          icon={<Icon color="white" name="placeholder" size={15} />}
          iconLeft
          onPress={() => {}}
          title="Log In"
        />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders Disabled Secondary Button with Text', () => {
      const tree = shallow(
        <Button disabled onPress={() => {}} secondary title="Log In" />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders Disabled Secondary Button with Icon', () => {
      const tree = shallow(
        <Button
          disabled
          icon={<Icon color="white" name="placeholder" size={15} />}
          onPress={() => {}}
          secondary
          title="Log In"
        />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders Disabled Secondary Button with Icon Left', () => {
      const tree = shallow(
        <Button
          disabled
          icon={<Icon color="white" name="placeholder" size={15} />}
          iconLeft
          onPress={() => {}}
          secondary
          title="Log In"
        />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders Disabled HighLight Button with Text', () => {
      const tree = shallow(
        <Button disabled highlight onPress={() => {}} title="Log In" />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders Disabled HighLight Button with Icon', () => {
      const tree = shallow(
        <Button
          disabled
          highlight
          icon={<Icon color="white" name="placeholder" size={15} />}
          onPress={() => {}}
          title="Log In"
        />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders Disabled HighLight Button with Icon Left', () => {
      const tree = shallow(
        <Button
          disabled
          highlight
          icon={<Icon color="white" name="placeholder" size={15} />}
          iconLeft
          onPress={() => {}}
          title="Log In"
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
