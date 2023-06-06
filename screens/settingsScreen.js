import { ApolloConsumer } from '@apollo/client'
import { useContext } from 'react'
import { Text, View, Button } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import AsyncStorage from '@react-native-community/async-storage'
import { DataContext } from '../context/DataContext'
// import { useMe } from '../hooks/userQH'

const userDefault = {
  nickName: '',
  password: '',
  idDevice: '',
  userToken: '',
  idUser: '',
  loged: false,
  idCompany: '',
  companyName: ''
}

async function clearData () {
  ApolloConsumer(client => client.resetStore())
  await AsyncStorage.setItem('token', '')
  await AsyncStorage.multiRemove(['token'])
  await AsyncStorage.clear()
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
            await clearData()
            await setData({ ...userDefault, loged: false, userToken: '', idCompany: '', companyName: '' })
          }}
        />
      </View>
    </>
  )
}
