import React from 'react'
import { View, TouchableOpacity, FlatList } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '../contexts/ThemeContext'
import {
  Text,
  Layout,
  Divider,
  Card
} from '../components/themed/ThemedComponents'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DeleteIcon from '../components/DeleteIcon'

const List = ({ navigation }) => {
  const { colors, isDark } = useTheme()
  const [items, setItems] = React.useState()

  React.useEffect(() => {
    AsyncStorage.getItem('favorites').then((favs) => {
      setItems(JSON.parse(favs))
    })
  }, [])

  const clearFavs = () => {
    navigation.navigate('Modal', {
      options: true,
      favs: items,
      setItems: setItems
    })
  }

  const renderItem = ({ item, index }) => (
    <Card>
      <View style={{ flexDirection: 'row' }}>
        <Text variant='subtitle' style={{ flex: 1 }}>
          {item.category}
        </Text>
        <DeleteIcon index={index} favorites={items} setItems={setItems} />
      </View>
      <Text variant='body' style={{ marginBottom: 16, marginTop: 8 }}>
        {item.title}
      </Text>

      <Text variant='subtitle' style={{ color: '#42a642' }}>
        {item.price}
      </Text>
    </Card>
  )

  return (
    <Layout noScroll>
      <StatusBar style={isDark ? 'dark' : 'light'} />
      <View style={{ flexDirection: 'row' }}>
        <Text variant='header' style={{ flex: 1 }}>
          Wishlist
        </Text>
        {items && (
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              marginLeft: 8
            }}
            onPress={clearFavs}
          >
            <MaterialIcons name='more-vert' size={30} color={colors.accent} />
          </TouchableOpacity>
        )}
      </View>
      <Divider />
      {items ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
      ) : (
        <Text variant='subtitle'>You don't have any saved items</Text>
      )}
    </Layout>
  )
}

export default List
