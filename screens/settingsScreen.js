import { ApolloConsumer } from '@apollo/client'
import { useContext } from 'react'
import { Text, View, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DataContext } from '../context/DataContext'

const userDefault = {
  nickName: '',
  password: '',
  idDevice: '',
  userToken: '',
  idUser: '',
  loged: false
}

async function clearData () {
  await AsyncStorage.clear()
  await AsyncStorage.multiRemove(['token'])
  await AsyncStorage.setItem('token', '')
  ApolloConsumer(client => client.resetStore())
  AsyncStorage.flushGetRequests()
}

export default function SettingsScreen (navigation) {
  const { setData } = useContext(DataContext)
  return (
    <>
      <View>
        <Text>This is the Settings Screen!</Text>
        <Button
          title='Logout'
          onPress={async () => {
            setData({ ...userDefault, loged: false, userToken: '' })
            await clearData()
          }}
        />
      </View>
    </>
  )
}
