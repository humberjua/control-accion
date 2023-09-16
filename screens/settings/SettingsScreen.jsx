import { useState, useContext, useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Text, useTheme, Divider } from 'react-native-paper'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import UserAvatar from '../../components/settings/UserAvatar'
// import UserSearch from '../../components/settings/UserSearch'
// import UserNotifications from '../../components/settings/UserNotifications'
import { useMe } from '../../hooks/userQH'
import { ApolloConsumer } from '@apollo/client'
import AsyncStorage from '@react-native-community/async-storage'
import { DataContext } from '../../context/DataContext'
// import CustomCheckBox from '../../components/CustomCheckBox'
import { Switch } from 'react-native-paper'
import { Checkbox } from 'expo-checkbox'
import { useForm } from 'react-hook-form'
import CustomInput from '../../components/CustomInput'

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

const preValues = {
  password: '',
  theme: '',
  userProfileImage: '',
  optionConfiguration1: '',
  optionConfiguration2: '',
  optionConfiguration3: '',
  personalPhone: '',
  personalEmail: '',
  personalAddress: '',
  aboutMe: '',
  showNotificationsToLevel: 3,
  repeatPassword: ''
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

function SettingsScreen () {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const { data, setData } = useContext(DataContext)
  const { me } = useMe()
  const [userData, setUserData] = useState({})
  const [changePassword, setChangePassword] = useState(false)

  const { control, handleSubmit, watch, formState: { errors } } = useForm(
    {
      defaultValues: preValues
    })

  const password = watch('password')
  const repeatPassword = watch('repeatPassword')

  useEffect(() => {
    setData({ ...data })
    setUserData(me)
  }
  , [])

  console.info('userData\n', userData)
  // console.info('_______________________________________________')
  // console.info('password =', password)
  // console.info('repeatPassword =', repeatPassword)
  return (
    <SafeAreaView
      name='SettingsScreen'
      style={{
        flex: 1,
        paddingBottom: insets.bottom
      }}
    >

      <View theme={theme}>

        <UserAvatar />

        {/* <UserSearch /> */}
        {/* <UserNotifications /> */}

        <Divider style={{ height: 2, backgroundColor: 'orange' }} />
        <ScrollView>
          <View>
            <Text style={[styles.text, { backgroundColor: 'lightyellow', fontWeight: 'bold' }]}>Company name: {userData.companyName}</Text>
            <Divider style={{ height: 2, backgroundColor: 'lightgray' }} />

            <Text style={styles.text}>Company Business Unit: {userData.companyBusinessUnitDescription}</Text>
            <Divider style={{ height: 2, backgroundColor: 'lightgray' }} />

            <Text style={[styles.text, { color: 'blue' }]}>email: {userData.email}</Text>
            <Divider style={{ height: 2, backgroundColor: 'lightgray' }} />

            <Text style={[styles.text, { color: 'blue' }]}>username: {userData.nickName}</Text>
            <Divider style={{ height: 2, backgroundColor: 'lightgray' }} />

            <Text style={styles.text}>phone: {userData.phone}</Text>
            <Divider style={{ height: 2, backgroundColor: 'lightgray' }} />

            <Text style={styles.text}>idEmployee: {userData.idEmployee}</Text>

            <Divider style={{ height: 2, backgroundColor: 'orange' }} />
            <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>

              {/* <Checkbox onValueChange={setChangePassword} value={changePassword} /> */}
              <Switch onValueChange={setChangePassword} value={changePassword} />
              <Text style={[{ marginHorizontal: 5, fontWeight: 'bold' }, changePassword ? { color: 'black' } : { color: 'gray' }]}>Set New Password</Text>
            </View>
            {changePassword && (
              <>
                <CustomInput control={control} name='password' extraTitle='Password:' placeholder='Write your password' value={password} />
                <CustomInput control={control} name='repeatPassword' extraTitle='Repeat password:' placeholder='Write again your password' value={repeatPassword} />
              </>
            )}
            <Divider style={{ height: 2, backgroundColor: 'lightgray', marginTop: -5 }} />
          </View>
          <View style={{ flexDirection: 'row', gap: 5 }}>
              <Switch value={{theme}} />
          </View>
          <View style={{ marginTop: 5 }}>
            {/* <CustomInput control={control} name='' /> */}
          </View>

          <Button
            icon='logout'
            mode='contained'
            onPress={async () => {
              await setData({ ...userDefault, loged: false, userToken: '', idCompany: '', companyName: '', userToChat: '' })
              ApolloConsumer(client => client.clearStore())
              await clearData()
            }}
            style={{ margin: 10 }} buttonColor='#e64a19'
          >
            Logout
          </Button>
        </ScrollView>

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 2,
    alignItems: 'flex-start',
    paddingTop: 2
  },
  text: {
    paddingTop: 4,
    paddingBottom: 2,
    alignItems: 'flex-end',
    paddingLeft: 2
  }
})

export default SettingsScreen
