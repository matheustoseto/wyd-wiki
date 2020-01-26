import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import Api from '../services/api'
import MainStyle from '../global/styles/main'

function Details ({ navigation }) {
  const itemName = navigation.getParam('item_name')
  const itemType = navigation.getParam('item_type')
  const [item, setItem] = useState({})

  useEffect(() => {
    loadItem(itemName, itemType)
  }, [])

  /// ///////////////////////////////////

  async function loadItem (itemName, itemType) {
    const response = await Api.get(`/item?type=${itemType}&name=${itemName}`)
    setItem(response.data.data.data)
  }

  /// ///////////////////////////////////

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#2d2825' }}>
        <View style={{ height: 30, marginTop: 10 }}>
          <Text style={MainStyle.text}>{item.name}</Text>
          <Text style={MainStyle.text}>{item.description}</Text>
        </View>
      </SafeAreaView>
    </>
  )
}

export default Details
