import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import {
  Layout,
  Button,
  ClearButton,
} from '../components/themed/ThemedComponents'
import { useTheme } from '../contexts/ThemeContext'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native'

const Splash = ({ navigation }) => {
  const { colors } = useTheme()
  const domparser = new DOMParser()
  const [text, setText] = useState()
  const [list, setList] = useState("")

  useEffect(() => {
    const doc = domparser.parseFromString(text, 'text/html')
    setList(doc.head.title)
  }, [text])

  const getData = async () => {
    await fetch(
      'https://cors-anywhere.herokuapp.com/https://google.com/').
      then(res => res.text()).
      then(res => setText(res)).
      catch(err => console.error(err))
  }

  const goToSignIn = () => {
    navigation.navigate('SignIn')
  }

  const goToRegister = () => {
    navigation.navigate('Register')
  }

  const styles = {
    logoButtons: {
      flex: 1.75,
      justifyContent: 'flex-end',
    },
    logoText: {
      fontSize: 75,
      alignSelf: 'center',
      fontWeight: '500',
      letterSpacing: 1.5,
      marginBottom: 30,
      color: colors.text.header,
    },

    whatisContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: 50,
    },
    whatis: {
      alignSelf: 'center',
      color: colors.text.subtitle,
    },
  }

  return (
    <Layout noScroll>
      <StatusBar hidden />
      <View style={styles.logoButtons}>
        <Text style={styles.logoText}>Wishlist</Text>
        <Button label='Register' onPress={goToRegister} capped />
        <ClearButton label='Sign in' onPress={goToSignIn} noMargin />
        <ClearButton label='Test' onPress={getData} noMargin />
        <Text>${list}</Text>
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
