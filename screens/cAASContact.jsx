import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'

const CAASContact = () => {
  const theme = useTheme()

  return (
    <View theme={theme} name='CAASContact'>
      <Text>This is the CAASContact!</Text>
    </View>
  )
}

export default CAASContact
