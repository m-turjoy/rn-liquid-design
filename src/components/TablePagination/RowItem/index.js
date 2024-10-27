import React from 'react'
import {
  number,
  oneOfType,
  string,
  bool,
  func
} from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../config'
import {
  RowTouchable,
  RowWrapper,
  Page
} from '../styled'

const adjustBackgroundColor = (
  isPage, isHighlighted, dropdownRowBackgroundColorActive,
  isItem, index, indexPressed, dropdownRowBackgroundColor
  // eslint-disable-next-line
) => (isPage && isHighlighted ?
  dropdownRowBackgroundColorActive :
  isItem && index === indexPressed ?
    dropdownRowBackgroundColorActive : dropdownRowBackgroundColor)

const adjustFontFamily = (
  isPage, isHighlighted, dropdownRowTextFontFamilyActive,
  isItem, index, indexPressed, dropdownRowTextFontFamily
  // eslint-disable-next-line
) => (isPage && isHighlighted ?
  dropdownRowTextFontFamilyActive :
  isItem && index === indexPressed ?
    dropdownRowTextFontFamilyActive : dropdownRowTextFontFamily)

const adjustColor = (
  isPage, isHighlighted, dropdownRowTextColorActive,
  isItem, index, indexPressed, dropdownRowTextColor, themeName
  // eslint-disable-next-line
) => (isPage && isHighlighted ?
  theme.themes[themeName].colors.primary.base ||
  dropdownRowTextColorActive :
  isItem && index === indexPressed ?
    theme.themes[themeName].colors.primary.base ||
    dropdownRowTextColorActive : dropdownRowTextColor)

const RowItem = ({
  item,
  index,
  hideItemsDropdown,
  dropdownRowWidth,
  dropdownRowHeight,
  dropdownRowBackgroundColorActive,
  dropdownRowBackgroundColor,
  dropdownRowTextFontSize,
  dropdownRowTextFontFamily,
  dropdownRowTextColor,
  indexPressed,
  dropdownRowTextFontFamilyActive,
  dropdownRowTextColorActive,
  onItemRowPressed,
  actualPageVisible,
  isItem,
  isPage,
  themeName
}) => {
  const isHighlighted = actualPageVisible - 1 === index

  return (
    <ThemeProvider
      theme={theme.themes[themeName]}
    >
      <RowTouchable
        onPress={() => {
          onItemRowPressed(index, item)
          hideItemsDropdown()
        }}
      >
        <RowWrapper
          width={dropdownRowWidth}
          height={dropdownRowHeight}
          backgroundColor={
            adjustBackgroundColor(isPage, isHighlighted, dropdownRowBackgroundColorActive,
              isItem, index, indexPressed, dropdownRowBackgroundColor)
          }
          alignItems='flex-start'
          justifyContent='center'
          paddingLeft={25}
        >
          <Page
            fontSize={dropdownRowTextFontSize}
            fontFamily={adjustFontFamily(isPage, isHighlighted, dropdownRowTextFontFamilyActive,
              isItem, index, indexPressed, dropdownRowTextFontFamily)}
            color={adjustColor(isPage, isHighlighted, dropdownRowTextColorActive,
              isItem, index, indexPressed, dropdownRowTextColor, themeName)}
          >{item}
          </Page>
        </RowWrapper>
      </RowTouchable>
    </ThemeProvider>
  )
}

RowItem.propTypes = {
  item: oneOfType([string, number]).isRequired,
  index: number.isRequired,
  indexPressed: number.isRequired,
  hideItemsDropdown: func.isRequired,
  dropdownRowWidth: number.isRequired,
  dropdownRowHeight: number.isRequired,
  dropdownRowBackgroundColorActive: string.isRequired,
  dropdownRowBackgroundColor: string.isRequired,
  dropdownRowTextFontSize: number.isRequired,
  dropdownRowTextFontFamily: string.isRequired,
  dropdownRowTextColor: string.isRequired,
  dropdownRowTextFontFamilyActive: string.isRequired,
  dropdownRowTextColorActive: string.isRequired,
  onItemRowPressed: func.isRequired,
  actualPageVisible: number,
  isItem: bool,
  isPage: bool,
  themeName: string.isRequired
}

RowItem.defaultProps = {
  actualPageVisible: 1,
  isItem: false,
  isPage: false
}

export default RowItem
