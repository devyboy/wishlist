import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import Wishlist from '../screens/Wishlist'
import { useTheme } from '../contexts/ThemeContext'

const BottomTab = createBottomTabNavigator()

const HomeStack = createStackNavigator()
const WishlistStack = createStackNavigator()

const TabBarIcon = (props) => {
  return <MaterialIcons size={25} {...props} />
}

const BottomTabNavigator = ({ navigation }) => {
  const { colors } = useTheme()

  const goToSettings = () => {
    navigation.navigate('Settings')
  }

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
    },
    headerRight: () => (
      <TabBarIcon
        name='more-vert'
        color={colors.background}
        style={{ marginRight: 15 }}
        onPress={goToSettings}
      />
    )
  }

  return (
    <BottomTab.Navigator
      initialRouteName='Home'
      tabBarOptions={{
        labelPosition: 'below-icon',
        activeTintColor: colors.accent,
        style: {
          backgroundColor: colors.background,
          borderTopColor: colors.divider
        }
      }}
    >
      <BottomTab.Screen
        name='Home'
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />
        }}
      >
        {() => (
          <HomeStack.Navigator screenOptions={defaultScreenOptions}>
            <HomeStack.Screen name='Home' component={Home} />
          </HomeStack.Navigator>
        )}
      </BottomTab.Screen>

      <BottomTab.Screen
        name='Wishlist'
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='show-chart' color={color} />
          )
        }}
      >
        {() => (
          <WishlistStack.Navigator screenOptions={defaultScreenOptions}>
            <WishlistStack.Screen name='Wishlist' component={Wishlist} />
          </WishlistStack.Navigator>
        )}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  )
}

export default BottomTabNavigator
