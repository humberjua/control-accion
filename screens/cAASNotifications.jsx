import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'

const CAASNotifications = () => {
  const theme = useTheme()

  return (
    <View theme={theme} name='CAASNotifications'>
      <Text>This is the CAASNotifications!</Text>
    </View>
  )
}

export default CAASNotifications
