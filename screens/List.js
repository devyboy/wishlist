import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { Text, Layout, Divider } from '../components/themed/ThemedComponents'
import { StatusBar } from 'expo-status-bar'

const List = ({ navigation }) => {
  const { colors, isDark } = useTheme()

  return (
    <Layout noScroll>
      <StatusBar style={isDark ? 'dark' : 'light'} />
      <Text variant='subheader'>Wishlist</Text>
      <Divider />
      <Text variant='body'>Your saved items would appear here.</Text>
    </Layout>
  )
}

export default List
