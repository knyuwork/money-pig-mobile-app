import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../theme'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.color.blue1
  },
  content: {
    flex: 1,
    alignItems: 'center'
  },
  octopusContainer: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  octopusImage: {
    height: 100,
    width: 151
  },
  autoComplete: {
    flex: 1,
    marginHorizontal: 8
  },
  labelText: {
    fontSize: 16,
    marginVertical: 8,
    color: '#fff',
    fontWeight: 'bold'
  },
  suggestionText: {
    fontSize: 14,
    zIndex: 1
  },
  button: {
    padding: 16,
    marginBottom: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: theme.color.blue5
  },
  suggestionItem: {
    padding: 8
  }
});