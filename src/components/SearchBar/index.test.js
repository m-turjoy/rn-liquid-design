import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchBar from './index';

const searchOptions = [
  { text: 'Search Result 1' },
  { text: 'Search Result 2' },
  { text: 'Search Result 3' },
  { text: 'Search Result 4' },
  { text: 'Search Result 5' },
  { text: 'Search Result 6' },
  { text: 'Search Result 7' },
];
configure({ adapter: new Adapter() });
describe('Search Bar component', () => {
  describe('Renders correctly', () => {
    test('it renders default Search Bar', () => {
      const tree = shallow(
        <SearchBar
          searchOptions={searchOptions}
          searchProperty="text"
          keyExtractor={(item) => item.text}
        />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders default Search Bar Disabled', () => {
      const tree = shallow(
        <SearchBar
          searchOptions={searchOptions}
          searchProperty="text"
          keyExtractor={(item) => item.text}
          disabled
        />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders Ghost Search Bar', () => {
      const tree = shallow(
        <SearchBar
          searchOptions={searchOptions}
          searchProperty="text"
          keyExtractor={(item) => item.text}
          ghost
        />
      );
      expect(tree).toMatchSnapshot();
    });
    test('it renders Ghost Search Bar disbaled', () => {
      const tree = shallow(
        <SearchBar
          searchOptions={searchOptions}
          searchProperty="text"
          keyExtractor={(item) => item.text}
          ghost
          disabled
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
