import React, { useState, useEffect } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
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
import { CIRules } from '../components/CIRules.js'
import { ErrorText } from '../components/ErrorText.js'
import { useFindCompany } from '../hooks/companyDataQH.js'
import { useFindContract } from '../hooks/companyContractQH.js'
import { useAllCompanyJobRoles } from '../hooks/companyJobRoleQH.js'
import { useAllUsersFromCompany, useTotalUsersFromCompany } from '../hooks/userQH.jsx'
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker'
import CustomActivityIndicator from '../components/CustomActivityIndicator.js'
import { UserMeditScreen } from '../apmutations/userMEdit.jsx'
import { SelectList } from 'react-native-dropdown-select-list'
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
  const companySelectedData = useFindCompany(companySelected)
  const allCompanyJobRolesData = useAllCompanyJobRoles(companySelected)
  const dataContract = useFindContract(companySelected)
  const cAAUsers = useTotalUsersFromCompany(companySelected, dataContract.hasCAAdmin) // array
  const totalUsers = useTotalUsersFromCompany(companySelected)
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
    // console.info('years= ', years)
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

const findUserQ = gql`
query FindUser($nickName: String!) {
  findUser(nickName: $nickName) {
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
    gender
  }
}

`

export const EditUserScreen = (superCreator) => {
  const superUser = superCreator.superCreator
  const companySelected = superCreator.companySelected
  const usersFromCompany = useAllUsersFromCompany(companySelected) // Arreglo con todos los usuarios que tiene actulamente cargados esa empresa seleccionada

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
  const [defaultValues, setDefaultValues] = useState({})
  const [getDataFromSelectedUser, dataFromSelectedUser] = useLazyQuery(findUserQ)

  useEffect(() => {
    if (dataFromSelectedUser.data) {
      setDefaultValues(dataFromSelectedUser.data.findUser)
    }
  }, [dataFromSelectedUser.data])
  return (
    <ScrollView>
      <View>
        <SelectList
          boxStyles={{ backgroundColor: 'lightgray' }}
          inputStyles={{ fontSize: 14 }}
          dropdownStyles={{ backgroundColor: 'lightgray' }}
          dropdownItemStyles={{ marginHorizontal: 10 }}
          dropdownTextStyles={{ color: 'black' }}
          name='allUsersFromCompany'
          data={allUsersFromCompany}
          save='value'
          onSelect={() => {
            setDefaultValues({})
          }}
          setSelected={(val) => {
            getDataFromSelectedUser({ variables: { nickName: val.slice(val.indexOf(' | ', 0) + 3) } })
            setUserSelected(val.slice(val.indexOf(' | ', 0) + 3))
          }} placeholder='🔽 Select user'
        />
        {
          userSelected && defaultValues.idUser && <UserMeditScreen defaultValues={defaultValues} superUser={superUser} companySelected={companySelected} />
        }
      </View>

    </ScrollView>
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
    backgroundColor: 'lightgray',
    width: '80%',
    flex: 0,

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 0,
    marginVertical: 5

  }
})
