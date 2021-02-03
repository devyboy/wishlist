import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Search from '../screens/Search'
import List from '../screens/List'
import { useTheme } from '../contexts/ThemeContext'

const BottomTab = createBottomTabNavigator()
const SearchStack = createStackNavigator()
const ListStack = createStackNavigator()

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
          tabBarIcon: ({ color }) => <TabBarIcon name='search' color={color} />
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
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='format-list-bulleted' color={color} />
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
