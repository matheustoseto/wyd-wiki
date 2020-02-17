import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    backgroundColor: '#b52421',
    flexGrow: 1,
    marginTop: 4,
    marginRight: 4,
    padding: 20,
    flexBasis: 0,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: { width: -1, height: 2 },
    textShadowRadius: 10
  },
  itemEmpty: {
    backgroundColor: 'transparent'
  }
})

export default styles
