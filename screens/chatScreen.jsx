import { gql, useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useChatBy2Users } from '../hooks/chatQH.js'
import MsgInput from '../components/chat/MsgInput.jsx'
import MsgBubble from '../components/chat/MsgBubble.jsx'
import CustomActivityIndicator from '../components/CustomActivityIndicator.js'

// BIEN

const editChatM = gql`
mutation EditChat($idChat: ID!, $messageRead: Boolean) {
  editChat(idChat: $idChat, messageRead: $messageRead) {
    idChat
    messageRead
  }
}

`

const ChatScreen = ({ route, navigation }) => {
  const idUser = route.params.idUser // El usuario que escribe el chat
  const idUserTo = route.params.idUserTo // El usuario al que le escribe el idUser

  const chatBy2Users = useChatBy2Users(idUser, idUserTo)

  const [chat, setChat] = useState([])
  const [update, setUpdate] = useState(false)
  const [editChat, editChatData] = useMutation(editChatM)

  if (!update) {
    setTimeout(() => {
      console.log('chat=', chat)
      console.log('update', update)

      if (chat && chat.length > 0 && chat !== 'Loading...') {
        chat.map(async (el) => {
          if (!el.messageRead && el.idUserTo === idUser && el.idUser === idUserTo) {
            try {
              await editChat(
                {
                  variables: {
                    idChat: el.idChat,
                    messageRead: true
                  }
                }
              )
              console.info('_________ datos actualizados', editChatData)
              setChat(editChatData)
              setUpdate(true)
            } catch (error) {
              console.log('error\n', error)
            }
          }
        })
      }
      setChat(chat)
      setUpdate(true)
    }, 500)
  }
  useEffect(() => setChat(chatBy2Users), [chat])

  const GetMessages = () => {
    if (!chat || chat.length === 0 || chat === undefined || chat === 'Loading...' || chat === 'Loading...Loading...') return <></>
    const getFormatedTime = (time) => {
      const date = new Date(Number(time))
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    }
    try {
      return (
        chat.map(el => {
          return (
            <View key={el.idChat}>
              <MsgBubble message={el.chatText} messageTime={getFormatedTime(el.chatDateTimePost)} isSender={el.idUser === idUser} />
            </View>
          )
        })
      )
    } catch (error) {
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {!update ? <CustomActivityIndicator /> : <GetMessages />}
      <View style={styles.bottom}>
        <MsgInput idUserTo={idUserTo} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    bottom: 0
  }
})

export default ChatScreen
