/*
  ESTA ES LA PRIMER PANTALLA DEL CHAT, LA CUAL SOLO MUESTRA LOS USUARIOS ORDENADOS SEGÚN CHAT RECIENTES
  Consultas al servidor para armar el chat:
    allUsersFromCompany(companyName:String!): [user]!
    chatBy2Users(idUser:ID!,idUserTo:ID!):[chat]!

  Esta pantalla, al igual que (Charts, Search, Settings) no deberìan preguntar por el tipo de usuario
*/

import { View } from 'react-native'
import ChatList from '../components/chat/ChatList.jsx'

const InitialChatScreen = () => {
  return (
    <View>
      <ChatList />
    </View>
  )
}

export default InitialChatScreen
