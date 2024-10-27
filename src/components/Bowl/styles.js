import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  waveBall: {
    width: 100,
    aspectRatio: 1,
    overflow: 'hidden'
  },
  icon: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 38,
    bottom: 36,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconWrapper: {
    width: 140,
    height: 140,
    position: 'absolute',
    left: -20,
    bottom: -20
  }
})

export default styles
