import React, { Component } from 'react'
import {
  Animated,
  Easing
} from 'react-native'
import {
  string,
  object,
  oneOfType,
  array,
  number,
  func,
  bool,
  node
} from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { colors } from '../../../config'
import { Icon } from '../../'
import {
  HeaderWrapper,
  Header,
  IconWrapper,
  IconWrapperTouchable,
  AnimatedIconWrapper,
  HeaderWrapperTouchable
} from '../styled'

class ColumnHeader extends Component {
  state = {
    columnSortedAscending: false,
    columnSortedDescending: false,
    columnUnsorted: true,
    spinValue: new Animated.Value(0)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.indexPressed !== nextProps.indexPressed &&
      this.props.index !== nextProps.indexPressed) {
      this.defaultData()
    }
  }

  descendingData = () => {
    Animated.timing(this.state.spinValue,
      {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(() => {
      this.setState({
        columnSortedAscending: false,
        columnSortedDescending: true
      })
    })
  }

  defaultData = () => {
    Animated.timing(this.state.spinValue,
      {
        toValue: 0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(() => {
      this.setState({
        columnSortedAscending: false,
        columnSortedDescending: false,
        columnUnsorted: true
      })
    })
  }

  ascendingData = () => {
    this.setState({
      columnUnsorted: false,
      columnSortedAscending: true
    })
  }

  handleOnIconPressed = () => {
    const { onIconPress } = this.props

    if (this.state.columnUnsorted &&
            !this.state.columnSortedAscending &&
            !this.state.columnSortedDescending) {
      this.ascendingData()
    } else if (this.state.columnSortedAscending &&
            !this.state.columnUnsorted &&
            !this.state.columnSortedDescending) {
      this.descendingData()
    } else {
      this.defaultData()
    }

    onIconPress(this.state.columnSortedAscending, this.state.columnUnsorted)
  }

  renderIcon = () => {
    const {
      arrowIconColor, arrowIconSize, themeObj
    } = this.props

    const rotateIcon = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-180deg']
    })
    // eslint-disable-next-line
    const handleIconColor = this.state.columnUnsorted ?
      colors.sensitiveGreyDarkest :
      arrowIconColor !== colors.vibrantCyanDefault ?
        arrowIconColor : themeObj.colors.primary.base

    return (
      <AnimatedIconWrapper
        style={{
              transform: [
                { rotate: rotateIcon }
              ]
            }}
        marginLeft={3}
      >
        <Icon
          name='arrowDown'
          color={handleIconColor}
          size={arrowIconSize}
        />
      </AnimatedIconWrapper>
    )
  }

  renderArrowIcon = () => {
    const {
      arrowIconColor,
      arrowIconSize,
      dropdown,
      checkbox,
      type,
      index,
      handleMainOptionPressed,
      mainOptionOpened,
      themeObj,
      loading
    } = this.props
    const handleIconColor = arrowIconColor !== colors.vibrantCyanDefault ?
      arrowIconColor : themeObj.colors.primary.base

    return (
      dropdown && !checkbox && type !== 'image' && index === 0 ?
        <IconWrapperTouchable
          onPress={handleMainOptionPressed}
          disabled={loading}
        >
          <IconWrapper>
            { mainOptionOpened ?
              <Icon
                name='arrowUp'
                size={arrowIconSize}
                color={handleIconColor}
                // eslint-disable-next-line
                style={{
                  marginRight: 8,
                  marginLeft: -3
                }}
              /> :
              <Icon
                name='arrowDown'
                size={arrowIconSize}
                color={handleIconColor}
                // eslint-disable-next-line
                style={{
                  marginRight: 8,
                  marginLeft: -3
                }}
              />
            }
          </IconWrapper>
        </IconWrapperTouchable>
        : null
    )
  }

   renderCheckboxIcon = () => {
     const {
       checkbox,
       dropdown,
       checkboxIconColor,
       checkboxIconSize,
       type,
       handleMainCheckboxPressed,
       index,
       mainCheckboxChecked,
       themeObj,
       loading
     } = this.props

     const handleIconColor = checkboxIconColor !== colors.vibrantCyanDefault ?
       checkboxIconColor : themeObj.colors.primary.base

     return (
       checkbox && !dropdown && type !== 'image' && index === 0 ?
         <IconWrapperTouchable
           onPress={handleMainCheckboxPressed}
           disabled={loading}
         >
           <IconWrapper>
             { mainCheckboxChecked ?
               <Icon
                 name='checkboxFilled'
                 size={checkboxIconSize}
                 color={handleIconColor}
                 // eslint-disable-next-line
                 style={{ marginRight: 9 }}
               /> :
               <Icon
                 name='checkboxEmpty'
                 size={checkboxIconSize}
                 color={colors.sensitiveGreyDarker}
                 // eslint-disable-next-line
                 style={{ marginRight: 9 }}
               />
                    }
           </IconWrapper>
         </IconWrapperTouchable>
         : null
     )
   }

   renderHeaderWithIcon = () => {
     const {
       headerFontFamily,
       headerFontSize,
       headerColor,
       headerStyle,
       item,
       loading
     } = this.props

     return (
       <HeaderWrapperTouchable
         onPress={this.handleOnIconPressed}
         disabled={loading}
       >
         <HeaderWrapper
           flex={1}
           flexDirection='row'
           alignItems='center'
           justifyContent='flex-start'
         >
           <Header
             fontFamily={headerFontFamily}
             fontSize={headerFontSize}
             color={headerColor}
             style={headerStyle}
           >{item}
           </Header>
           {this.renderIcon()}
         </HeaderWrapper>
       </HeaderWrapperTouchable>
     )
   }

   render() {
     const {
       spaceBetweenColumns,
       themeObj,
       headerWidth,
       headerWrapperStyle,
       type
     } = this.props

     return (
       <ThemeProvider
         theme={themeObj}
       >
         <HeaderWrapper
           width={type === 'image' ? headerWidth + 30 : headerWidth}
           marginRight={spaceBetweenColumns}
           style={headerWrapperStyle}
           alignItems='center'
           justifyContent='flex-start'
           flexDirection='row'
           paddingTop={5}
           paddingBottom={5}
         >
           {this.renderCheckboxIcon()}
           {this.renderArrowIcon()}
           {this.renderHeaderWithIcon()}
         </HeaderWrapper>
       </ThemeProvider>
     )
   }
}

ColumnHeader.propTypes = {
  headerWidth: number.isRequired,
  headerWrapperStyle: oneOfType([object, array]),
  checkboxIconSize: number.isRequired,
  type: string.isRequired,
  index: number.isRequired,
  checkbox: bool.isRequired,
  dropdown: bool.isRequired,
  headerFontFamily: string.isRequired,
  headerFontSize: number.isRequired,
  headerColor: string.isRequired,
  headerStyle: oneOfType([object, array]).isRequired,
  item: node.isRequired,
  arrowIconColor: string.isRequired,
  arrowIconSize: number.isRequired,
  onIconPress: func.isRequired,
  checkboxIconColor: string.isRequired,
  handleMainCheckboxPressed: func.isRequired,
  mainCheckboxChecked: bool.isRequired,
  handleMainOptionPressed: func.isRequired,
  mainOptionOpened: bool.isRequired,
  spaceBetweenColumns: number.isRequired,
  themeObj: object.isRequired,
  indexPressed: node,
  loading: bool
}

ColumnHeader.defaultProps = {
  indexPressed: null,
  headerWrapperStyle: {},
  loading: false
}

export default ColumnHeader
