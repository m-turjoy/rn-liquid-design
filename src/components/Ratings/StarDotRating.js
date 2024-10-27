import React from 'react';
import { bool, string, number, func } from 'prop-types';
import Icon from '../MerckIcons';
import { IconTouchableWrapper, IconWrapper } from './styled';
import HalfIcon from './HalfIcon';
import colors from '../../config/colors';

const StarDotRating = ({
  activeIconColor,
  inactiveIconColor,
  iconSize,
  dot,
  onIconPress,
  active,
  disabled,
  halfIcon,
}) => (
  <IconTouchableWrapper
    onPress={onIconPress}
    disabled={disabled}
    activeOpacity={1}
  >
    <IconWrapper marginRight={6} opacity={disabled ? 0.5 : 1}>
      {halfIcon ? (
        <HalfIcon type={dot ? 'dot' : 'star'} color={activeIconColor} />
      ) : (
        <Icon
          name={dot ? 'dot' : 'star'}
          size={iconSize}
          color={active ? activeIconColor : inactiveIconColor}
        />
      )}
    </IconWrapper>
  </IconTouchableWrapper>
);

StarDotRating.propTypes = {
  activeIconColor: string,
  inactiveIconColor: string,
  iconSize: number,
  dot: bool,
  onIconPress: func,
  active: bool,
  disabled: bool,
  halfIcon: bool,
};

StarDotRating.defaultProps = {
  inactiveIconColor: colors.sensitiveGreyDarkest,
  iconSize: 24,
  dot: false,
  disabled: false,
  onIconPress: () => {},
  active: false,
  halfIcon: false,
};

export default StarDotRating;
