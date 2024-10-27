import React, { Component } from 'react';
import { Modal, FlatList, Platform } from 'react-native';
import {
  string,
  number,
  func,
  object,
  bool,
  array,
  oneOfType,
  PropTypes,
} from 'prop-types';
import { ThemeProvider } from 'styled-components';
import Svg, { Polygon } from 'react-native-svg';
import { colors, fonts } from '../../config';
import {
  FlyoutWrapper,
  Label,
  IconLabelTouchable,
  IconLabelWrapper,
  TouchableModalChildrenWrapper,
  ListContainer,
  ListWrapper,
  HeaderContainer,
  Header,
  TouchableHeaderWrapper,
  SvgWrapper,
} from './styled';
import styles from './styles';
import Icon from '../MerckIcons';
import FlyoutItem from './FlyoutItem';
import { defaultThemeName, getThemeObject } from '../../config/theme';

class Flyout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      optionPressed: null,
    };
    this.labelPosition = null;
    this.labelFrame = null;
  }

  showModal = () => {
    this.updatePosition(() => {
      this.setState({
        modalVisible: true,
      });
    });
  };

  hideModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  updatePosition = (callback) => {
    if (this.labelPosition && this.labelPosition.root.measure) {
      this.labelPosition.root.measure((fx, fy, width, height, px, py) => {
        this.labelFrame = {
          x: px,
          y: py,
          w: width,
          h: height,
        };

        return callback && callback();
      });
    }
  };

  keyExtractor = (item, _index) => item.name;

  renderItem = ({ item, _index }) => {
    const {
      rowStyle,
      listWidth,
      rowHeight,
      rowTitleStyle,
      rowTitleColor,
      rowTitleFontSize,
      rowTtileFontFamily,
      onRowPress,
      aligned,
      listCenteredWidth,
      arrowIconColor,
      arrowIconSize,
      rowBackgroundColorActive,
      rowBackgroundColor,
      rowTitleColorActive,
      rowTitleFontFamilyActive,
      subOptionTitleStyle,
      subOptionContainerStyle,
      onSubOptionPress,
      subOptionContainerBackgroundColorActive,
      subOptionContainerBackgroundColor,
      subOptionFontFamily,
      subOptionActiveFontFamily,
      subOptionActiveColor,
      subOptionColor,
      subOptionContainerWidth,
      subOptionContainerHeight,
      subOptionFontSize,
      themeName,
    } = this.props;
    let themeObj = getThemeObject(themeName);
    let themeColor = themeObj.colors.primary.base;

    const { options } = this.props;
    const subOptions = options.filter((val) => val.name === item.name);
    const subOption = subOptions.map((items) => items.options);
    const rowPrimaryColor = rowTitleColorActive || themeColor;
    const subPrimaryColor = subOptionActiveColor || themeColor;
    const arrowPrimary = arrowIconColor || themeColor;
    const hasSubOptions = subOption.length && subOption[0];

    return (
      <FlyoutItem
        title={item.name}
        containerWidth={
          (aligned === 'center' && listCenteredWidth) || listWidth
        }
        containerHeight={rowHeight}
        containerStyle={rowStyle}
        itemTitleStyle={rowTitleStyle}
        itemTitleColor={
          this.state.optionPressed === item.name
            ? rowPrimaryColor
            : rowTitleColor
        }
        itemTitleFontSize={rowTitleFontSize}
        itemTitleFontFamily={
          this.state.optionPressed === item.name
            ? rowTitleFontFamilyActive
            : rowTtileFontFamily
        }
        onItemPress={() => {
          this.setState({
            optionPressed: item.name,
          });
          onRowPress();
          if (!hasSubOptions) {
            this.hideModal();
          }
        }}
        subOptions={subOption}
        iconColor={arrowPrimary}
        iconSize={arrowIconSize}
        rowBackgroundColor={
          this.state.optionPressed === item.name
            ? rowBackgroundColorActive
            : rowBackgroundColor
        }
        subOptionTitleStyle={subOptionTitleStyle}
        subOptionContainerStyle={subOptionContainerStyle}
        onSubOptionPress={(subVal) => {
          this.setState({
            optionPressed: subVal,
          });
          onSubOptionPress();
          this.hideModal();
        }}
        subOptionContainerBackgroundColorActive={
          subOptionContainerBackgroundColorActive
        }
        subOptionContainerBackgroundColor={subOptionContainerBackgroundColor}
        subOptionFontFamily={subOptionFontFamily}
        subOptionActiveFontFamily={subOptionActiveFontFamily}
        subOptionActiveColor={subPrimaryColor}
        subOptionColor={subOptionColor}
        optionPressedWrapper={this.state.optionPressed}
        centeredRowWidth={listCenteredWidth}
        subOptionContainerWidth={subOptionContainerWidth}
        subOptionContainerHeight={subOptionContainerHeight}
        subOptionFontSize={subOptionFontSize}
      />
    );
  };

  renderHeader = () => {
    const {
      headerTitle,
      headerStyle,
      headerFontSize,
      headerFontFamily,
      headerColor,
      headerContainerStyle,
      headerContainerHeight,
      listWidth,
      onHeaderPress,
      headerBackgroundColor,
    } = this.props;

    return (
      <TouchableHeaderWrapper
        onPress={() => {
          this.setState({
            optionPressed: '',
          });
          onHeaderPress();
        }}
      >
        <HeaderContainer
          style={headerContainerStyle}
          width={listWidth}
          height={headerContainerHeight}
          justifyContent="center"
          alignItems="flex-start"
          borderBottomWidth={1}
          paddingLeft={15}
          borderColor={colors.sensitiveGreyDefault}
          backgroundColor={headerBackgroundColor}
        >
          <Header
            style={headerStyle}
            fontSize={headerFontSize}
            fontFamily={headerFontFamily}
            color={headerColor}
            numberOfLines={1}
          >
            {headerTitle}
          </Header>
        </HeaderContainer>
      </TouchableHeaderWrapper>
    );
  };

  renderModal = () => {
    const {
      listWidth,
      listBackgroundColor,
      listStyle,
      options,
      aligned,
      listCenteredWidth,
    } = this.props;

    return this.state.modalVisible ? (
      <Modal
        animationType="fade"
        visible
        transparent
        onRequestClose={this.hideModal}
        supportedOrientations={[
          'portrait',
          'portrait-upside-down',
          'landscape',
          'landscape-left',
          'landscape-right',
        ]}
      >
        <TouchableModalChildrenWrapper onPress={this.hideModal}>
          <ListContainer
            flexGrow={1}
            shadowColor={colors.richBlackDefault}
            shadowOffset={{
              width: 3,
              height: 20,
            }}
            shadowOpacity={0.2}
            shadowRadius={12}
          >
            <SvgWrapper
              position="absolute"
              elevation={20}
              left={
                (aligned === 'right' &&
                  this.labelFrame.x + this.labelFrame.w - 43) ||
                (aligned === 'left' && this.labelFrame.x + 3) ||
                (aligned === 'center' &&
                  this.labelFrame.x - this.labelFrame.w / 2 + 4)
              }
              top={
                Platform.OS === 'android'
                  ? (aligned === 'center' && this.labelFrame.y + 24) ||
                    this.labelFrame.y + 18
                  : (aligned === 'center' && this.labelFrame.y + 23) ||
                    this.labelFrame.y + 19
              }
            >
              <Svg width="40" height="16">
                <Polygon
                  stroke={listBackgroundColor || listStyle.backgroundColor}
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="10,20 20,10 30,20"
                  fill={listBackgroundColor || listStyle.backgroundColor}
                />
              </Svg>
            </SvgWrapper>
            <ListWrapper
              style={listStyle}
              width={(aligned === 'center' && listCenteredWidth) || listWidth}
              backgroundColor={listBackgroundColor}
              justifyContent="center"
              position="absolute"
              top={this.labelFrame.y + this.labelFrame.h + 15}
              left={
                (aligned === 'right' &&
                  this.labelFrame.x + this.labelFrame.w - listWidth) ||
                (aligned === 'left' &&
                  (this.labelFrame.x == 0 ? 1 : this.labelFrame.x)) ||
                (aligned === 'center' &&
                  this.labelFrame.x -
                    (listCenteredWidth / 2 - this.labelFrame.w / 2))
              }
              borderRadius={3}
              overflow="hidden"
              elevation={15}
            >
              <FlatList
                data={options}
                extraData={this.state}
                renderItem={this.renderItem}
                onScroll={this.onScroll}
                ListHeaderComponent={this.renderHeader}
                stickyHeaderIndices={[0]}
                keyExtractor={this.keyExtractor}
              />
            </ListWrapper>
          </ListContainer>
        </TouchableModalChildrenWrapper>
      </Modal>
    ) : null;
  };

  renderWrapperLeft = () => {
    const {
      label,
      labelFontSize,
      iconSize,
      iconColor,
      disabled,
      labelStyle,
      labelContainerStyle,
      labelColorActive,
      labelColor,
      labelFontFamilyActive,
      labelFontFamily,
      themeName,
    } = this.props;

    let themeObj = getThemeObject(themeName);
    let themeColor = themeObj.colors.primary.base;

    const iconPrimary = iconColor || themeColor;
    const labelPrimary = labelColorActive || themeColor;

    return (
      <IconLabelWrapper
        flexDirection="row"
        alignItems="center"
        backgroundColor={colors.transparent}
        style={labelContainerStyle}
        opacity={disabled ? 0.3 : 1}
        marginLeft={15}
      >
        <Icon
          name="options"
          size={iconSize - 8}
          color={disabled ? colors.richBlackDefault : iconPrimary}
          style={styles.icon}
        />
        <Label
          fontSize={labelFontSize}
          color={this.state.modalVisible ? labelPrimary : labelColor}
          fontFamily={
            this.state.modalVisible ? labelFontFamilyActive : labelFontFamily
          }
          style={[labelStyle, styles.labelLeft]}
        >
          {label}
        </Label>
      </IconLabelWrapper>
    );
  };

  renderWrapperCenter = () => {
    const { iconSize, iconColor, disabled, labelContainerStyle, themeName } =
      this.props;

    let themeObj = getThemeObject(themeName);
    let themeColor = themeObj.colors.primary.base;

    const iconPrimary = iconColor || themeColor;

    return (
      <IconLabelWrapper
        alignItems="center"
        justifyContent="center"
        style={labelContainerStyle}
        opacity={disabled ? 0.3 : 1}
      >
        <Icon
          name="options"
          size={iconSize}
          color={disabled ? colors.richBlackDefault : iconPrimary}
        />
      </IconLabelWrapper>
    );
  };

  renderWrapperRight = () => {
    const {
      label,
      labelFontSize,
      iconSize,
      iconColor,
      disabled,
      labelStyle,
      labelContainerStyle,
      labelColorActive,
      labelColor,
      labelFontFamilyActive,
      labelFontFamily,
      themeName,
    } = this.props;

    let themeObj = getThemeObject(themeName);
    let themeColor = themeObj.colors.primary.base;

    const iconPrimary = iconColor || themeColor;
    const labelPrimary = labelColorActive || themeColor;

    return (
      <IconLabelWrapper
        flexDirection="row"
        alignItems="center"
        backgroundColor={colors.transparent}
        style={labelContainerStyle}
        opacity={disabled ? 0.3 : 1}
        marginRight={15}
      >
        <Label
          fontSize={labelFontSize}
          color={this.state.modalVisible ? labelPrimary : labelColor}
          fontFamily={
            this.state.modalVisible ? labelFontFamilyActive : labelFontFamily
          }
          style={[labelStyle, styles.labelRight]}
        >
          {label}
        </Label>
        <Icon
          name="options"
          size={iconSize - 8}
          color={disabled ? colors.richBlackDefault : iconPrimary}
          style={styles.icon}
        />
      </IconLabelWrapper>
    );
  };

  render() {
    const { aligned, onLabelPress, disabled, themeName } = this.props;
    let themeObj = getThemeObject(themeName);

    return (
      <ThemeProvider theme={themeObj}>
        <FlyoutWrapper
          flexDirection="row"
          width={250}
          height={50}
          justifyContent={
            (aligned === 'center' && 'center') ||
            (aligned === 'left' && 'flex-start') ||
            (aligned === 'right' && 'flex-end')
          }
          alignItems="center"
        >
          <IconLabelTouchable
            activeOpacity={1}
            underlayColor={colors.transparent}
            onPress={() => {
              onLabelPress();
              this.setState({
                optionPressed: null,
              });
              this.showModal();
            }}
            disabled={disabled}
            ref={(ref) => {
              this.labelPosition = ref;
            }}
          >
            {(aligned === 'left' && this.renderWrapperLeft()) ||
              (aligned === 'center' && this.renderWrapperCenter()) ||
              (aligned === 'right' && this.renderWrapperRight())}
          </IconLabelTouchable>
          {this.renderModal()}
        </FlyoutWrapper>
      </ThemeProvider>
    );
  }
}

