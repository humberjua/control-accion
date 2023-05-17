import React, { useContext, useState, useEffect } from 'react'
import { Formik, useField } from 'formik'
import {
  View,
  Button,
  StyleSheet,
  Platform
} from 'react-native'
import StyledText from '../styles/StyledText.jsx'
import StyledTextInput from '../styles/StyledTextInput.jsx'
import { loginValidationSchema } from './Login.js'
import { DataContext } from '../context/DataContext.js'
import { gql, useMutation } from '@apollo/client'
import { GetToken } from '../utils/GetToken.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
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
  // let [ut, setUt] = useState(null)
  const { data, setData } = useContext(DataContext)
  const [login, dataLogedUser] = useMutation(gqlLoginM)
  try {
    const [tokenDevice, setTokenDevice] = useState(null)
    useEffect(() => { GetToken().then(setTokenDevice) }, [])
    tokenUserDevice = tokenDevice
  } catch (error) {
    console.log('error getToken')
  }
  AsyncStorage.setItem('token', '')
  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={data}
      onSubmit={
          async (values) => {
            try {
              await login({
                variables:
                {
                  userName: values.nickName,
                  password: values.password,
                  userPlatform: Platform.OS,
                  idDevice: values.idDevice,
                  tokenDevice: values.idDevice,
                  loged: true
                }
              })
              // if (dataLogedUser.data) {
              // userToken = dataLogedUser.data.login.value
              // ut = userToken
              // setUt(ut)
              console.log('onSubmit')
              console.log('userToken= \n', userToken)
              values.idDevice = tokenUserDevice
              values.loged = true
              newData.loged = true
              setData({ ...values, loged: true, userToken })
              await AsyncStorage.setItem('token', userToken)
              // navigation.navigate('BottomTabs')
              // }
            } catch (error) {
              console.error(error)
              return false
            }
          }
        }
    >
      {({ handleSubmit }) => {
        if (dataLogedUser.data) {
          console.log('handleSubmit')
          // AsyncStorage.removeItem('token')
          userToken = dataLogedUser.data.login.value
          console.log('userToken= \n', userToken)
          // AsyncStorage.setItem('token', userToken)
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
