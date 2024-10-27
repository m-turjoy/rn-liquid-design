import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { number } from 'prop-types';

const EnvHazard = ({ size }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 90 90"
    fillRule="evenodd"
    strokeLinejoin="round"
  >
    <G id="envHazard">
      <Path
        // eslint-disable-next-line
        d='M82.833,45.017C79.716,48.134 48.096,79.755 44.983,82.872L7.13,45.017L44.984,7.162C48.096,10.279 79.716,41.9 82.834,45.017L82.833,45.017ZM0.003,45.017L44.982,90L89.96,45.017L44.984,0.034L0.002,45.017L0.003,45.017Z'
        fill="rgb(230,30,80)"
      />
      <Path
        d="M27.008,45.293L53.152,45.293L54.052,44.668L27.008,44.668L27.008,45.293Z"
        fill="rgb(10,11,9)"
        fillRule="nonzero"
      />
      <Path
        // eslint-disable-next-line
        d='M31.739,54.101L36.065,51.601L36.268,40.925L30.928,38.019C30.928,38.019 30.117,37.478 28.968,37.816C28.562,37.951 28.021,38.086 28.021,38.086C28.021,38.086 30.928,35.653 31.469,35.856C32.009,36.058 35.794,37.883 35.794,37.883C35.794,37.883 35.389,35.044 34.375,34.233C33.361,33.423 29.441,30.313 29.441,30.313L29.441,29.57L34.781,32.814C34.781,32.814 34.983,29.704 33.901,27.88C32.821,26.055 32.009,24.432 32.009,24.432L32.347,24.162L34.983,28.218L35.862,25.446L36.402,25.311C36.402,25.311 35.727,29.231 36.2,30.448C36.673,31.665 38.43,38.288 38.43,38.288L41.067,34.504C41.067,34.504 41.134,32.949 40.999,31.868C40.864,30.786 40.661,25.784 40.661,25.784L41.134,25.784L41.878,31.259L46.135,26.325L46.135,26.865C46.135,26.865 41.945,32.138 42.148,33.287C42.351,34.437 42.554,35.112 41.81,36.734C41.067,38.356 40.594,39.506 40.594,39.506C40.594,39.506 42.824,36.87 43.838,36.666C44.852,36.599 46.202,36.734 47.148,35.923C48.095,35.112 50.393,32.543 50.393,32.543L46.81,38.086C46.81,38.086 45.122,38.154 44.446,38.897C43.77,39.641 40.999,42.817 40.999,42.817L40.999,50.113L45.594,52.411L39.985,53.222L38.633,55.182L36.808,53.628L31.739,54.101'
        fill="rgb(10,11,9)"
      />
      <Path
        // eslint-disable-next-line
        d='M45.885,26.866L45.939,26.71C45.921,26.733 45.903,26.756 45.885,26.779L45.885,26.866ZM32.325,24.5C32.471,24.786 32.619,25.07 32.771,25.353C33.191,26.142 33.646,26.956 34.117,27.751C34.426,28.272 34.65,28.913 34.803,29.648C35.038,30.83 35.105,32.04 35.003,33.241L29.691,30.013L29.691,30.191L29.818,30.292C31.39,31.54 32.961,32.788 34.531,34.037C34.958,34.378 35.298,35.017 35.578,35.873C35.83,36.668 36.007,37.484 36.108,38.312L35.686,38.108C34.975,37.764 34.262,37.423 33.548,37.085C32.362,36.523 31.591,36.168 31.381,36.089C31.291,36.055 30.688,36.381 29.933,36.919C29.662,37.112 29.395,37.31 29.133,37.515C29.651,37.401 30.192,37.44 30.689,37.626C30.857,37.69 30.981,37.754 31.056,37.803L36.52,40.777L36.312,51.745L32.852,53.745L36.89,53.368L38.585,54.812L39.841,52.99L44.769,52.277L40.749,50.267L40.749,42.723L40.811,42.653L40.964,42.477C41.507,41.855 42.05,41.234 42.594,40.614C43.418,39.675 44,39.015 44.261,38.728C44.527,38.436 44.924,38.225 45.418,38.074C45.825,37.952 46.244,37.875 46.668,37.844L48.614,34.834C48.058,35.414 47.613,35.854 47.311,36.112C46.805,36.545 46.187,36.757 45.385,36.84C45.108,36.869 44.898,36.878 44.409,36.892C44.143,36.9 44.012,36.905 43.872,36.914C43.603,36.975 43.164,37.274 42.628,37.754C42.457,37.906 42.278,38.074 42.094,38.257C41.648,38.699 41.22,39.159 40.811,39.635L39.757,40.881L40.362,39.409C40.47,39.148 40.581,38.888 40.694,38.629C40.958,38.014 41.257,37.341 41.583,36.629C42.018,35.679 42.136,35.056 42.067,34.355C42.051,34.193 42.028,34.031 42,33.87L41.903,33.33C41.806,32.782 42.386,31.675 43.487,30.045C43.826,29.548 44.172,29.057 44.527,28.571L41.706,31.841L40.888,25.817L41.135,26.033L40.662,26.033L40.912,25.773C40.925,26.1 40.939,26.428 40.954,26.755C40.986,27.491 41.02,28.227 41.055,28.915C41.085,29.49 41.113,30.006 41.14,30.446C41.18,31.113 41.217,31.589 41.248,31.836C41.278,32.08 41.301,32.358 41.315,32.664C41.342,33.304 41.342,33.946 41.315,34.586L38.328,38.874L38.19,38.352C38.159,38.237 38.129,38.122 38.098,38.007C37.744,36.684 37.384,35.362 37.018,34.042C36.513,32.236 36.142,30.986 35.968,30.538C35.777,30.046 35.743,29.186 35.822,28.039C35.855,27.569 35.906,27.069 35.97,26.556C36.01,26.234 36.054,25.927 36.097,25.644L35.063,28.796L32.139,24.297L32.504,24.357L32.166,24.627L32.234,24.32C32.264,24.38 32.294,24.44 32.325,24.5L32.325,24.5ZM30.625,54.455L35.818,51.453L36.015,41.071L30.808,38.237C30.714,38.181 30.615,38.133 30.513,38.095C30.083,37.933 29.583,37.895 29.047,38.052C28.748,38.147 28.447,38.234 28.143,38.312L27.028,38.592L27.861,37.893C28.004,37.774 28.148,37.656 28.294,37.54C28.735,37.186 29.185,36.843 29.643,36.512C30.618,35.817 31.216,35.492 31.556,35.62C31.787,35.707 32.553,36.06 33.706,36.607C34.293,36.886 34.879,37.166 35.465,37.447C35.374,36.967 35.253,36.494 35.103,36.029C34.85,35.258 34.549,34.692 34.219,34.428C32.649,33.179 31.079,31.932 29.508,30.685L29.343,30.554L29.191,30.433L29.191,29.124L34.545,32.377C34.563,31.495 34.485,30.614 34.313,29.749C34.171,29.065 33.964,28.474 33.687,28.006C32.983,26.814 32.318,25.599 31.695,24.362L32.407,23.794L34.905,27.637L35.665,25.237L36.715,24.975L36.649,25.353C36.628,25.471 36.609,25.59 36.592,25.709C36.549,25.991 36.506,26.297 36.465,26.619C36.403,27.103 36.355,27.588 36.32,28.074C36.246,29.147 36.278,29.957 36.433,30.357C36.616,30.827 36.988,32.08 37.498,33.907L37.581,34.205C37.904,35.369 38.221,36.535 38.533,37.703L40.82,34.42L40.825,34.237C40.838,33.732 40.838,33.192 40.815,32.687C40.804,32.423 40.782,32.159 40.751,31.897C40.719,31.637 40.681,31.154 40.64,30.477C40.613,30.035 40.584,29.517 40.555,28.94C40.498,27.805 40.446,26.669 40.401,25.533L41.353,25.533L42.051,30.675L46.385,25.652L46.385,26.952L46.33,27.02C46.12,27.285 45.914,27.552 45.71,27.822C45.242,28.434 44.786,29.055 44.342,29.685C44.188,29.904 44.041,30.118 43.901,30.325C42.904,31.8 42.333,32.892 42.394,33.243C42.404,33.299 42.474,33.679 42.492,33.786C42.526,33.986 42.549,34.148 42.565,34.306C42.643,35.1 42.508,35.811 42.038,36.837C41.814,37.325 41.604,37.795 41.408,38.239C41.519,38.125 41.631,38.011 41.743,37.901C41.933,37.714 42.117,37.539 42.295,37.381C42.906,36.834 43.405,36.497 43.789,36.421C43.976,36.406 44.111,36.401 44.395,36.393C44.872,36.379 45.073,36.37 45.333,36.343C46.043,36.269 46.569,36.089 46.986,35.733C47.296,35.467 47.781,34.985 48.39,34.345C48.992,33.71 49.586,33.067 50.17,32.416C50.182,32.403 50.326,32.49 50.603,32.678L46.95,38.33L46.82,38.335C46.395,38.361 45.973,38.434 45.564,38.552C45.148,38.679 44.825,38.851 44.631,39.064C44.373,39.349 43.791,40.007 42.984,40.927C42.435,41.553 41.887,42.179 41.34,42.806L41.25,42.91L41.25,49.958L46.42,52.543L40.13,53.453L38.682,55.551L36.727,53.886L30.625,54.456L30.625,54.455Z'
        fill="rgb(10,11,9)"
        fillRule="nonzero"
      />
      <Path
        // eslint-disable-next-line
        d='M34.307,59.373C35.164,58.988 39.437,57.165 42.455,55.949C42.3,55.979 47.7,58.401 47.7,58.5C47.7,58.58 48.3,57.38 49.5,54.9C52.869,53.973 54.969,53.373 55.8,53.1C57.23,52.63 58.318,51.27 57.6,51.3L61.005,54.304L57.085,56.196L62.357,56.67L60.937,58.562L63.844,58.562L63.911,60.658L27.143,60.455C27.143,60.455 33.293,58.63 34.307,59.373L34.307,59.373Z'
        fill="rgb(10,11,9)"
      />
      <Path
        // eslint-disable-next-line
        d='M63.653,60.406L63.602,58.812L60.438,58.812L61.888,56.879L56.161,56.365L60.518,54.261C59.54,53.581 58.567,52.894 57.6,52.2C57.513,52.137 52.04,57.143 47.7,58.312C45.848,58.812 42.952,56.019 42.813,56.075C42.143,56.344 41.371,56.659 40.52,57.01C38.188,57.974 35.226,59.234 34.41,59.601L34.277,59.661L34.16,59.575C33.838,59.339 32.596,59.428 30.845,59.785C30.22,59.913 29.598,60.056 28.98,60.215M64.086,58.312L64.17,60.909L25.453,60.696L27.072,60.216C27.305,60.147 27.538,60.081 27.772,60.017C28.332,59.863 28.894,59.718 29.459,59.582C29.903,59.475 30.334,59.379 30.745,59.295C32.528,58.931 33.751,58.825 34.321,59.093C36.934,57.958 39.56,56.855 42.199,55.783C42.399,55.702 45.312,58.258 47.7,57.6C49.513,57.1 53.113,55 58.5,51.3L61.492,54.347L58.008,56.028L62.826,56.461L61.437,58.312'
        fill="rgb(10,11,9)"
        fillRule="nonzero"
      />
      <Path
        // eslint-disable-next-line
        d='M40.864,55.115C40.864,55.115 42.621,55.047 43.432,54.709C44.719,54.173 46.81,53.29 48.027,51.533C49.285,49.716 53.772,42.074 59.923,42.683C59.586,43.493 58.504,45.251 58.504,45.251L62.898,43.899C62.898,43.899 62.965,49.708 54.651,53.425C50.798,54.777 49.987,54.845 49.649,55.318C49.312,55.791 47.757,58.157 47.757,58.157L40.864,55.115'
        fill="none"
      />
      <Path
        // eslint-disable-next-line
        d='M47.641,57.764C47.914,57.35 48.187,56.937 48.461,56.524C48.935,55.808 49.261,55.325 49.395,55.136C49.508,54.978 49.655,54.858 49.865,54.747C50.127,54.609 50.435,54.498 51.339,54.205C52.839,53.719 53.379,53.54 54.535,53.135C56.553,52.231 58.172,51.159 59.432,49.955C60.82,48.628 61.707,47.213 62.196,45.798C62.363,45.323 62.482,44.832 62.551,44.333L57.803,45.793L58.238,45.087C58.318,44.958 58.396,44.828 58.473,44.698C58.688,44.34 58.897,43.978 59.101,43.614C59.236,43.371 59.352,43.152 59.447,42.964C56.606,42.867 53.923,44.544 51.373,47.486C50.694,48.276 50.057,49.102 49.465,49.96C49.131,50.44 48.329,51.646 48.285,51.71C47.703,52.55 46.905,53.246 45.918,53.846C45.214,54.274 44.603,54.56 43.553,54.998C43.265,55.118 42.873,55.21 42.396,55.283L42.108,55.323L47.641,57.764ZM63.205,43.478L63.21,43.895C63.204,44.103 63.186,44.311 63.156,44.517C63.091,44.97 62.972,45.469 62.787,46.003C62.266,47.509 61.325,49.01 59.864,50.406C58.548,51.663 56.866,52.777 54.779,53.71C53.585,54.13 53.042,54.31 51.532,54.8C50.672,55.08 50.372,55.186 50.156,55.3C50.057,55.345 49.97,55.414 49.904,55.5C49.774,55.68 49.451,56.162 48.996,56.848C48.696,57.299 48.398,57.751 48.1,58.203L48.04,58.296L47.873,58.549L39.5,54.855L40.852,54.803L40.974,54.797C41.418,54.772 41.861,54.728 42.302,54.665C42.732,54.599 43.082,54.517 43.312,54.421C44.335,53.995 44.923,53.719 45.594,53.312C46.512,52.755 47.244,52.115 47.77,51.355C47.81,51.297 48.613,50.089 48.953,49.603C49.557,48.727 50.208,47.884 50.901,47.077C53.703,43.843 56.699,42.049 59.954,42.371L60.374,42.413L60.212,42.803C60.043,43.184 59.854,43.556 59.647,43.918C59.499,44.185 59.347,44.45 59.191,44.713L63.205,43.478Z'
        fill="rgb(10,11,9)"
        fillRule="nonzero"
      />
      <Path
        // eslint-disable-next-line
        d='M58.842,47.308C58.842,46.954 59.175,46.667 59.586,46.667C59.996,46.667 60.329,46.954 60.329,47.307C60.329,47.662 59.996,47.95 59.586,47.95C59.175,47.95 58.842,47.662 58.842,47.308'
        fill="rgb(10,11,9)"
      />
    </G>
  </Svg>
);

EnvHazard.propTypes = {
  size: number,
};

export default EnvHazard;
