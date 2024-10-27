import React, { Component } from 'react'
import {
  string,
  number,
  bool,
  func
} from 'prop-types'
import moment from 'moment'
import { Modal, Platform } from 'react-native'
import { ThemeProvider } from 'styled-components'
import {
  CalendarContainer,
  CalendarWrapper,
  IconLabelTouchable,
  TextFieldsWrapper,
  ContainerWrapper,
  IconWrapper,
  TouchableModalChildrenWrapper
} from './styled'
import {
  defaultThemeName,
  getThemeObject
} from '../../../src/config/theme'
import { colors } from '../../../src/config'
import {
  TextField,
  Icon,
  SmallCalendar
} from '../../../src/components'

class SingleDatePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      isValid: true,
      prevText: 0
    }
    this.labelPosition = null
    this.labelFrame = null
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      selectedDate
    } = this.state

    if (prevState.selectedDate !== selectedDate) {
      this.formatSelectedDate()
    }
  }

  showModal = () => {
    this.updatePosition(() => {
      this.setState({
        modalVisible: true
      })
    })
  }

  parseText = (text) => {
    const integerYear1 = parseInt(text.slice(10, 11), 10)
    const integerYear2 = parseInt(text.slice(11, 12), 10)
    const integerYear3 = parseInt(text.slice(12, 13), 10)
    const integerYear4 = parseInt(text.slice(13, 14), 10)
    const integerMonth1 = parseInt(text.slice(5, 6), 10)
    const integerMonth2 = parseInt(text.slice(6, 7), 10)
    const integerDay1 = parseInt(text.slice(0, 1), 10)
    const integerDay2 = parseInt(text.slice(1, 2), 10)

    if (isNaN(integerYear1) === false &&
      isNaN(integerYear2) === false &&
      isNaN(integerYear3) === false &&
      isNaN(integerYear4) === false &&
      isNaN(integerMonth1) === false &&
      isNaN(integerMonth2) === false &&
      isNaN(integerDay1) === false &&
      isNaN(integerDay2) === false) {
      return true
    }

    return false
  }

  formatDate = (date) => {
    const formatedDate = `${date.slice(10, 14)}-${date.slice(5, 7)}-${date.slice(0, 2)}`

    return (
      formatedDate
    )
  }

  hideModal = () => {
    const { startText } = this.state
    const { onEndEditing } = this.props

    if (startText !== undefined &&
      startText.length === 14) {
      if (this.parseText(startText) === true) {
        this.setState({
          selected: this.formatDate(startText)
        })

        onEndEditing(this.formatDate(startText))
      }
    }

    this.setState({
      modalVisible: false
    })
  }

  updatePosition = (callback) => {
    if (this.labelPosition && this.labelPosition.root.measure) {
      this.labelPosition.root.measure((fx, fy, width, height, px, py) => {
        this.labelFrame = {
          x: px, y: py, w: width, h: height
        }

        return callback && callback()
      })
    }
  }

  formatSelectedDate = () => {
    const { selectedDate } = this.state
    const formatedDate = `${selectedDate.slice(8, 10)} / ${selectedDate.slice(5, 7)} / ${selectedDate.slice(0, 4)}`

    this.setState({
      startText: formatedDate,
      isValid: true
    })
  }

  updateText = (text) => {
    const { prevText } = this.state
    this.setState({
      startText: text.length === 2 && prevText < text.length ? `${text} / ` : (text.length === 7 && prevText < text.length ? `${text} / ` : text),
      prevText: text.length
    })
  }

  updateSelectText = (text) => {
    const {
      startText,
      prevText,
      isValid
    } = this.state

    const { onEndEditing } = this.props

    this.setState({
      startText: text.length === 2 && prevText < text.length ? `${text} / ` : (text.length === 7 && prevText < text.length ? `${text} / ` : text),
      prevText: text.length,
      isValid: moment(`${text}`, 'DD / MM / YYYY', true).isValid()
    })

    if (startText.length === 14) {
      if (this.parseText(startText)) {
        this.setState({
          selected: this.formatDate(startText)
        })

        onEndEditing(this.formatDate(startText))
      }
    }
  }

  render() {
    const {
      themeName,
      withLabel,
      labelText,
      disabled,
      calendarXPosition,
      firstDay
    } = this.props

    const {
      isValid
    } = this.state

    const themeObj = getThemeObject(themeName)
    const themeColor = themeObj.colors.primary.base

    return (
      <ThemeProvider
        theme={themeObj}
      >
        <ContainerWrapper
          flexDirection='column'
        >
          <TextFieldsWrapper
            flexDirection='row'
            justifyContent={withLabel ? 'flex-start' : 'center'}
            alignItems={withLabel ? 'flex-start' : 'center'}
            height={80}
          >
            <TextField
              error={!this.state.isValid}
              errorMessage={this.props.errorMessage}
              textInputLabelVisible={withLabel}
              textInputLabel={labelText}
              themeName={themeName}
              maxLength={14}
              placeholder='dd / mm / yyyy'
              onChange={event => this.updateText(event.nativeEvent.text)}
              onEndEditing={event => (event.nativeEvent.text ? this.updateSelectText(event.nativeEvent.text) : null)}
              value={this.state.startText}
              backgroundColor={colors.sensitiveGreyDefault}
              wrapperWidth={120}
              wrapperHeight={40}
              fontSize={14}
              paddingBottom={Platform.OS === 'android' ? 12.5 : 6}
              paddingTop={6}
              disabled={disabled}
              keyboardType='numeric'
            />
            <IconLabelTouchable
              activeOpacity={1}
              underlayColor={colors.transparent}
              onPress={() => { !disabled ? this.showModal() : null }}
              ref={(ref) => { this.labelPosition = ref }}
            >
              <IconWrapper
                marginLeft={10}
                top={withLabel ? 30 : 0}
                height={60}
              >
                <Icon
                  name='calendar'
                  color={disabled ? 'rgba(164, 164, 174, 0.3)' : themeColor}
                  size={20}
                />
              </IconWrapper>
            </IconLabelTouchable>
          </TextFieldsWrapper>

          {this.state.modalVisible ?
            <Modal
              animationType='fade'
              visible
              transparent
              onRequestClose={this.hideModal}
            >
              <TouchableModalChildrenWrapper
                onPress={this.hideModal}
              >
                <CalendarContainer
                  flexGrow={1}
                >
                  <CalendarWrapper
                    justifyContent='center'
                    position='absolute'
                    top={!isValid ? this.labelFrame.y + this.labelFrame.h + 28 : this.labelFrame.y + this.labelFrame.h + 8}
                    left={calendarXPosition || this.labelFrame.x - 120}
                  >
                    <SmallCalendar
                      onSelectedChange={val => this.setState({ selectedDate: val })}
                      selected={isValid ? this.state.selected : undefined}
                      withTextField
                      themeName={themeName}
                      firstDay={firstDay}
                    />
                  </CalendarWrapper>
                </CalendarContainer>
              </TouchableModalChildrenWrapper>
            </Modal>
            : null}
        </ContainerWrapper>
      </ThemeProvider>
    )
  }
}

SingleDatePicker.propTypes = {
  themeName: string,
  errorMessage: string,
  disabled: bool,
  withLabel: bool,
  labelText: string,
  calendarXPosition: number,
  onEndEditing: func,
  firstDay: number
}

SingleDatePicker.defaultProps = {
  themeName: defaultThemeName,
  disabled: false,
  withLabel: true,
  errorMessage: '* Error Message',
  labelText: 'Start date',
  onEndEditing: () => { },
  firstDay: 1
}

export default SingleDatePicker
