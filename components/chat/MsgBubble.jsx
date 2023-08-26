import { View, Text } from 'react-native'
import { msgbubble } from './styles'

const MsgBubble = ({ message = '', messageTime = '', isSender = true }) => {
  // console.log(message)
  return (
    <View
      style={[
        msgbubble.container,
        isSender ? msgbubble.senderContainer : msgbubble.receiverContainer
      ]}
    >
      <Text
        style={[
          msgbubble.message,
          isSender ? msgbubble.senderMessage : msgbubble.receiverMessage
        ]}
      >
        {message}
      </Text>
      <Text
        style={[
          msgbubble.message,
          isSender ? msgbubble.timeSenderMessage : msgbubble.timeReceiveMessage
        ]}
      >
        {messageTime}
      </Text>
    </View>
  )
}

export default MsgBubble
