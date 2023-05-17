import React, { useContext } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import ChartScreen from './chartScreen'
import ChatScreen from '../screens/chatScreen'
import SearchScreen from '../screens/searchScreen'
import SettingsScreen from '../screens/settingsScreen'
import { DataContext } from '../context/DataContext'
import { useMe } from '../hooks/userQH'

const Tab = createMaterialBottomTabNavigator()

let isSU = false
let isCAA = false

function MyTabs ({ navigation }) {
  /*
    En esta parte hay que hacer consultas varias a la base de datos para traer información que será importante para armar lo que se muestra
    en la aplicación. Por ahora sería lo siguiente:
    😃 ==> useContext para traer y eventualmente actualizar la información de contexto (la que por ahora es solamente la correspondiente al usuario logueado)
    😃 ==> correr la query useMe, la cual trae atravez del token la info completa del usuario logueado
    ==> addNewDeviceToUser, Esta mutación verifica si es un dispositivo nuevo del usuario, si lo es se agrega a la Base de datos. Si no, entonces no hace nada.
    (luego, desde el BE se enviarán notificaciones a los dispositivos de los distintos usuarios, esto también se podrá hacer desde los usuarios "CompanyAppAdmin" y "SuperUser")
    😃 ==> useMe, para llenar la info del perfil del usuario
    👷‍♂️==> según esta info de perfil, se habilitará o no para la carga los formularios propios de ("CompanyAppAdmin", o de "SuperUser")
    👷‍♂️==> useAllChartsFromCompany, para armar la lista completa de charts que le figurarán como disponibles al usuario de la empresa logueada.
    👷‍♂️==> CONCEPTO DE LA PANTALLA MyCHARTS, Se trata de aquellos gráficos propios de AlChartsFromCompany que el usuario marcó como favorito
    👷‍♂️==> loged users from my ambit (myContacts), sirve para la pantalla "Chat". Trabajo para BE
    👷‍♂️👷‍♂️==> myChatDataLoged... o algo así, que traiga la información de historial del chat del usuario y ponga con un numero en rojo sobre el icono la cantidad de chats no leidos
    ==> Luego, lo correspondiente al boton (plus) y a la pantalla Search, estos recién se deberá cargar una vez que se presionen.

    */
  // const { data, setData } = useContext(DataContext)
  const insets = useSafeAreaInsets()

  const { me } = useMe()
  if (me) {
    isCAA = me.isCompanyAppAdmin
    isSU = me.isSuperUser
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: insets.bottom
      }}
      name='BottomTabs'
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
            ),
            tabBarBadge: 2
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
        {
          isCAA &&
            <Tab.Screen
              name='CompanyAppMenu'
              component={SettingsScreen} // ==> companyAppMenuScreen
              options={{
                tabBarLabel: 'CompanyAppMenu',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name='abacus' color={color} size={26} />
                )
              }}
            />
        }
        {
          isSU &&
            <Tab.Screen
              name='SuperUserMenu'
              component={SettingsScreen} // ==> SuperUserMenuScreen
              options={{
                tabBarLabel: 'SuperUserMenu',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name='account-switch' color={color} size={26} />
                )
              }}
            />
        }

      </Tab.Navigator>

    </SafeAreaView>
  )
}

export default MyTabs
