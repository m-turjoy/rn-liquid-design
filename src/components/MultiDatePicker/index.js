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
  TouchableModalChildrenWrapper,
  TextFieldWrapper,
  TextFieldsWrapper,
  ContainerWrapper,
  IconWrapper
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

class MultiDatePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      isValid: true,
      isValidEnd: true,
      prevText: 0,
      prevText2: 0
    }
    this.labelPosition = null
    this.labelFrame = null
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      startDate,
      endDate
    } = this.state

    if (prevState.startDate !== startDate) {
      this.formatSelectedStartDate()
    }

    if (prevState.endDate !== endDate) {
      this.formatSelectedEndDate()
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

  formatPropsDate = (date) => {
    const formatedDate = `${date.slice(8, 10)} / ${date.slice(5, 7)} / ${date.slice(0, 4)}`

    return (
      formatedDate
    )
  }

  hideModal = () => {
    const {
      startText,
      endText
    } = this.state
    const {
      onEndStartEditing,
      onEndEndEditing
    } = this.props

    if (startText !== undefined &&
      startText.length === 14) {
      if (this.parseText(startText) === true) {
        this.setState({
          startDate: this.formatDate(startText)
        })

        onEndStartEditing(this.formatDate(startText))
      }
    }

    if (endText !== undefined &&
      endText.length === 14) {
      if (this.parseText(endText) === true) {
        this.setState({
          endDate: this.formatDate(endText)
        })

        onEndEndEditing(this.formatDate(endText))
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

  formatSelectedStartDate = () => {
    const {
      startDate
    } = this.state
    this.setState({
      startText: this.formatPropsDate(startDate),
      endText: ''
    })
  }

  formatSelectedEndDate = () => {
    const {
      startDate,
      endDate
    } = this.state
    this.setState({
      startText: this.formatPropsDate(startDate),
      endText: this.formatPropsDate(endDate)
    })
  }

  updateText = (text) => {
    const { prevText } = this.state
    this.setState({
      startText: text.length === 2 && prevText < text.length ? `${text} / ` : (text.length === 7 && prevText < text.length ? `${text} / ` : text),
      prevText: text.length
    })
  }

  updateTextEnd = (text) => {
    const { prevText2 } = this.state
    this.setState({
      endText: text.length === 2 && prevText2 < text.length ? `${text} / ` : (text.length === 7 && prevText2 < text.length ? `${text} / ` : text),
      prevText2: text.length
    })
  }

  updateSelectText = (text) => {
    const {
      startText,
      prevText
    } = this.state

    const { onEndStartEditing } = this.props

    this.setState({
      startText: text.length === 2 && prevText < text.length ? `${text} / ` : (text.length === 7 && prevText < text.length ? `${text} / ` : text),
      prevText: text.length,
      isValid: moment(`${text}`, 'DD / MM / YYYY', true).isValid()
    })

    if (startText.length === 14) {
      if (this.parseText(startText)) {
        this.setState({
          startDate: this.formatDate(startText)
        })

        onEndStartEditing(this.formatDate(startText))
      }
    }
  }

  updateSelectTextEnd = (text) => {
    const {
      endText,
      startText,
      prevText2
    } = this.state

    const { onEndEndEditing } = this.props

    this.setState({
      endText: text.length === 2 && prevText2 < text.length ? `${text} / ` : (text.length === 7 && prevText2 < text.length ? `${text} / ` : text),
      prevText2: text.length,
      isValidEnd: moment(`${text}`, 'DD / MM / YYYY', true).isValid()
    })

    if (startText !== undefined && startText.length === 14 && endText.length === 14) {
      if (this.parseText(endText) === true) {
        this.setState({
          endDate: this.formatDate(endText)
        })

        onEndEndEditing(this.formatDate(endText))
      }
    }
  }

  render() {
    const {
      themeName,
      withLabel,
      labelStartText,
      labelEndText,
      disabled,
      calendarXPosition,
      errorMessage,
      firstDay
    } = this.props

    const {
      isValid,
      isValidEnd,
      startText,
      endText
    } = this.state

    const themeObj = getThemeObject(themeName)
    const themeColor = themeObj.colors.primary.base
    const themeSecondaryColor = themeObj.colors.secondary.base

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
              error={!isValid}
              errorMessage={errorMessage}
              textInputLabelVisible={withLabel}
              textInputLabel={labelStartText}
              themeName={themeName}
              maxLength={14}
              placeholder='dd / mm / yyyy'
              onChange={event => this.updateText(event.nativeEvent.text)}
              onEndEditing={event => (event.nativeEvent.text ? this.updateSelectText(event.nativeEvent.text) : null)}
              value={startText}
              backgroundColor={colors.sensitiveGreyDefault}
              wrapperWidth={120}
              wrapperHeight={40}
              fontSize={14}
              paddingBottom={Platform.OS === 'android' ? 12.5 : 6}
              paddingTop={6}
              disabled={disabled}
              underlayColor='transparent'
              keyboardType='numeric'
            />
            <TextFieldWrapper
              marginLeft={10}
            >
              <TextField
                error={!isValidEnd}
                errorMessage={errorMessage}
                textInputLabelVisible={withLabel}
                textInputLabel={labelEndText}
                themeName={themeName}
                maxLength={14}
                placeholder='dd / mm / yyyy'
                onChange={event => this.updateTextEnd(event.nativeEvent.text)}
                onEndEditing={event => (event.nativeEvent.text ? this.updateSelectTextEnd(event.nativeEvent.text) : null)}
                value={endText}
                backgroundColor={colors.sensitiveGreyDefault}
                wrapperWidth={120}
                wrapperHeight={40}
                fontSize={14}
                paddingBottom={Platform.OS === 'android' ? 12.5 : 6}
                paddingTop={6}
                disabled={disabled}
                keyboardType='numeric'
              />
            </TextFieldWrapper>
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
                    top={(!isValid || !isValidEnd) ?
                      this.labelFrame.y + this.labelFrame.h + 26
                      : this.labelFrame.y + this.labelFrame.h + 5
                    }
                    left={calendarXPosition || this.labelFrame.x - 250}
                  >
                    <SmallCalendar
                      onSelectedChange={val => this.setState({ selectedDate: val })}
                      selected={this.state.selected}
                      startDay={isValid ? this.state.startDate : undefined}
                      endDay={isValidEnd ? (this.state.endText !== '' ? this.state.endDate : this.state.startDate) : undefined}
                      withTextField
                      themeName={themeName}
                      onStartDay={s => this.setState({
                        startDate: s,
                        isValid: true,
                        endText: ''
                      })
                      }
                      onSuccess={(s, e) => this.setState({
                        startDate: s,
                        endDate: e,
                        isValidEnd: true,
                        endText: this.state.endDate === e ? this.formatPropsDate(e) : ''
                      })
                      }
                      multi
                      firstDay={firstDay}
                      theme={{ markColor: colors.vibrantCyanDefault, markTextColor: 'white' }}
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

MultiDatePicker.propTypes = {
  themeName: string,
  errorMessage: string,
  disabled: bool,
  withLabel: bool,
  labelStartText: string,
  labelEndText: string,
  calendarXPosition: number,
  onEndStartEditing: func,
  onEndEndEditing: func,
  firstDay: number
}

MultiDatePicker.defaultProps = {
  themeName: defaultThemeName,
  disabled: false,
  withLabel: true,
  errorMessage: '* Error Message',
  labelStartText: 'Start date',
  labelEndText: 'End date',
  onEndStartEditing: () => { },
  onEndEndEditing: () => { },
  firstDay: 1
}

export default MultiDatePicker
