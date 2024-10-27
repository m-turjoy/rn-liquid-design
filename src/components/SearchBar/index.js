import React, { Component } from 'react';
import { Platform } from 'react-native';
import {
  number,
  string,
  func,
  array,
  object,
  bool,
  PropTypes,
} from 'prop-types';
import { ThemeProvider } from 'styled-components';
import Icon from '../MerckIcons';
import { fonts, colors } from '../../config';
import List from '../List';
import ListItem from '../ListItem';
import {
  SearchBarWrapper,
  IconWrapper,
  SearchInputWrapper,
  SearchInput,
  SearchContainer,
  IconInputWrapper,
  Underline,
} from './styled';
import { defaultThemeName, getThemeObject } from '../../config/theme';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.textInput = {};
    this.state = {
      active: false,
      listXPosition: 0,
      listYposition: 0,
      searchResults: [],
      value: '',
    };
  }

  onInputChange = (text) => this.handleOnSearchData(text);

  escapeRegExp = (str) => str.replace(/[-[\]/{}()*+?.\\\\|]/g, '\\$&');

  handleOnSearchData = (text) => {
    const { searchProperty, searchOptions, searchableRange } = this.props;
    const searchValue = this.escapeRegExp(text);
    const sortedData = text
      ? searchOptions
          .slice(0, searchableRange)
          .filter((val) =>
            new RegExp(searchValue, 'i').test(val[searchProperty])
          )
      : [];
    this.setState({
      searchResults: sortedData,
      value: text,
    });
  };

  adjustElevation = () => {
    const { disabled, ghost } = this.props;
    const { active } = this.state;

    return ghost ? 0 : disabled ? 0 : (active && 15) || 0;
  };

  adjustBorderRadius = () => {
    const { ghost } = this.props;
    const { searchResults } = this.state;

    return ghost ? 0 : searchResults.length > 0 ? 0 : 6;
  };

  renderRow = ({ item }) => {
    const {
      searchProperty,
      rowStyle,
      rowTitleStyle,
      onRowPress,
      containerBackgroundColorActive,
      containerBackgroundColor,
      titleFontFamily,
      titleActiveFontFamily,
      titleActiveColor,
      titleColor,
      themeName,
    } = this.props;

    return (
      <ListItem
        title={item[searchProperty]}
        titleStyle={[
          rowTitleStyle,
          {
            marginRight: 15,
            fontSize: rowTitleStyle.fontSize || 16,
          },
        ]}
        containerStyle={[
          rowStyle,
          {
            zIndex: 99,
            alignItems: 'center',
            width: rowStyle.width || 250,
          },
        ]}
        onPress={() => {
          onRowPress();
          this.setState({
            value: item[searchProperty],
          });
          this.textInput.root.blur();
        }}
        containerBackgroundColorActive={containerBackgroundColorActive}
        containerBackgroundColor={containerBackgroundColor}
        titleFontFamily={titleFontFamily}
        titleActiveFontFamily={titleActiveFontFamily}
        titleActiveColor={getThemeObject(themeName).colors.primary.base}
        titleColor={titleColor}
      />
    );
  };

  renderModal = () => {
    const {
      keyExtractor,
      listContainerStyle,
      height,
      width,
      listBackgroundColor,
      disabled,
    } = this.props;
    if (disabled) return null;

    return (
      <List
        data={this.state.searchResults}
        renderRow={this.renderRow}
        keyExtractor={keyExtractor}
        listContainerStyle={[
          listContainerStyle,
          {
            width: listContainerStyle.width || width,
            backgroundColor:
              listContainerStyle.backgroundColor || listBackgroundColor,
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderRadius: 6,
            position: 'absolute',
            overflow: 'hidden',
            top: this.state.listYposition + height,
            left: this.state.listXPosition,
            elevation: 15,
            zIndex: 99,
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      />
    );
  };
  render() {
    const {
      width,
      height,
      backgroundColor,
      iconSize,
      iconColor,
      placeholder,
      placeholderTextColor,
      inputTextColor,
      inputTextFontFamily,
      inputTextFontSize,
      onFocus,
      onBlur,
      onChangeText,
      iconColorActive,
      disabled,
      ghost,
      withHeader,
      themeName,
    } = this.props;

    const themeObj = getThemeObject(themeName);
    const themeColor = themeObj.colors.primary.base;
    const lineColor = disabled
      ? colors.transparent
      : this.state.active
        ? themeColor
        : colors.transparent;
    const activeIcon = iconColorActive || themeColor;

    return (
      <ThemeProvider theme={themeObj}>
        <SearchContainer
          shadowColor={colors.richBlackDefault}
          shadowOffset={{
            width: 3,
            height: 10,
          }}
          shadowOpacity={disabled ? 0 : this.state.active && 0.2}
          shadowRadius={12}
          style={
            Platform.OS === 'ios' && {
              zIndex: 99,
              backgroundColor: colors.transparent,
            }
          }
        >
          <SearchBarWrapper
            onLayout={(event) =>
              this.setState({
                listXPosition: event.nativeEvent.layout.x,
                listYposition: event.nativeEvent.layout.y,
              })
            }
            width={width}
            height={height}
            overflow="hidden"
            backgroundColor={ghost ? colors.transparent : backgroundColor}
            borderBottomLeftRadius={this.adjustBorderRadius()}
            borderBottomRightRadius={this.adjustBorderRadius()}
            borderTopLeftRadius={6}
            borderTopRightRadius={6}
            borderRadius={this.state.searchResults.length > 0 || ghost ? 0 : 6}
            elevation={this.adjustElevation()}
            opacity={disabled ? 0.5 : 1}
            zIndex={disabled ? 0 : 99}
          >
            <IconInputWrapper
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              flex={1}
            >
              <IconWrapper
                marginLeft={14.2}
                marginRight={withHeader ? 7.3 : 13.3}
                alignItems="center"
                justifyContent="center"
              >
                {this.state.active ? (
                  <Icon name="search" size={iconSize} color={activeIcon} />
                ) : (
                  <Icon name="search" size={iconSize} color={iconColor} />
                )}
              </IconWrapper>
              <SearchInputWrapper marginRight={15}>
                <SearchInput
                  {...this.props}
                  ref={(ref) => {
                    this.textInput = ref;
                  }}
                  onChangeText={(text) => {
                    onChangeText(text);
                    this.onInputChange(text);
                  }}
                  width={width - 60}
                  numberOfLines={1}
                  editable={!disabled}
                  height={Platform.OS === 'ios' ? height / 2 : height - 2}
                  underlineColorAndroid={colors.transparent}
                  bg={ghost ? colors.transparent : backgroundColor}
                  placeholder={placeholder}
                  value={this.state.value}
                  placeholderTextColor={placeholderTextColor}
                  style={{
                    color: inputTextColor,
                  }}
                  fontFamily={inputTextFontFamily}
                  fontSize={inputTextFontSize}
                  onFocus={() => {
                    onFocus();
                    this.setState({ active: true });
                  }}
                  onBlur={() => {
                    onBlur();
                    this.setState({
                      active: false,
                      searchResults: [],
                    });
                  }}
                />
              </SearchInputWrapper>
            </IconInputWrapper>
            <Underline
              width="100%"
              height={withHeader ? 0 : 2}
              backgroundColor={lineColor}
            />
          </SearchBarWrapper>
          {this.renderModal()}
        </SearchContainer>
      </ThemeProvider>
    );
  }
}

SearchBar.propTypes = {
  width: number,
  height: number,
  backgroundColor: string,
  iconSize: number,
  iconColor: string,
  placeholder: string,
  placeholderTextColor: string,
  inputTextColor: string,
  inputTextFontFamily: string,
  inputTextFontSize: number,
  onFocus: func,
  onBlur: func,
  onChangeText: func,
  iconColorActive: string,
  searchOptions: array.isRequired,
  keyExtractor: func,
  searchProperty: string.isRequired,
  ItemSeparatorComponent: func,
  rowStyle: object,
  rowTitleStyle: object,
  onRowPress: func,
  listContainerStyle: object,
  searchableRange: number,
  disabled: bool,
  ghost: bool,
  containerBackgroundColorActive: string,
  containerBackgroundColor: string,
  titleFontFamily: string,
  titleActiveFontFamily: string,
  titleActiveColor: string,
  titleColor: string,
  borderBottomColor: string,
  listBackgroundColor: string,
  withHeader: bool,
  themeName: PropTypes.oneOfType([
    string,
    PropTypes.shape({
      primary: PropTypes.shape({
        lightest: string,
        light: string,
        base: string,
        dark: string,
        darker: string,
      }).isRequired,
      secondary: PropTypes.shape({
        lightest: string,
        light: string,
        base: string,
        dark: string,
        darker: string,
      }).isRequired,
    }),
  ]),
};

SearchBar.defaultProps = {
  width: 250,
  height: 50,
  backgroundColor: colors.sensitiveGreyDefault,
  iconColor: colors.sensitiveGreyDarkest,
  iconSize: 24,
  placeholder: 'Search...',
  placeholderTextColor: colors.richBlackLightest,
  inputTextColor: colors.richBlackDefault,
  inputTextFontFamily: fonts.Regular,
  inputTextFontSize: 16,
  onFocus: () => {},
  onBlur: () => {},
  onChangeText: () => {},
  rowStyle: {},
  rowTitleStyle: {},
  onRowPress: () => {},
  listContainerStyle: {},
  searchableRange: 4,
  disabled: false,
  ghost: false,
  titleColor: colors.richBlackDefault,
  titleActiveColor: colors.vibrantCyanDefault,
  titleFontFamily: fonts.Regular,
  titleActiveFontFamily: fonts.Black,
  containerBackgroundColor: colors.sensitiveGreyDefault,
  containerBackgroundColorActive: colors.sensitiveGreyDark,
  listBackgroundColor: colors.sensitiveGreyDefault,
  themeName: defaultThemeName,
};

export default SearchBar;
