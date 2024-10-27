import React, { Component } from 'react'
import {
  Platform,
  ActivityIndicator
} from 'react-native'
import {
  object,
  number,
  oneOfType,
  array,
  string,
  bool,
  func,
  shape
} from 'prop-types'
import { ThemeProvider } from 'styled-components'
import {
  fonts,
  colors
} from '../../config'
import { defaultThemeName, getThemeObject } from '../../config/theme'
import {
  TableWrapper,
  IndicatorWrapper,
  VerticalScrollView,
  HorizontalScrollView,
  TableDataList,
  ColumnHeaderList,
  Separator,
  Container
} from './styled'
import ColumnHeader from './ColumnHeader'
import TableData from './TableData'
import TablePagination from '../TablePagination'

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rowsData: this.props.rowsData,
      indexPressed: null,
      paginationCurrentPage: this.props.currentPage,
      paginationPerPage: this.props.actualItemsPerPage,
      defaultRowsData: this.props.rowsData,
      loading: false,
      headersHeight: 0,
      contentOffsetX: 0
    }
  }

  componentDidMount() {
    const { mainCheckboxChecked, mainOptionOpened } = this.props
    if (mainCheckboxChecked) {
      this.setAllCheckboxes(mainCheckboxChecked)
    } else if (mainOptionOpened) {
      this.setAllDropdowns(mainOptionOpened)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.rowsData !== nextProps.rowsData) {
      this.setState({
        rowsData: nextProps.rowsData
      })
    }
  }

  setAllDropdowns = (openedValue) => {
    const { rowsData } = this.state
    const opened = rowsData.map(value => ({
      ...value,
      dropdownInfoOpened: openedValue
    }))

    this.setState({
      rowsData: opened,
      defaultRowsData: opened
    })
  }

  setAllCheckboxes = (checkedValue) => {
    const { rowsData } = this.state
    const checked = rowsData.map(value => ({
      ...value,
      checked: checkedValue
    }))

    this.setState({
      rowsData: checked,
      defaultRowsData: checked
    })
  }

  headerKeyExtractor = (item, index) => `${item}${index}`

  tableDataKeyExtractor = (item, index) => `${item.columnHead}${index}`

  handleIconPressed = (columnSortedAscending, columnUnsorted, index) => {
    const indexToPick = index - 1
    this.setState({
      loading: true
    })
    this.handleSortingData(columnSortedAscending, columnUnsorted, index, indexToPick)
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 1500)
  }

  handleInitialPaginateRowsData = () => {
    const { rowsData, currentPage, actualItemsPerPage } = this.props

    return rowsData.slice((currentPage - 1) * actualItemsPerPage, currentPage * actualItemsPerPage)
  }

  handleSortingData = (columnSortedAscending, columnUnsorted, index, indexToPick) => {
    this.setState({
      indexPressed: index
    })

    if (typeof this.props.onSortOrderChanged === 'function') {
      return (this.props.onSortOrderChanged(columnSortedAscending, columnUnsorted, index))
    }

    if (columnUnsorted) {
      return this.ascendingData(index, indexToPick)
    } else if (columnSortedAscending) {
      return this.descendingData(index, indexToPick)
    }

    return this.defaultTableData(index)
  }

  sortAlphaNum = (a, b) => a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: 'base'
  })

  splitValues = obj => obj.split(/(\d+|\D+)/).filter(val => val != '')

  sortAlphaNum = (a, b) => {
    const actualValue = this.splitValues(a)
    const nextValue = this.splitValues(b)
    let sortedValue = 0
    let i = 0
    for (sortedValue, i; sortedValue === 0 && i < actualValue.length && i < nextValue.length; i++) {
      const n1 = actualValue[i] - 0
      const n2 = nextValue[i] - 0
      if (!isNaN(n1) && !isNaN(n2)) {
        sortedValue = n1 - n2
      } else if (actualValue[i] < nextValue[i]) {
        sortedValue = -1
      } else if (actualValue[i] > nextValue[i]) {
        sortedValue = 1
      }
    }

    return sortedValue
  }

  ascendingData = (index, indexToPick) => {
    const { rowsData } = this.state

    const ascendingData = rowsData.map(val => val)
      .sort((a, b) => {
        const aValue = index === 0 ? a.rowName : a.rowData[indexToPick]
        const bValue = index === 0 ? b.rowName : b.rowData[indexToPick]

        return this.sortAlphaNum(aValue, bValue)
      })

    this.setState({
      rowsData: ascendingData
    })
  }

  descendingData = (index, indexToPick) => {
    const { rowsData } = this.state
    const descendingData = rowsData.map(val => val)
      .sort((a, b) => {
        const aValue = index === 0 ? b.rowName : b.rowData[indexToPick]
        const bValue = index === 0 ? a.rowName : a.rowData[indexToPick]

        return this.sortAlphaNum(aValue, bValue)
      })

    this.setState({
      rowsData: descendingData
    })
  }

  defaultTableData = (index) => {
    this.setState({
      rowsData: this.state.defaultRowsData
    })
  }

  handleOneOfCheckboxesChecked = (val, index, rowName) => {
    const { rowsData } = this.state
    const { onCheckboxPress } = this.props

    const checked = rowsData.map((value) => {
      if (value.rowName === rowName) {
        return {
          ...value,
          checked: val
        }
      }

      return value
    })
    this.setState({
      rowsData: checked,
      defaultRowsData: checked
    })

    const isEveryChecked = checked.every(item => item.checked === true)
    onCheckboxPress(val, index, isEveryChecked)
  }

  handleOneOfDropdownOpened = (val, index, rowName) => {
    const { rowsData } = this.state
    const { onOptionOpened } = this.props

    const opened = rowsData.map((value) => {
      if (value.rowName === rowName) {
        return {
          ...value,
          dropdownInfoOpened: val
        }
      }

      return value
    })

    this.setState({
      rowsData: opened,
      defaultRowsData: opened
    })

    const isEveryOpened = opened.every(item => item === true)
    onOptionOpened(val, index, isEveryOpened)
  }

  handleMainCheckboxPressed = () => {
    const { onMainCheckboxPress, mainCheckboxChecked } = this.props
    onMainCheckboxPress()
    this.setAllCheckboxes(!mainCheckboxChecked)
  }

  handleMainOptionPressed = () => {
    const { onMainOptionOpen, mainOptionOpened } = this.props
    onMainOptionOpen()
    this.setAllDropdowns(!mainOptionOpened)
  }

  handleItemsPerPageExtend = (itemsPerPageChoosen) => {
    this.setState({
      paginationPerPage: itemsPerPageChoosen,
      loading: true
    })

    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 1500)
  }

  handlePageChanged = (actualPageVisible) => {
    this.setState({
      paginationCurrentPage: actualPageVisible,
      loading: true
    })

    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 1500)
  }

  showPaginatedContent = () => {
    const { rowsData, paginationCurrentPage, paginationPerPage } = this.state

    return rowsData.slice((paginationCurrentPage - 1) * paginationPerPage,
      paginationCurrentPage * paginationPerPage)
  }

  renderSeparator = () => (
    <Separator
      backgroundColor={colors.sensitiveGreyDarker}
      height={1}
      width='100%'
    />
  )

  renderRow = ({ item, index }) => {
    const {
      nameTextFontFamily,
      nameTextFontSize,
      nameTextColor,
      infoTextFontFamily,
      infoTextFontSize,
      infoTextColor,
      checkbox,
      checkboxIconSize,
      checkboxIconColor,
      rowTextFontFamily,
      rowTextFontSize,
      rowTextColor,
      rowBackgroundColor,
      rowTextStyle,
      dropdown,
      arrowIconSize,
      arrowIconColor,
      type,
      imageWidth,
      imageHeight,
      imageResizeMode,
      imageBorderRadius,
      spaceBetweenColumns,
      cellWidth,
      cellStyle,
      dropdownInfoTextFontSize,
      dropdownInfoTextFontFamily,
      dropdownInfoTextColor,
      labelTextFontSize,
      labelTextFontFamily,
      labelTextColor,
      labelTextStyle,
      infoTextStyle,
      nameTextStyle,
      themeName,
      wrapperColor
    } = this.props
    const themeObj = getThemeObject(themeName)

    return (
      <TableData
        data={item}
        index={index}
        themeObj={themeObj}
        cellWidth={cellWidth}
        cellStyle={cellStyle}
        nameFontSize={nameTextFontSize}
        nameFontFamily={nameTextFontFamily}
        nameColor={nameTextColor}
        infoFontSize={infoTextFontSize}
        infoFontFamily={infoTextFontFamily}
        infoColor={infoTextColor}
        checkbox={checkbox}
        checkboxIconSize={checkboxIconSize}
        checkboxIconColor={checkboxIconColor}
        onCheckboxPress={val => this.handleOneOfCheckboxesChecked(val, index, item.rowName)}
        checkboxChecked={item.checked}
        rowTextFontFamily={rowTextFontFamily}
        rowTextFontSize={rowTextFontSize}
        rowTextColor={rowTextColor}
        rowBackgroundColor={rowBackgroundColor}
        rowTextStyle={rowTextStyle}
        dropdown={dropdown}
        handleDropdownOpened={val => this.handleOneOfDropdownOpened(val, index, item.rowName)}
        optionOpened={item.dropdownInfoOpened}
        arrowIconSize={arrowIconSize}
        arrowIconColor={arrowIconColor}
        type={type}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        imageResizeMode={imageResizeMode}
        imageBorderRadius={imageBorderRadius}
        spaceBetweenColumns={spaceBetweenColumns}
        dropdownInfoFontSize={dropdownInfoTextFontSize}
        dropdownInfoFontFamily={dropdownInfoTextFontFamily}
        dropdownInfoColor={dropdownInfoTextColor}
        labelFontSize={labelTextFontSize}
        labelFontFamily={labelTextFontFamily}
        labelColor={labelTextColor}
        labelStyle={labelTextStyle}
        infoStyle={infoTextStyle}
        nameStyle={nameTextStyle}
        wrapperColor={wrapperColor}
      />
    )
  }

  renderColumnHead = ({ item, index }) => {
    const {
      headerTextStyle,
      headerTextFontFamily,
      headerTextFontSize,
      headerTextColor,
      checkbox,
      dropdown,
      type,
      checkboxIconColor,
      checkboxIconSize,
      mainCheckboxChecked,
      arrowIconSize,
      arrowIconColor,
      mainOptionOpened,
      spaceBetweenColumns,
      themeName,
      headerWidth,
      headerWrapperStyle
    } = this.props
    const { indexPressed } = this.state
    const themeObj = getThemeObject(themeName)

    return (
      <ColumnHeader
        headerWidth={headerWidth}
        headerWrapperStyle={headerWrapperStyle}
        item={item}
        index={index}
        indexPressed={indexPressed}
        themeObj={themeObj}
        headerStyle={headerTextStyle}
        headerFontFamily={headerTextFontFamily}
        headerFontSize={headerTextFontSize}
        headerColor={headerTextColor}
        checkbox={checkbox}
        dropdown={dropdown}
        arrowIconSize={arrowIconSize}
        arrowIconColor={arrowIconColor}
        checkboxIconColor={checkboxIconColor}
        checkboxIconSize={checkboxIconSize}
        handleMainCheckboxPressed={() => this.handleMainCheckboxPressed()}
        mainCheckboxChecked={mainCheckboxChecked}
        mainOptionOpened={mainOptionOpened}
        handleMainOptionPressed={() => this.handleMainOptionPressed()}
        type={type}
        onIconPress={(columnSortedAscending, columnUnsorted) => {
          this.handleIconPressed(columnSortedAscending, columnUnsorted, index)
        }}
        spaceBetweenColumns={spaceBetweenColumns}
        loading={this.state.loading}
      />
    )
  }

  renderPaginationComponent = () => {
    const {
      paginationBelow,
      paginationItemsPerPage,
      rowsData,
      actualItemsPerPage,
      currentPage,
      onItemsDropdownRowPressed,
      onPagesDropdownRowPressed,
      themeName
    } = this.props

    return (
      <TablePagination
        {...this.props}
        onChange={actualPageVisible => this.setState({ paginationCurrentPage: actualPageVisible })}
        itemsPerPage={paginationItemsPerPage}
        itemsAmount={rowsData.length}
        width='100%'
        paginationBelow={paginationBelow}
        actualItemsPerPage={actualItemsPerPage}
        currentPage={currentPage}
        onPageChange={actualPageVisible => this.handlePageChanged(actualPageVisible)}
        onItemRowPressed={itemsPerPageChoosen => this.handleItemsPerPageExtend(itemsPerPageChoosen)}
        onItemsDropdownRowPressed={onItemsDropdownRowPressed}
        onPagesDropdownRowPressed={onPagesDropdownRowPressed}
        themeName={themeName}
      />
    )
  }

  render() {
    const {
      themeName,
      scrollAreaWidth,
      scrollAreaHeight,
      tableDataBackgroundColor,
      headerBackgroundColor,
      dropdown,
      spaceBetweenColumns,
      cellWidth,
      type,
      withPagination,
      headersData,
      paginationBelow
    } = this.props
    const {
      rowsData,
      paginationPerPage,
      headersHeight,
      contentOffsetX
    } = this.state
    const tablesWidth = (((cellWidth + spaceBetweenColumns) * headersData.length) + 30)
    const themeObj = getThemeObject(themeName)
    const headerHeight = (type === 'small' && 40) || ((type === 'medium' || type === 'large' || type === 'image') && 55)

    return (
      <ThemeProvider
        theme={themeObj}
      >
        <TableWrapper
          width={scrollAreaWidth}
          height={scrollAreaHeight}
          borderRadius={6}
          overflow='hidden'
        >
          <HorizontalScrollView
            horizontal
            bounces={!this.state.loading}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews
            scrollEnabled={!this.state.loading}
            scrollEventThrottle={16}
            onScroll={
              (event) => {
                const {
                  x
                } = event.nativeEvent.contentOffset
                this.setState({
                  contentOffsetX: x
                })
              }
            }
          >
            <VerticalScrollView
              borderRadius={6}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews
            >
              <Container
                onLayout={
                  (event) => {
                    const {
                      height
                    } = event.nativeEvent.layout
                    this.setState({
                      headersHeight: this.state.headersHeight + height
                    })
                  }
                }
              >

                {
                  withPagination && !paginationBelow ?
                    this.renderPaginationComponent() :
                    null
                }
                <ColumnHeaderList
                  data={headersData}
                  keyExtractor={this.headerKeyExtractor}
                  backgroundColor={headerBackgroundColor}
                  width={dropdown ? tablesWidth : null}
                  minHeight={headerHeight}
                  paddingLeft={spaceBetweenColumns}
                  horizontal
                  scrollEnabled={false}
                  renderItem={this.renderColumnHead}
                  borderTopLeftRadius={withPagination && !paginationBelow ? 0 : 6}
                  borderTopRightRadius={withPagination && !paginationBelow ? 0 : 6}
                  removeClippedSubviews
                />
              </Container>
              {
                this.state.loading ?
                  <IndicatorWrapper
                    width={tablesWidth}
                    height={scrollAreaHeight - headersHeight}
                    backgroundColor={colors.white}
                    left={contentOffsetX}
                  >
                    <Container
                      width={scrollAreaWidth}
                      backgroundColor={colors.white}
                    >
                      <Container
                        style={
                          {
                            transform: [{
                              scale: 0.67
                            }]
                          }
                        }
                      >
                        <ActivityIndicator
                          size='large'
                          color={themeObj.colors.primary.base}
                        />
                      </Container>
                    </Container>
                  </IndicatorWrapper> :
                  <TableDataList
                    initialNumToRender={paginationPerPage}
                    data={withPagination ? this.showPaginatedContent() : rowsData}
                    keyExtractor={this.tableDataKeyExtractor}
                    width={dropdown ? tablesWidth : null}
                    backgroundColor={tableDataBackgroundColor}
                    renderItem={this.renderRow}
                    ItemSeparatorComponent={() => this.renderSeparator()}
                    scrollEnabled={false}
                    borderBottomLeftRadius={withPagination && paginationBelow ? 0 : 6}
                    borderBottomRightRadius={withPagination && paginationBelow ? 0 : 6}
                    removeClippedSubviews
                  />
              }

              {withPagination && paginationBelow ?
                <Container>
                  {this.renderSeparator()}
                  {this.renderPaginationComponent()}
                </Container>
                : null}
            </VerticalScrollView>
          </HorizontalScrollView>
        </TableWrapper>
      </ThemeProvider>
    )
  }
}

