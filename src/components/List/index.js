import React from 'react'
import { ThemeProvider } from 'styled-components'
import { array, func, object, oneOfType } from 'prop-types'
import { ListWrapper, ListSeparator, FlatListWrapper } from './styled'
import { theme, colors } from '../../config'

const renderDefaultSeparator = () => (
  <ListSeparator
    width='100%'
    height={1}
    backgroundColor={colors.sensitiveGreyDarker}
  />
)

const List = (props) => {
  const {
    data,
    renderRow,
    renderHeader,
    listContainerStyle,
    renderSeparator
  } = props

  return (
    <ThemeProvider
      theme={theme}
    >
      <ListWrapper
        style={listContainerStyle}
      >
        <FlatListWrapper
          {...props}
          data={data}
          renderItem={renderRow}
          ListHeaderComponent={renderHeader}
          ItemSeparatorComponent={renderSeparator}
        />
      </ListWrapper>
    </ThemeProvider>
  )
}
List.defaultProps = {
  renderHeader: () => null,
  listContainerStyle: {
    width: 300,
    backgroundColor: colors.sensitiveGreyDefault,
    borderRadius: 6
  },
  renderSeparator: () => renderDefaultSeparator()
}
List.propTypes = {
  data: array.isRequired,
  renderRow: func.isRequired,
  renderHeader: func,
  listContainerStyle: oneOfType([object, array]),
  renderSeparator: func
}
export default List
