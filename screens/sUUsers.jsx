import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'

const SUUsers = () => {
  const theme = useTheme()

  return (
    <View theme={theme} name='SUUsers'>
      <Text>This is the SUUsers!</Text>
    </View>
  )
}

export default SUUsers
