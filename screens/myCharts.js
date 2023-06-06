import { useContext } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native'
import { useTheme } from 'react-native-paper'
import { DataContext } from '../context/DataContext'
import { useMe } from '../hooks/userQH'

export default function MyCharts () {
  const theme = useTheme()
  const { data, setData } = useContext(DataContext)
  const { me } = useMe()
  if (!me) return
  return (
    <View theme={theme}>
      <Image
        style={styles.image}
        source={{
          uri: me.userProfileImage
        }}
      />
      <Text style={styles.text}>{`Hello ${me.firstName} ${me.lastName}!`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    resizeMode: 'stretch',
    alignContent: 'flex-end',
    alignSelf: 'auto'
  },
  text: {
    fontSize: 16
  }
})
