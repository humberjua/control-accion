import React, { useContext, useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  View,
  ScrollView,
  Button,
  StyleSheet,
  Platform,
  Text
} from 'react-native'
import { useForm } from 'react-hook-form'
import CustomInput from '../components/CustomInput.js'
import CustomCheckBox from '../components/CustomCheckBox.js'
import CustomSelectList from '../components/CustomSelectList.js'
// import { CustomDatePicker } from '../components/CustomDatePicker.js'
import { CIRules, CIRulesNumber } from '../components/CIRules.js'
import { ErrorText } from '../components/ErrorText.js'
import { DataContext } from '../context/DataContext.js'
import { useFindCompany } from '../hooks/companyDataQH.js'
import { useFindContract } from '../hooks/companyContractQH.js'
// import { useAllStandardJobRoles } from '../hooks/standardJobRoleQH.js'
import { useAllCompanyJobRoles } from '../hooks/companyJobRoleQH.js'
import { useAllUsersFromCompany, useAllUsers, useTotalUsersFromCompany } from '../hooks/userQH.jsx'
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker'
import CustomActivityIndicator from '../components/CustomActivityIndicator.js'
const numericKeyboard = Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'

// const phoneKeyboard = 'phone-pad'

/*
  Se debe en primer lugar, averiguar si se trata de un superUser
  o de un adminApp
*/

/*
  Mutation:addNewUser
*/

// Mutation definition from BE. All constants definitions used for useMutation hook, will have an M letter at the end
const addNewUserM = gql`
mutation AddNewUser($idEmployee: ID!, $password: String!, $firstName: String!, $lastName: String!, $nickName: String!, $email: String!, $idCompany: ID!, $companyName: String!, $idCompanyBusinessUnit: ID!, $companyBusinessUnitDescription: String!, $idCompanySector: ID!, $companySectorDescription: String!, $idStandardJobRole: ID!, $standardJobRoleDescription: String!, $idcompanyJobRole: ID!, $companyJobRoleDescription: String!, $userProfileImage: String!, $isCompanyAppAdmin: Boolean!, $hiredDate: String!, $isSuperUser: Boolean!, $secondName: String, $secondLastName: String, $phone: String, $active: Boolean, $age: Int!, $gender: String!, $birthday: String!) {
  addNewUser(idEmployee: $idEmployee, password: $password, firstName: $firstName, lastName: $lastName, nickName: $nickName, email: $email, idCompany: $idCompany, companyName: $companyName, idCompanyBusinessUnit: $idCompanyBusinessUnit, companyBusinessUnitDescription: $companyBusinessUnitDescription, idCompanySector: $idCompanySector, companySectorDescription: $companySectorDescription, idStandardJobRole: $idStandardJobRole, standardJobRoleDescription: $standardJobRoleDescription, idcompanyJobRole: $idcompanyJobRole, companyJobRoleDescription: $companyJobRoleDescription, userProfileImage: $userProfileImage, isCompanyAppAdmin: $isCompanyAppAdmin, hiredDate: $hiredDate, isSuperUser: $isSuperUser, secondName: $secondName, secondLastName: $secondLastName, phone: $phone, active: $active, age: $age, gender: $gender, birthday: $birthday) {
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
    birthday
    gender
  }
}
`

const genderList = [{ key: 'Male', value: 'Male' }, { key: 'Female', value: 'Female' }, { key: 'Other', value: 'Other' }]

