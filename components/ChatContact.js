import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
// import { Constants } from 'expo-constants'
import CustomActivityIndicator from '../components/CustomActivityIndicator.js'

export const ChatContact = (idUser, dateTimeLastPost) => {
  const [load, setLoad] = useState(false)
  useEffect(() => setLoad(dateTimeLastPost), [])
  return (
    <View style={styles.container}>
      {
        load
          ? <CustomActivityIndicator />
          : (
            <>
              <Image
                style={styles.picture}
              />
              <Text>{}</Text>

            </>
            )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    height: globalThis.screen.height / 4 > 5
      ? 80
      : Math.round(globalThis.screen.height / 4, 0),
    width: '80%',
    fontSize: 18,
    fontWeight: '400',
    alignContent: 'stretch'
  },
  picture: {
    height: 50,
    width: 50,
    borderRadius: 8,
    elevation: 5,
    borderWidth: 2
  }
})
