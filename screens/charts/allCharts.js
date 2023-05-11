import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'
export default function AllCharts () {
  const theme = useTheme()

  return (
    <View theme={theme}>
      <Text>This is the All Chart Screen!</Text>
    </View>
  )
}