Flyout.defaultProps = {
  disabled: false,
  aligned: 'right',
  iconSize: 24,
  label: 'Flyout Label',
  labelFontSize: 16,
  labelColor: colors.richBlackDefault,
  labelFontFamilyActive: fonts.Black,
  labelFontFamily: fonts.Regular,
  onLabelPress: () => {},
  labelStyle: {},
  labelContainerStyle: {},
  listWidth: 250,
  listBackgroundColor: colors.white,
  listStyle: {
    maxHeight: 298,
  },
  rowHeight: 53,
  headerBackgroundColor: colors.white,
  headerTitle: 'Headline',
  headerStyle: {},
  headerFontSize: 16,
  headerFontFamily: fonts.Black,
  headerColor: colors.richBlackDefault,
  headerContainerStyle: {},
  headerContainerHeight: 59,
  onHeaderPress: () => {},
  rowStyle: {},
  rowTitleStyle: {},
  rowTitleColor: colors.richBlackDefault,
  rowTitleFontSize: 16,
  rowTtileFontFamily: fonts.Regular,
  onRowPress: () => {},
  listCenteredWidth: 150,
  arrowIconSize: 24,
  subOptionTitleStyle: {},
  subOptionContainerStyle: {},
  onSubOptionPress: () => {},
  subOptionContainerBackgroundColorActive: colors.sensitiveGreyDark,
  subOptionContainerBackgroundColor: colors.sensitiveGreyDefault,
  subOptionContainerWidth: 250,
  subOptionContainerHeight: 50,
  subOptionFontFamily: fonts.Regular,
  subOptionFontSize: 16,
  subOptionActiveFontFamily: fonts.Black,
  subOptionColor: colors.richBlackDefault,
  rowBackgroundColorActive: colors.sensitiveGreyDark,
  rowBackgroundColor: colors.white,
  rowTitleFontFamilyActive: fonts.Black,
  themeName: defaultThemeName,
};

