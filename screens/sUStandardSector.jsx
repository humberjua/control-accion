import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'

const SUStandardSector = () => {
  const theme = useTheme()

  return (
    <View theme={theme} name='SUStandardSector'>
      <Text>This is the SUStandardSector!</Text>
    </View>
  )
}

export default SUStandardSector