Table.defaultProps = {
  headerWidth: 130,
  headerWrapperStyle: {},
  themeName: defaultThemeName,
  cellWidth: 130,
  cellStyle: {},
  scrollAreaWidth: 300,
  scrollAreaHeight: 300,
  spaceBetweenColumns: 30,
  nameTextFontFamily: fonts.Black,
  nameTextFontSize: 14,
  nameTextColor: colors.richBlackDefault,
  infoTextFontFamily: fonts.Regular,
  infoTextFontSize: 14,
  infoTextColor: colors.richBlackDefault,
  headerBackgroundColor: colors.sensitiveGreyDefault,
  headerTextStyle: {},
  headerTextFontFamily: fonts.Black,
  headerTextFontSize: 14,
  headerTextColor: colors.richBlackDefault,
  rowTextFontFamily: fonts.Regular,
  rowTextFontSize: 14,
  rowTextColor: colors.richBlackDefault,
  rowBackgroundColor: colors.white,
  rowTextStyle: {},
  arrowIconColor: colors.vibrantCyanDefault,
  arrowIconSize: 24,
  tableDataBackgroundColor: colors.white,
  checkbox: false,
  checkboxIconSize: 19,
  checkboxIconColor: colors.vibrantCyanDefault,
  onCheckboxPress: () => { },
  dropdown: false,
  type: 'small',
  imageWidth: 40,
  imageHeight: 40,
  imageResizeMode: 'contain',
  imageBorderRadius: Platform.OS === 'android' ? 60 : 20,
  mainCheckboxChecked: false,
  onMainCheckboxPress: () => { },
  mainOptionOpened: false,
  onMainOptionOpen: () => { },
  onOptionOpened: () => { },
  dropdownInfoTextFontSize: 14,
  dropdownInfoTextFontFamily: fonts.Regular,
  dropdownInfoTextColor: colors.richBlackDefault,
  labelTextFontSize: 12,
  labelTextFontFamily: fonts.Regular,
  labelTextColor: colors.richBlackLightest,
  labelTextStyle: {},
  infoTextStyle: {},
  nameTextStyle: {},
  withPagination: false,
  paginationBelow: false,
  paginationItemsPerPage: [10, 20, 40, 80],
  actualItemsPerPage: 10,
  currentPage: 1,
  onItemsDropdownRowPressed: () => { },
  onPagesDropdownRowPressed: () => { },
  wrapperColor: colors.white
}

