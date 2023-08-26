import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import ChatScreen from '../../screens/chatScreen.jsx'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainChatList from './MainChatList.jsx'

const Stack = createNativeStackNavigator()

const ChatList = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer independent>
        <Stack.Navigator
          initialRouteName='MainChatList'
          screenOptions={{
            statusBarStyle: 'dark' // importante para que se vea el statusBar
          }}
        >
          <Stack.Screen
            name='MainChatList'
            component={MainChatList}
            options={{
              title: 'asdas',
              headerShown: false,
              headerBackButtonMenuEnabled: true,
              headerBackTitle: ''
            }}
          />
          <Stack.Screen
            name='ChatScreen'
            component={ChatScreen}
            initialParams={{ idUser: '', idUserTo: '' }}
            options={{
              headerBackButtonMenuEnabled: true,
              title: '',
              headerShadowVisible: true
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

export default ChatList

// import { useEffect, useContext, useState } from 'react'
// import { Pressable, View } from 'react-native'
// import { Avatar, Text, Divider, Badge } from 'react-native-paper'
// import { DataContext } from '../../context/DataContext.js'

// import { chatlist } from './styles.js'
// import ChatScreen from '../../screens/chatScreen.jsx'

// const ChatList = (companyUsers) => {
//   const { data, setData } = useContext(DataContext)
//   useEffect(() => setData(data), [])
//   console.log('data\n', data)
//   if (!companyUsers || companyUsers === 'Loading...' || companyUsers === undefined) return
//   if (companyUsers.companyUsers === undefined) return

//   const handleChatPress = (nickName) => {
//     setData({ ...data, userToChat: nickName })
//   }
//   console.log(data.userToChat === '')
//   try {
//     return (
//       data.userToChat === ''
//         ? (
//             companyUsers.companyUsers.map(el => {
//               if (el.nickName !== companyUsers.me.nickName) {
//                 return (
//                   <View key={el.nickName}>
//                     <Pressable
//                       // onPress={() => navigation.navigate('RegisterScreen', { name: 'Register Screen' })}
//                       onPress={() => handleChatPress(el.nickName)}
//                       style={({ pressed }) => {
//                         return { opacity: pressed ? 0.2 : 1 }
//                       }}
//                     >
//                       <Divider style={{ borderWidth: 0.5 }} />
//                       <View style={chatlist.chatListRow}>
//                         <View>
//                           <Avatar.Image size={56} source={{ uri: el.userProfileImage }} style={{ margin: 2 }} />
//                         </View>
//                         <View style={chatlist.chatListContent}>
//                           <View>
//                             <Text variant='titleMedium'> {el.nickName.length > 10 ? el.nickName.toString().slice(0, 10) + '...' : el.nickName.toString() + '\t'.repeat(10 - el.firstName.length)} </Text>
//                             <Text> Msg... </Text>
//                           </View>
//                           <View style={{ marginLeft: '80%', justifyContent: 'center' }}>
//                             <Text> Msg Time </Text>
//                             <Badge size={12} style={{ alignSelf: 'flex-end', marginTop: 5 }}> </Badge>
//                           </View>
//                         </View>
//                       </View>
//                       <Divider style={{ borderWidth: 0.5 }} />
//                     </Pressable>
//                   </View>
//                 )
//               } else {
//                 return <View key={el.nickName}><></></View>
//               }
//             }
//             )

//           )
//         : (
//           <ChatScreen data={data} />
//           )
//     )
//   } catch (error) {

//   }
// }

// export default ChatList
