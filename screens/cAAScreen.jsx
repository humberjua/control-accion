import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

/*
  En esta parte hay que importar las ventanas que utilizará el "CompanyAppAdmin"
  Si la empresa decide el modelo de contrato de "CompanyAppAdmin", éste deberá poder dentro de su empresa, hacer lo siguiente:
  => COMPANY  {CAASCompany}
    => Agregar o Editar companyBusinessUnity
    => Agregar o Editar companyJobRole, vinculado a standardJobRole
    => Agregar o Editar companySector, vinculado a standardSector
  => USUARIOS {CAASUsers}
    => Agregar nuevos usuarios (hasta un número máximo definido por contrato). Sólo podrán ser usuarios finales.
    => Darlos de baja.
    => Editar ciertas partes del perfil de un usuario.
  => NOTIFICACIONES {CAASNotifications}
    => Emitir alertas customizadas (o notificaciones) para un grupo definido de usuarios o para todos los de su empresa.
  => GRAFICOS {CAASCharts}
    => Habilitar o deshabilitar gráficos que ya estén contratados con CtrlA.
  => CONTACTO {CAASContact}
  Será una pantalla para que los "CompanyAppAdmin CAA" puedan tener contacto directo con los SuperUser para:
    => Solicitar nuevos gráficos.  $$
    => Solicitar agrandar el número máximo de usuarios. $$
    => Solicitar nuevo standardJobRole
    => Solicitar nuevo standardSector
    => Ayuda

  Es decir que esta pantalla tendrá 5 pestañas o pantallas (COMPAÑÍA, USUARIOS, NOTIFICACIONES, GRAFICOS Y CONTACTO)
*/

import CAASCompany from './cAASCompany.jsx'
import CAASUsers from './cAASUsers.jsx'
import CAASNotifications from './cAASNotifications.jsx'
import CAASCharts from './cAASCharts.jsx'
import CAASContact from './cAASContact.jsx'

const Tab = createMaterialTopTabNavigator()

/*
  ! https://reactnavigation.org/docs/themes/#built-in-themes Crear custom theme para esta navbar.
  ! Alternativa #1: Crear funcion con las diferentes tab screen editadas para modo default y oscuro, para luego importarla a la funcion principal de Chart Screen.
    Luego hacer lo mismo de isDarkMode de appThemes.js para checkear cual es el tema de color actual.
  ! Alternativa #2: Crear un segundo appThemes, especifico para chartScreen con un segundo useState (reduce reitaracion de codigo a cambio de codigo optimizado para este Tab)
  ! Alternativa #3: Convertir el useState + useEffect de appThemes en componentes script, para poder invocarlos por separado en appThemes y chartScreen para obtener
  los valores de preferencia de pantalla del usuario (reciclar codigo a traves de componentes).
*/

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

function CompnayAppAdminScreen () {
  return (
    <NavigationContainer
      independent
      theme={darkTheme}
    >

      <Tab.Navigator
        initialRouteName='CAASCompany'
      >

        <Tab.Screen
          // En esta pestaña están incluidos los agregados y/o ediciones de:
          // 1)_ Company Unit Bussines (propio de cada empresa)
          // 2)_ Company Job Role ==> Vinculado a Standard Job Role del SSU
          // 3)_ Company Sectors ==> Vinculado a Standard Sectors del SSU
          name='CAASCompany'
          component={CAASCompany}
          options={{
            // tabBarLabel: 'Company',
            tabBarLabel: '',
            tabBarActiveTintColor: 'lightyellow',
            tabBarIndicatorStyle: { backgroundColor: 'rgb(110, 245, 244)' },
            tabBarScrollEnabled: false, // este creo que va a ser true
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='factory' color={color} size={26} />)
          }}
        />

        <Tab.Screen
          name='CAASUsers'
          component={CAASUsers}
          options={{
            // tabBarLabel: 'Users',
            tabBarLabel: '',
            tabBarActiveTintColor: 'lightyellow',
            tabBarIndicatorStyle: { backgroundColor: 'rgb(110, 245, 244)' },
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='account-details' color={color} size={26} />)
          }}
        />

        <Tab.Screen
          name='CAASNotifications'
          component={CAASNotifications}
          options={{
            // tabBarLabel: 'Notifications',
            tabBarLabel: '',
            tabBarActiveTintColor: 'lightyellow',
            tabBarIndicatorStyle: { backgroundColor: 'rgb(110, 245, 244)' },
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='email-box' color={color} size={26} />)
          }}
        />

        <Tab.Screen
          name='CAASCharts'
          component={CAASCharts}
          options={{
            // tabBarLabel: 'Charts',
            tabBarLabel: '',
            tabBarActiveTintColor: 'lightyellow',
            tabBarIndicatorStyle: { backgroundColor: 'rgb(110, 245, 244)' },
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='chart-bar-stacked' color={color} size={26} />)
          }}
        />

        <Tab.Screen
          name='CAASContact'
          component={CAASContact}
          options={{
            // tabBarLabel: 'Contact',
            tabBarLabel: '',
            tabBarActiveTintColor: 'lightyellow',
            tabBarIndicatorStyle: { backgroundColor: 'rgb(110, 245, 244)' },
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='contacts' color={color} size={26} />)
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default CompnayAppAdminScreen
