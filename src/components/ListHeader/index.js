import React from 'react'
import { ThemeProvider } from 'styled-components'
import { string, func, object, bool, number, oneOfType, array } from 'prop-types'
import Icon from '../MerckIcons'
import {
  HeaderWrapper,
  Title,
  Separator,
  TitleWrapper,
  HeaderTouchableWrapper,
  HeaderChildWrapper,
  TitleIconWrapper
} from './styled'
import { theme, colors, fonts } from '../../config'
import styles from './styles'

const renderBottomSeparator = () => (
  <Separator
    width='100%'
    height={1}
    backgroundColor={colors.sensitiveGreyDarker}
  />
)

const renderTitleWithIcon = (
  icon, title, titleStyle, titleFontSize, titleFontFamily, titleColor
) => (
  <TitleIconWrapper
    flexDirection='row'
    justifyContent='flex-start'
    marginLeft={15}
  >
    <Icon
      name={icon.name}
      size={icon.size}
      color={icon.color || colors.richBlackDefault}
      style={styles.alignmentStyle}
    />
    <TitleWrapper
      marginLeft={10}
    >
      <Title
        style={titleStyle}
        fontSize={titleFontSize}
        fontFamily={titleFontFamily}
        color={titleColor}
        alignSelf='center'
      >
        {title}
      </Title>
    </TitleWrapper>
  </TitleIconWrapper>
)

const ListHeader = ({
  onPress,
  title,
  titleStyle,
  icon,
  containerStyle,
  iconLeft,
  bottomSeparator,
  titleFontSize,
  titleFontFamily,
  titleColor,
  containerWidth
}) => (
  <ThemeProvider
    theme={theme}
  >
    <HeaderTouchableWrapper
      onPress={onPress}
      underlayColor={colors.transparent}
      activeOpacity={1}
    >
      <HeaderWrapper>
        <HeaderChildWrapper
          style={[containerStyle, styles.headerPadding]}
          width={containerWidth}
          alignItems='center'
          flexDirection='row'
        >
          {
              icon && iconLeft ? renderTitleWithIcon(icon, title, titleStyle,
                titleFontSize, titleFontFamily, titleColor) :
              <TitleWrapper
                marginLeft={15}
              >
                <Title
                  style={titleStyle}
                  fontSize={titleFontSize}
                  fontFamily={titleFontFamily}
                  color={titleColor}
                >
                  {title}
                </Title>
              </TitleWrapper>
            }
        </HeaderChildWrapper>
        {bottomSeparator()}
      </HeaderWrapper>
    </HeaderTouchableWrapper>
  </ThemeProvider>
)
ListHeader.defaultProps = {
  onPress: () => { },
  bottomSeparator: () => renderBottomSeparator(),
  title: 'List Head 01',
  icon: {},
  iconLeft: false,
  titleStyle: {},
  titleFontSize: 16,
  titleFontFamily: fonts.Black,
  titleColor: colors.richBlackDefault,
  containerWidth: 300,
  containerStyle: {}
}

ListHeader.propTypes = {
  title: string,
  bottomSeparator: func,
  icon: object,
  iconLeft: bool,
  titleStyle: oneOfType([object, array]),
  containerStyle: oneOfType([object, array]),
  onPress: func,
  titleFontSize: number,
  titleFontFamily: string,
  titleColor: string,
  containerWidth: number
}
export default ListHeader
