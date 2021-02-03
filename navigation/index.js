import React from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import MainStackNavigator from '../navigation/MainStackNavigator'
import BottomSheetModal from '../components/BottomSheetModal'
import Splash from '../screens/Splash'
import Register from '../screens/Register'
import SignIn from '../screens/SignIn'
import { useTheme } from '../contexts/ThemeContext'

const Root = createStackNavigator()
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

const RootNavigator = () => {
  return (
    <>
      <NavigationContainer>
        <Root.Navigator
          initialRouteName='Auth'
          mode='modal'
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
            cardOverlayEnabled: true,
            transitionSpec: {
              open: {
                animation: 'spring',
                config: {
                  stiffness: 1000,
                  damping: 100,
                  mass: 3
                }
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 250
                }
              }
            },
            cardOverlay: () => (
              <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} />
            )
          }}
        >
          <Root.Screen name='Auth' component={AuthNavigator} />
          <Root.Screen name='Main' component={MainStackNavigator} />
          <Root.Screen name='Modal' component={BottomSheetModal} />
        </Root.Navigator>
      </NavigationContainer>
    </>
  )
}

export default RootNavigator
