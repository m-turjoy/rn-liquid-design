import React from 'react'
import { string, number } from 'prop-types'
import Svg, { Polygon } from 'react-native-svg'
import { SvgWrapper } from './styled'

const adjustTrianglePoints = side => ((side === 'bottom-left' || side === 'bottom-right') &&
      '11,20 20,10 29,20') ||
    ((side === 'top-left' || side === 'top-right') && '11,10 20,20 29,10') ||
    ((side === 'left-top' || side === 'left-bottom') && '10,11 10,29 20,20') ||
    ((side === 'right-top' || side === 'right-bottom') && '30,11 30,29 20,20')

const adjustTopPosition = (side, positionY, iconHeight) => (
  ((side === 'bottom-left' || side === 'bottom-right') && positionY + iconHeight + 3) ||
  ((side === 'top-left' || side === 'top-right') && positionY - 11) ||
  ((side === 'left-top' || side === 'right-top' || side === 'left-bottom'
    || side === 'right-bottom') &&
  positionY + ((iconHeight - 17) / 2))
)

const adjustLeftPosition = (side, positionX, iconWidth) => (
  ((side === 'bottom-left' || side === 'bottom-right' ||
    side === 'top-left' || side === 'top-right') && ((positionX + (iconWidth / 2)) - 8)) ||
  ((side === 'left-top' || side === 'left-bottom') && positionX - 11) ||
  ((side === 'right-top' || side === 'right-bottom') && positionX + iconWidth + 3)
)
const SvgTriangle = ({
  modalRenderSide,
  modalBackgroundColor,
  positionX,
  positionY,
  iconHeight,
  iconWidth
}) => (
  <SvgWrapper
    position='absolute'
    top={adjustTopPosition(modalRenderSide, positionY, iconHeight)}
    left={adjustLeftPosition(modalRenderSide, positionX, iconWidth)}
    justifyContent='flex-start'
    alignItems='flex-start'
    elevation={15}
  >
    <Svg
      width={
        ((modalRenderSide === 'bottom-right' || modalRenderSide === 'bottom-left' ||
          modalRenderSide === 'top-left' || modalRenderSide === 'top-right') && 16) ||
       ((modalRenderSide === 'right-top' || modalRenderSide === 'left-top' ||
          modalRenderSide === 'right-bottom' || modalRenderSide === 'left-bottom') && 8)
      }
      height={
        ((modalRenderSide === 'bottom-right' || modalRenderSide === 'bottom-left' ||
          modalRenderSide === 'top-left' || modalRenderSide === 'top-right') && 8) ||
        ((modalRenderSide === 'right-top' || modalRenderSide === 'left-top' ||
          modalRenderSide === 'right-bottom' || modalRenderSide === 'left-bottom') && 17)
      }
    >
      <Polygon
        y={
          ((modalRenderSide === 'bottom-right' || modalRenderSide === 'bottom-left') && -7) ||
          ((modalRenderSide === 'top-left' || modalRenderSide === 'top-right') && -15) ||
          ((modalRenderSide === 'right-top' || modalRenderSide === 'left-top' ||
            modalRenderSide === 'right-bottom' || modalRenderSide === 'left-bottom') && -11)
        }
        x={
          ((modalRenderSide === 'bottom-right' || modalRenderSide === 'bottom-left' ||
          modalRenderSide === 'top-left' || modalRenderSide === 'top-right') && -12) ||
          ((modalRenderSide === 'right-top' || modalRenderSide === 'right-bottom') && -17) ||
          ((modalRenderSide === 'left-top' || modalRenderSide === 'left-bottom') && -15)
        }
        stroke={modalBackgroundColor}
        strokeWidth={5}
        strokeLinecap='round'
        strokeLinejoin='round'
        points={adjustTrianglePoints(modalRenderSide)}
        fill={modalBackgroundColor}
      />
    </Svg>
  </SvgWrapper>
)

SvgTriangle.propTypes = {
  modalRenderSide: string.isRequired,
  modalBackgroundColor: string.isRequired,
  positionX: number.isRequired,
  positionY: number.isRequired,
  iconWidth: number.isRequired,
  iconHeight: number.isRequired
}

export default SvgTriangle
