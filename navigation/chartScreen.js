import { useContext, useState } from 'react'
import { DataContext } from '../context/DataContext.js'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'

import AllCharts from '../screens/allCharts.js'
import MyCharts from '../screens/myCharts.js'

const Tab = createMaterialTopTabNavigator()

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(190, 201, 200)',
    card: 'rgb(29, 43, 43)'
  }
}

export default function ChartScreen () {
  const { data, setData } = useContext(DataContext)
  const [show, setShow] = useState(true)

  const handleChanges = () => {
    setData({ ...data, fabView: true, userToChat: '' })
  }
  //  useEffect(() => setShow(true), [])
  const handleShow = () => {
    if (!show) {
      setShow(true)
    }
  }
  return (
    <NavigationContainer
      independent
      theme={darkTheme}
      onReady={handleChanges}
      onStateChange={handleShow}
      screenOptions={{
        statusBarStyle: 'dark' // importante para que se vea el statusBar
      }}
    >

      <Tab.Navigator
        initialRouteName='My Charts'
        screenOptions={{
          statusBarStyle: 'dark' // importante para que se vea el statusBar
        }}
      >

        <Tab.Screen
          name='All Charts'
          component={AllCharts}
          screenOptions={{
            statusBarStyle: 'dark' // importante para que se vea el statusBar
          }}
          options={{
            tabBarActiveTintColor: 'rgb(111, 247, 246)',
            tabBarIndicatorStyle: { backgroundColor: 'rgb(110, 245, 244)' },
            tabBarScrollEnabled: false
          }}
          onLayout={handleChanges}
        />

        <Tab.Screen
          name='My Charts'
          component={MyCharts}
          options={{
            tabBarActiveTintColor: 'rgb(111, 247, 246)',
            tabBarIndicatorStyle: { backgroundColor: 'rgb(110, 245, 244)' }
          }}
          onLayout={handleChanges}
        />

      </Tab.Navigator>

    </NavigationContainer>
  )
}
