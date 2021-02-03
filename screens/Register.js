import React from 'react'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import {
  Card,
  ClearButton,
  Button,
  Layout,
  Input,
  Text
} from '../components/ThemedComponents'

const Register = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false)

  const emailRef = React.useRef()
  const passRef = React.useRef()
  const confirmPassRef = React.useRef()

  const goToHome = () => {
    setLoading(true)
    setTimeout(() => navigation.replace('Main'), 3000)
  }

  const goToSignIn = () => {
    navigation.navigate('SignIn')
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Layout noScroll style={{ justifyContent: 'center' }}>
        <Text
          variant='subheader'
          style={{ textAlign: 'center', marginBottom: 8 }}
        >
          Create your account
        </Text>
        <Card>
          <Input
            aref={emailRef}
            placeholder={'you@example.com'}
            label='Email'
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
            returnKeyType='next'
            onSubmitEditing={() => confirmPassRef.current.focus()}
          />
          <Input
            aref={confirmPassRef}
            label='Confirm password'
            secureTextEntry
            returnKeyType='go'
            onSubmitEditing={goToHome}
          />
          <Button
            label='Sign up'
            noMargin
            onPress={goToHome}
            loading={loading}
          />
        </Card>
        <ClearButton
          label='Already have an account?'
          onPress={goToSignIn}
          noColor
        />
        <View style={{ flex: 0.5 }} />
      </Layout>
    </KeyboardAvoidingView>
  )
}

export default Register
