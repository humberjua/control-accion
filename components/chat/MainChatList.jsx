import { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import { Avatar, Text, Divider, Badge } from 'react-native-paper'
import { chatlist } from './styles.js'
import { useAllUsersFromCompany, useMe } from '../../hooks/userQH.jsx'
import { useNavigation } from '@react-navigation/native'
import { gql, useLazyQuery } from '@apollo/client'

const lastMsgBy2UsersQ = gql`
query LastMsgBy2Users($idUser: ID!, $idUserTo: ID!) {
  lastMsgBy2Users(idUser: $idUser, idUserTo: $idUserTo) {
    chatDateTimePost
    chatText
  }
}

`

const MainChatList = () => {
  // read the main data for chat
  const [meData, setMeData] = useState({})
  const [CU, setCU] = useState({})
  const { me } = useMe()
  const companyUsers = useAllUsersFromCompany(me.companyName)

  const [getlastMsgBy2Users, dataLastMsgBy2Users] = useLazyQuery(lastMsgBy2UsersQ)

  const navigation = useNavigation()

  useEffect(() => setCU(companyUsers), [companyUsers])
  useEffect(() => setMeData(me), [me])
  const idUser = me.idUser
  let idUserTo

  // const getFormatedTime = (time) => {
  //   const date = new Date(Number(time))
  //   console.log('time', time)
  //   return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  // }

  // const getLMB2U = (parameters) => {
  //   console.log('parameters\n', parameters)
  //   const result = getlastMsgBy2Users(parameters)
  //   if (result && result.data.lastMsgBy2Users !== 'Loading') {
  //     return result
  //   } else {
  //     return {}
  //   }
  // }

  // let LMD2UD
  // let parameters
  try {
    return (
      CU.map(el => {
        if (el.nickName !== meData.nickName) {
          // parameters = { variables: { idUser, idUserTo: el.idUser } }
          // LMD2UD = getLMB2U(parameters)
          // console.log('LMD2UD\n', LMD2UD)
          return (
            <View key={el.nickName}>
              <Pressable
                onPress={() => {
                  idUserTo = el.idUser
                  navigation.navigate('ChatScreen', { idUser, idUserTo })
                }}
                style={({ pressed }) => {
                  return { opacity: pressed ? 0.2 : 1 }
                }}
              >
                <Divider style={{ borderWidth: 0.5 }} />
                <View style={chatlist.chatListRow}>
                  <View>
                    <Avatar.Image size={56} source={{ uri: el.userProfileImage }} style={{ margin: 2 }} />
                  </View>
                  <View style={chatlist.chatListContent}>
                    <View>
                      <Text variant='titleMedium'> {el.nickName.length > 10 ? el.nickName.toString().slice(0, 10) + '...' : el.nickName.toString() + '\t'.repeat(10 - el.firstName.length)} </Text>
                      {/* <Text> {dataLastMsgBy2Users ? dataLastMsgBy2Users.data && dataLastMsgBy2Users.data !== 'Loading...' ? dataLastMsgBy2Users.data.chatText : '...' : '...'} </Text> */}
                      <Text>msg...</Text>
                    </View>
                    <View style={{ marginLeft: '80%', justifyContent: 'center' }}>
                      {/* <Text> {dataLastMsgBy2Users ? dataLastMsgBy2Users.data && dataLastMsgBy2Users.data !== 'Loading...' ? getFormatedTime(dataLastMsgBy2Users.data.chatDateTimePost) : '...' : '...'} </Text> */}
                      <Text>time...</Text>
                      <Badge size={12} style={{ alignSelf: 'flex-end', marginTop: 5 }}> </Badge>
                    </View>
                  </View>
                </View>
                <Divider style={{ borderWidth: 0.5 }} />
              </Pressable>
            </View>
          )
        } else {
          return (
            <View key={el.idUser}>
              <Divider />
            </View>
          )
        }
      }
      )
    )
  } catch (error) {
    console.log('error\n', error)
  }
}

export default MainChatList
