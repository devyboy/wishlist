import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { SearchBar } from 'react-native-elements'
import {
  Text,
  Layout,
  Button,
  Divider
} from '../components/themed/ThemedComponents'
import { StatusBar } from 'expo-status-bar'

const Search = ({ navigation }) => {
  const [searchVal, setSearchVal] = React.useState()
  const { colors, isDark } = useTheme()

  const styles = {
    searchContainer: {
      backgroundColor: 'transparent',
      paddingHorizontal: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      marginTop: 16
    },
    inputContainer: {
      paddingHorizontal: 8,
      borderRadius: 8,
      backgroundColor: isDark ? colors.elevated : colors.divider
    }
  }

  return (
    <Layout noScroll>
      <StatusBar style={isDark ? 'dark' : 'light'} />
      <Text variant='subheader'>Search for items</Text>
      <SearchBar
        platform='default'
        autoCapitalize={'none'}
        value={searchVal}
        returnKeyType={'search'}
        onChangeText={setSearchVal}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.inputContainer}
        inputStyle={{ color: colors.text.body, fontSize: 16 }}
        leftIconContainerStyle={{ color: 'red' }}
        cancelButtonProps={{ color: colors.text.body }}
      />
      {/* <Divider /> */}
    </Layout>
  )
}

export default Search
