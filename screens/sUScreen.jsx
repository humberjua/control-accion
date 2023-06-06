import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

/*
  En esta parte deberán estar las pestañas (ventanas) que permitan a los "SuperUser" poder:
  => EMPRESAS {SUCompanies} ☑️
    => Agregar nuevas empresas a CtrlA ☑️
    => Instalar (Agregar) el paquete comprado por una empresa x ☑️
      => Definir cantidad de usuarios según contrato ☑️
      => Definir si tendrá o no usuarios del tipo "companyAppAdmin" y cuantos serán ☑️
      => Definir cuales serán los tipos de gráficos que podrá disponer según contrato ☑️
    => Editar datos generales de una empresa ☑️
    => Editar características del contrato de una empresa ☑️
    => Activar o desactivar una empresa a la lista de clientes de CtrlA 👎
  => USUARIOS {SUUsers}
    => Agregar nuevos usuarios, estos podrán ser para cualquiera de las empresas que contrataron CtrlA. Esto dependerá si está contratado este servicio o no
    => Si el contrato lo permite, agregar quienes serán los usuarios del tipo "companyAppAdmin"
    => Editar perfiles de usuarios a voluntad
  => STANDARD SECTOR {SUStandardSector}
    => Agregar o editar un sector estándar
  =>  STANDARD JOB ROLE {SUJobRole}
    => Agregar o editar un rol de trabajo estándar
  => STANDARD TICKET {SUStandardTicket}
    => Agregar o editar un ticket estándar
  => NOTIFICATIONS {SUNotifications}
    => Enviar notificaciones a los "companyAppAdmin" por razones de contrato o de inminente actualización grande de la aplicación
    => Enviar notificaciones a los "usuarios finales" por x motivo...

  Es decir que esta pantalla contendrá 6 pestañas en total (SUCompanies, SUUsers, SUStandardSector, SUJobRole, SUNotifications)
*/

import SUCompanies from './sUCompanies.jsx'
import SUUsers from './sUUsers.jsx'
import SUStandardSector from './sUStandardSector.jsx'
import SUJobRole from './sUJobRole.jsx'
import SUNotifications from './sUNotifications.jsx'
import SUStandardTicket from './sUStandardTicket.jsx'

import { DataContext } from '../context/DataContext.js'
import { useContext } from 'react'

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

function SuperUserScreen () {
  const { data } = useContext(DataContext)
  console.info('data desde la SuperUserScreen= \n', data)
  return (
    <NavigationContainer
      independent
      theme={darkTheme}
    >

      <Tab.Navigator
        initialRouteName='SUCompanies'
      >

        <Tab.Screen
          name='SUCompanies'
          component={SUCompanies}
          options={{
            // tabBarLabel: 'Companies',
            tabBarLabel: '',
            tabBarActiveTintColor: 'rgb(211, 147, 146)',
            tabBarIndicatorStyle: { backgroundColor: 'rgb(211, 147, 244)' },
            tabBarScrollEnabled: false, // seguramente será true
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='factory' color={color} size={26} />)
          }}
        />

        <Tab.Screen
          name='SUUsers'
          component={SUUsers}
          options={{
            // tabBarLabel: 'Users',
            tabBarLabel: '',
            tabBarActiveTintColor: 'rgb(211, 147, 146)',
            tabBarIndicatorStyle: { backgroundColor: 'rgb(110, 245, 244)' },
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='account-details' color={color} size={26} />)
          }}
        />

        <Tab.Screen
          name='SUStandardSector'
          component={SUStandardSector}
          options={{
            // tabBarLabel: 'Std Sector',
            tabBarLabel: '',
            tabBarActiveTintColor: 'rgb(211, 147, 146)',
            tabBarIndicatorStyle: { backgroundColor: 'rgb(110, 245, 244)' },
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='select-place' color={color} size={26} />)
          }}
        />

        <Tab.Screen
          name='SUJobRole'
          component={SUJobRole}
          options={{
            // tabBarLabel: 'Std Job Role',
            tabBarLabel: '',
            tabBarActiveTintColor: 'rgb(211, 147, 146)',
            tabBarIndicatorStyle: { backgroundColor: 'rgb(110, 245, 244)' },
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='office-building' color={color} size={26} />)
          }}
        />

        <Tab.Screen
          name='SUNotifications'
          component={SUNotifications}
          options={{
            // tabBarLabel: 'Notifications',
            tabBarLabel: '',
            tabBarActiveTintColor: 'rgb(211, 147, 146)',
            tabBarIndicatorStyle: { backgroundColor: 'rgb(110, 245, 244)' },
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='email-edit' color={color} size={26} />)
          }}
        />

        <Tab.Screen
          name='SUStandardTicket'
          component={SUStandardTicket}
          options={{
            // tabBarLabel: 'Std Tickets',
            tabBarLabel: '',
            tabBarActiveTintColor: 'rgb(211, 147, 146)',
            tabBarIndicatorStyle: { backgroundColor: 'rgb(110, 245, 244)' },
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='form-select' color={color} size={26} />)
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default SuperUserScreen
