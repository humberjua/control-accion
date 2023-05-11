import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

import ChartScreen from './chartScreen'
import ChatScreen from '../screens/chat/chatScreen'
import SearchScreen from '../screens/search/searchScreen'
import SettingsScreen from '../screens/settings/settingsScreen'

import LoginScreen from '../experimental/loginScreen'
import { useLogin } from '../context/loginProvider'

const Tab = createMaterialBottomTabNavigator()

function MyTabs () {
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: insets.bottom
      }}
    >

      <Tab.Navigator
        initialRouteName='Charts'
      >

        <Tab.Screen
          name='Chat'
          component={ChatScreen}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='chat' color={color} size={26} />
            )
          }}
        />

        <Tab.Screen
          name='Charts'
          component={ChartScreen}
          options={{
            tabBarLabel: 'Charts',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='chart-bar' color={color} size={26} />
            )
          }}
        />

        <Tab.Screen
          name='Search'
          component={SearchScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='magnify' color={color} size={26} />
            )
          }}
        />

        <Tab.Screen
          name='Settings'
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='cog' color={color} size={26} />
            )
          }}
        />

      </Tab.Navigator>

    </SafeAreaView>
  )
}

const MainNavigator = () => {
  const { isLoggedIn } = useLogin()

  return isLoggedIn ? <MyTabs /> : <LoginScreen />
}

export default MainNavigator
