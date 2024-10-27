import { StyleSheet } from 'react-native'
import { colors } from '../../config'

const styles = StyleSheet.create({
  defaultStyle: {
    position: 'absolute',
    left: 0,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerStyle: {
    padding: 10,
    opacity: 1,
    borderRadius: 5
  },
  wrapperStyle: {
    shadowColor: colors.richBlackDefault,
    shadowRadius: 12,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 3,
      height: 3
    },
    top: 0,
    left: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 15,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 5,
    marginBottom: 0
  }
})

export default styles
