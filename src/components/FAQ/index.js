import React from 'react';
import {
  array,
  arrayOf,
  bool,
  oneOf,
  oneOfType,
  number,
  string,
  func,
} from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { theme, fonts, colors } from '../../config';
import Headline from '../Headline';
import Accordion from '../Accordion';
import { DescriptionWrapper, FAQWrapper } from './styled';
import { defaultThemeName } from '../../config/theme';

const FAQ = ({
  headlineText,
  headlineType,
  headlineColor,
  description,
  activeSections,
  expandMultiple,
  onChange,
  sections,
  duration,
  initiallyActiveSection,
  activeSection,
  disabled,
  onAnimationEnd,
  width,
  borderColor,
  titlefontFamily,
  titleFontSize,
  titleLineHeight,
  titleFontWeight,
  iconColor,
  iconSize,
  contentFontFamily,
  contentColor,
  inactiveTitleColor,
  activeTitleColor,
  contentFontSize,
  contentLineHeight,
  contentFontWeight,
  contentWidth,
  contentHeight,
  descriptionFontFamily,
  descriptionFontSize,
  descriptionFontWeight,
  descriptionLineHeight,
  descriptionColor,
  descriptionPadding,
  moduleWidth,
  themeName,
}) => (
  <ThemeProvider theme={theme.themes[themeName]}>
    <FAQWrapper width={moduleWidth}>
      <Headline type={headlineType} text={headlineText} color={headlineColor} />
      <DescriptionWrapper
        fontFamily={descriptionFontFamily}
        fontSize={descriptionFontSize}
        fontWeight={descriptionFontWeight}
        color={descriptionColor}
        lineHeight={descriptionLineHeight}
        paddingHorizontal={descriptionPadding}
        width={width}
      >
        {description}
      </DescriptionWrapper>
      <Accordion
        activeSections={activeSections}
        expandMultiple={expandMultiple}
        onChange={onChange}
        sections={sections}
        duration={duration}
        initiallyActiveSection={initiallyActiveSection}
        activeSection={activeSection}
        disabled={disabled}
        onAnimationEnd={onAnimationEnd}
        width={width}
        borderColor={borderColor}
        titlefontFamily={titlefontFamily}
        titleFontSize={titleFontSize}
        titleLineHeight={titleLineHeight}
        titleFontWeight={titleFontWeight}
        iconColor={iconColor}
        iconSize={iconSize}
        contentFontFamily={contentFontFamily}
        contentColor={contentColor}
        inactiveTitleColor={inactiveTitleColor}
        activeTitleColor={activeTitleColor}
        contentFontSize={contentFontSize}
        contentLineHeight={contentLineHeight}
        contentFontWeight={contentFontWeight}
        contentWidth={contentWidth}
        contentHeight={contentHeight}
        themeName={themeName}
      />
    </FAQWrapper>
  </ThemeProvider>
);

FAQ.propTypes = {
  headlineType: string,
  headlineText: string,
  headlineColor: string,
  description: string,
  sections: array.isRequired,
  onChange: func,
  duration: number,
  initiallyActiveSection: number,
  activeSection: oneOfType([bool, number]),
  disabled: bool,
  onAnimationEnd: func,
  width: number,
  borderColor: string,
  titlefontFamily: string,
  titleFontSize: number,
  titleLineHeight: number,
  titleFontWeight: number,
  iconColor: string,
  iconSize: number,
  contentFontFamily: string,
  contentColor: string,
  inactiveTitleColor: string,
  activeTitleColor: string,
  contentFontSize: number,
  contentLineHeight: number,
  contentFontWeight: number,
  contentWidth: string,
  contentHeight: number,
  expandMultiple: bool,
  activeSections: oneOf(arrayOf(string)),
  descriptionFontFamily: string,
  descriptionFontSize: number,
  descriptionFontWeight: number,
  descriptionLineHeight: number,
  descriptionColor: string,
  descriptionPadding: number,
  moduleWidth: string,
  themeName: string,
};

FAQ.defaultProps = {
  headlineType: 'H3',
  headlineText: 'Headline Insert',
  headlineColor: colors.richBlackDefault,
  description:
    'We have been around for 350 years, yet our majority owners are still the descendants of Friedrich Jacob Merck',
  descriptionFontFamily: fonts.Regular,
  descriptionFontSize: 14,
  descriptionLineHeight: 24.5,
  descriptionColor: colors.richBlackLightest,
  moduleWidth: '100%',
  themeName: defaultThemeName,
  width: 335,
};

export default FAQ;
