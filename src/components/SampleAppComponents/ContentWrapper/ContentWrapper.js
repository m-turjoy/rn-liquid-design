import React from 'react'
import { View } from 'react-native'
import { oneOfType, arrayOf, node, number, object } from 'prop-types'
import styles from './styles'

const { container } = styles

const ContentWrapper = ({ children, additionalStyles }) => (
  <View
    style={[container, additionalStyles]}
  >{children}
  </View>
)

ContentWrapper.propTypes = {
  children: oneOfType([arrayOf(node), node]),
  additionalStyles: oneOfType([object, number])
}
export default ContentWrapper
