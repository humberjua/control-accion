import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'

const SUNotifications = () => {
  const theme = useTheme()

  return (
    <View theme={theme} name='SUNotifications'>
      <Text>This is the SUNotifications!</Text>
    </View>
  )
}

export default SUNotifications
