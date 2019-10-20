import { Dimensions, StyleSheet } from 'react-native'

import theme from '../../theme'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const shadowBox = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.4,
  elevation: 1,
}

export default StyleSheet.create({
  carouselItemContainer: {
    borderRadius: 12,
    padding: 16,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
    // height: SCREEN_HEIGHT / 4,
    width: SCREEN_WIDTH / 1.2,
    ...shadowBox,
  },
  signalItemWrapper: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8,
  },
  signalIdText: {
    color: theme.color.font1,
    fontStyle: 'italic',
  },
  buysTitle: {
    color: 'blue',
    fontSize: 24,
    fontWeight: 'bold',
  },
  sellsTitle: {
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buysText: {
    color: 'blue',
  },
  sellsText: {
    color: 'red',
  },
  partialOverview: {
    justifyContent: 'flex-start',
    flex: 1,
  },
})
