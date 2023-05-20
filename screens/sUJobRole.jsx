import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'

const SUJobRole = () => {
  const theme = useTheme()

  return (
    <View theme={theme} name='SUJobRole'>
      <Text>This is the SUJobRole!</Text>
    </View>
  )
}

export default SUJobRole
