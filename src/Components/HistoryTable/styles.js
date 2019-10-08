import { Dimensions, StyleSheet } from 'react-native'

import theme from '../../theme'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default StyleSheet.create({
  historyContainer: {
    height: '70%',
    // flex: 1,
    width: SCREEN_WIDTH,
  },
  historyRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  historyTitleFont: {
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: theme.color.font1,
    fontWeight: 'bold',
  },
  historyFont: {
    color: theme.color.font3,
    fontSize: 16,
    marginRight: 16,
  },
})
