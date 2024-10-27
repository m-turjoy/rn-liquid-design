import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  contentCardWrapperStyle: {
    justifyContent: 'space-between',
  },
  cardContentWrapStyle: {
    alignItems: 'center',
    padding: 24,
  },
  secondLabelStyle: {
    marginRight: -6,
  },
  cardContentWrapWithBadgeStyle: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 10,
  },
  titleStyle: {
    paddingBottom: 45,
  },
  titleWithDetailsStyle: {
    paddingBottom: 5,
  },
  titleWithDetailsAndBadgeStyle: {
    paddingBottom: 5,
  },
  titleWithBadge: {
    paddingBottom: 45,
  },
  detailsStyle: {
    textAlign: 'center',
  },
  detailsWithBadgeStyle: {
    paddingBottom: 20,
  },
  headingStyle: {
    paddingBottom: 20,
    paddingTop: 25,
  },
  labelWrapperStyle: {
    paddingTop: 43,
  },
  labelWrapperWithDetailStyle: {
    paddingVertical: 0,
  },
  labelWrapperWithBadgeStyle: {
    paddingTop: 43,
  },
});

export default styles;
