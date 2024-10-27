import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TablePagination from '.'

const itemsPerPage = [10, 20, 40, 80]

configure({ adapter: new Adapter() })
describe('TablePagination component', () => {
  describe('Renders correctly', () => {
    test('it renders Default Pagination', () => {
      const tree = shallow(
        <TablePagination
          itemsPerPage={itemsPerPage}
        />,
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
