import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'

import AllCharts from '../screens/allCharts.js'
import MyCharts from '../screens/myCharts.js'

const Tab = createMaterialTopTabNavigator()

/*
  ! https://reactnavigation.org/docs/themes/#built-in-themes Crear custom theme para esta navbar.
  ! Alternativa #1: Crear funcion con las diferentes tab screen editadas para modo default y oscuro, para luego importarla a la funcion principal de Chart Screen.
    Luego hacer lo mismo de isDarkMode de appThemes.js para checkear cual es el tema de color actual.
  ! Alternativa #2: Crear un segundo appThemes, especifico para chartScreen con un segundo useState (reduce reitaracion de codigo a cambio de codigo optimizado para este Tab)
  ! Alternativa #3: Convertir el useState + useEffect de appThemes en componentes script, para poder invocarlos por separado en appThemes y chartScreen para obtener
  los valores de preferencia de pantalla del usuario (reciclar codigo a traves de componentes).
*/

const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(63, 73, 72)',
    card: 'rgb(230, 241, 240)'
  }
}

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(190, 201, 200)',
    card: 'rgb(29, 43, 43)'
  }
}

export default function ChartScreen () {
  return (
    <NavigationContainer
      independent
      theme={darkTheme}
    >

      <Tab.Navigator
        initialRouteName='My Charts'
      >

        <Tab.Screen
          name='All Charts'
          component={AllCharts}
          options={{
            tabBarActiveTintColor: 'rgb(111, 247, 246)',
            tabBarIndicatorStyle: { backgroundColor: 'rgb(110, 245, 244)' },
            tabBarScrollEnabled: false
          }}
        />

        <Tab.Screen
          name='My Charts'
          component={MyCharts}
          options={{
            tabBarActiveTintColor: 'rgb(111, 247, 246)',
            tabBarIndicatorStyle: { backgroundColor: 'rgb(110, 245, 244)' }
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  )
}
