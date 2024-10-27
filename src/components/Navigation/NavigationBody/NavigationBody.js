import React, { Component } from 'react';
import { FlatList, TouchableWithoutFeedback, View } from 'react-native';
import { string, shape, arrayOf, func, node, number } from 'prop-types';
import imageExample from '../../../../src/assets/circle.png';
import Icon from '../../MerckIcons';
import colors from '../../../config/colors';
import fonts from '../../../config/fonts';
import {
  ImageWrapper,
  Image,
  NavigationTitle,
  NavigationTabTitle,
} from './styled';
import styles from './styles';

class NavigationBody extends Component {
  keyExtractor = (item) => item.title;

  isSelected = (index) => index === this.props.activeTabIndex;

  renderItem = ({ item: { label, icon }, index }) => {
    const selected = this.isSelected(index);
    const { button, buttonSelected, iconWrapper, buttonContent } = styles;

    const {
      tabFontFamily,
      tabFontSize,
      tabFontColor,
      tabLineHeight,
      activeTabFontFamily,
      activeTabFontColor,
      iconColor,
      iconSize,
      activeIconColor,
    } = this.props;

    if (index >= 7) return null;

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.onTabChange(index);
        }}
        style={button}
      >
        <View style={[buttonContent, selected && buttonSelected]}>
          <View style={iconWrapper}>
            <Icon
              name={icon}
              color={selected ? activeIconColor : iconColor}
              size={iconSize}
            />
          </View>
          <NavigationTabTitle
            fontFamily={selected ? activeTabFontFamily : tabFontFamily}
            fontSize={tabFontSize}
            color={selected ? activeTabFontColor : tabFontColor}
            lineHeight={tabLineHeight}
          >
            {label}
          </NavigationTabTitle>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {
      title,
      tabs,
      imagePath,
      activeTabIndex,
      navigationFontFamily,
      navigationFontSize,
      navigationFontColor,
      navigationLineHeight,
      activeIconColor,
    } = this.props;
    const { flatListWrapper } = styles;

    return (
      <View style={flatListWrapper}>
        <FlatList
          data={tabs}
          extraData={this.props}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          scrollEnabled={false}
        />
        <ImageWrapper borderRadius={30}>
          <Image source={imagePath} />
        </ImageWrapper>
        <NavigationTitle
          fontFamily={navigationFontFamily}
          fontSize={navigationFontSize}
          color={navigationFontColor}
          lineHeight={navigationLineHeight}
        >
          {title}
        </NavigationTitle>
      </View>
    );
  }
}

NavigationBody.propTypes = {
  title: string.isRequired,
  tabs: arrayOf(
    shape({
      title: string.isRequired,
      icon: string.isRequired,
      label: string.isRequired,
      onPress: func,
    })
  ),
  imagePath: node,
  onTabChange: func,
  activeTabIndex: number.isRequired,
  navigationFontFamily: string,
  navigationFontSize: number,
  navigationFontColor: string,
  navigationLineHeight: number,
  activeTabFontFamily: string,
  activeTabFontColor: string,
  tabFontFamily: string,
  tabFontSize: number,
  tabFontColor: string,
  tabLineHeight: number,
  iconColor: string,
  iconSize: number,
  activeIconColor: string,
};

NavigationBody.defaultProps = {
  tabs: [
    {
      onPress: () => {},
    },
  ],
  imagePath: imageExample,
  onTabChange: () => {},
  navigationFontFamily: fonts.Black,
  navigationFontSize: 7.5,
  navigationFontColor: colors.richBlackLightest,
  navigationLineHeight: 9,
  activeTabFontFamily: fonts.Black,
  activeTabFontColor: colors.vibrantCyanDefault,
  tabFontFamily: fonts.Regular,
  tabFontSize: 10,
  tabFontColor: colors.richBlackLightest,
  tabLineHeight: 9.4,
  iconColor: colors.richBlackLightest,
  iconSize: 24,
  activeIconColor: colors.vibrantCyanDefault,
};

export default NavigationBody;
