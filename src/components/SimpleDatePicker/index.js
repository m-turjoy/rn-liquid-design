import React, { Component } from 'react'
import {
  string,
  bool,
  func
} from 'prop-types'
import { Platform } from 'react-native'
import moment from 'moment'
import { ThemeProvider } from 'styled-components'
import {
  TextFieldsWrapper,
  ContainerWrapper
} from './styled'
import {
  defaultThemeName,
  getThemeObject
} from '../../../src/config/theme'
import { colors } from '../../../src/config'
import { TextField } from '../../../src/components'

class SimpleDatePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isValid: true,
      prevText: 0
    }
  }

  updateText = (text) => {
    const { prevText } = this.state

    this.setState({
      curText: text.length === 2 && prevText < text.length ? `${text} / ` : (text.length === 7 && prevText < text.length ? `${text} / ` : text),
      prevText: text.length
    })
  }

  updateSelectText = (text) => {
    const {
      curText,
      prevText
    } = this.state

    const { onEndEditing } = this.props

    this.setState({
      curText: text.length === 2 && prevText < text.length ? `${text} / ` : (text.length === 7 && prevText < text.length ? `${text} / ` : text),
      prevText: text.length,
      isValid: moment(`${text}`, 'DD / MM / YYYY', true).isValid()
    })

    if (curText.length === 14) {
      const formatedDate = `${curText.slice(10, 14)}-${curText.slice(5, 7)}-${curText.slice(0, 2)}`

      onEndEditing(formatedDate)
    }
  }

  render() {
    const {
      themeName,
      withLabel,
      labelText,
      disabled,
      errorMessage
    } = this.props

    const {
      isValid,
      curText
    } = this.state

    const themeObj = getThemeObject(themeName)

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
              textInputLabel={labelText}
              themeName={themeName}
              maxLength={14}
              placeholder='dd / mm / yyyy'
              onChange={event => this.updateText(event.nativeEvent.text)}
              onEndEditing={event => (event.nativeEvent.text ? this.updateSelectText(event.nativeEvent.text) : null)}
              value={curText}
              backgroundColor={colors.sensitiveGreyDefault}
              wrapperWidth={120}
              wrapperHeight={40}
              fontSize={14}
              paddingBottom={Platform.OS === 'android' ? 12.5 : 6}
              paddingTop={6}
              disabled={disabled}
              keyboardType='numeric'
            />
          </TextFieldsWrapper>
        </ContainerWrapper>
      </ThemeProvider>
    )
  }
}

SimpleDatePicker.propTypes = {
  themeName: string,
  errorMessage: string,
  disabled: bool,
  withLabel: bool,
  labelText: string,
  onEndEditing: func
}

SimpleDatePicker.defaultProps = {
  themeName: defaultThemeName,
  disabled: false,
  withLabel: true,
  errorMessage: '* Error Message',
  labelText: 'Start date',
  onEndEditing: () => { }
}

export default SimpleDatePicker
