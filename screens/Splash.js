import React from 'react'
import { View, LogBox } from 'react-native'
import {
  Layout,
  Button,
  ClearButton,
  Text
} from '../components/themed/ThemedComponents'
import { useTheme } from '../contexts/ThemeContext'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native'

const Splash = ({ navigation }) => {
  LogBox.ignoreAllLogs()
  const { colors } = useTheme()
  const [text, setText] = React.useState()

  React.useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    fetch('https://www.amazon.com/dp/B007JZ1MK6/').then((res) =>
      res
        .text()
        .then((html) => parseText(html))
        .catch((err) => console.log(err))
    )
  }

  const parseText = (html) => {
    const DOMParser = require('react-native-html-parser').DOMParser
    let doc = new DOMParser().parseFromString(html, 'text/html')
    const title = doc.getElementById('productTitle')
    setText(title)
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
  }

  return (
    <Layout noScroll>
      <StatusBar hidden />
      <View style={styles.logoButtons}>
        <Text style={styles.logoText}>Wishlist</Text>
        <Button label='Register' onPress={goToRegister} capped />
        <ClearButton label='Sign in' onPress={goToSignIn} noMargin />
        <Text variant='body'>{text}</Text>
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
