import { StyleSheet } from 'react-native';
import * as defaultStyle from './utils/style';

export default function getStyle(theme = {}) {
  const appStyle = { ...defaultStyle, ...theme };

  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingBottom: 10,
      backgroundColor: 'transparent',
    },
    monthView: {
      backgroundColor: 'transparent',
    },
    week: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    flexContainer: {
      flex: 1,
    },
    flexContainerCentered: {
      flex: 1,
      alignItems: 'center',
    },
  });
}
