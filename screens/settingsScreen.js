import { ApolloConsumer } from '@apollo/client'
import { useContext, useEffect } from 'react'
import { Text, View, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { DataContext } from '../context/DataContext'

const userDefault = {
  nickName: '',
  password: '',
  idDevice: '',
  userToken: '',
  idUser: '',
  loged: false,
  idCompany: '',
  companyName: '',
  userToChat: ''
}

async function clearData () {
  ApolloConsumer(client => {
    client.resetStore()
    client.cache.reset()
  })
  // ApolloConsumer.client.resetStore()
  await AsyncStorage.setItem('token', '')
  await AsyncStorage.multiRemove(['token'])
  await AsyncStorage.clear()
}

export default function SettingsScreen (navigation) {
  const { data, setData } = useContext(DataContext)
  useEffect(() => setData({ ...data }), [])
  return (
    <>
      <View>
        <Text>This is the Settings Screen!</Text>
        <Button
          title='Logout'
          onPress={async () => {
            await setData({ ...userDefault, loged: false, userToken: '', idCompany: '', companyName: '', userToChat: '' })
            ApolloConsumer(client => client.clearStore())
            await clearData()
          }}
        />
      </View>
    </>
  )
}
