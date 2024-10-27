import React from 'react'
import { Platform, View } from 'react-native'
import { ThemeProvider } from 'styled-components'
import ModalDropdown from 'react-native-modal-dropdown'
import {
  string,
  number,
  func,
  object,
  bool,
  array,
  oneOfType,
  shape
} from 'prop-types'
import {
  theme,
  colors
} from '../../config'
import {
  DropdownWrapper,
  DropdownLabel,
  IconWrapper,
  DropdownRowWrapper,
  DropdownOption,
  DropdownLabelWithIconLeftWrapper,
  IconTouchable,
  AmountIconWrapper,
  Amount,
  AmountWrapper,
  DropdownOptionWrapper,
  IconOptionWrapper,
  AmountIconInnerWrapper
} from './styled'
import Icon from '../MerckIcons'
import styles from './styles'
import { defaultThemeName, getThemeObject } from '../../config/theme'

class Dropdown extends React.Component {
  state = {
    dropdownText: this.props.dropdownLabel,
    isSelected: false,
    multiSelectedList: [],
    optionSelected: this.props.dropdownLabel
  }

  handleOnSelect = (option) => {
    this.setState({ dropdownText: option, optionSelected: option })
  }

  handleOnMultipleSelect = (option) => {
    const { multiSelectedList } = this.state
    if (multiSelectedList.includes(option)) {
      const filtered = multiSelectedList.filter(value => value !== option)
      this.setState({ multiSelectedList: filtered })
    } else {
      this.setState({ multiSelectedList: [...multiSelectedList, option] })
    }
  }

  clearMultiSelectedList = () => {
    this.setState({ multiSelectedList: [] })
  }

  chooseTitleColor = (options, themeColor) => ((!this.state.isSelected || this.state.optionSelected) &&
    options.includes(this.state.dropdownText) ?
    themeColor : colors.richBlackDefault)

  renderAmountIcon = (multiSelectListLength) => {
    const {
      multiSelectIconStyle,
      amountTextColor,
      amountFontFamily,
      amountTextSize,
      amountClosingIconColor,
      amountClosingIconSize,
      inline,
      multiSelect,
      themeName
    } = this.props
    const themeObj = getThemeObject(themeName)
    const themeColor = themeObj.colors.primary.base

    const primaryColor = themeColor

    return (
      <IconTouchable
        onPress={() => {
          this.clearMultiSelectedList()
        }}
      >
        <AmountIconWrapper
          style={[multiSelectIconStyle, { backgroundColor: primaryColor }]}
          borderRadius={16}
          marginRight={(inline && multiSelect && 30) || 4}
        >
          <AmountIconInnerWrapper
            flexDirection='row'
            justifyContent='space-around'
            alignItems='center'
            flex={1}
            marginLeft={2}
          >
            <AmountWrapper
              justifyContent='center'
              alignItems='center'
              flex={2}
              paddingBottom={1}
            >
              <Amount
                color={amountTextColor}
                fontFamily={amountFontFamily}
                fontSize={amountTextSize}
              >
                {multiSelectListLength}
              </Amount>
            </AmountWrapper>
            <IconWrapper
              justifyContent='flex-start'
              alignItems='flex-start'
              flex={1}
              paddingRight={7}
            >
              <Icon
                name='closingX'
                color={amountClosingIconColor}
                size={amountClosingIconSize}
              />
            </IconWrapper>
          </AmountIconInnerWrapper>
        </AmountIconWrapper>
      </IconTouchable>
    )
  }

