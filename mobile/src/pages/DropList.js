import React, { useState, useEffect } from 'react'
import { FlatList, SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import Api from '../services/api'
import MainStyle from '../global/styles/main'
import Utils from '../global/utils/utils'
import Constants from '../global/constants/constants'

function DropList ({ navigation }) {
  const [itens, setItens] = useState([])

  useEffect(() => {
    loadItens()
  }, [])

  /// ///////////////////////////////////

  async function loadItens () {
    const response = await Api.get('/item')
    setItens(response.data.data)
  }

  /// ///////////////////////////////////

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#2d2825' }}>
        <View style={{ height: 30, marginTop: 10 }}>
          <Text style={MainStyle.text}>Selecione Um Item Para Mais Detalhes!</Text>
        </View>
        <FlatList
          data={Utils.createRows(itens, Constants.COLUMNS)}
          style={{ marginLeft: 5 }}
          keyExtractor={item => item._id}
          numColumns={Constants.COLUMNS}
          renderItem={({ item }) => {
            if (item.empty) {
              return <View style={[MainStyle.item, MainStyle.itemEmpty]} />
            }
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Details', { item_name: item.data.name, item_type: item.data.type })
                }} style={{ flex: 1 }}
              >
                <View style={MainStyle.item}>
                  <Text style={MainStyle.text}>{item.data.name}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </SafeAreaView>
    </>
  )
}

export default DropList
