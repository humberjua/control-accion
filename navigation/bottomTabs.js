import { useState, useEffect } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import ChartScreen from './chartScreen'
import ReportTabs from './reportTabs'
import SettingsScreen from '../screens/settingsScreen'
import SuperUserScreen from '../screens/sUScreen.jsx'
import CompnayAppAdminScreen from '../screens/cAAScreen.jsx'
import { useMe } from '../hooks/userQH'
import AsyncStorage from '@react-native-community/async-storage'
import ChatList from '../components/chat/ChatList'
import { useTotalUnReadChatsByIdUser } from '../hooks/chatQH'
// import SearchScreen from '../screens/searchScreen'
// import { gql, useLazyQuery } from '@apollo/client'

// const TotalUnReadChatsByIdUserQ = gql`
// query Query($idUser: ID!) {
//   totalUnReadChatsByIdUser(idUser: $idUser)
// }

// `

const Tab = createMaterialBottomTabNavigator()

let isCAA = false
let isSU = false

function MyTabs () {
  /*
    En esta parte hay que hacer consultas varias a la base de datos para traer información que será importante para armar lo que se muestra
    en la aplicación. Por ahora sería lo siguiente:
    😃==> useContext para traer y eventualmente actualizar la información de contexto (la que por ahora es solamente la correspondiente al usuario logueado)
    😃==> correr la query useMe, la cual trae atravez del token la info completa del usuario logueado
    👷‍♂️==> addNewDeviceToUser, Esta mutación verifica si es un dispositivo nuevo del usuario, si lo es se agrega a la Base de datos. Si no, entonces no hace nada.
    (luego, desde el BE se enviarán notificaciones a los dispositivos de los distintos usuarios, esto también se podrá hacer desde los usuarios "CompanyAppAdmin" y "SuperUser")
    😃==> useMe, para llenar la info del perfil del usuario
    😃==> según esta info de perfil, se habilitará o no para la carga los formularios propios de ("CompanyAppAdmin", o de "SuperUser")
    👷‍♂️☑️☑️☑️==> Armar las pantallas correspondientes a las pantallas propias del "SuperUser"
    👷‍♂️👷‍♂️👷‍♂️👷‍♂️==> Armar las pantallas correspondientes a las pantallas propias del "CompanyAppAdmin"
    👷‍♂️==> useAllChartsFromCompany, para armar la lista completa de charts que le figurarán como disponibles al usuario de la empresa logueada.
    👷‍♂️==> loged users from my ambit (myContacts), sirve para la pantalla "Chat". Trabajo para BE
    👷‍♂️👷‍♂️==> myChatDataLoged... o algo así, que traiga la información de historial del chat del usuario y ponga con un numero en rojo sobre el icono la cantidad de chats no leidos
    ==> Luego, lo correspondiente al boton (plus) y a la pantalla Search, estos recién se deberá cargar una vez que se presionen.

    */
  AsyncStorage.flushGetRequests()
  const { me } = useMe()
  const [unReadMsg, setUnReadMsg] = useState(0)
  const insets = useSafeAreaInsets()
  // const [getUNRMSGS, UNRMSG] = useLazyQuery(TotalUnReadChatsByIdUserQ)

  // setTimeout(() => {
  //   console.log(UNRMSG)
  //   if (me) {
  //     getUNRMSGS({ variables: { idUser: me.idUser } })
  //   }
  //   if (UNRMSG.data) setUnReadMsg(UNRMSG.data.totalUnReadChatsByIdUser)
  // }, 1000)

  const unRMSg = useTotalUnReadChatsByIdUser(me ? me.idUser : '')

  if (me) {
    isCAA = me.isCompanyAppAdmin
    isSU = me.isSuperUser
    AsyncStorage.setItem('idCompany', me.idCompany)
    AsyncStorage.setItem('companyName', me.companyName)
  }

  useEffect(() => {
    if (unRMSg !== 'Loading...' && unRMSg) {
      setUnReadMsg(unRMSg)
    }
  }, [unRMSg])

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
        screenOptions={{
          statusBarStyle: 'dark' // importante para que se vea el statusBar
        }}
      >

        <Tab.Screen
          name='Chat'
          component={ChatList}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='chat' color={color} size={26} />
            ),
            tabBarBadge: unReadMsg !== 0 ? unReadMsg : false
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
          name='SearchScreen'
          component={ReportTabs}
          options={{
            tabBarLabel: 'Reports',
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
              name='CompnayAppAdminScreen'
              component={CompnayAppAdminScreen} // ==> companyAppMenuScreen
              options={{
                tabBarLabel: 'Admin Menu',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name='account-alert' color={color} size={26} />
                )
              }}
            />
        }
        {
          isSU &&
            <Tab.Screen
              name='SuperUserMenu'
              component={SuperUserScreen} // ==> SuperUserMenuScreen
              options={{
                tabBarLabel: 'Super User Menu',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name='account-box-multiple' color={color} size={26} />
                )
              }}
            />
        }

      </Tab.Navigator>

    </SafeAreaView>
  )
}

export default MyTabs
