import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, ScrollView, ImageBackground } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'
import Api from '../services/api'
import MainStyle from '../global/styles/main'

function Details ({ navigation }) {
  const itemName = navigation.getParam('item_name')
  const itemType = navigation.getParam('item_type')
  const [item, setItem] = useState({})
  const [mobs, setMobs] = useState([])
  const [attr, setAttr] = useState([])
  const [maps, setMaps] = useState([])
  const [drops, setDrops] = useState([])

  useEffect(() => {
    loadItem(itemName, itemType)
  }, [])

  /// ///////////////////////////////////

  async function loadItem (itemName, itemType) {
    const response = await Api.get(`/item?type=${itemType}&name=${itemName}`)
    const data = response.data.data.data

    const arrayMobs = []
    if (data.mobs) {
      for (const entry of data.mobs) {
        const array = []
        array.push(entry.displayName + ' (' + entry.level + ')')
        array.push(entry.dropMaps)
        array.push(entry.rarity)

        arrayMobs.push(array)
      }
    }

    const arrayAttr = []
    if (data.values) {
      for (const entry of data.values) {
        const array = []
        array.push(entry.Key)
        array.push(entry.Value)

        arrayAttr.push(array)
      }
    }

    const arrayMaps = []
    if (data.maps) {
      for (const entry of data.maps) {
        const array = []
        array.push(entry.name)

        arrayMaps.push(array)
      }
    }

    const arrayDrops = []
    if (data.drops) {
      for (const entry of data.drops) {
        const array = []
        array.push(entry.displayName)
        array.push(entry.type)
        array.push(entry.rarity)

        arrayDrops.push(array)
      }
    }

    setItem(data)
    setMobs(arrayMobs)
    setAttr(arrayAttr)
    setMaps(arrayMaps)
    setDrops(arrayDrops)
  }

  /// ///////////////////////////////////

  return (
    <>
      <ImageBackground source={require('../../assets/bg_main.png')} style={{ width: '100%', height: '100%' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ marginTop: 10 }}>
            {
              item.displayName ? <Text style={[MainStyle.text, { marginBottom: 10 }]}>{'== ' + item.displayName + ' (' + item.type.toUpperCase() + ') =='}</Text> : <></>
            }
            {
              item.description ? <Text style={MainStyle.text}>{item.description}</Text> : <></>
            }
          </View>
          {
            attr.length > 0 ? (
              <>
                <Text style={[MainStyle.text, { marginTop: 30, textAlign: 'left', paddingLeft: 4 }]}>== Atributos ==</Text>
                <View style={{ padding: 4 }}>
                  <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                    <Rows data={attr} style={{ backgroundColor: '#f1f8ff' }} textStyle={{ margin: 6, fontWeight: 'bold', fontSize: 16 }} />
                  </Table>
                </View>
              </>
            ) : (
              <></>
            )
          }
          {
            maps.length > 0 ? (
              <>
                <Text style={[MainStyle.text, { marginTop: 30, textAlign: 'left', paddingLeft: 4 }]}>== Mapas ==</Text>
                <View style={{ padding: 4 }}>
                  <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                    <Rows data={maps} style={{ backgroundColor: '#f1f8ff' }} textStyle={{ margin: 6, fontWeight: 'bold', fontSize: 16 }} />
                  </Table>
                </View>
              </>
            ) : (
              <></>
            )
          }
          {
            mobs.length > 0 ? (
              <>
                <Text style={[MainStyle.text, { marginTop: 30, textAlign: 'left', paddingLeft: 4 }]}>== Mobs ==</Text>
                <ScrollView>
                  <View style={{ padding: 4 }}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                      <Row data={['NOME (LVL)', 'MAPA', 'RARIDADE']} style={{ height: 40, backgroundColor: '#b52421' }} textStyle={MainStyle.text} />
                      <Rows data={mobs} style={{ backgroundColor: '#f1f8ff' }} textStyle={{ margin: 6, fontWeight: 'bold', fontSize: 16 }} />
                    </Table>
                  </View>
                </ScrollView>
              </>
            ) : (
              <></>
            )
          }
          {
            drops.length > 0 ? (
              <>
                <Text style={[MainStyle.text, { marginTop: 30, textAlign: 'left', paddingLeft: 4 }]}>== Itens ==</Text>
                <ScrollView>
                  <View style={{ padding: 4 }}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                      <Row data={['NOME', 'TIPO', 'RARIDADE']} style={{ height: 40, backgroundColor: '#b52421' }} textStyle={MainStyle.text} />
                      <Rows data={drops} style={{ backgroundColor: '#f1f8ff' }} textStyle={{ margin: 6, fontWeight: 'bold', fontSize: 16 }} />
                    </Table>
                  </View>
                </ScrollView>
              </>
            ) : (
              <></>
            )
          }
        </SafeAreaView>
      </ImageBackground>
    </>
  )
}

export default Details
