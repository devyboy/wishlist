import React from 'react'
import { View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useTheme } from '../contexts/ThemeContext'
import { SearchBar } from 'react-native-elements'
import {
  Text,
  Layout,
  Divider,
  Button,
  Card,
} from '../components/themed/ThemedComponents'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialIcons } from '@expo/vector-icons'
import Clipboard from 'expo-clipboard'

const Search = ({ navigation }) => {
  const [searchVal, setSearchVal] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [item, setItem] = React.useState()
  const [saved, setSaved] = React.useState(false)
  const { colors, isDark } = useTheme()

  const searchForItem = (url) => {
    setItem()
    setSaved(false)
    setLoading(true)
    fetch(`http://localhost:8081/resolver/${url}`).then((res) =>
      res.json().then(({ title, price }) => {
        const cleanTitle = title.slice(
          title.indexOf(':') + 2,
          title.lastIndexOf(':'),
        )
        const category = title.slice(
          title.lastIndexOf(':') + 2,
          title.length + 1,
        )

        setLoading(false)
        setItem({
          title: cleanTitle,
          category,
          price: price,
        })
      }),
    ).catch((err) => {
      console.log(err)
      setLoading(false)
    })
  }

  const addToFavorites = () => {
    AsyncStorage.getItem('favorites').then((favs) => {
      AsyncStorage.setItem(
        'favorites',
        JSON.stringify(favs ? [...JSON.parse(favs), item] : [item]),
      ).then(() => setSaved(true))
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
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 5,
      elevation: 2,
    },
    inputContainer: {
      paddingHorizontal: 8,
      borderRadius: 8,
      backgroundColor: colors.elevated,
    },
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
            paddingLeft: 16,
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

      {item && (
        <Card>
          <Text variant='subtitle'>{item.category}</Text>
          <Text variant='body' style={{ marginVertical: 16 }}>
            {item.title}
          </Text>

          <Text variant='subtitle' style={{ color: '#42a642' }}>
            {item.price}
          </Text>
          <Button
            noMargin
            label={saved ? 'Saved' : 'Save item'}
            onPress={addToFavorites}
            disabled={saved}
          />
        </Card>
      )}
    </Layout>
  )
}

export default Search