export const AddNewUserScreen = (superCreator) => {
  const superUser = superCreator.superCreator
  const companySelected = superCreator.companySelected
  // const { data } = useContext(DataContext) // si no hace falta lo volamos
  const companySelectedData = useFindCompany(companySelected)
  // const allStandardJobRolesData = useAllStandardJobRoles()
  const allCompanyJobRolesData = useAllCompanyJobRoles(companySelected)
  const dataContract = useFindContract(companySelected)
  const cAAUsers = useTotalUsersFromCompany(companySelected, dataContract.hasCAAdmin) // array
  const totalUsers = useTotalUsersFromCompany(companySelected)
  console.info('************cAAUsers**********\n', cAAUsers)
  let allCJRD = [{ key: '', value: '' }]
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

  const preValues = {
    idEmployee: '',
    password: '',
    firstName: '',
    secondName: '',
    lastName: '',
    secondLastName: '',
    nickName: '',
    email: `newuser@${companySelectedData}.com`,
    phone: '',
    idCompany: companySelectedData.idCompany,
    companyName: companySelectedData.companyName,
    idCompanyBusinessUnit: companySelectedData.idCompanyBusinessUnit,
    companyBusinessUnitDescription: companySelectedData.companyBusinessUnitDescription,
    idCompanySector: companySelectedData.idCompanySector,
    companySectorDescription: companySelectedData.companySectorDescription,
    idStandardJobRole: '', // este se tiene que seleccionar de la lista, una vez seleccionado el companyJobRole
    standardJobRoleDescription: '', // este se tiene que seleccionar una vez seleccionado el companyJobRole
    idcompanyJobRole: '', // este se tiene que seleccionar de la lista, una vez seleccionado el companyJobRoleDescription
    companyJobRoleDescription: '', // este se selecciona de una lista con todos los companyJobRole cargados
    userProfileImage: '', // por ahora solo será un customInput
    isCompanyAppAdmin: false, // se llenará por un checkBox
    hiredDate: '', // este se llenará utilizando el CustomDatePicker
    active: false, // checkBox
    isSuperUser: false, // checkBox. ==> Necesita una doble confirmación para activarse. Solo podrá ser para thumDot o para cntrlA
    age: '',
    birthday: '', // este se llenará utilizando el CustomDatePicker
    gender: '' // customList con 3 opciones (Male,Female,Other)
  }
  const { control, handleSubmit, watch, formState: { errors } } = useForm(
    {
      defaultValues: preValues
    })

  const [birthday, setBirthday] = useState([])
  const [hiredDate, setHiredDate] = useState([])
  const [age, setAge] = useState(0)
  const [usersLeft, setUsersLeft] = useState(0)

  const [addNewUser] = useMutation(addNewUserM)
  const [companyJobRoleSelected, setCompanyJobRoleSelected] = useState(false)
  const [genderSelected, setGenderSelected] = useState('')
  const [showCAAUsers, setShowCAAUsers] = useState(false)
  const [showSUsers, setShowSUsers] = useState(false)
  const [allowAddNewUser, setAllowAddNewUser] = useState(false)

  useEffect(() => setShowCAAUsers((dataContract.hasCAAdmin && dataContract.amountOfCAA > cAAUsers)), [])
  useEffect(() => setShowSUsers(superUser && (dataContract.companyName === 'Thumdot' || dataContract.companyName === 'control-accion')), [])
  useEffect(() => setAllowAddNewUser(totalUsers < dataContract.amountOfUsers), [])
  useEffect(() => setAge(age), [])

  const handleBirthday = (propBirthday) => setBirthday(propBirthday)
  const handleHiredDate = (propHiredDate) => setHiredDate(propHiredDate)

  const handleAge = (birthday) => {
    let years
    let now
    try {
      now = new Date()
      const year = now.getFullYear()
      years = year - Number(String(birthday).slice(0, 4)) - 1
    } catch (error) {
      console.info(error.message)
      return 0
    }
    if (years > 1000) years = 0
    useEffect(() => setAge(years), [])
    console.info('years= ', years)
    return years
  }

  const onAddNewUserPressed = async (useFormData) => {
    try {
      await addNewUser(
        {
          variables:
            {
              ...useFormData
            }
        })
    } catch (error) {
      console.error(error.message)
    }
  }
  const today = new Date()
  const startDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM/DD')
  useEffect(() => setAge(age), [])
  return (
    <ScrollView>
      <View style={styles.root}>

        <CustomInput name='idEmployee' extraTitle='Employee Id' placeholder='✏️' control={control} rules={CIRules('Employee Id', 3)} />
        <CustomInput name='password' extraTitle='password' placeholder='✏️' control={control} rules={CIRules('password', 6)} secureTextEntry />
        <CustomInput name='firstName' extraTitle='First Name' placeholder='✏️' control={control} rules={CIRules('First Name', 3)} />
        <CustomInput name='secondName' extraTitle='Second Name' placeholder='✏️' control={control} rules={CIRules('Second Name', 3)} />
        <CustomInput name='lastName' extraTitle='Last Name' placeholder='✏️' control={control} rules={CIRules('Last Name', 3)} />
        <CustomInput name='secondLastName' extraTitle='Second Last Name' placeholder='✏️' control={control} rules={CIRules('Second Last Name', 3)} />
        <CustomInput name='nickName' extraTitle='nickname' placeholder='✏️' control={control} rules={CIRules('nickname', 3)} />
        <CustomInput name='email' extraTitle='email' placeholder='✏️' control={control} rules={CIRules('email', 8)} />
        <CustomInput name='phone' extraTitle='phone' placeholder='✏️' keyboardType={numericKeyboard} rules={CIRules('phone', 6)} control={control} />

        <CustomSelectList name='companyJobRoleDescription' control={control} data={allCJRD} setSelected={setCompanyJobRoleSelected} placeholder='Job Role' />
        <CustomSelectList name='gender' control={control} data={genderList} setSelected={setGenderSelected} placeholder='Gender' />

        <Text style={styles.text}>Birthday: 🎂 {birthday} 🎂, edad  <Text name='age' style={styles.text}>{handleAge(birthday)}</Text> </Text>
        <DatePicker mode='calendar' name='birthday' onDateChange={val => handleBirthday(val)} control={control} />

        <Text style={styles.text}>Hired date: 🏭 {hiredDate} 🏭 </Text>
        <DatePicker mode='calendar' name='hiredDate' onDateChange={val => handleHiredDate(val)} selected={startDate} control={control} />

        <CustomInput name='userProfileImage' extraTitle='Select URI from user Profile Image' placeholder='✏️' rules={CIRules('userProfileImage', 3, true)} control={control} />
        {
          showCAAUsers && <CustomCheckBox name='isCompanyAppAdmin' control={control} title='Is company App Admin?' />
        }
        {
          showSUsers && <CustomCheckBox name='isSuperUser' control={control} title='Is Super User ??' />
        }
        <CustomCheckBox name='active' control={control} title='Is this user active?' />
        <ErrorText errors={errors} />
        {
          allowAddNewUser && <Button onPress={onAddNewUserPressed} disabled={!allowAddNewUser} title={`Add New ${dataContract.companyName} User`} />
        }
      </View>

    </ScrollView>
  )
}

