import React, { Component } from 'react'
import { View } from 'react-native'
import {
  number,
  bool
} from 'prop-types'
import Svg, {
  G,
  Defs,
  Path,
  Rect,
  Ellipse
} from 'react-native-svg'
import { colors } from '../../config'
import {
  PlaceholderWrapper,
  SquareIllustrationWrapper,
  CircularWrapper,
  RectangularIllustrationWrapper
} from './styled'

class Placeholder extends Component {
  render() {
    const {
      width,
      height,
      isSquare,
      isRectangular
    } = this.props

    const renderIllustration = () => (
      <Svg
        width={width / 2}
        height={height / 2}
        viewBox='0 0 160 100'
      >
        <G>
          <Ellipse
            cx='122.653'
            cy='30.494'
            fill='#D5D5D9'
            opacity='.1'
            rx='30.347'
            ry='30.494'
          />
          <Path
            fill='#9E9E9E'
            fill-rule='nonzero'
            // eslint-disable-next-line
            d='M90.224 94.269c-.779-16.456-7.821-73.357-21.956-62.37-14.135 10.987-15.026 48.995-25.695 57.866C31.903 98.635 28.712 51 20.972 51.864 13.232 52.727 0 105.88 0 105.88l.33-.334s91.615.113 90.368 1.323c.006 0-.237-7.63-.474-12.6z'
            opacity='.2'
          />
          <G
            fill='#FFF'
            fill-rule='nonzero'
          >
            <Path
              // eslint-disable-next-line
              d='M103.41 21.6H56.489a2.645 2.645 0 0 0-2.502 2.653c0 1.417 1.1 2.584 2.502 2.654h10.003a2.645 2.645 0 0 1 2.502 2.653c0 1.416-1.1 2.584-2.502 2.653H46.568a2.625 2.625 0 0 0-2.386 1.288 2.678 2.678 0 0 0 0 2.731 2.627 2.627 0 0 0 2.386 1.288h76.899c1.45.01 2.633-1.167 2.644-2.631.01-1.464-1.156-2.659-2.606-2.67H87.28a2.625 2.625 0 0 1-2.386-1.287c-.5-.84-.5-1.89 0-2.731a2.625 2.625 0 0 1 2.386-1.288h16.13a2.625 2.625 0 0 0 2.386-1.288c.499-.84.499-1.89 0-2.731a2.625 2.625 0 0 0-2.386-1.288V21.6z'
              opacity='.78'
            />
            <Path
              // eslint-disable-next-line
              d='M155.415 49.006h-52.59a2.645 2.645 0 0 0-2.502 2.653c0 1.416 1.1 2.584 2.502 2.653h15.666a2.625 2.625 0 0 1 2.386 1.288c.499.84.499 1.89 0 2.731a2.625 2.625 0 0 1-2.386 1.288H63.46a2.625 2.625 0 0 0-2.386 1.287c-.5.841-.5 1.891 0 2.732a2.626 2.626 0 0 0 2.386 1.287h15.665a2.625 2.625 0 0 1 2.386 1.288c.5.84.5 1.89 0 2.731a2.625 2.625 0 0 1-2.386 1.288H59.19a2.645 2.645 0 0 0-2.502 2.653c0 1.417 1.1 2.584 2.502 2.653h52.59c1.45.011 2.633-1.167 2.643-2.63.01-1.464-1.156-2.659-2.605-2.67h-6.019a2.625 2.625 0 0 1-2.386-1.287 2.68 2.68 0 0 1 0-2.732 2.625 2.625 0 0 1 2.386-1.287h45.358c1.45.01 2.633-1.167 2.644-2.631.01-1.464-1.156-2.659-2.606-2.67h-6.038a2.625 2.625 0 0 1-2.386-1.287 2.678 2.678 0 0 1 0-2.731 2.625 2.625 0 0 1 2.386-1.288h10.251a2.645 2.645 0 0 0 2.502-2.653c0-1.417-1.1-2.584-2.502-2.654l.007-.012z'
              opacity='.73'
            />
          </G>
        </G>

      </Svg>
    )

    const renderRectangularIllustration = () => (
      <Svg
        width={width / 1.3}
        height={height / 1.5}
        viewBox='0 0 450 100'
      >
        <G>
          <Ellipse
            cx='360.246'
            cy='68.319'
            fill='#D5D5D9'
            opacity='.1'
            rx='88.362'
            ry='68.319'
          />
          <Path
            fill='#9E9E9E'
            fill-rule='nonzero'
            // eslint-disable-next-line
            d='M268.751 218.222c-2.32-38.679-23.298-172.426-65.4-146.6-42.104 25.825-44.759 115.163-76.54 136.013-31.782 20.85-41.287-91.115-64.343-89.086C39.41 120.577 0 245.514 0 245.514l.984-.785s272.89.267 269.178 3.11c.018 0-.706-17.933-1.411-29.617z'
            opacity='.2'
          />
          <G
            fill='#FFF'
            fill-rule='nonzero'
          >
            <Path
              // eslint-disable-next-line
              d='M304.723 47.298H167.665c-4.093.162-7.308 2.883-7.308 6.184s3.215 6.022 7.308 6.184h29.22c4.093.162 7.308 2.883 7.308 6.184 0 3.302-3.215 6.022-7.308 6.185h-58.198c-2.833-.113-5.512 1.04-6.97 3-1.458 1.96-1.458 4.407 0 6.367s4.137 3.113 6.97 3H363.31c4.235.026 7.692-2.72 7.723-6.131.03-3.411-3.377-6.197-7.611-6.222H257.608c-2.833.113-5.512-1.04-6.97-3-1.458-1.96-1.458-4.407 0-6.367s4.137-3.113 6.97-3h47.115c2.833.111 5.512-1.042 6.97-3.002 1.458-1.96 1.458-4.407 0-6.366-1.458-1.96-4.137-3.113-6.97-3.001v-.015z'
              opacity='.78'
            />
            <Path
              // eslint-disable-next-line
              d='M456.632 111.173H303.015c-4.092.163-7.308 2.883-7.308 6.185 0 3.3 3.216 6.022 7.308 6.184h45.76c2.833-.112 5.512 1.041 6.97 3 1.458 1.96 1.458 4.408 0 6.367-1.458 1.96-4.137 3.113-6.97 3.001H188.03c-2.833-.112-5.512 1.041-6.97 3.001-1.458 1.96-1.458 4.407 0 6.367s4.137 3.113 6.97 3h45.76c2.833-.112 5.512 1.042 6.97 3.001 1.458 1.96 1.458 4.407 0 6.367s-4.137 3.113-6.97 3h-58.235c-4.093.163-7.308 2.884-7.308 6.185 0 3.301 3.215 6.022 7.308 6.184h153.617c4.234.025 7.692-2.72 7.723-6.132.03-3.411-3.377-6.196-7.612-6.221h-17.58c-2.832.112-5.511-1.042-6.97-3.001-1.457-1.96-1.457-4.407 0-6.367 1.459-1.96 4.138-3.113 6.97-3h132.492c4.234.024 7.691-2.721 7.722-6.132.031-3.412-3.377-6.197-7.611-6.222H426.67c-2.832.112-5.511-1.041-6.97-3-1.457-1.96-1.457-4.408 0-6.367 1.459-1.96 4.138-3.114 6.97-3.001h29.944c4.093-.162 7.308-2.883 7.308-6.184 0-3.302-3.215-6.022-7.308-6.185l.018-.03z'
              opacity='.73'
            />
          </G>
        </G>

      </Svg>
    )

    const renderSquare = () => (
      <PlaceholderWrapper>
        <Svg
          width={width}
          height={height}
          viewBox='0 0 300 300'
        >
          <Defs>
            <Rect
              id='a'
              width={width}
              height={height}
              rx='6'
            />
          </Defs>
          <G
            fill='none'
            fill-rule='evenodd'
          >
            <G
              fill='#F8F8FC'
            >
              <Path
                d='M0 0h300v300H0z'
              />
            </G>
            <Path
              stroke='#F3F3F7'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='3'
              d='M49.076 251.47L15 285'
              opacity='.7'
            />
            <Path
              stroke='#F3F3F7'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='3'
              d='M15 15l34.076 33.53'
              opacity='.7'
            />
            <Path
              stroke='#F3F3F7'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='3'
              d='M251.47 251.47L285 285'
              opacity='.7'
            />
            <Path
              stroke='#F3F3F7'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='3'
              d='M285 15L251.47 48.53'
              opacity='.7'
            />

          </G>
        </Svg>
        <SquareIllustrationWrapper
          top={width / 4}
          left={width / 4}
        >
          {renderIllustration()}
        </SquareIllustrationWrapper>
      </PlaceholderWrapper>
    )

    const renderRectangular = () => (
      <PlaceholderWrapper>
        <Svg
          width={width}
          height={height}
          viewBox='0 0 300 150'
        >
          <Defs>
            <Rect
              id='a'
              width='300'
              height='150'
              rx='6'
            />
          </Defs>
          <G
            fill='none'
            fill-rule='evenodd'
          >
            <G
              fill='#F8F8FC'
            >
              <Path
                d='M0 0h300v150H0z'
              />
            </G>
            <Path
              stroke='#F3F3F7'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='3'
              d='M70 100L15 135'
              opacity='.7'
            />
            <Path
              stroke='#F3F3F7'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='3'
              d='M15 15l60 30'
              opacity='.7'
            />
            <Path
              stroke='#F3F3F7'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='3'
              d='M220 100L285 135'
              opacity='.7'
            />
            <Path
              stroke='#F3F3F7'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='3'
              d='M285 15L220 45'
              opacity='.7'
            />

          </G>
        </Svg>
        <RectangularIllustrationWrapper
          top={width / 25}
          left={width / 8}
        >
          {renderRectangularIllustration()}
        </RectangularIllustrationWrapper>
      </PlaceholderWrapper>
    )

    const renderCircular = () => (
      <CircularWrapper
        width={width}
        height={height}
        backgroundColor={colors.sensitiveGreyDefault}
      >
        <SquareIllustrationWrapper
          top={width / 4}
          left={width / 4}
        >
          {renderIllustration()}
        </SquareIllustrationWrapper>
      </CircularWrapper>
    )

    return (
      <View>
        {isSquare ? renderSquare() : (isRectangular ? renderRectangular() : renderCircular())}
      </View>
    )
  }
}

Placeholder.propTypes = {
  width: number,
  height: number,
  isSquare: bool,
  isRectangular: bool
}

Placeholder.defaultProps = {
  width: 300,
  height: 300,
  isSquare: false,
  isRectangular: false
}

export default Placeholder
