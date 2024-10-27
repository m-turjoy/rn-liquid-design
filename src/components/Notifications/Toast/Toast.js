import React, { Component } from 'react'
import RootSiblings from 'react-native-root-siblings'
import { View } from 'react-native'
import styles from './styles'

class Toast extends Component {
  componentDidMount = () => {
    this.toast = new RootSiblings()
  }

  componentDidUpdate = () => {
    this.toast.update(
      <View
        style={[
    styles.defaultStyle
    ]}
        pointerEvents='box-none'
      >
        {this.props.children}
      </View>
    )
  }

  componentWillUnmount = () => {
    this.toast.destroy()
  }

  render() {
    return null
  }
}

export { RootSiblings as Manager }
export default Toast
