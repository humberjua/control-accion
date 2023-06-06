import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'

const CAASCharts = () => {
  const theme = useTheme()

  return (
    <View theme={theme} name='CAASCharts'>
      <Text>This is the CAASCharts!</Text>
    </View>
  )
}

export default CAASCharts
