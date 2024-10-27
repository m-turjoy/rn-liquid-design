import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Dimensions } from 'react-native';
import { bool, func, node, number, string, PropTypes } from 'prop-types';
import { ThemeProvider } from 'styled-components';
// import { Headline, TextField, Button, GhostButton } from '../';
import Headline from '../Headline';
import TextField from '../TextField';
import Button from '../Button';
import GhostButton from '../GhostButton';
import Icon from '../MerckIcons';
import { colors, fonts } from '../../config';
import { defaultThemeName, getThemeObject } from '../../config/theme';
import {
  HeaderWrapper,
  LabelWrapper,
  ContentWrapper,
  BodyWrapper,
  ModalWrapper,
} from './styled';
import styles from './styles';
import exampleImage from '../../assets/circle.png';

const { width } = Dimensions.get('window');

class Modal extends Component {
  handleScrollTo = (p) => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };

  renderModal = (children) => <View>{children}</View>;

  renderBody = (children) => (
    <BodyWrapper
      backgroundColor={this.props.contentBgColor || colors.white}
      style={styles.modalContent}
    >
      {children}
    </BodyWrapper>
  );

  render() {
    const {
      headerTitle,
      headerColor,
      headerFontFamily,
      headerFontWeight,
      headerLineHeight,
      headerFontSize,
      headerBgColor,
      headlineText,
      contentText,
      contentFontFamily,
      contentFontSize,
      contentFontWeight,
      contentLineHeight,
      contentColor,
      modalWidth,
      buttonText,
      cancelText,
      onCancelPress,
      onButtonPress,
      onError,
      onChangeText,
      placeholder,
      onBlur,
      onFocus,
      errorMessage,
      imagePath,
      withGraphic,
      withCta,
      withTextField,
      iconSize,
      headlineType,
      onBackdropPress,
      iconColor,
      themeName,
    } = this.props;

    const themeObj = getThemeObject(themeName);
    const themeColor = themeObj.colors.primary.base;

    const marginRight = {
      marginRight: width < 350 ? 0 : 10,
      top: width < 350 ? 20 : 0,
    };

    const marginLeft = {
      marginLeft: width < 350 ? 0 : 10,
    };

    const icon = iconColor || themeColor;

    const renderHeader = (
      <HeaderWrapper
        style={styles.headerWrapper}
        backgroundColor={headerBgColor || colors.sensitiveGreyDefault}
      >
        <LabelWrapper
          color={headerColor || colors.richBlackDefault}
          fontFamily={headerFontFamily || fonts.Regular}
          lineHeight={headerLineHeight || 15}
          fontWeight={headerFontWeight || null}
          fontSize={headerFontSize || 12}
        >
          {headerTitle}
        </LabelWrapper>
        <View style={styles.iconWrapper}>
          <TouchableOpacity onPress={onBackdropPress} style={styles.closeIcon}>
            <Icon name="closingX" size={iconSize || 20} color={icon} />
          </TouchableOpacity>
        </View>
      </HeaderWrapper>
    );

    const renderHeadline = <Headline type={headlineType} text={headlineText} />;

    const renderContent = (
      <ContentWrapper
        fontFamily={contentFontFamily || fonts.Regular}
        fontWeight={contentFontWeight || null}
        fontSize={contentFontSize || 16}
        lineHeight={contentLineHeight || 28}
        color={contentColor || colors.richBlackDefault}
      >
        {contentText}
      </ContentWrapper>
    );

    const renderDefaultBody = (
      <View style={styles.bodyWrapper}>
        {renderHeadline}
        <View style={styles.default}>{renderContent}</View>
      </View>
    );

    const renderCtaBody = (
      <View>
        <View style={styles.bodyWrapper}>
          {renderHeadline}
          <View style={styles.cta}>{renderContent}</View>
        </View>
        <View style={styles.buttonsCta}>
          <Button
            buttonStyle={marginRight}
            title={cancelText}
            onPress={onCancelPress}
            secondary
            themeName={themeName}
          />
          <Button
            buttonStyle={marginLeft}
            title={buttonText}
            onPress={onButtonPress}
            themeName={themeName}
          />
        </View>
      </View>
    );

    const renderGraphicBody = (
      <View>
        <View style={styles.bodyWrapper}>
          <Image
            style={styles.imageContainer}
            source={imagePath || exampleImage}
          />
          {renderHeadline}
          <View style={styles.cta}>{renderContent}</View>
        </View>
        <View style={styles.buttonsCta}>
          <Button
            buttonStyle={marginRight}
            title={cancelText}
            onPress={onCancelPress}
            secondary
            themeName={themeName}
          />
          <Button
            buttonStyle={marginLeft}
            title={buttonText}
            onPress={onButtonPress}
            themeName={themeName}
          />
        </View>
      </View>
    );

    const renderTextFieldBody = (
      <View style={styles.bodyWrapper}>
        {renderHeadline}
        <View style={styles.textField}>{renderContent}</View>
        <TextField
          themeName={themeName}
          error={onError}
          placeholder={placeholder}
          onBlur={onBlur}
          onFocus={onFocus}
          errorMessage={errorMessage}
          backgroundColor={colors.sensitiveGreyDefault}
          onChangeText={onChangeText}
          textInputLabelVisible={false}
          fontSize={16}
          fontFamily={fonts.Regular}
          color={colors.richBlackDefault}
          wrapperWidth={250}
          wrapperHeight={40}
        />
        <View style={styles.buttonsTextField}>
          <GhostButton
            title={cancelText}
            onPress={onCancelPress}
            themeName={themeName}
          />
          <Button
            title={buttonText}
            onPress={onButtonPress}
            themeName={themeName}
          />
        </View>
      </View>
    );

    const renderDefault = (
      <ModalWrapper width={modalWidth} style={styles.shadow}>
        {renderHeader}
        {this.renderBody(renderDefaultBody)}
      </ModalWrapper>
    );

    const renderCta = (
      <ModalWrapper width={modalWidth} style={styles.shadow}>
        {renderHeader}
        {this.renderBody(renderCtaBody)}
      </ModalWrapper>
    );

    const renderTextField = (
      <ModalWrapper width={modalWidth} style={styles.shadow}>
        {renderHeader}
        {this.renderBody(renderTextFieldBody)}
      </ModalWrapper>
    );

    const renderGraphic = (
      <ModalWrapper width={modalWidth} style={styles.shadow}>
        {renderHeader}
        {this.renderBody(renderGraphicBody)}
      </ModalWrapper>
    );

    return (
      <ThemeProvider theme={themeObj}>
        {withGraphic
          ? this.renderModal(renderGraphic)
          : withCta
            ? this.renderModal(renderCta)
            : withTextField
              ? this.renderModal(renderTextField)
              : this.renderModal(renderDefault)}
      </ThemeProvider>
    );
  }
}

