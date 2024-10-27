import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  headerPadding: {
    minHeight: 50,
    paddingVertical: 11,
    paddingRight: 15,
  },
  alignmentStyle: {
    marginTop: Platform.OS === 'ios' ? 2 : 1,
    alignSelf: 'flex-start',
  },
});
