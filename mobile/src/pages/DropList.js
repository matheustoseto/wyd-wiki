import React, { useState, useEffect } from 'react'
import { FlatList, SafeAreaView, View, Text, TouchableOpacity, TextInput, ImageBackground } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Api from '../services/api'
import MainStyle from '../global/styles/main'
import Utils from '../global/utils/utils'
import Constants from '../global/constants/constants'

function DropList ({ navigation }) {
  const [droplist, setDroplist] = useState([])
  const [itens, setItens] = useState([])
  const [item, setItem] = useState('')

  useEffect(() => {
    loadItens()
  }, [])

  /// ///////////////////////////////////

  async function loadItens () {
    const response = await Api.get('/item')
    setDroplist(response.data.data)
    setItens(response.data.data)
  }

  async function loadItem () {
    const array = []
    for (const obj of droplist) {
      if (obj.data && obj.data.displayName.toLowerCase().indexOf(item.toLowerCase()) !== -1) {
        array.push(obj)
      }
    }
    if (!item) {
      setItens(droplist)
    } else {
      setItens(array)
    }
  }

  /// ///////////////////////////////////

  return (
    <>
      <ImageBackground source={require('../../assets/bg_main.png')} style={{ width: '100%', height: '100%' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ height: 30, marginTop: 10 }}>
            <Text style={MainStyle.text}>Selecione um item para mais detalhes!</Text>
          </View>
          <View style={{
            // position: 'absolute',
            // top: 20,
            left: 5,
            marginBottom: 5,
            // right: 20,
            // bottom: 20,
            // zIndex: 5,
            flexDirection: 'row'
          }}
          >
            <TextInput
              style={{
                flex: 1,
                height: 50,
                backgroundColor: '#FFF',
                color: '#333',
                // borderRadius: 25,
                paddingHorizontal: 20,
                fontSize: 16,
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowOffset: {
                  width: 4,
                  height: 4
                }
                // elevation: 2
              }}
              placeholder='Buscar itens...'
              placeholderTextColor='#999'
              autoCapitalize='words'
              autoCorrect={false}
              value={item}
              onChangeText={setItem}
            />

            <TouchableOpacity
              onPress={loadItem} style={{
                width: 50,
                height: 50,
                backgroundColor: '#b52421',
                // borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 5,
                marginRight: 10
              }}
            >
              <MaterialIcons name='search' size={40} color='#FFF' />
            </TouchableOpacity>
          </View>
          <FlatList
            data={Utils.createRows(itens, Constants.COLUMNS)}
            style={{ marginLeft: 5 }}
            keyExtractor={(item, index) => {
              if (item._id) {
                return index + item._id
              } else {
                return index
              }
            }}
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
                    <Text style={MainStyle.text}>{item.data.displayName + ' (' + item.data.type.toUpperCase() + ')'}</Text>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </SafeAreaView>
      </ImageBackground>
    </>
  )
}

export default DropList
