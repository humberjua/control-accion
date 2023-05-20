import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'

const CAASUsers = () => {
  const theme = useTheme()

  return (
    <View theme={theme} name='CAASUsers'>
      <Text>This is the CAASUsers!</Text>
    </View>
  )
}

export default CAASUsers
