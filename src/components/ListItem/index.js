import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  string,
  bool,
  func,
  object,
  oneOfType,
  array,
  PropTypes,
} from 'prop-types';
import {
  Title,
  ItemWrapper,
  ItemTouchableWrapper,
  TitleIconWrapper,
  TitleWrapper,
} from './styled';
import Icon from '../MerckIcons';
import { colors, fonts } from '../../config';
import { defaultThemeName, getThemeObject } from '../../config/theme';
import styles from './styles';

class ListItem extends Component {
  state = {
    titleActiveColor: this.props.titleColor,
    titleActiveFamily: this.props.titleFontFamily,
    containerBackgroundColor: this.props.containerBackgroundColor,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.themeName !== this.props.themeName) {
      const themeObj = getThemeObject(nextProps.themeName);
      const themeColor = themeObj.colors.primary.base;
      this.setState({
        titleActiveColor: this.props.active
          ? themeColor
          : this.props.titleColor,
      });
    }
  }

  handleShowUnderlay = (themeColor) => {
    this.setState({
      titleActiveColor: this.props.titleActiveColor || themeColor,
      titleActiveFamily: this.props.titleActiveFontFamily,
      containerBackgroundColor: this.props.containerBackgroundColorActive,
    });
  };

  handleHideUnderlay = () => {
    this.setState({
      titleActiveColor: this.props.titleColor,
      titleActiveFamily: this.props.titleFontFamily,
      containerBackgroundColor: this.props.containerBackgroundColor,
    });
  };

  renderTitleWithIcon = (
    icon,
    title,
    titleStyle,
    active,
    titlePrimaryColor,
    titleActiveFontFamily
  ) => (
    <TitleIconWrapper
      flexDirection="row"
      justifyContent="flex-start"
      marginLeft={15}
      paddingRight={15}
    >
      <Icon
        name={icon.name}
        size={icon.size}
        color={active ? titlePrimaryColor : this.state.titleActiveColor}
        style={styles.alignmentStyle}
      />
      <TitleWrapper marginLeft={10} paddingRight={15}>
        <Title
          style={titleStyle}
          color={active ? titlePrimaryColor : this.state.titleActiveColor}
          fontFamily={
            active ? titleActiveFontFamily : this.state.titleActiveFamily
          }
          alignSelf="center"
        >
          {title}
        </Title>
      </TitleWrapper>
    </TitleIconWrapper>
  );
  render() {
    const {
      onPress,
      title,
      titleStyle,
      disabled,
      active,
      icon,
      containerStyle,
      iconLeft,
      titleActiveColor,
      titleActiveFontFamily,
      themeName,
    } = this.props;

    const themeObj = getThemeObject(themeName);
    const themeColor = themeObj.colors.primary.base;

    const titlePrimaryColor = titleActiveColor || themeColor;

    return (
      <ThemeProvider theme={themeObj}>
        <ItemTouchableWrapper
          activeOpacity={1}
          disabled={disabled}
          onPress={onPress}
          underlayColor="transparent"
          onShowUnderlay={() => {
            this.handleShowUnderlay(themeColor);
          }}
          onHideUnderlay={() => {
            this.handleHideUnderlay();
          }}
        >
          <ItemWrapper
            style={[styles.container, containerStyle]}
            flexDirection="row"
            alignItems="center"
            opacity={disabled ? 0.3 : 1}
            backgroundColor={this.state.containerBackgroundColor}
          >
            {icon && iconLeft ? (
              this.renderTitleWithIcon(
                icon,
                title,
                titleStyle,
                active,
                titlePrimaryColor,
                titleActiveFontFamily
              )
            ) : (
              <TitleWrapper marginLeft={15}>
                <Title
                  style={titleStyle}
                  color={
                    active ? titlePrimaryColor : this.state.titleActiveColor
                  }
                  fontFamily={
                    active
                      ? titleActiveFontFamily
                      : this.state.titleActiveFamily
                  }
                >
                  {title}
                </Title>
              </TitleWrapper>
            )}
          </ItemWrapper>
        </ItemTouchableWrapper>
      </ThemeProvider>
    );
  }
}

ListItem.propTypes = {
  onPress: func,
  title: string,
  icon: object,
  iconLeft: bool,
  disabled: bool,
  active: bool,
  containerStyle: oneOfType([object, array]),
  titleStyle: oneOfType([object, array]),
  titleColor: string,
  titleActiveColor: string,
  titleActiveFontFamily: string,
  titleFontFamily: string,
  containerBackgroundColor: string,
  containerBackgroundColorActive: string,
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

ListItem.defaultProps = {
  onPress: () => {},
  title: 'List 01',
  icon: {},
  iconLeft: false,
  disabled: false,
  active: false,
  containerStyle: {},
  titleStyle: {
    fontSize: 14,
  },
  titleColor: colors.richBlackDefault,
  titleFontFamily: fonts.Regular,
  titleActiveFontFamily: fonts.Black,
  containerBackgroundColor: colors.sensitiveGreyDefault,
  containerBackgroundColorActive: colors.sensitiveGreyDark,
  themeName: defaultThemeName,
};

export default ListItem;
