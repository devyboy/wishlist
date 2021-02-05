import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Search from '../screens/Search'
import List from '../screens/List'
import { useTheme } from '../contexts/ThemeContext'
import { TouchableOpacity } from 'react-native'

const BottomTab = createBottomTabNavigator()
const SearchStack = createStackNavigator()
const ListStack = createStackNavigator()

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
      <TouchableOpacity onPress={goToSettings}>
        <MaterialIcons
          name='settings'
          size={25}
          color={colors.background}
          style={{ marginRight: 15 }}
        />
      </TouchableOpacity>
    )
  }

  return (
    <BottomTab.Navigator
      initialRouteName='Search'
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
        name='Search'
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='search' color={color} size={25} />
          )
        }}
      >
        {() => (
          <SearchStack.Navigator screenOptions={defaultScreenOptions}>
            <SearchStack.Screen name='Search' component={Search} />
          </SearchStack.Navigator>
        )}
      </BottomTab.Screen>

      <BottomTab.Screen
        name='List'
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name='format-list-bulleted'
              color={color}
              size={25}
            />
          )
        }}
      >
        {() => (
          <ListStack.Navigator screenOptions={defaultScreenOptions}>
            <ListStack.Screen name='Saved items' component={List} />
          </ListStack.Navigator>
        )}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  )
}

export default BottomTabNavigator
