import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    backgroundColor: '#766552',
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
    textAlignVertical: 'center'
  },
  itemEmpty: {
    backgroundColor: 'transparent'
  }
})

export default styles