Modal.propTypes = {
  headerTitle: string,
  headerColor: string,
  headerFontFamily: string,
  headerFontWeight: number,
  headerLineHeight: number,
  headerFontSize: number,
  headerBgColor: string,
  headlineText: string,
  contentText: string,
  contentFontFamily: string,
  contentFontSize: number,
  contentFontWeight: number,
  contentLineHeight: number,
  contentColor: string,
  contentBgColor: string,
  buttonText: string,
  cancelText: string,
  modalWidth: number,
  onButtonPress: func,
  onCancelPress: func,
  onChangeText: func,
  placeholder: string,
  onBlur: func,
  onFocus: func,
  errorMessage: string,
  withGraphic: bool,
  withCta: bool,
  withTextField: bool,
  imagePath: node,
  onError: bool,
  iconSize: number,
  headlineType: string,
  onBackdropPress: func,
  iconColor: string,
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

Modal.defaultProps = {
  headerTitle: 'Header Label',
  headlineText: 'Headline Text',

  contentText:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo. ',
  modalWidth: width < 350 ? 300 : 350,
  buttonText: 'Button Text',
  cancelText: 'Cancel Text',
  placeholder: 'Add Placeholder Text here',
  errorMessage: 'Error Message',
  onFocus: () => {},
  onBlur: () => {},
  onButtonPress: () => {},
  onCancelPress: () => {},
  onChangeText: () => {},
  withGraphic: false,
  withCta: false,
  withTextField: false,
  onError: false,
  headlineType: 'H3',
  themeName: defaultThemeName,
};

export default Modal;
