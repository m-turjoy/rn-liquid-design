import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

const styles = StyleSheet.create({
  button: {
    height: 61,
    alignItems: 'center',
    backgroundColor: colors.sensitiveGreyDark,
  },
  buttonSelected: {
    backgroundColor: colors.sensitiveGreyDefault,
  },
  iconWrapper: {
    height: 42,
    justifyContent: 'center',
  },
  flatListWrapper: {
    flex: 1,
    height: '100%',
    width: 50,
    backgroundColor: colors.sensitiveGreyDark,
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
