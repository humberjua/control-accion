import { Text, View } from 'react-native'

import { useTheme } from 'react-native-paper'

export default function SearchScreen () {
  const theme = useTheme()
  return (
    <View theme={theme}>
      <Text>Find some report</Text>
    </View>
  )
}
