import React from 'react';
import { string, func, array } from 'prop-types';
import { VictoryLabel } from 'victory-native';
import { G, Rect } from 'react-native-svg';
import { colors, fonts } from '../../config';

const CustomTick = (props) => {
  const { scale, ...newProps } = props;
  let sum = 0;

  props.data.map((datum) => {
    const partialSum = datum.find((coordinate) => coordinate.x === props.datum);
    if (partialSum && partialSum.y) {
      sum += partialSum.y;
    }

    return partialSum;
  });

  const labelStyle = {
    fontSize: 12,
    lineHeight: 15,
    color: colors.richBlackDefault,
    strokeWidth: 0.8,
    stroke: colors.richBlackDefault,
    fontFamily: fonts.Regular,
  };

  const tooltipData =
    props.dataFormatter && typeof props.dataFormatter === 'function'
      ? props.dataFormatter(sum)
      : props.tickData[props.tickValuesX.indexOf(props.datum)] || sum;

  return (
    <G>
      <Rect
        fill={colors.sensitiveGreyDefault}
        width="108"
        height="29"
        rx="6"
        ry="6"
        {...newProps}
        x={props.x - 54}
        y={props.y + 41}
      />
      <VictoryLabel
        verticalAnchor="start"
        textAnchor="middle"
        angle={0}
        transform="translate(0 -12)"
        lineHeight={3.1}
        {...props}
      />
      <VictoryLabel
        dy={48}
        verticalAnchor="start"
        textAnchor="middle"
        angle={0}
        transform="translate(0 -12)"
        lineHeight={3.1}
        {...props}
        text={tooltipData}
        style={labelStyle}
      />
    </G>
  );
};

CustomTick.defaultProps = {
  unit: '',
  tickData: [],
  tickValuesX: [],
};

CustomTick.propTypes = {
  unit: string,
  dataFormatter: func,
  tickData: array,
  tickValuesX: array,
};

export default CustomTick;
