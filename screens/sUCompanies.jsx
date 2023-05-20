import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'

const SUCompanies = () => {
  const theme = useTheme()

  return (
    <View theme={theme} name='SUCompanies'>
      <Text>This is the SUCompanies!</Text>
    </View>
  )
}

export default SUCompanies
