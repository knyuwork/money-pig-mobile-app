import { Dimensions, StyleSheet } from 'react-native'

import theme from '../../theme'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.color.background1,
  },
  buttletPointRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