Table.propTypes = {
  headerWidth: number,
  headerWrapperStyle: oneOfType([object, array]),
  themeName: oneOfType([
    string,
    shape({
      primary: shape({
        lightest: string,
        light: string,
        base: string,
        dark: string,
        darker: string
      }).isRequired,
      secondary: shape({
        lightest: string,
        light: string,
        base: string,
        dark: string,
        darker: string
      }).isRequired
    })
  ]),
  cellWidth: number,
  cellStyle: oneOfType([object, array]),
  scrollAreaWidth: number,
  scrollAreaHeight: number,
  spaceBetweenColumns: number,
  nameTextFontFamily: string,
  nameTextFontSize: number,
  nameTextColor: string,
  infoTextFontFamily: string,
  infoTextFontSize: number,
  infoTextColor: string,
  headerBackgroundColor: string,
  headerTextStyle: oneOfType([object, array]),
  headerTextFontFamily: string,
  headerTextFontSize: number,
  headerTextColor: string,
  rowTextFontFamily: string,
  rowTextFontSize: number,
  rowTextColor: string,
  rowBackgroundColor: string,
  rowTextStyle: oneOfType([object, array]),
  arrowIconColor: string,
  arrowIconSize: number,
  tableDataBackgroundColor: string,
  checkbox: bool,
  checkboxIconSize: number,
  checkboxIconColor: string,
  onCheckboxPress: func,
  dropdown: bool,
  type: string,
  imageWidth: number,
  imageHeight: number,
  imageResizeMode: string,
  imageBorderRadius: number,
  mainCheckboxChecked: bool,
  onMainCheckboxPress: func,
  mainOptionOpened: bool,
  onMainOptionOpen: func,
  onOptionOpened: func,
  dropdownInfoTextFontSize: number,
  dropdownInfoTextFontFamily: string,
  dropdownInfoTextColor: string,
  labelTextFontSize: number,
  labelTextFontFamily: string,
  labelTextColor: string,
  labelTextStyle: oneOfType([object, array]),
  infoTextStyle: oneOfType([object, array]),
  nameTextStyle: oneOfType([object, array]),
  withPagination: bool,
  paginationBelow: bool,
  paginationItemsPerPage: array,
  headersData: array.isRequired,
  rowsData: array.isRequired,
  actualItemsPerPage: number,
  currentPage: number,
  onItemsDropdownRowPressed: func,
  onPagesDropdownRowPressed: func,
  wrapperColor: string,
  onSortOrderChanged: func
}
export default Table
