import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { ThemeProvider } from 'styled-components';
import ModalDropdown from 'react-native-modal-dropdown';
import {
  arrayOf,
  oneOfType,
  string,
  object,
  number,
  bool,
  shape,
} from 'prop-types';
import Icon from '../MerckIcons';
import { fonts, colors } from '../../config';
import { StyledFilterText, StyledFiltersTextContainer } from './styled';
import styles from './styles';
import { defaultThemeName, getThemeObject } from '../../config/theme';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    const { filterLabel } = this.props;

    this.state = {
      filterText: filterLabel,
      isSelected: false,
      multiSelectedList: [],
      dimensions: {},
    };
  }

  onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    this.setState({ dimensions: { width, height } });
  };

  handleOnSelect = (option) => {
    this.setState({ filterText: option, isSelected: true });
  };

  handleClearSelect = () => {
    const { filterLabel } = this.props;

    this.setState({ filterText: filterLabel, isSelected: false });
  };

  handleClearMultiSelection = () => {
    this.setState({ multiSelectedList: [] });
  };

  handleMultiOnSelect = (option) => {
    const { multiSelectedList } = this.state;

    if (multiSelectedList.includes(option)) {
      const filtered = multiSelectedList.filter((value) => value !== option);
      this.setState({ multiSelectedList: filtered });
    } else {
      this.setState({ multiSelectedList: [...multiSelectedList, option] });
    }
  };

  renderNoSelection = (disabled) => {
    const { filterText } = this.state;
    const {
      filterPrimaryColor,
      filterIconSize,
      filterContainerHeight,
      multiSelect,
      themeName,
    } = this.props;

    const themeObj = getThemeObject(themeName);
    const themeColor = themeObj.colors.primary.base;

    const primaryColor = filterPrimaryColor || themeColor;

    return (
      <StyledFiltersTextContainer
        alignItems="center"
        flexDirection="row"
        justifyContent="flex-end"
        height={filterContainerHeight}
        onLayout={this.onLayout}
      >
        <StyledFiltersTextContainer
          width={multiSelect ? '40' : '10'}
          mr={multiSelect ? 13 : 15}
        />
        <StyledFilterText
          color={colors.richBlackDefault}
          opacity={disabled && 0.3}
          fontSize="14"
          fontFamily={fonts.Regular}
          style={styles.filterTextStyle}
          maxWidth={Platform.select({ android: '170', ios: '176' })}
          top={Platform.select({ android: '-5', ios: '0' })}
        >
          {filterText}
        </StyledFilterText>
        <Icon
          color={disabled ? colors.richBlackDefault : primaryColor}
          style={disabled && styles.disabledIcon}
          name="filter"
          size={filterIconSize + 6}
        />
      </StyledFiltersTextContainer>
    );
  };

  renderSingleSelected = () => {
    const { filterText } = this.state;
    const {
      filterIconSize,
      filterPrimaryColor,
      filterContainerHeight,
      themeName,
    } = this.props;

    const themeObj = getThemeObject(themeName);
    const themeColor = themeObj.colors.primary.base;

    const primaryColor = filterPrimaryColor || themeColor;

    return (
      <StyledFiltersTextContainer
        alignItems="center"
        flexDirection="row"
        justifyContent="flex-end"
        height={filterContainerHeight}
        width={this.state.dimensions.width}
      >
        <TouchableOpacity
          onPress={this.handleClearSelect}
          hitSlop={{
            top: 8,
            bottom: 8,
            right: 8,
            left: 8,
          }}
        >
          <StyledFiltersTextContainer
            justifyContent="center"
            mr="11"
            height="24"
          >
            <Icon
              name="closingX"
              size={filterIconSize + 8}
              color={themeColor}
            />
          </StyledFiltersTextContainer>
        </TouchableOpacity>

        <StyledFilterText
          color={primaryColor}
          fontSize="14"
          fontFamily={fonts.Black}
          style={styles.filterTextStyle}
          maxWidth={Platform.select({ android: '170', ios: '176' })}
          top={Platform.select({ android: '-5', ios: '-1' })}
        >
          {filterText}
        </StyledFilterText>
        <Icon name="filter" size={filterIconSize + 6} color={primaryColor} />
      </StyledFiltersTextContainer>
    );
  };

  renderMultiSelected = () => {
    const { multiSelectedList, filterText } = this.state;
    const selectedLength = multiSelectedList.length;
    const {
      filterIconSize,
      filterPrimaryColor,
      filterContainerHeight,
      themeName,
    } = this.props;

    const themeObj = getThemeObject(themeName);
    const themeColor = themeObj.colors.primary.base;

    const primaryColor = filterPrimaryColor || themeColor;

    return (
      <StyledFiltersTextContainer
        alignItems="center"
        flexDirection="row"
        justifyContent="center"
        height={filterContainerHeight}
      >
        <TouchableOpacity onPress={this.handleClearMultiSelection}>
          <StyledFiltersTextContainer
            alignItems="center"
            backgroundColor={primaryColor}
            borderRadius={16}
            flexDirection="row"
            justifyContent="center"
            width="40"
            height="24"
            mr="13"
          >
            <StyledFiltersTextContainer style={styles.closeIconContainer}>
              <StyledFilterText
                color={colors.white}
                fontSize="14"
                fontFamily={fonts.Black}
              >
                {selectedLength <= 0 ? filterText : selectedLength}
              </StyledFilterText>
              <Icon
                color={colors.white}
                name="closingX"
                size={filterIconSize + 2}
                style={
                  selectedLength >= 10 ? styles.closeIconMore : styles.closeIcon
                }
              />
            </StyledFiltersTextContainer>
          </StyledFiltersTextContainer>
        </TouchableOpacity>

        <StyledFilterText
          maxWidth={Platform.select({ android: '170', ios: '176' })}
          color={colors.richBlackDefault}
          fontFamily={fonts.Regular}
          style={styles.filterTextStyle}
          top={Platform.select({ android: '-5', ios: '0' })}
        >
          {filterText}
        </StyledFilterText>
        <Icon name="filter" size={filterIconSize + 6} color={primaryColor} />
      </StyledFiltersTextContainer>
    );
  };

  renderFilterContainer = (disabled) => {
    const { isSelected } = this.state;

    return isSelected
      ? this.renderSingleSelected()
      : this.renderNoSelection(disabled);
  };

  renderMultiSelectFilterContainer = (disabled) => {
    const { multiSelectedList } = this.state;
    const { multiSelect } = this.props;
    const selectedLength = multiSelectedList.length;

    return multiSelect && selectedLength > 0
      ? this.renderMultiSelected()
      : this.renderNoSelection(disabled);
  };

  renderRow = (index, option, isSelected) => {
    const { filterText, multiSelectedList } = this.state;
    const {
      multiSelect,
      filterPrimaryColor,
      filterSecondaryColor,
      filterLabel,
      themeName,
    } = this.props;

    const themeObj = getThemeObject(themeName);
    const themeColor = themeObj.colors.primary.base;

    const primaryColor = filterPrimaryColor || themeColor;

    const isMultiSelected = !!multiSelectedList.includes(index);
    const checkBox = (
      <Icon
        color={primaryColor}
        name="checkboxFilled"
        size={20}
        style={styles.checkboxStyle}
      />
    );

    const checkboxBorder = (
      <Icon
        size={20}
        color={filterSecondaryColor}
        name="checkboxEmpty"
        style={styles.checkboxStyle}
      />
    );

    return multiSelect ? (
      <StyledFiltersTextContainer
        backgroundColor={isMultiSelected ? filterSecondaryColor : colors.white}
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        style={Platform.OS === 'android' ? styles.rowSelected : {}}
        height={51}
      >
        {isMultiSelected ? checkBox : checkboxBorder}
        <StyledFilterText
          color={isMultiSelected ? primaryColor : colors.richBlackDefault}
          fontSize={4}
          fontFamily={isMultiSelected ? fonts.Black : fonts.Regular}
          minWidth={index.length > 20 ? 177 : null}
          style={styles.multiSelectDropdownRow}
        >
          {index}
        </StyledFilterText>
      </StyledFiltersTextContainer>
    ) : (
      <StyledFiltersTextContainer
        backgroundColor={
          isSelected && filterText !== filterLabel
            ? filterSecondaryColor
            : colors.white
        }
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        height={51}
      >
        <StyledFilterText
          color={
            isSelected && filterText !== filterLabel
              ? primaryColor
              : colors.richBlackDefault
          }
          fontSize={4}
          fontFamily={
            isSelected && filterText !== filterLabel
              ? fonts.Black
              : fonts.Regular
          }
          style={styles.singleSelectDropdownRow}
        >
          {index}
        </StyledFilterText>
      </StyledFiltersTextContainer>
    );
  };

  renderSingleSelectDropdown = () => {
    const { disabled, options, dropdownShadow, dropdownPositionRight } =
      this.props;

    return (
      <ModalDropdown
        dropdownPositionRight={dropdownPositionRight}
        activeOpacity={1}
        disabled={disabled}
        dropdownStyle={styles.dropdownStyle}
        dropdownShadow={dropdownShadow}
        style={styles.filter}
        onSelect={(index, option) => {
          this.handleOnSelect(option);
        }}
        options={options}
        renderRow={this.renderRow}
        touchableHighlightUnderlayColor={colors.transparent}
      >
        {this.renderFilterContainer(disabled)}
      </ModalDropdown>
    );
  };

  renderMultiSelectDropdown = () => {
    const { disabled, options, dropdownShadow, dropdownPositionRight } =
      this.props;

    return (
      <ModalDropdown
        dropdownPositionRight={dropdownPositionRight}
        activeOpacity={1}
        multiSelect
        disabled={disabled}
        style={styles.filter}
        dropdownStyle={styles.dropdownStyle}
        dropdownShadow={dropdownShadow}
        onSelect={(index, option) => {
          this.handleMultiOnSelect(option);
        }}
        options={options}
        renderRow={this.renderRow}
        touchableHighlightUnderlayColor={colors.transparent}
      >
        {this.renderMultiSelectFilterContainer(disabled)}
      </ModalDropdown>
    );
  };

  render() {
    const { multiSelect, filterContainerHeight, themeName } = this.props;

    const themeObj = getThemeObject(themeName);

    return (
      <ThemeProvider theme={themeObj}>
        <StyledFiltersTextContainer
          height={filterContainerHeight}
          maxWidth="250"
        >
          {multiSelect
            ? this.renderMultiSelectDropdown()
            : this.renderSingleSelectDropdown()}
        </StyledFiltersTextContainer>
      </ThemeProvider>
    );
  }
}

Filter.defaultProps = {
  disabled: false,
  multiSelect: false,
  filterSecondaryColor: colors.sensitiveGreyDark,
  filterContainerHeight: 24,
  filterIconSize: 10,
  filterLabel: 'Filter Label',
  dropdownShadow: {
    shadowOpacity: 0.25,
    shadowColor: 'black',
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 20 },
  },
  dropdownPositionRight: false,
  themeName: defaultThemeName,
};

Filter.propTypes = {
  themeName: oneOfType([
    string,
    shape({
      primary: shape({
        lightest: string,
        light: string,
        base: string,
        dark: string,
        darker: string,
      }).isRequired,
      secondary: shape({
        lightest: string,
        light: string,
        base: string,
        dark: string,
        darker: string,
      }).isRequired,
    }),
  ]),
  disabled: bool,
  multiSelect: bool,
  filterPrimaryColor: string,
  filterSecondaryColor: string,
  filterContainerHeight: oneOfType([number, string]),
  dropdownShadow: oneOfType([object, string]),
  dropdownPositionRight: bool,
  filterIconSize: number,
  filterLabel: string,
  options: arrayOf(oneOfType([number, object, string])).isRequired,
};
export default Filter;
