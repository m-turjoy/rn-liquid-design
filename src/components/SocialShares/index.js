import React from 'react'
import { bool, number, string, func, oneOfType, object, array } from 'prop-types'
import { ThemeProvider } from 'styled-components'
import {
  SocialShareWrapper,
  IconLabelWrapper,
  Label,
  TouchableWrapper,
  IconWrapper
} from './styled'
import Icon from '../MerckIcons'
import { colors, theme, fonts } from '../../config'

const adjustBackgroundColor = type => (
  (type === 'facebook' && colors.facebookBlue) ||
  (type === 'instagram' && colors.instagramRed) ||
  (type === 'snapchat' && colors.snapchatYellow) ||
  (type === 'twitter' && colors.twitterBlue) ||
  (type === 'linkedIn' && colors.linkedInBlue) ||
  (type === 'flickr' && colors.flickrBlue) ||
  (type === 'slack' && colors.slackGreen) ||
  (type === 'mail' && colors.mailBlue) ||
  (type === 'salesforce' && colors.salesforceBlue) ||
  (type === 'skype' && colors.skypeBlue) ||
  (type === 'microsoftTeams' && colors.microsoftPurple) ||
  (type === 'xing' && colors.xingGreen)
)

const adjustIconType = type => (
  (type === 'facebook' && 'facebook') ||
  (type === 'instagram' && 'instagram') ||
  (type === 'snapchat' && 'snapchat') ||
  (type === 'twitter' && 'twitter') ||
  (type === 'linkedIn' && 'linked-in') ||
  (type === 'flickr' && 'flickr') ||
  (type === 'slack' && 'slack') ||
  (type === 'mail' && 'mail') ||
  (type === 'salesforce' && 'salesforce') ||
  (type === 'skype' && 'skype') ||
  (type === 'microsoftTeams' && 'teams') ||
  (type === 'xing' && 'xing')
)

const adjustLabel = type => (
  (type === 'facebook' && 'Facebook') ||
  (type === 'instagram' && 'Instagram') ||
  (type === 'snapchat' && 'Snapchat') ||
  (type === 'twitter' && 'Twitter') ||
  (type === 'linkedIn' && 'LinkedIn') ||
  (type === 'flickr' && 'flickr') ||
  (type === 'slack' && 'Slack') ||
  (type === 'mail' && 'Mail') ||
  (type === 'salesforce' && 'salesforce') ||
  (type === 'skype' && 'Skype') ||
  (type === 'microsoftTeams' && 'Teams') ||
  (type === 'xing' && 'Xing')
)

const adjustIconSize = (type, iconSize) => (
  (type === 'facebook' && iconSize - 4) ||
  ((type === 'snapchat' || type === 'twitter') && iconSize + 1) ||
  (type === 'linkedIn' && iconSize - 5) ||
  (type === 'salesforce' && iconSize + 5) ||
  (type === 'microsoftTeams' && iconSize + 2) ||
  iconSize
)

const SocialShare = (props) => {
  const {
    width,
    height,
    large,
    type,
    fontFamily,
    fontSize,
    color,
    onPress,
    borderRadius,
    largeWidth,
    iconSize,
    containerStyle,
    labelStyle
  } = props

  return (
    <ThemeProvider
      theme={theme}
    >
      <TouchableWrapper
        {...props}
        onPress={onPress}
      >
        <SocialShareWrapper
          width={large ? largeWidth : width}
          height={height}
          backgroundColor={adjustBackgroundColor(type)}
          borderRadius={borderRadius}
          alignItems={large ? 'flex-start' : 'center'}
          justifyContent='center'
          style={containerStyle}
        >
          {large ?
            <IconLabelWrapper
              flex={1}
              flexDirection='row'
              marginLeft={5}
              alignItems='center'
              justifyContent='flex-start'
            >
              <IconWrapper
                alignItems='center'
                justifyContent='center'
                height={height}
                width={40}
                marginRight={5}
              >
                <Icon
                  name={adjustIconType(type)}
                  color={type === 'snapchat' ? colors.snapchatBlack : color}
                  size={adjustIconSize(type, iconSize)}
                />
              </IconWrapper>
              <Label
                fontFamily={fontFamily}
                fontSize={fontSize}
                color={type === 'snapchat' ? colors.snapchatBlack : color}
                style={labelStyle}
              >
                {adjustLabel(type)}
              </Label>
            </IconLabelWrapper>
            :
            <IconWrapper
              alignItems='center'
              justifyContent='center'
              flex={1}
            >
              <Icon
                name={adjustIconType(type)}
                color={type === 'snapchat' ? colors.snapchatBlack : color}
                size={adjustIconSize(type, iconSize)}
              />
            </IconWrapper>
            }
        </SocialShareWrapper>
      </TouchableWrapper>
    </ThemeProvider>
  )
}
SocialShare.propTypes = {
  width: number,
  height: number,
  large: bool,
  type: string.isRequired,
  fontFamily: string,
  fontSize: number,
  color: string,
  onPress: func,
  borderRadius: number,
  largeWidth: number,
  iconSize: number,
  containerStyle: oneOfType([object, array]),
  labelStyle: oneOfType([object, array])
}
SocialShare.defaultProps = {
  width: 40,
  height: 40,
  large: false,
  fontFamily: fonts.Bold,
  fontSize: 16,
  color: colors.white,
  onPress: () => {},
  borderRadius: 6,
  largeWidth: 160,
  iconSize: 24,
  containerStyle: {},
  labelStyle: {}
}
export default SocialShare
