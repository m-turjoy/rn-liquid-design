import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { number } from 'prop-types';

const CompressedGas = ({ size }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 90 90"
    fillRule="evenodd"
    strokeLinejoin="round"
  >
    <G id="compressedGas">
      <Path
        // eslint-disable-next-line
        d='M23.652,48.362C24.309,50.855 26.048,52.546 27.535,52.14L56.609,44.199C57.522,43.949 58.128,42.965 58.307,41.665L58.307,41.667C58.402,40.99 58.892,40.431 59.55,40.247L65.707,38.561C66.393,38.374 66.762,37.513 66.531,36.639C66.301,35.765 65.559,35.209 64.873,35.396L58.716,37.079C58.054,37.258 57.347,37.016 56.933,36.47L56.933,36.473C56.141,35.449 55.138,34.912 54.229,35.16L25.155,43.112C23.668,43.519 22.995,45.87 23.652,48.362'
        fill="rgb(10,11,9)"
      />
      <Path
        // eslint-disable-next-line
        d='M82.87,45.005L45,82.87L7.13,45.005C10.25,41.884 41.882,10.247 45,7.13C48.118,10.248 79.751,41.885 82.87,45.006L82.87,45.005ZM0,45.005L45,90L90,45.005L45,0L0,45.005Z'
        fill="rgb(230,30,80)"
      />
    </G>
  </Svg>
);

CompressedGas.propTypes = {
  size: number,
};

export default CompressedGas;