  renderMultiSelectRow = (option) => {
    const isMultiSelected = !!this.state.multiSelectedList.includes(option)
    const {
      rowStyle,
      rowTitleStyle,
      inline,
      inlineMultiselectRowStyle,
      rowTitleActiveColor,
      rowTitleColor,
      rowActiveFontFamily,
      rowFontFamily,
      checkboxColor,
      checkboxSize,
      rowActiveBackgroundColor,
      rowBackgroundColor,
      themeName
    } = this.props

    const themeObj = getThemeObject(themeName)
    const themeColor = themeObj.colors.primary.base

    const multiSelectListLength = this.state.multiSelectedList.length
    const primaryCheckboxColor = checkboxColor || themeColor
    const primaryTitleColor = rowTitleActiveColor || themeColor

    return (
      <DropdownRowWrapper
        style={
          (inline &&
            [
              inlineMultiselectRowStyle,
              {
                width: multiSelectListLength > 0 ?
                  inlineMultiselectRowStyle.width + 60 :
                  inlineMultiselectRowStyle.width,
                backgroundColor: isMultiSelected ? rowActiveBackgroundColor : rowBackgroundColor
              }
            ]) ||
          [rowStyle,
            {
              backgroundColor: isMultiSelected ? rowActiveBackgroundColor : rowBackgroundColor
            }
          ]
        }
      >
        <IconOptionWrapper
          flexDirection='row'
          flex={1}
          alignItems='center'
          marginLeft={inline ? 17 : 9}
          marginRight={8}
        >
          <IconWrapper
            marginRight={7}
            alignItems='center'
            justifyContent='center'
          >
            {isMultiSelected ?
              <Icon
                name='checkboxFilled'
                color={primaryCheckboxColor}
                size={checkboxSize}
              />
              :
              <Icon
                name='checkboxEmpty'
                color={colors.sensitiveGreyDarker}
                size={checkboxSize}
              />
            }
          </IconWrapper>
          <DropdownOptionWrapper
            flex={1}
          >
            <DropdownOption
              style={[
                rowTitleStyle,
                {
                  color: isMultiSelected ? primaryTitleColor : rowTitleColor,
                  fontFamily: isMultiSelected ? rowActiveFontFamily : rowFontFamily
                }
              ]}
              numberOfLines={1}
            >
              {option}
            </DropdownOption>
          </DropdownOptionWrapper>
        </IconOptionWrapper>
      </DropdownRowWrapper>
    )
  }

  renderRow = (option, index, isSelected) => {
    const {
      rowStyle,
      rowTitleStyle,
      inlineRowStyle,
      inline,
      rowBackgroundColor,
      rowActiveBackgroundColor,
      rowTitleActiveColor,
      rowTitleColor,
      rowActiveFontFamily,
      rowFontFamily,
      themeName
    } = this.props

    const themeObj = getThemeObject(themeName)
    const themeColor = themeObj.colors.primary.base

    const primaryTitleColor = rowTitleActiveColor || themeColor

    return (
      <DropdownRowWrapper
        justifyContent='center'
        style={[
          (inline && inlineRowStyle) ||
          rowStyle,
          {
            backgroundColor: isSelected ?
              rowActiveBackgroundColor : rowBackgroundColor
          }
        ]}
      >
        <DropdownOptionWrapper
          marginLeft={15}
          marginRight={8}
          flex={1}
          justifyContent='center'
          alignItem='flex-end'
        >
          <DropdownOption
            style={[
              rowTitleStyle,
              {
                color: isSelected ? primaryTitleColor : rowTitleColor,
                fontFamily: isSelected ? rowActiveFontFamily : rowFontFamily
              }
            ]}
            numberOfLines={1}
          >
            {option}
          </DropdownOption>
        </DropdownOptionWrapper>
      </DropdownRowWrapper>
    )
  }

