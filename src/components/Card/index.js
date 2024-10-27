import React from 'react';
import { Platform } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { bool, string, number, oneOfType, arrayOf, node } from 'prop-types';
import { StyledCard, CardWrapper } from './styled';
import { theme, colors } from '../../config';
import { defaultThemeName } from '../../config/theme';

class Card extends React.Component {
  state = {
    isActive: !!this.props.active,
  };

  handleOnPress = () => {
    this.setState((prevState) => ({
      isActive: !prevState.isActive,
    }));
  };

  renderStacked = () => {
    const { isActive } = this.state;

    if (Platform.OS === 'ios') {
      return (
        <CardWrapper>
          {this.renderSingleCard('stackedFirst', false)}
          {this.renderSingleCard('stackedSecond', false)}
          {this.renderSingleCard('stackedThird', isActive)}
        </CardWrapper>
      );
    }

    return (
      <CardWrapper>
        {this.renderSingleCard('stackedFirst', isActive)}
        {this.renderSingleCard('stackedSecond', isActive)}
        {this.renderSingleCard('stackedThird', isActive)}
      </CardWrapper>
    );
  };

  renderSingleCard = (
    stackedClass = '',
    isActiveShadow = this.state.isActive
  ) => {
    const {
      alignItems,
      backgroundColor,
      borderRadius,
      contentAlignItems,
      contentHeight,
      contentWidth,
      contentBackgroundColor,
      children,
      height,
      stacked,
      justifyContent,
      margin,
      width,
      themeName,
    } = this.props;

    return (
      <ThemeProvider theme={theme.themes[themeName]}>
        <StyledCard
          alignItems={alignItems}
          bg={backgroundColor}
          borderRadius={borderRadius}
          height={height}
          justifyContent={justifyContent}
          m={margin}
          onPress={this.handleOnPress}
          // eslint-disable-next-line
          shadowStyle={isActiveShadow ? (stacked ? 'stacked' : 'active') : 'default'}
          width={width}
          stacked={stackedClass}
        >
          <CardWrapper
            alignItems={contentAlignItems}
            bg={contentBackgroundColor || backgroundColor}
            borderRadius={borderRadius}
            height={contentHeight}
            width={contentWidth}
            justifyContent={justifyContent}
          >
            {children}
          </CardWrapper>
        </StyledCard>
      </ThemeProvider>
    );
  };

  render() {
    const { stacked } = this.props;

    return stacked ? this.renderStacked() : this.renderSingleCard();
  }
}

Card.defaultProps = {
  active: false,
  alignItems: 'center',
  backgroundColor: colors.white,
  borderRadius: 6,
  contentAlignItems: 'center',
  contentHeight: '92%',
  contentWidth: '92%',
  height: 300,
  justifyContent: 'center',
  width: 300,
  themeName: defaultThemeName,
};

Card.propTypes = {
  active: bool,
  alignItems: string,
  backgroundColor: string,
  borderRadius: number,
  contentAlignItems: string,
  contentHeight: oneOfType([number, string]),
  contentWidth: oneOfType([number, string]),
  contentBackgroundColor: string,
  children: oneOfType([arrayOf(node), node]),
  height: oneOfType([number, string]),
  justifyContent: string,
  margin: number,
  stacked: bool,
  width: number,
  themeName: string,
};

export default Card;
