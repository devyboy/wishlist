import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTabNavigator from './BottomTabNavigator'
import Settings from '../screens/Settings'
import { useTheme } from '../contexts/ThemeContext'

const MainStack = createStackNavigator()

const MainStackNavigator = () => {
  const { colors } = useTheme()

  const defaultScreenOptions = {
    headerBackTitleVisible: false,
    headerTintColor: colors.background,
    headerTitleStyle: {
      fontSize: 19,
      fontWeight: '600',
      color: colors.background,
      paddingBottom: 10
    },
    headerLeftContainerStyle: {
      paddingBottom: 8
    },
    headerRightContainerStyle: {
      paddingBottom: 8
    },
    headerStyle: {
      height: 85,
      backgroundColor: colors.accent,
      shadowColor: colors.divider
    }
  }

  return (
    <MainStack.Navigator
      initialRouteName='Main'
      screenOptions={defaultScreenOptions}
    >
      <MainStack.Screen
        name='Main'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <MainStack.Screen name='Settings' component={Settings} />
    </MainStack.Navigator>
  )
}

export default MainStackNavigator
