import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BarChart from './index';

const data = [
  [
    {
      x: 2020,
      y: 100000,
    },
    {
      x: 2022,
      y: 180000,
    },
    {
      x: 2023,
      y: 135000,
    },
  ],
];

configure({ adapter: new Adapter() });
describe('Bar Chart component', () => {
  describe('Renders correctly', () => {
    test('it renders default Bar Chart', () => {
      const tree = shallow(
        <BarChart
          unit="EUR"
          tickValuesX={[2020, 2021, 2022, 2023]}
          tickValuesY={[0, 60000, 100000, 140000, 180000, 220000]}
          labels={['Label 1', 'Label 2', 'Label 3']}
          data={data}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
