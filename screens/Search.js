import React from 'react'
import { View, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { useTheme } from '../contexts/ThemeContext'
import { SearchBar } from 'react-native-elements'
import { Text, Layout, Divider } from '../components/themed/ThemedComponents'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialIcons } from '@expo/vector-icons'
import Clipboard from 'expo-clipboard'
import ProductCard from '../components/ProductCard'

const Search = () => {
  const [searchVal, setSearchVal] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [item, setItem] = React.useState()
  const [saved, setSaved] = React.useState(false)
  const { colors, isDark } = useTheme()

  const searchForItem = (url) => {
    setItem()
    setSaved(false)
    setLoading(true)
    fetch(`http://localhost:8081/resolver/${url}`)
      .then((res) =>
        res
          .json()
          .then(({ title, category, description, price, image, url }) => {
            setLoading(false)
            setItem({
              title,
              category,
              description,
              price,
              image,
              url
            })
          })
      )
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const addToFavorites = () => {
    AsyncStorage.getItem('favorites').then((favs) => {
      AsyncStorage.setItem(
        'favorites',
        JSON.stringify(favs ? [...JSON.parse(favs), item] : [item])
      ).then(() => {
        setSaved(true)
        setTimeout(() => setSaved(false), 5000)
      })
    })
  }

  const pasteLink = () => {
    Clipboard.getStringAsync().then((text) => {
      setSearchVal(text)
      searchForItem(text)
    })
  }

  const styles = {
    searchContainer: {
      backgroundColor: 'transparent',
      flex: 1,
      paddingHorizontal: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: {
        height: 2
      },
      shadowOpacity: 0.15,
      shadowRadius: 5,
      elevation: 2
    },
    inputContainer: {
      paddingHorizontal: 8,
      borderRadius: 8,
      backgroundColor: colors.elevated
    },
    productImage: {
      height: 150,
      width: 200,
      alignSelf: 'center'
    },
    imageContainer: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowOpacity: 0.2,
      shadowRadius: 3
    }
  }

  return (
    <Layout noScroll>
      <StatusBar style={isDark ? 'dark' : 'light'} />
      <Text variant='header' style={{ marginBottom: 16 }}>
        Search
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <SearchBar
          platform='default'
          placeholder='Product URL'
          autoCapitalize={'none'}
          value={searchVal}
          returnKeyType={'search'}
          onChangeText={setSearchVal}
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.inputContainer}
          inputStyle={{ color: colors.text.body, fontSize: 16 }}
          onSubmitEditing={() => searchForItem(searchVal)}
          cancelButtonProps={{ color: colors.accent }}
        />
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            paddingLeft: 16
          }}
          onPress={pasteLink}
        >
          <MaterialIcons name='content-paste' size={30} color={colors.accent} />
        </TouchableOpacity>
      </View>

      <Divider />

      {!item && (
        <View style={{ flex: 0.5, justifyContent: 'center' }}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text variant='subtitle' align='center'>
              Enter a product URL above
            </Text>
          )}
        </View>
      )}

      {item && <ProductCard {...{ ...item, saved, addToFavorites }} />}
    </Layout>
  )
}

export default Search
