import React, { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import { View, Button, StyleSheet, Platform, Alert, Image, Pressable } from 'react-native'
import { useForm } from 'react-hook-form'
import CustomInput from '../components/CustomInput.js'
import CustomCheckBox from '../components/CustomCheckBox.js'
import CustomSelectList from '../components/CustomSelectList.js'
import { CIRules } from '../components/CIRules.js'
import { ErrorText } from '../components/ErrorText.js'

import { useFindContract } from '../hooks/companyContractQH.js'
import { useAllCompanyJobRoles } from '../hooks/companyJobRoleQH.js'
import { useTotalUsersFromCompany } from '../hooks/userQH.jsx'

import * as ImagePicker from 'expo-image-picker'
// import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker'
import CustomActivityIndicator from '../components/CustomActivityIndicator.js'
const numericKeyboard = Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'

const genderList = [{ key: 'Male', value: 'Male' }, { key: 'Female', value: 'Female' }, { key: 'Other', value: 'Other' }]
const editUserM = gql`
mutation EditUser($idUser: ID!, $password: String, $firstName: String, $secondName: String, $lastName: String, $secondLastName: String, $nickName: String, $email: String, $phone: String, $idCompany: ID, $companyName: String, $idCompanyBusinessUnit: ID, $companyBusinessUnitDescription: String, $idCompanySector: ID, $companySectorDescription: String, $idStandardJobRole: ID, $standardJobRoleDescription: String, $idcompanyJobRole: ID, $companyJobRoleDescription: String, $userProfileImage: String, $isCompanyAppAdmin: Boolean, $hiredDate: String, $active: Boolean, $isSuperUser: Boolean, $age: Int, $gender: String, $birthday: String) {
  editUser(idUser: $idUser, password: $password, firstName: $firstName, secondName: $secondName, lastName: $lastName, secondLastName: $secondLastName, nickName: $nickName, email: $email, phone: $phone, idCompany: $idCompany, companyName: $companyName, idCompanyBusinessUnit: $idCompanyBusinessUnit, companyBusinessUnitDescription: $companyBusinessUnitDescription, idCompanySector: $idCompanySector, companySectorDescription: $companySectorDescription, idStandardJobRole: $idStandardJobRole, standardJobRoleDescription: $standardJobRoleDescription, idcompanyJobRole: $idcompanyJobRole, companyJobRoleDescription: $companyJobRoleDescription, userProfileImage: $userProfileImage, isCompanyAppAdmin: $isCompanyAppAdmin, hiredDate: $hiredDate, active: $active, isSuperUser: $isSuperUser, age: $age, gender: $gender, birthday: $birthday) {
    idUser
    idEmployee
    password
    firstName
    secondName
    lastName
    secondLastName
    nickName
    email
    phone
    idCompany
    fullName
    companyName
    idCompanyBusinessUnit
    companyBusinessUnitDescription
    idCompanySector
    companySectorDescription
    idStandardJobRole
    standardJobRoleDescription
    idcompanyJobRole
    companyJobRoleDescription
    userProfileImage
    isCompanyAppAdmin
    hiredDate
    active
    isSuperUser
    age
    gender
    birthday
  }
}
`

export const UserMeditScreen = ({ defaultValues, superUser, companySelected }) => {
  const allCompanyJobRolesData = useAllCompanyJobRoles(companySelected) // llena el CustomSelectList de los Job Roles
  const dataContract = useFindContract(companySelected) // trae toda la información del contrato de esa empresa
  const cAAUsers = useTotalUsersFromCompany(companySelected, dataContract.hasCAAdmin) // devuelve la cantidad de usuarios CAAdmin de la empresa seleccionada
  const [load, setLoad] = useState(true)

  const [values, setValues] = useState(defaultValues)
  useEffect(() => setValues(values), [values])

  const { control, handleSubmit, watch, formState: { errors } } = useForm(
    {
      defaultValues: values
    })
  const userProfileImage = watch('userProfileImage')
  let allCJRD = [{ key: '', value: '' }] // este será el objeto que llenará el CustomSelectList de job roles
  if (allCompanyJobRolesData !== undefined) {
    try {
      allCJRD = allCompanyJobRolesData.map(el => {
        return (
          {
            key: el.companyJobRoleDescription,
            value: el.companyJobRoleDescription
          }
        )
      })
    } catch (error) {
    }
  }

  // const [hiredDate, setHiredDate] = useState([])
  const [editUser] = useMutation(editUserM)
  const [companyJobRoleSelected, setCompanyJobRoleSelected] = useState(false)
  const [genderSelected, setGenderSelected] = useState(defaultValues.gender)
  const [showCAAUsers, setShowCAAUsers] = useState(false)
  const [showSUsers, setShowSUsers] = useState(false)
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [image, setImage] = useState(userProfileImage)

  useEffect(() => setShowCAAUsers((dataContract.hasCAAdmin && dataContract.amountOfCAA > cAAUsers)), [])
  useEffect(() => setShowSUsers(superUser && (dataContract.companyName === 'Thumdot' || dataContract.companyName === 'control-accion')), [])
  // const handleHiredDate = (propHiredDate) => setHiredDate(propHiredDate)
  useEffect(() => setLoad(false), [])

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasGalleryPermission(galleryStatus.status === 'granted')
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync()
      setHasCameraPermission(cameraStatus.status === 'granted')
    })()
  }, [])

  const handleChangeImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })
    // console.log(result)
    try {
      if (!result.canceled && hasGalleryPermission) {
        setImage(result.assets[0].uri)
      }
    } catch (error) {
      console.info(error)
    }
  }
  const handleChangeImageFromCamera = async () => {
    const result2 = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })
    // console.log(result2)

    if (!result2.canceled && hasCameraPermission) {
      try {
        setImage(result2.assets[0].uri)
      } catch (error) {
        console.info(error)
      }
    }
  }
  // const startDate = getFormatedDate(hiredDate, 'YYYY/MM/DD')
  const onEditSelectedUserPressed = async (useFormData) => {
    // Antes de ejecutar la mutación se deberá cargar la imagen en AWS, leer la nueva ubicación y colocarla como la nueva userProfileImage (uri)
    // Y además hay que verificar que efectivamente se modificó el password, si es el caso, antes de actualizarlo, hay que hashearlo y además debería
    // abrirse un prompt preguntando para que se repita el password y verificar que se haya escrito bien
    setLoad(true)
    try {
      await editUser(
        {
          variables: {
            idEmployee: useFormData.idEmployee,
            password: useFormData.password,
            firstName: useFormData.firstName,
            secondName: useFormData.secondName,
            lastName: useFormData.lastName,
            secondLastName: useFormData.secondLastName,
            nickName: useFormData.nickName,
            email: useFormData.email,
            phone: useFormData.phone,
            idCompany: useFormData.idCompany,
            fullName: useFormData.fullName,
            companyName: useFormData.companyName,
            idCompanyBusinessUnit: useFormData.idCompanyBusinessUnit,
            companyBusinessUnitDescription: useFormData.companyBusinessUnitDescription,
            idCompanySector: useFormData.idCompanySector,
            companySectorDescription: useFormData.companySectorDescription,
            idStandardJobRole: useFormData.idStandardJobRole,
            standardJobRoleDescription: useFormData.standardJobRoleDescription,
            idcompanyJobRole: useFormData.idcompanyJobRole,
            companyJobRoleDescription: useFormData.companyJobRoleDescription,
            userProfileImage: useFormData.userProfileImage,
            isCompanyAppAdmin: useFormData.isCompanyAppAdmin,
            hiredDate: useFormData.hiredDate,
            active: useFormData.active,
            isSuperUser: useFormData.isSuperUser,
            age: useFormData.age,
            gender: useFormData.gender,
            birthday: useFormData.birthday
          }
        }
      )
      setLoad(false)
      Alert.alert('💪', 'data succesfully updated...')
    } catch (error) {
      setLoad(false)
      console.log(error)
    }
  }

  return (
    <View style={styles.root}>
      <CustomInput name='idEmployee' extraTitle='Employee Id' placeholder='✏️' control={control} rules={CIRules('idEmployee', 3)} />
      <CustomInput name='password' extraTitle='password' placeholder='✏️' control={control} rules={CIRules('password', 6)} secureTextEntry />
      <CustomInput name='firstName' extraTitle='First Name' placeholder='✏️' control={control} rules={CIRules('First Name', 3)} />
      <CustomInput name='secondName' extraTitle='Second Name' placeholder='✏️' control={control} rules={CIRules('Second Name', 3)} />
      <CustomInput name='lastName' extraTitle='Last Name' placeholder='✏️' control={control} rules={CIRules('Last Name', 3)} />
      <CustomInput name='secondLastName' extraTitle='Second Last Name' placeholder='✏️' control={control} rules={CIRules('Second Last Name', 3)} />
      <CustomInput name='nickName' extraTitle='nickname' placeholder='✏️' control={control} rules={CIRules('nickname', 3)} />
      <CustomInput name='email' extraTitle='email' placeholder='✏️' control={control} rules={CIRules('email', 8)} />
      <CustomInput name='phone' extraTitle='phone' placeholder='✏️' keyboardType={numericKeyboard} rules={CIRules('phone', 6)} control={control} />
      <Pressable
        onPress={handleChangeImageFromGallery}
        onLongPress={() => {
          Alert.alert('', 'Select an option:', [
            {
              text: 'Internal Storage',
              onPress: handleChangeImageFromGallery
            },
            {
              text: 'Camera',
              onPress: handleChangeImageFromCamera
            },
            {
              text: 'Cancel',
              // onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            }
          ])
        }}
        style={({ pressed }) => {
          return { opacity: pressed ? 0.2 : 1 }
        }}
      >
        <Image
          style={styles.image}
          source={{
            uri: image
          }}
        />
      </Pressable>

      <CustomSelectList name='companyJobRoleDescription' control={control} data={allCJRD} setSelected={setCompanyJobRoleSelected} placeholder='Job Role' />
      <CustomSelectList name='gender' control={control} data={genderList} setSelected={setGenderSelected} placeholder='Gender' />

      {
        showCAAUsers && <CustomCheckBox name='isCompanyAppAdmin' control={control} title='Is company App Admin?' />
      }
      {
        showSUsers && <CustomCheckBox name='isSuperUser' control={control} title='Is Super User ??' />
      }
      <CustomCheckBox name='active' control={control} title='Is this user active?' />
      <ErrorText errors={errors} />
      <Button title='Save changes... 👷‍♀️' onPress={handleSubmit(onEditSelectedUserPressed)} />
      <CustomActivityIndicator visible={load} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 0
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 400
  },
  text: {
    alignContent: 'flex-start',
    alignItems: 'center',
    color: 'rgb(160,0,50)'
  },
  selectList: {
    backgroundColor: 'white',
    width: '100%',
    flex: 0,
    flexDirection: 'column',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'stretch',
    alignContent: 'flex-end',
    alignSelf: 'auto',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'rgb(225,225,225)',
    alignItems: 'center',
    marginHorizontal: 150
  }
})

/*
      <Text style={styles.text}>Birthday: 🎂 {birthday} 🎂, edad  <Text name='age' style={styles.text}>{handleAge(birthday)}</Text> </Text>
      <DatePicker mode='calendar' name='birthday' onDateChange={val => handleBirthday(val)} control={control} />
      <Text style={styles.text}>Hired date: 🏭 {getFormatedDate(new Date(Number(hiredDate)), 'YYYY/MM/DD')} 🏭 </Text>
      <DatePicker mode='calendar' name='hiredDate' onDateChange={val => handleHiredDate(val)} selected={startDate} control={control} />
      <CustomInput name='userProfileImage' extraTitle='Select URI from user Profile Image' placeholder='✏️' rules={CIRules('userProfileImage', 3, true)} control={control} />
*/
