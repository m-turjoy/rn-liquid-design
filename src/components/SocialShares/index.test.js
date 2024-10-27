import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SocialShare from './index';

configure({ adapter: new Adapter() });
describe('SocialShare component', () => {
  describe('Renders correctly', () => {
    test('it renders default Facebook SocialShare', () => {
      const tree = shallow(<SocialShare type="facebook" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Instagram SocialShare', () => {
      const tree = shallow(<SocialShare type="instagram" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Snapchat SocialShare', () => {
      const tree = shallow(<SocialShare type="snapchat" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Twitter SocialShare', () => {
      const tree = shallow(<SocialShare type="twitter" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default LinkedIn SocialShare', () => {
      const tree = shallow(<SocialShare type="linkedIn" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Flickr SocialShare', () => {
      const tree = shallow(<SocialShare type="flickr" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Slack SocialShare', () => {
      const tree = shallow(<SocialShare type="slack" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Mail SocialShare', () => {
      const tree = shallow(<SocialShare type="mail" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Salesforce SocialShare', () => {
      const tree = shallow(<SocialShare type="salesforce" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Skype SocialShare', () => {
      const tree = shallow(<SocialShare type="skype" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Microsoft Teams SocialShare', () => {
      const tree = shallow(<SocialShare type="microsoftTeams" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Xing SocialShare', () => {
      const tree = shallow(<SocialShare type="xing" />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Facebook SocialShare large', () => {
      const tree = shallow(<SocialShare type="facebook" large />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Instagram SocialShare large', () => {
      const tree = shallow(<SocialShare type="instagram" large />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Snapchat SocialShare large', () => {
      const tree = shallow(<SocialShare type="snapchat" large />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Twitter SocialShare large', () => {
      const tree = shallow(<SocialShare type="twitter" large />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default LinkedIn SocialShare large', () => {
      const tree = shallow(<SocialShare type="linkedIn" large />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Flickr SocialShare large', () => {
      const tree = shallow(<SocialShare type="flickr" large />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Slack SocialShare large', () => {
      const tree = shallow(<SocialShare type="slack" large />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Mail SocialShare large', () => {
      const tree = shallow(<SocialShare type="mail" large />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Salesforce SocialShare large', () => {
      const tree = shallow(<SocialShare type="salesforce" large />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Skype SocialShare large', () => {
      const tree = shallow(<SocialShare type="skype" large />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Microsoft Teams SocialShare large', () => {
      const tree = shallow(<SocialShare type="microsoftTeams" large />);
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Xing SocialShare large', () => {
      const tree = shallow(<SocialShare type="xing" large />);
      expect(tree).toMatchSnapshot();
    });
  });
});
