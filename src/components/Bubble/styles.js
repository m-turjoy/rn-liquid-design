import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
  iconStyle: {
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    paddingLeft: Platform.OS === 'ios' ? 1 : 0
  }
})
export default styles
