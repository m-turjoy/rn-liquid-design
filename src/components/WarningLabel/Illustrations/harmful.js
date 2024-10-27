import React from 'react'
import Svg, { G, Path } from 'react-native-svg'
import { number } from 'prop-types'

const Harmful = ({
  size
}) => (
  <Svg
    width={size}
    height={size}
    viewBox='0 0 90 90'
    fillRule='evenodd'
    strokeLinejoin='round'
  >
    <G
      id='harmful'
    >
      <Path
        // eslint-disable-next-line
        d='M45.3,53.635C42.54,53.635 40.302,55.999 40.302,58.915C40.302,61.832 42.539,64.197 45.3,64.197C48.06,64.197 50.297,61.832 50.297,58.916C50.297,56 48.06,53.636 45.3,53.636'
        fill='rgb(10,11,9)'
      />
      <Path
        // eslint-disable-next-line
        d='M38.786,25.991C38.786,26.048 38.789,26.104 38.793,26.16L38.789,26.16L38.794,26.197C38.804,26.341 38.826,26.484 38.858,26.624L41.951,47.504C42.059,49.282 43.516,50.69 45.3,50.69C47.072,50.69 48.523,49.297 48.645,47.533L51.733,26.657C51.771,26.498 51.795,26.337 51.805,26.172L51.807,26.16L51.806,26.16C51.809,26.104 51.812,26.048 51.812,25.991C51.812,23.624 48.896,21.705 45.3,21.705C41.702,21.705 38.786,23.623 38.786,25.991'
        fill='rgb(10,11,9)'
      />
      <Path
        // eslint-disable-next-line
        d='M82.836,45.017L44.981,82.871L7.128,45.017L44.98,7.162L82.835,45.017L82.836,45.017ZM0,45.017L44.981,90L89.964,45.017L44.98,0.034L0,45.017Z'
        fill='rgb(230,30,80)'
      />
    </G>
  </Svg>
)

Harmful.propTypes = {
  size: number
}

export default Harmful
