import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'

export default function ChatScreen () {
  const theme = useTheme()

  return (
    <View theme={theme} name='ChatScreen'>
      <Text>This is the Chat Screen!</Text>
    </View>
  )
}
