import { StyleSheet, Platform } from 'react-native';
import { colors, fonts } from '../../../../../config';

export default function styleConstructor(theme = {}) {
  return StyleSheet.create({
    wrapper: {
      alignItems: 'center',
      alignSelf: 'stretch',
      marginLeft: -1,
    },
    base: {
      width: 22,
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      marginTop: Platform.OS === 'android' ? 4 : 6,
      fontSize: 12,
      fontFamily: fonts.Regular,
      color: colors.richBlackDefault,
      backgroundColor: 'transparent',
      alignSelf: 'center',
      ...Platform.select({
        ios: {
          bottom: 3,
        },
        android: {
          bottom: 2,
        },
      }),
    },
    alignedText: {
      marginTop: Platform.OS === 'android' ? 4 : 6,
    },
    innerWrapper: {
      justifyContent: 'center',
      width: 20,
      height: 20,
    },
    innerWrapperSelected: {
      borderRadius: 6,
      backgroundColor: theme.primaryColor,
    },
    innerWrapperToday: {
      borderWidth: 1,
      borderRadius: 6,
      borderColor: theme.primaryColor,
    },
    todayText: {
      alignSelf: 'center',
      color: theme.primaryColor,
      fontFamily: fonts.Regular,
      fontSize: 12,
      ...Platform.select({
        ios: {
          bottom: 3.2,
        },
        android: {
          bottom: 2,
        },
      }),
    },
    selectedText: {
      alignSelf: 'center',
      color: colors.white,
      fontFamily: fonts.Black,
      ...Platform.select({
        ios: {
          bottom: 3,
        },
        android: {
          bottom: 2,
        },
      }),
    },
    disabledText: {
      color: colors.sensitiveGreyDarkest,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      opacity: 0,
      position: 'absolute',
    },
    visibleDot: {
      opacity: 1,
      backgroundColor: theme.primaryColor,
      top: 29,
    },
    todayDot: {
      opacity: 1,
      backgroundColor: theme.primaryColor,
      top: 1,
    },
    disabledDot: {
      opacity: 1,
      backgroundColor: colors.sensitiveGreyDarker,
    },
    selectedDot: {
      backgroundColor: 'transparent',
    },
    tooltip: {
      width: 0,
    },
    visibleTooltip: {
      opacity: 0,
    },
    selectedTooltip: {
      opacity: 1,
      width: 170,
      position: 'absolute',
      bottom: 0,
      zIndex: 2,
      elevation: 31,
    },
    tooltipWrapper: {
      flexDirection: 'row',
      backgroundColor: theme.secondaryColor,
      paddingHorizontal: 12,
      paddingBottom: 10,
      paddingTop: 7.5,
      borderRadius: 6,
      shadowOpacity: 0.15,
      shadowRadius: 6,
      shadowColor: colors.richBlackDefault,
      shadowOffset: { width: 3, height: 3 },
      elevation: 5,
    },
    tooltipBoldText: {
      fontSize: 14,
      lineHeight: 17.5,
      fontFamily: fonts.Black,
      marginRight: 5,
    },
    tooltipText: {
      fontSize: 14,
      lineHeight: 17.5,
      fontFamily: fonts.Regular,
      flexWrap: 'wrap',
      flex: 1,
    },
  });
}
