/*
  ESTA ES LA PRIMER PANTALLA DEL CHAT, LA CUAL SOLO MUESTRA LOS USUARIOS ORDENADOS SEGÚN CHAT RECIENTES
  Consultas al servidor para armar el chat:
    allUsersFromCompany(companyName:String!): [user]!
    chatBy2Users(idUser:ID!,idUserTo:ID!):[chat]!

  Esta pantalla, al igual que (Charts, Search, Settings) no deberìan preguntar por el tipo de usuario
*/

import { View, TextInput, TouchableOpacity, Button, StyleSheet, Text } from 'react-native'
import { useTheme } from 'react-native-paper'
import React, { useState, useEffect, useContext } from 'react'
import { useAllUsersFromCompany, useMe } from '../hooks/userQH.jsx'
import { useChatBy2Users } from '../hooks/chatQH.js'
import { DataContext } from '../context/DataContext.js'
import AsyncStorage from '@react-native-community/async-storage'

const ChatScreen = (companyName) => {
  const theme = useTheme()
  const { me } = useMe()

  const companyUsers = useAllUsersFromCompany(me.companyName)

  console.info('=====================*************=============\n', companyUsers)

  return (
    <View theme={theme} name='ChatScreen'>
      <Text>This is the Chat Screen!</Text>
    </View>
  )
}

export default ChatScreen
