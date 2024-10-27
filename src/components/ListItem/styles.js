import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    minHeight: 50,
    width: 300,
    alignItems: 'center',
    paddingVertical: 11,
    paddingRight: 15,
  },
  alignmentStyle: {
    marginTop: Platform.OS === 'ios' ? 2 : 1,
    alignSelf: 'flex-start',
  },
});