  renderInlineModalDropdown = () => {
    const {
      onOptionPress,
      fontFamily,
      fontSize,
      options,
      disabled,
      iconColor,
      multiSelect,
      labelStyle,
      inlineDropdownContainerStyle,
      inlineMultiselectDropdownStyle,
      inlineDropdownStyle,
      inline,
      inlineMultiSelectContainerStyle,
      dropdownLabel,
      iconSize,
      themeName
    } = this.props

    const themeObj = getThemeObject(themeName)
    const themeColor = themeObj.colors.primary.base

    const multiSelectListLength = this.state.multiSelectedList.length
    const primaryIconColor = iconColor || themeColor

    return (
      <ModalDropdown
        disabled={disabled}
        activeOpacity={1}
        multiSelect={multiSelect}
        touchableHighlightUnderlayColor={colors.transparent}
        dropdownStyle={
          (inline &&
            multiSelect &&
            [
              inlineMultiselectDropdownStyle,
              styles.inlineMultiselectDropdownStyle,
              {
                width: multiSelectListLength > 0 ?
                  inlineMultiselectDropdownStyle.width + 60 :
                  inlineMultiselectDropdownStyle.width
              }
            ]
          ) ||
          [inlineDropdownStyle, styles.inlineDropdownStyle]}
        onDropdownWillHide={(showDropdown) => {
          if (showDropdown === undefined && multiSelect) {
            return this.setState({ isSelected: false })
          } else if (showDropdown === undefined && !multiSelect) {
            return this.setState({ dropdownText: this.state.optionSelected, isSelected: false })
          } else if (!multiSelect) {
            return this.setState({ isSelected: false })
          }
        }}
        onDropdownWillShow={() => {
          this.setState({
            dropdownText: dropdownLabel,
            isSelected: true
          })
        }}
        onSelect={(index, option) => {
          onOptionPress()

          return multiSelect ? this.handleOnMultipleSelect(option, index) :
            this.handleOnSelect(option, index)
        }}
        options={options}
        renderRow={multiSelect ? this.renderMultiSelectRow : this.renderRow}
      >
        <DropdownWrapper
          style={
            (inline &&
              multiSelect &&
              [inlineMultiSelectContainerStyle, styles.inlineMultiSelectContainerStyle]) ||
            [inlineDropdownContainerStyle, styles.inlineDropdownContainerStyle]}
          width={
            inline && multiSelect && multiSelectListLength > 0 ?
              inlineMultiSelectContainerStyle.width + 60 :
              inlineMultiSelectContainerStyle.width
          }
        >
          <DropdownLabelWithIconLeftWrapper
            flexDirection='row'
            justifyContent='flex-end'
            alignItems='center'
            marginBottom={12}
            marginLeft={10}
            marginTop={12}
            flex={1}
            opacity={disabled ? 0.15 : 1}
          >
            {multiSelect && this.state.multiSelectedList.length !== 0 ?
              this.renderAmountIcon(multiSelectListLength)
              :
              null
            }
            <DropdownLabel
              color={this.chooseTitleColor(options, themeColor)}
              fontFamily={
                (!this.state.isSelected || this.state.optionSelected) &&
                  options.includes(this.state.dropdownText) ?
                  'Lato-Black' : fontFamily
              }
              fontSize={fontSize}
              style={labelStyle}
              numberOfLines={1}
            >
              {this.state.dropdownText}
            </DropdownLabel>
          </DropdownLabelWithIconLeftWrapper>
          <IconWrapper
            marginRight={10}
            marginLeft={7}
            opacity={disabled ? 0.5 : 1}
          >
            {this.state.isSelected ?
              <Icon
                name='arrowUp'
                size={iconSize}
                color={primaryIconColor}
              />
              :
              <Icon
                name='arrowDown'
                size={iconSize}
                color={disabled ? colors.sensitiveGreyDarkest : primaryIconColor}
              />
            }
          </IconWrapper>
        </DropdownWrapper>
      </ModalDropdown>
    )
  }

  renderDefaultModalDropdown = () => {
    const {
      onOptionPress,
      fontFamily,
      fontSize,
      options,
      dropdownStyle,
      disabled,
      iconColor,
      multiSelect,
      labelStyle,
      dropdownContainerStyle,
      dropdownLabel,
      iconSize,
      themeName
    } = this.props

    const themeObj = getThemeObject(themeName)
    const themeColor = themeObj.colors.primary.base
    const multiSelectListLength = this.state.multiSelectedList.length
    const primaryIconColor = iconColor || themeObj.colors.primary.base

    return (
      <ModalDropdown
        disabled={disabled}
        activeOpacity={1}
        multiSelect={multiSelect}
        touchableHighlightUnderlayColor={colors.transparent}
        dropdownStyle={[dropdownStyle, styles.dropdownStyle]}
        onDropdownWillHide={(showDropdown) => {
          if (showDropdown === undefined && multiSelect) {
            return this.setState({ isSelected: false })
          } else if (showDropdown === undefined && !multiSelect) {
            return this.setState({ dropdownText: this.state.optionSelected, isSelected: false })
          } else if (!multiSelect) {
            return this.setState({ isSelected: false })
          }
        }}
        onDropdownWillShow={() => {
          this.setState({
            dropdownText: dropdownLabel,
            isSelected: true
          })
        }}
        onSelect={(index, option) => {
          onOptionPress()

          return multiSelect ? this.handleOnMultipleSelect(option, index) :
            this.handleOnSelect(option, index)
        }}
        options={options}
        renderRow={multiSelect ? this.renderMultiSelectRow : this.renderRow}
      >
        <DropdownWrapper
          style={[styles.dropdownContainerStyle, dropdownContainerStyle]}
          borderBottomLeftRadius={this.state.isSelected ? 0 : 6}
          borderBottomRightRadius={this.state.isSelected ? 0 : 6}
          opacity={disabled ? 0.5 : 1}
        >
          <DropdownLabelWithIconLeftWrapper
            alignItems='center'
            flexDirection='row'
            justifyContent='flex-start'
            flex={1}
            marginBottom={12}
            marginLeft={15}
            marginTop={12}
            opacity={disabled ? 0.15 : 1}
          >
            {multiSelect && this.state.multiSelectedList.length !== 0 ?
              this.renderAmountIcon(multiSelectListLength)
              :
              null
            }
            <DropdownLabel
              color={this.chooseTitleColor(options, themeColor)}
              fontFamily={
                (!this.state.isSelected || this.state.optionSelected) &&
                  options.includes(this.state.dropdownText) ?
                  'Lato-Black' : fontFamily
              }
              fontSize={fontSize}
              style={labelStyle}
              numberOfLines={1}
            >
              {this.state.dropdownText}
            </DropdownLabel>
          </DropdownLabelWithIconLeftWrapper>
          <IconWrapper
            marginBottom={13}
            marginRight={9}
            marginTop={13}
            opacity={disabled ? 0.5 : 1}
          >
            {this.state.isSelected ?
              <Icon
                name='arrowUp'
                size={iconSize}
                color={primaryIconColor}
              />
              :
              <Icon
                name='arrowDown'
                size={iconSize}
                color={disabled ? colors.sensitiveGreyDarkest : primaryIconColor}
              />
            }
          </IconWrapper>
          {this.state.isSelected ?
            <View style={styles.greyLine} />
            : null
          }
        </DropdownWrapper>
      </ModalDropdown>
    )
  }

