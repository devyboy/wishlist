import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Layout, Button, ClearButton } from '../components/ThemedComponents'
import { useTheme } from '../contexts/ThemeContext'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native'

const Splash = ({ navigation }) => {
  const { colors } = useTheme()

  const goToSignIn = () => {
    navigation.navigate('SignIn')
  }

  const goToRegister = () => {
    navigation.navigate('Register')
  }

  const styles = StyleSheet.create({
    logoButtons: {
      flex: 1.75,
      justifyContent: 'flex-end'
    },
    logoText: {
      fontSize: 75,
      alignSelf: 'center',
      fontWeight: '500',
      letterSpacing: 1.5,
      marginBottom: 30,
      color: colors.text.header
    },

    whatisContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: 50
    },
    whatis: {
      alignSelf: 'center',
      color: colors.text.subtitle
    }
  })

  return (
    <Layout noScroll>
      <StatusBar hidden />
      <View style={styles.logoButtons}>
        <Text style={styles.logoText}>Wishlist</Text>
        <Button label='Register' onPress={goToRegister} capped />
        <ClearButton label='Sign in' onPress={goToSignIn} noMargin />
      </View>
      <View style={styles.whatisContainer}>
        <TouchableOpacity>
          <Text style={styles.whatis}>What is Wishlist?</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  )
}

export default Splash
