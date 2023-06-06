import React, { useContext, useState, useEffect } from 'react'
import { Formik, useField } from 'formik'
import {
  View,
  Button,
  StyleSheet,
  Platform,
  Alert
} from 'react-native'
import StyledText from '../styles/StyledText.jsx'
import StyledTextInput from '../styles/StyledTextInput.jsx'
import { loginValidationSchema } from './Login.js'
import { DataContext } from '../context/DataContext.js'
import { gql, useMutation } from '@apollo/client'
import { GetToken } from '../utils/GetToken.js'
import AsyncStorage from '@react-native-community/async-storage'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomActivityIndicator from '../components/CustomActivityIndicator.js'

const gqlLoginM = gql`
mutation Login($userName: String!, $password: String!, $userPlatform: String!, $tokenDevice: String) {
  login(userName: $userName, password: $password, userPlatform: $userPlatform, tokenDevice: $tokenDevice) {
    value
  }
}

`

let newData
let tokenUserDevice
let userToken
const notAllowedCharacters = ['*', '%', '(', ')', '>', '/', '<', '=', '"', '\\', '>', '`', '\'']

const FormikInputValue = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const { data, setData } = useContext(DataContext)
  newData = data
  return (
    <>
      <StyledTextInput
        error={meta.error}
        value={field.value}
        onChangeText={value => {
          const lastChar = String(value).charAt(String(value).length - 1)
          if (notAllowedCharacters.includes(lastChar)) {
            Alert.alert('Warning!', `character ${lastChar} is not allowed`)
            value = String(value).replace(lastChar, '')
          }
          helpers.setValue(value)
          field.name === 'nickName' ? newData.nickName = value : newData.password = value
          newData.tokenDevice = tokenUserDevice
          newData.idDevice = tokenUserDevice
          setData(newData)
        }}
        {...props}
      />
      {meta.error && <StyledText style={styles.error}>{meta.error}</StyledText>}
    </>
  )
}

export default function LogInScreen ({ navigation }) {
  // AsyncStorage.clear()
  // AsyncStorage.flushGetRequests()
  const { data, setData } = useContext(DataContext)
  const [login, dataLogedUser] = useMutation(gqlLoginM)
  const [waiting, setWaiting] = useState(false)
  try {
    const [tokenDevice, setTokenDevice] = useState(null)
    useEffect(() => { GetToken().then(setTokenDevice) }, [])
    tokenUserDevice = tokenDevice
  } catch (error) {
    console.log('error getToken')
  }
  return (
    <>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={data}
        onSubmit={
            async (values) => {
              setWaiting(true)
              await AsyncStorage.clear()
              try {
                await login({
                  variables:
                  {
                    userName: values.nickName,
                    password: values.password,
                    userPlatform: Platform.OS,
                    idDevice: values.idDevice,
                    tokenDevice: values.idDevice,
                    loged: true,
                    idCompany: '',
                    companyName: ''
                  }
                })
                console.log('userToken onSubmit= \n', userToken)
                values.idDevice = tokenUserDevice
                values.loged = true
                newData.loged = true
                setData({ ...values, loged: true, userToken })
                await AsyncStorage.setItem('token', userToken)
                setWaiting(false)
              } catch (error) {
                console.error(error)
                setWaiting(false)
                return false
              }
            }
          }
      >
        {({ handleSubmit }) => {
          if (dataLogedUser.data) {
            userToken = dataLogedUser.data.login.value
            console.log('handleSubmit userToken= \n', userToken)
          }
          return (
            <View style={styles.form}>
              <FormikInputValue
                name='nickName'
                placeholder='Username'
              />
              <FormikInputValue
                name='password'
                placeholder='Password'
                secureTextEntry
              />
              <Button onPress={handleSubmit} title='Log In' />
            </View>
          )
        }}
      </Formik>
      <CustomActivityIndicator visible={waiting} />
    </>
  )
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 20,
    marginTop: -5
  },
  form: {
    margin: 12,
    backgroundColor: 'lightyellow'
  }
})