  render() {
    const { inline, themeName } = this.props
    const themeObj = getThemeObject(themeName)

    return (
      <ThemeProvider
        theme={themeObj}
      >
        {inline ? this.renderInlineModalDropdown() : this.renderDefaultModalDropdown()}
      </ThemeProvider>
    )
  }
}

Icon.propTypes = {
  color: string
}

Dropdown.defaultProps = {
  iconSize: 24,
  amountClosingIconColor: colors.white,
  amountClosingIconSize: 12,
  amountTextColor: colors.white,
  amountFontFamily: 'Lato-Black',
  amountTextSize: 14,
  checkboxSize: 24,
  themeName: defaultThemeName,
  rowActiveFontFamily: 'Lato-Black',
  rowFontFamily: 'Lato-Regular',
  rowBackgroundColor: colors.white,
  rowActiveBackgroundColor: colors.sensitiveGreyDark,
  rowTitleColor: colors.richBlackDefault,
  fontFamily: 'Lato-Regular',
  fontSize: 4,
  options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  onOptionPress: () => { },
  multiSelect: false,
  disabled: false,
  inline: false,
  dropdownLabel: 'Dropdown Label',
  dropdownContainerStyle: {},
  dropdownStyle: {
    width: 250,
    height: 200
  },
  inlineDropdownContainerStyle: {
    height: 50,
    width: 190,
    backgroundColor: colors.transparent
  },
  inlineMultiSelectContainerStyle: {
    height: 50,
    width: 190,
    backgroundColor: colors.transparent
  },
  inlineMultiselectDropdownStyle: {
    borderRadius: 6,
    width: 190,
    height: 200
  },
  inlineDropdownStyle: {
    width: 190,
    height: 200
  },
  inlineMultiselectRowStyle: {
    height: 50,
    width: 190,
    flex: 1
  },
  inlineRowStyle: {
    height: 50,
    width: 190,
    flex: 1
  },
  rowStyle: {
    height: 50,
    width: 250,
    flex: 1
  },
  multiSelectIconStyle: {
    height: 24,
    width: 40
  },
  labelStyle: {},
  rowTitleStyle: {
    fontSize: 16
  }
}

Dropdown.propTypes = {
  iconSize: number,
  amountClosingIconColor: string,
  amountClosingIconSize: number,
  amountTextColor: string,
  amountFontFamily: string,
  amountTextSize: number,
  checkboxSize: number,
  checkboxColor: string,
  rowActiveFontFamily: string,
  rowFontFamily: string,
  rowTitleActiveColor: string,
  rowTitleColor: string,
  rowBackgroundColor: string,
  rowActiveBackgroundColor: string,
  inlineMultiselectDropdownStyle: object,
  inlineMultiSelectContainerStyle: object,
  inlineDropdownContainerStyle: object,
  dropdownContainerStyle: object,
  onOptionPress: func,
  inline: bool,
  multiSelect: bool,
  dropdownLabel: string,
  iconColor: string,
  disabled: bool,
  fontFamily: string,
  fontSize: number,
  options: array,
  inlineMultiselectRowStyle: object,
  dropdownStyle: object,
  inlineDropdownStyle: object,
  rowStyle: object,
  inlineRowStyle: object,
  multiSelectIconStyle: object,
  labelStyle: object,
  rowTitleStyle: object,
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
  ])
}

export default Dropdown
