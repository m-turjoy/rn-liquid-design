import { StyleSheet } from 'react-native'
import { colors } from '../../config'

const styles = StyleSheet.create({
  filter: {
    maxWidth: 250
  },
  filterTextStyle: {
    paddingRight: 5,
    lineHeight: 25
  },
  multiSelectedfilterTextStyle: {
    paddingRight: 7
  },
  dropdownStyle: {
    borderWidth: 0,
    borderRadius: 6,
    elevation: 20,
    overflow: 'hidden',
    height: 205,
    minWidth: 160,
    maxWidth: 250
  },
  checkboxStyle: {
    paddingHorizontal: 15
  },
  dropdownTextHighlightStyle: {
    color: colors.white,
    backgroundColor: colors.white
  },
  multiSelectDropdownRow: {
    paddingVertical: 10,
    paddingRight: 15,
    maxWidth: 177
  },
  singleSelectDropdownRow: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  rowSelected: {
    height: 38
  },
  closeIconContainer: {
    paddingHorizontal: 7,
    alignItems: 'center',
    alignContent: 'space-between',
    flexDirection: 'row'
  },
  closeIcon: {
    marginLeft: 4
  },
  closeIconMore: {
    marginLeft: 2
  },
  disabledIcon: {
    opacity: 0.3
  }
})

export default styles