Flyout.propTypes = {
  disabled: bool,
  aligned: string,
  options: array.isRequired,
  iconSize: number,
  iconColor: string,
  label: string,
  labelFontSize: number,
  labelColor: string,
  labelFontFamily: string,
  onLabelPress: func,
  labelColorActive: string,
  labelFontFamilyActive: string,
  labelStyle: oneOfType([object, array]),
  labelContainerStyle: oneOfType([object, array]),
  listWidth: number,
  listBackgroundColor: string,
  listStyle: oneOfType([object, array]),
  rowHeight: number,
  headerBackgroundColor: string,
  headerTitle: string,
  headerStyle: oneOfType([object, array]),
  headerFontSize: number,
  headerFontFamily: string,
  headerColor: string,
  headerContainerStyle: oneOfType([object, array]),
  headerContainerHeight: number,
  onHeaderPress: func,
  rowStyle: oneOfType([object, array]),
  rowTitleStyle: oneOfType([object, array]),
  rowTitleColor: string,
  rowTitleFontSize: number,
  rowTtileFontFamily: string,
  onRowPress: func,
  listCenteredWidth: number,
  arrowIconColor: string,
  arrowIconSize: number,
  subOptionTitleStyle: oneOfType([object, array]),
  subOptionContainerStyle: oneOfType([object, array]),
  onSubOptionPress: func,
  subOptionContainerBackgroundColorActive: string,
  subOptionContainerBackgroundColor: string,
  subOptionFontFamily: string,
  subOptionActiveFontFamily: string,
  subOptionActiveColor: string,
  subOptionColor: string,
  rowBackgroundColorActive: string,
  rowBackgroundColor: string,
  rowTitleColorActive: string,
  rowTitleFontFamilyActive: string,
  subOptionContainerWidth: number,
  subOptionContainerHeight: number,
  subOptionFontSize: number,
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

export default Flyout;
