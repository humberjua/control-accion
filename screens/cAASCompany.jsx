import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'

const CAASCompany = () => {
  const theme = useTheme()

  return (
    <View theme={theme} name='CAASCompany'>
      <Text>This is the CAASCompany!</Text>
    </View>
  )
}

export default CAASCompany
