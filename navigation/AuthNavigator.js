import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from '../contexts/ThemeContext'
import Splash from '../screens/Splash'
import Register from '../screens/Register'
import SignIn from '../screens/SignIn'

const Auth = createStackNavigator()

const AuthNavigator = () => {
  const { colors } = useTheme()

  return (
    <Auth.Navigator
      initialRouteName='Splash'
      screenOptions={{
        headerTitle: null,
        headerBackTitleVisible: false,
        headerTintColor: colors.accent,
        headerStyle: { backgroundColor: colors.background, shadowOpacity: 0 }
      }}
    >
      <Auth.Screen name='Splash' component={Splash} />
      <Auth.Screen name='SignIn' component={SignIn} />
      <Auth.Screen name='Register' component={Register} />
    </Auth.Navigator>
  )
}

export default AuthNavigator
