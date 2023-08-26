import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import SearchScreen from '../screens/searchScreen.js'
import ReportScreen from '../screens/report/reportEvent'

const Tab = createMaterialTopTabNavigator()

// const defaultTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: 'rgb(63, 73, 72)',
//     card: 'rgb(230, 241, 240)'
//   }
// }

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(190, 201, 200)',
    card: 'rgb(29, 43, 43)'
  }
}

export default function ReportTabs () {
  // const isFocused = useIsFocused()

  return (
    <NavigationContainer
      independent
      theme={darkTheme}
    >

      <Tab.Navigator>

        <Tab.Screen
          name='Find Report'
          component={SearchScreen}
          options={{
            tabBarActiveTintColor: 'rgb(111, 247, 246)',
            tabBarIndicatorStyle: { backgroundColor: 'rgb(110, 245, 244)' }
          }}
        />

        <Tab.Screen
          name='New Report'
          component={ReportScreen}
          options={{
            tabBarActiveTintColor: 'rgb(111, 247, 246)',
            tabBarIndicatorStyle: { backgroundColor: 'rgb(110, 245, 244)' }
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  )
}
