import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'

const SUStandardTicket = () => {
  const theme = useTheme()

  return (
    <View theme={theme} name='SUStandardTicket'>
      <Text>This is the SUStandardTicket!</Text>
    </View>
  )
}

export default SUStandardTicket
