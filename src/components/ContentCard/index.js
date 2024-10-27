import React from 'react';
import { View } from 'react-native';
import { bool, string, number, object, oneOfType, PropTypes } from 'prop-types';
import {
  ImageWrapper,
  Image,
  ContentCardWrapper,
  LabelWrapper,
} from './styled';
// import { Card, Headline, Paragraph, Badge } from '../index';
import Card from '../Card';
import Headline from '../Headline';
import Paragraph from '../Paragraph';
import Badge from '../Badge';
import styles from './styles';
import { defaultThemeName, getThemeObject } from '../../config/theme';

class ContentCard extends React.Component {
  heightHelper = () => {
    const { withDetail, withBadge } = this.props;
    let height = 0;

    if (withDetail) {
      height = withBadge ? '392' : '380';
    } else {
      height = withBadge ? '352' : '340';
    }

    return height;
  };

  styleHelp = (
    withBadgeAndDetail,
    detailsOnly,
    badgeOnly,
    withoutBadgeAndDetail
  ) => {
    let style;
    const { withBadge, withDetail } = this.props;

    if (withDetail) {
      style = withBadge ? withBadgeAndDetail : detailsOnly;
    } else if (withBadge && !withDetail) {
      style = badgeOnly;
    } else {
      style = withoutBadgeAndDetail;
    }

    return style;
  };

  render() {
    const {
      imagePath,
      imgWrapperSize,
      borderRadius,
      cardTitle,
      labelFirst,
      labelSecond,
      labelFirstValue,
      labelSecondValue,
      smallDetail,
      headingDetail,
      withDetail,
      withBadge,
      stacked,
      themeName,
    } = this.props;

    let themeObj = getThemeObject(themeName);
    return (
      <Card
        stacked={stacked}
        height={this.heightHelper()}
        contentHeight="100%"
        justifyContent={withBadge ? 'space-between' : 'center'}
        contentWidth="100%"
      >
        <ContentCardWrapper>
          <View
            style={
              withBadge
                ? styles.cardContentWrapWithBadgeStyle
                : styles.cardContentWrapStyle
            }
          >
            <Headline
              type="H5"
              text={cardTitle}
              textStyle={this.styleHelp(
                styles.titleWithDetailsAndBadgeStyle,
                styles.titleWithDetailsStyle,
                styles.titleWithBadge,
                styles.titleStyle
              )}
            />
            {withDetail && (
              <Paragraph
                text={smallDetail}
                type="XLabel"
                textStyle={[
                  styles.detailsStyle,
                  withDetail && styles.detailsWithBadgeStyle,
                ]}
              />
            )}
            <ImageWrapper
              borderRadius={borderRadius}
              height={imgWrapperSize}
              width={imgWrapperSize}
            >
              <Image source={imagePath} />
            </ImageWrapper>
            {withDetail && (
              <Headline
                text={headingDetail}
                type="H3"
                color={themeObj.colors.primary.base}
                textStyle={styles.headingStyle}
              />
            )}
            <LabelWrapper
              flexDirection="row"
              style={this.styleHelp(
                styles.labelWrapperWithDetailStyle,
                styles.labelWrapperWithDetailStyle,
                styles.labelWrapperWithBadgeStyle,
                styles.labelWrapperStyle
              )}
            >
              <LabelWrapper pr="27" alignItems="flex-start">
                <Paragraph text={labelFirst} type="XLabel" />
                <Headline type="H6" text={labelFirstValue} />
              </LabelWrapper>
              <LabelWrapper alignItems="flex-end">
                <Paragraph
                  text={labelSecond}
                  type="XLabel"
                  textStyle={styles.secondLabelStyle}
                />
                <Headline type="H6" text={labelSecondValue} />
              </LabelWrapper>
            </LabelWrapper>
          </View>
        </ContentCardWrapper>
        {withBadge && (
          <Badge themeName={themeName} withIcon iconPosition="right" />
        )}
      </Card>
    );
  }
}

ContentCard.defaultProps = {
  stacked: false,
  imagePath: '',
  imgWrapperSize: 150,
  borderRadius: 100,
  cardTitle: 'Title Name',
  labelFirst: 'Label 1',
  labelSecond: 'Label 2',
  labelFirstValue: 'Value / Number 1',
  labelSecondValue: 'Value / Number 2',
  withDetail: false,
  smallDetail:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
  headingDetail: 'e.g. Amount, etc.',
  withBadge: false,
  themeName: defaultThemeName,
};

ContentCard.propTypes = {
  stacked: bool,
  imagePath: oneOfType([object, number, string]),
  imgWrapperSize: number,
  borderRadius: number,
  cardTitle: string,
  labelFirst: string,
  labelSecond: string,
  labelFirstValue: string,
  labelSecondValue: string,
  withDetail: bool,
  smallDetail: string,
  headingDetail: string,
  withBadge: bool,
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

export default ContentCard;
