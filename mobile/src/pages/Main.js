import React from 'react'
import { FlatList, SafeAreaView, View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import MainStyle from '../global/styles/main'
import Utils from '../global/utils/utils'
import Constants from '../global/constants/constants'

function Main ({ navigation }) {
  return (
    <>
      <ImageBackground source={require('../../assets/bg_main.png')} style={{ width: '100%', height: '100%' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ height: 30, marginTop: 10 }}>
            <Text style={MainStyle.text}>Selecione um servidor!</Text>
          </View>
          <FlatList
            data={Utils.createRows([
              { id: '01', name: 'GLOBAL' }
            ], Constants.COLUMNS)}
            style={{ marginLeft: 5 }}
            keyExtractor={item => item.id}
            numColumns={Constants.COLUMNS}
            renderItem={({ item }) => {
              if (item.empty) {
                return <View style={[MainStyle.item, MainStyle.itemEmpty]} />
              }
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (item.name !== 'EM BREVE') {
                      navigation.navigate('DropList', { server: item.name })
                    }
                  }} style={{ flex: 1 }}
                >
                  <View style={MainStyle.item}>
                    <Text style={MainStyle.text}>{item.name}</Text>
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

export default Main
