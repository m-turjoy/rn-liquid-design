import React from 'react';
import { array, string, func } from 'prop-types';
import { Dimensions, Platform } from 'react-native';
import { VictoryLabel } from 'victory-native';
import { G, Text, Path } from 'react-native-svg';
import { fonts, colors } from '../../config';

const { width } = Dimensions.get('window');
const midBoundaryLeft = 90;
const midBoundaryRight = width <= 320 ? 190 : 230;
const bigScreenBoundary = Platform.OS === 'android' ? 380 : 414;

const CustomLabel = (props) => {
  const { x, datum, descriptionLabel, labelColors, labels, dataFormatter } =
    props;

  const newXSmallMidPosition = () =>
    x > midBoundaryRight ? -80 : x < midBoundaryLeft ? 40 : -20;
  const newXLargePosition = () => (x > 250 ? -80 : x < 120 ? 45 : -10);
  const newX =
    width < bigScreenBoundary ? newXSmallMidPosition() : newXLargePosition();
  const labelStyle = {
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: colors.richBlackDefault,
    strokeWidth: 0.8,
    stroke: colors.richBlackDefault,
  };

  const xSmallMidPathPosition = () =>
    x > midBoundaryRight ? -133 : x < midBoundaryLeft ? -8 : -70;

  const xLargePathPosition = () => (x > 250 ? -130 : x < 120 ? -5 : -60);

  const xSmallMidTextPosition = () =>
    x > midBoundaryRight ? -112 : x < midBoundaryLeft ? 10 : -50;

  const xLargeTextPosition = () => (x > 250 ? -110 : x < 120 ? 15 : -40);

  const text = dataFormatter(datum.y);

  return (
    <G>
      <G {...props}>
        <Path
          x={
            width < bigScreenBoundary
              ? xSmallMidPathPosition()
              : xLargePathPosition()
          }
          d="M0,-40 h6 a6,6 0 0 1 6,6 v6 a2,2 0 0 1 -2,2 h-10 a2,2 0 0 1 -2,-2 v-10 a2,2 0 0 1 2,-2 z"
          scale={0.9}
          fill={labelColors[labels.indexOf(datum.label) % labelColors.length]}
        />
        <Text
          y={-24}
          x={
            width < bigScreenBoundary
              ? xSmallMidTextPosition()
              : xLargeTextPosition()
          }
          fontFamily={fonts.Regular}
          fontSize={12}
          textAnchor="start"
        >
          {(datum && datum.descriptionLabel) || descriptionLabel}
        </Text>
      </G>
      <VictoryLabel
        {...props}
        text={text}
        capHeight={1.2}
        lineHeight={1.9}
        dx={newX}
        dy={-5}
        style={labelStyle}
      />
    </G>
  );
};

CustomLabel.defaultProps = {
  descriptionLabel: 'Description Label',
  labelColors: [],
  labels: [],
};

CustomLabel.propTypes = {
  descriptionLabel: string,
  labelColors: array,
  labels: array,
  dataFormatter: func,
};

export default CustomLabel;
