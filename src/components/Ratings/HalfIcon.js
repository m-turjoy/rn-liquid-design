import React from 'react'
import { string } from 'prop-types'
import { IconWrapper, IconsWrapper } from './styled'
import Icon from '../MerckIcons'
import colors from '../../config/colors'

const HalfIcon = ({ type, color }) => (
  <IconsWrapper>
    <IconWrapper
      position='absolute'
    >
      <Icon
        name={type}
        size={24}
        color={colors.sensitiveGreyDarkest}
      />
    </IconWrapper>
    <IconWrapper
      backgroundColor={colors.transparent}
    >
      <Icon
        name={type === 'dot' ? 'halfDot' : 'halfStar'}
        size={24}
        color={color}
      />
    </IconWrapper>
  </IconsWrapper>
)

HalfIcon.propTypes = {
  type: string,
  color: string
}
HalfIcon.defaultProps = {
  type: 'star'
}

export default HalfIcon
