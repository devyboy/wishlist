import React from 'react'
import { View, TouchableOpacity, FlatList, Image } from 'react-native'
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

  const viewItem = (item) => {
    navigation.navigate('Modal', { item })
  }

  const renderItem = ({
    item: { title, category, price, image, description, url },
    index
  }) => (
    <TouchableOpacity
      onPress={() =>
        viewItem({ title, category, price, image, description, url })
      }
    >
      <Card>
        <View style={{ flexDirection: 'row' }}>
          <Text variant='subtitle' style={{ flex: 1 }}>
            {category}
          </Text>
          <DeleteIcon index={index} favorites={items} setItems={setItems} />
        </View>
        <Text variant='body' style={{ marginVertical: 8 }} numberOfLines={2}>
          {title}
        </Text>

        <Text variant='subtitle' style={{ color: '#42a642' }}>
          {price}
        </Text>
        <View style={styles.imageContainer}>
          <Image
            resizeMode={'contain'}
            source={{
              uri: image
            }}
            style={styles.productImage}
          />
        </View>
      </Card>
    </TouchableOpacity>
  )

  return (
    <Layout noScroll>
      <StatusBar style={isDark ? 'dark' : 'light'} />
      <View style={{ flexDirection: 'row' }}>
        <Text variant='header' style={{ flex: 1 }}>
          Saved
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

const styles = {
  productImage: {
    height: 150,
    width: 200,
    alignSelf: 'center'
  },
  imageContainer: {
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.2,
    shadowRadius: 3
  }
}

export default List