/*
  Mutation:editUser
*/

// Mutation definition from BE. All constants definitions used for useMutation hook, will have an M letter at the end
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

// Este Screen está incompleto
export const EditUserScreen = (superCreator) => {
  const superUser = superCreator.superCreator
  const companySelected = superCreator.companySelected
  const allCompanyJobRolesData = useAllCompanyJobRoles(companySelected) // llena el CustomSelectList de los Job Roles
  const dataContract = useFindContract(companySelected) // trae toda la información del contrato de esa empresa
  const cAAUsers = useTotalUsersFromCompany(companySelected, dataContract.hasCAAdmin) // devuelve la cantidad de usuarios CAAdmin de la empresa seleccionada
  const totalUsers = useTotalUsersFromCompany(companySelected) // la cantidad total de usuarios que tiene la empresa seleccionada
  const usersFromCompany = useAllUsersFromCompany(companySelected) // Arreglo con todos los usuarios que tiene actulamente cargados esa empresa seleccionada

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

  let allUsersFromCompany = [{ key: '', value: '' }]
  if (usersFromCompany !== undefined) {
    try {
      allUsersFromCompany = usersFromCompany.map(el => {
        return (
          {
            key: `${el.fullName} | ${el.nickName}`,
            value: `${el.fullName} | ${el.nickName}`
          }
        )
      })
    } catch (error) {
    }
  }

  const [userSelected, setUserSelected] = useState('') // para saber cual es el usuario que se seleccionó para editar sus datos

  const [birthday, setBirthday] = useState([])
  const [hiredDate, setHiredDate] = useState([])
  const [age, setAge] = useState(0)
  const [usersLeft, setUsersLeft] = useState(0) // para saber cuantos usuarios aún se pueden cargar por contrato para la empresa seleccionada

  console.info('========================================', userSelected)

  const { control, handleSubmit, watch, formState: { errors } } = useForm(
    {
      defaultValues: { ...userSelected }
    })

  const [companyJobRoleSelected, setCompanyJobRoleSelected] = useState(false)
  const [genderSelected, setGenderSelected] = useState('')
  const [showCAAUsers, setShowCAAUsers] = useState(false)
  const [showSUsers, setShowSUsers] = useState(false)

  useEffect(() => setShowCAAUsers((dataContract.hasCAAdmin && dataContract.amountOfCAA > cAAUsers)), [])
  useEffect(() => setShowSUsers(superUser && (dataContract.companyName === 'Thumdot' || dataContract.companyName === 'control-accion')), [])
  useEffect(() => setAge(age), [])

  const handleBirthday = (propBirthday) => setBirthday(propBirthday)
  const handleHiredDate = (propHiredDate) => setHiredDate(propHiredDate)

  const handleAge = (birthday) => {
    let years
    let now
    try {
      now = new Date()
      const year = now.getFullYear()
      years = year - Number(String(birthday).slice(0, 4)) - 1
    } catch (error) {
      console.info(error.message)
      return 0
    }
    if (years > 1000) years = 0
    useEffect(() => setAge(years), [])
    console.info('years= ', years)
    return years
  }

  const [editUser] = useMutation(editUserM)
  useEffect(() => setUserSelected(userSelected), [])

  const onEditSelectedUserPressed = async (useFormData) => {
    try {
      await editUser(
        {
          variables:
          {
            ...useFormData
          }
        })
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        <CustomSelectList name='usersFromCompany' control={control} data={allUsersFromCompany} setSelected={setUserSelected} placeholder='🔽 Select user' />
        {
          userSelected && (
            <>
              <CustomInput name='idEmployee' extraTitle='Employee Id' placeholder='✏️' control={control} rules={CIRules('Employee Id', 3)} />
              <CustomInput name='password' extraTitle='password' placeholder='✏️' control={control} rules={CIRules('password', 6)} secureTextEntry />
              <CustomInput name='firstName' extraTitle='First Name' placeholder='✏️' control={control} rules={CIRules('First Name', 3)} />
              <CustomInput name='secondName' extraTitle='Second Name' placeholder='✏️' control={control} rules={CIRules('Second Name', 3)} />
              <CustomInput name='lastName' extraTitle='Last Name' placeholder='✏️' control={control} rules={CIRules('Last Name', 3)} />
              <CustomInput name='secondLastName' extraTitle='Second Last Name' placeholder='✏️' control={control} rules={CIRules('Second Last Name', 3)} />
              <CustomInput name='nickName' extraTitle='nickname' placeholder='✏️' control={control} rules={CIRules('nickname', 3)} />
              <CustomInput name='email' extraTitle='email' placeholder='✏️' control={control} rules={CIRules('email', 8)} />
              <CustomInput name='phone' extraTitle='phone' placeholder='✏️' keyboardType={numericKeyboard} rules={CIRules('phone', 6)} control={control} />

              <CustomSelectList name='companyJobRoleDescription' control={control} data={allCJRD} setSelected={setCompanyJobRoleSelected} placeholder='Job Role' />
              <CustomSelectList name='gender' control={control} data={genderList} setSelected={setGenderSelected} placeholder='Gender' />

              {/* <Text style={styles.text}>Birthday: 🎂 {birthday} 🎂, edad  <Text name='age' style={styles.text}>{handleAge(birthday)}</Text> </Text> */}
              {/* <DatePicker mode='calendar' name='birthday' onDateChange={val => handleBirthday(val)} control={control} /> */}

              {/* <Text style={styles.text}>Hired date: 🏭 {hiredDate} 🏭 </Text> */}
              {/* <DatePicker mode='calendar' name='hiredDate' onDateChange={val => handleHiredDate(val)} selected={hiredDate} control={control} /> */}

              <CustomInput name='userProfileImage' extraTitle='Select URI from user Profile Image' placeholder='✏️' rules={CIRules('userProfileImage', 3, true)} control={control} />
              {
                showCAAUsers && <CustomCheckBox name='isCompanyAppAdmin' control={control} title='Is company App Admin?' />
              }
              {
                showSUsers && <CustomCheckBox name='isSuperUser' control={control} title='Is Super User ??' />
              }
              <CustomCheckBox name='active' control={control} title='Is this user active?' />
              <ErrorText errors={errors} />

              <Button title='Save changes... 👷‍♀️' onPress={handleSubmit(onEditSelectedUserPressed)} />

            </>
          )
        }
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    alignContent: 'flex-start',
    alignItems: 'center',
    padding: 20
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
  }
})
