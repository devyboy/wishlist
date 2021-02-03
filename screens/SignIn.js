import React from 'react'
import {
  Card,
  ClearButton,
  Button,
  Layout,
  Input,
  Text
} from '../components/ThemedComponents'
import { View } from 'react-native'

const SignIn = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false)
  const passRef = React.useRef()

  const signIn = () => {
    setLoading(true)
    setTimeout(() => navigation.replace('Main'), 3000)
  }

  return (
    <Layout noScroll>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text
          variant='subheader'
          style={{ textAlign: 'center', marginBottom: 8 }}
        >
          Sign in
        </Text>
        <Card>
          <Input
            label='Email'
            placeholder='you@example.com'
            autoCorrect={false}
            autoCapitalize='none'
            autoCompleteType='email'
            keyboardType='email-address'
            textContentType='emailAddress'
            returnKeyType='next'
            onSubmitEditing={() => passRef.current.focus()}
          />
          <Input
            aref={passRef}
            label='Password'
            secureTextEntry
            autoCompleteType='password'
            textContentType='password'
            returnKeyType='go'
            onSubmitEditing={signIn}
          />
          <Button label='Sign in' noMargin onPress={signIn} loading={loading} />
        </Card>
        <ClearButton label='Forgot password?' noColor />
      </View>
      <View style={{ flex: 0.3 }} />
    </Layout>
  )
}

export default SignIn
