import React, { useState, useEffect } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import { View, ScrollView, Button, StyleSheet, Text, Alert } from 'react-native' // {Platform}
import { useForm } from 'react-hook-form'
import CustomInput from '../components/CustomInput.js'
import CustomCheckBox from '../components/CustomCheckBox.js'
import CustomSelectList from '../components/CustomSelectList.js'
import { CIRules } from '../components/CIRules.js'
import { ErrorText } from '../components/ErrorText.js'
import { useFindCompany } from '../hooks/companyDataQH.js'
import { useFindContract } from '../hooks/companyContractQH.js'
import { useAllCompanySectors } from '../hooks/companySectorQ.js'
import { useAllCompanyJobRoles } from '../hooks/companyJobRoleQH.js'
import { useAllUsersFromCompany, useTotalUsersFromCompany } from '../hooks/userQH.jsx'
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker'
import CustomActivityIndicator from '../components/CustomActivityIndicator.js'
import { UserMeditScreen } from '../apmutations/userMEdit.jsx'
import { SelectList } from 'react-native-dropdown-select-list'
import { BusinessUnitsFrom } from '../apqueries/companyBusinessUnitQ.jsx'
import { useAllStandardJobRoles } from '../hooks/standardJobRoleQH.js'
// const numericKeyboard = Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'

// const phoneKeyboard = 'phone-pad'

/*
  Mutation:addNewUser
*/

// Mutation definition from BE. All constants definitions used for useMutation hook, will have an M letter at the end
const addNewUserM = gql`
mutation AddNewUser($idEmployee: ID!, $password: String!, $firstName: String!, $lastName: String!, $nickName: String!, $email: String!, $idCompany: ID!, $companyName: String!, $idCompanyBusinessUnit: ID!, $companyBusinessUnitDescription: String!, $idCompanySector: ID!, $companySectorDescription: String!, $idStandardJobRole: ID!, $standardJobRoleDescription: String!, $idcompanyJobRole: ID!, $companyJobRoleDescription: String!, $userProfileImage: String!, $isCompanyAppAdmin: Boolean!, $hiredDate: String!, $isSuperUser: Boolean!, $secondName: String, $secondLastName: String, $phone: String, $active: Boolean, $age: Int!, $gender: String!, $birthday: String!) {
  addNewUser(idEmployee: $idEmployee, password: $password, firstName: $firstName, lastName: $lastName, nickName: $nickName, email: $email, idCompany: $idCompany, companyName: $companyName, idCompanyBusinessUnit: $idCompanyBusinessUnit, companyBusinessUnitDescription: $companyBusinessUnitDescription, idCompanySector: $idCompanySector, companySectorDescription: $companySectorDescription, idStandardJobRole: $idStandardJobRole, standardJobRoleDescription: $standardJobRoleDescription, idcompanyJobRole: $idcompanyJobRole, companyJobRoleDescription: $companyJobRoleDescription, userProfileImage: $userProfileImage, isCompanyAppAdmin: $isCompanyAppAdmin, hiredDate: $hiredDate, isSuperUser: $isSuperUser, secondName: $secondName, secondLastName: $secondLastName, phone: $phone, active: $active, age: $age, gender: $gender, birthday: $birthday) {    
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
const addNewUserConfigurationM = gql`
mutation AddNewUserConfiguration($idUser: ID!, $idEmployee: ID!, $password: String!, $firstName: String!, $lastName: String!, $nickName: String!, $email: String!, $idCompany: ID!, $companyName: String!, $idCompanyBusinessUnit: ID!, $companyBusinessUnitDescription: String!, $idCompanySector: ID!, $companySectorDescription: String!, $idStandardJobRole: ID!, $standardJobRoleDescription: String!, $idcompanyJobRole: ID!, $companyJobRoleDescription: String!, $userProfileImage: String!, $theme: String!, $showNotificationsToLevel: Int!, $secondName: String, $secondLastName: String, $phone: String, $optionConfiguration1: String, $optionConfiguration2: String, $optionConfiguration3: String, $personalPhone: String, $personalEmail: String, $personalAddress: String, $aboutMe: String) {
  addNewUserConfiguration(idUser: $idUser, idEmployee: $idEmployee, password: $password, firstName: $firstName, lastName: $lastName, nickName: $nickName, email: $email, idCompany: $idCompany, companyName: $companyName, idCompanyBusinessUnit: $idCompanyBusinessUnit, companyBusinessUnitDescription: $companyBusinessUnitDescription, idCompanySector: $idCompanySector, companySectorDescription: $companySectorDescription, idStandardJobRole: $idStandardJobRole, standardJobRoleDescription: $standardJobRoleDescription, idcompanyJobRole: $idcompanyJobRole, companyJobRoleDescription: $companyJobRoleDescription, userProfileImage: $userProfileImage, theme: $theme, showNotificationsToLevel: $showNotificationsToLevel, secondName: $secondName, secondLastName: $secondLastName, phone: $phone, optionConfiguration1: $optionConfiguration1, optionConfiguration2: $optionConfiguration2, optionConfiguration3: $optionConfiguration3, personalPhone: $personalPhone, personalEmail: $personalEmail, personalAddress: $personalAddress, aboutMe: $aboutMe) {
    idUserConfiguration
    idUser
    idEmployee
    firstName
    secondName
    lastName
    secondLastName
    nickName
    email
    phone
    idCompany
    companyName
    idCompanyBusinessUnit
    companyBusinessUnitDescription
    idStandardJobRole
    standardJobRoleDescription
    idCompanySector
    companySectorDescription
    idcompanyJobRole
    companyJobRoleDescription
    userProfileImage
    theme
    showNotificationsToLevel
    optionConfiguration1
    optionConfiguration2
    optionConfiguration3
    personalPhone
    personalEmail
    personalAddress
    aboutMe
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
  const cAAUsers = useTotalUsersFromCompany(companySelected, dataContract.hasCAAdmin)
  const totalUsers = useTotalUsersFromCompany(companySelected)
  const allCompanySectors = useAllCompanySectors(companySelected)
  const allBUFromCompany = BusinessUnitsFrom({ companyName: companySelected })
  const standardJobRoleData = useAllStandardJobRoles()

  /*
    populate dropdown lists
  */

  // All Business Units From Company
  let allBUFC = [{ key: '', value: '' }]

  if (allBUFromCompany !== undefined) {
    try {
      allBUFC = allBUFromCompany.map(el => {
        return (
          {
            key: el.idCompanyBusinessUnit,
            value: el.companyBusinessUnitDescription
          }
        )
      })
    } catch (error) {}
  }

  // All Company Job Roles
  let allCJRD = [{ key: '', value: '' }]

  if (allCompanyJobRolesData !== undefined && allCompanyJobRolesData !== 'Loading...') {
    try {
      allCJRD = allCompanyJobRolesData.map(el => {
        return (
          {
            key: el.idCompanyJobRole,
            value: el.companyJobRoleDescription
          }
        )
      })
    } catch (error) {}
  }

  // All Company Sectors
  let allCS = [{ key: '', value: '' }]

  if (allCompanySectors !== undefined && allCompanySectors !== 'Loading...') {
    try {
      allCS = allCompanySectors.map(el => {
        return (
          {
            key: el.idCompanySector,
            value: el.companySectorDescription
          }
        )
      })
    } catch (error) {}
  }

  let allSJR = [{ key: '', value: '' }]
  if (standardJobRoleData !== undefined && standardJobRoleData !== 'Loading...') {
    try {
      allSJR = standardJobRoleData.map(el => {
        return (
          {
            key: el.idStandardJobRole,
            value: el.standardJobRoleDescription
          }
        )
      })
    } catch {}
  }

  // Populate pre values for Add New User Screen
  const [preValues, setPreValues] = useState(
    {
      idEmployee: '',
      password: '',
      firstName: '',
      secondName: '',
      lastName: '',
      secondLastName: '',
      nickName: '',
      email: companySelectedData !== undefined
        ? companySelectedData?.headQuartersMainContactEmail?.toString().slice(companySelectedData?.headQuartersMainContactEmail?.toString().indexOf('@', 0), companySelectedData?.headQuartersMainContactEmail?.toString().length)
        : '',
      phone: '',
      idCompany: companySelectedData?.idCompany,
      companyName: companySelectedData?.companyName,
      idCompanyBusinessUnit: companySelectedData?.idCompanyBusinessUnit,
      companyBusinessUnitDescription: companySelectedData?.companyBusinessUnitDescription,
      idCompanySector: companySelectedData?.idCompanySector,
      companySectorDescription: companySelectedData?.companySectorDescription,
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
  )

  // Calling useForm
  const { control, handleSubmit, watch, formState: { errors } } = useForm(
    {
      defaultValues: preValues
    })

  const [birthday, setBirthday] = useState(watch('birthday'))
  const [hiredDate, setHiredDate] = useState(watch('hiredDate'))
  const [age, setAge] = useState(watch('age'))
  const [usersLeft, setUsersLeft] = useState(0)
  const [addNewUser, dataNewUser] = useMutation(addNewUserM)
  const [addNewUserConfiguration, dataNewUserConfiguration] = useMutation(addNewUserConfigurationM)
  const [companyJobRole, setCompanyJobRole] = useState(false)
  const [gender, setGender] = useState('')
  const [showCAAUsers, setShowCAAUsers] = useState(false)
  const [showSUsers, setShowSUsers] = useState(false)
  const [allowAddNewUser, setAllowAddNewUser] = useState(false)
  const [companyBusinessUnit, setCompanyBusinessUnit] = useState('')
  const [companySector, setCompanySector] = useState(watch('companySectorDescription'))
  const [save, setSave] = useState(false)
  const [email, setEmail] = useState(watch('email'))
  const [stdJR, setStdJR] = useState('')

  const handleBirthday = (propBirthday) => {
    setBirthday(propBirthday)
    setAge(age)
  }
  const handleHiredDate = (propHiredDate) => setHiredDate(propHiredDate)

  useEffect(() => {
    setShowCAAUsers((dataContract.hasCAAdmin && dataContract.amountOfCAA > cAAUsers))
    setShowSUsers(superUser && (dataContract.companyName === 'Thumdot' || dataContract.companyName === 'control-accion'))
    setAllowAddNewUser(totalUsers < dataContract.amountOfUsers)
    setAge(Number(age))
    setUsersLeft(dataContract.amountOfUsers - totalUsers)
    setPreValues({ ...preValues })

    setCompanyJobRole(companyJobRole)
    setCompanySector(companySector)
    setGender(gender)
    setCompanyBusinessUnit(companyBusinessUnit)
    setHiredDate(hiredDate)
    setEmail(email)
    setStdJR(stdJR)
  }, [])

  useEffect(() => setAge(Number(age)), [birthday])

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
    useEffect(() => setAge(Number(years)), [birthday])
    return Number(years)
  }
  const onAddNewUserPressed = async (useFormData) => {
    setSave(true)
    console.info('useFormData\n', useFormData)
    try {
      await addNewUser(
        {
          variables:
            {
              ...useFormData,
              idcompanyJobRole: allCJRD.find(() => companyJobRole).key,
              idCompanyBusinessUnit: allBUFC.find(() => companyBusinessUnit).key,
              idCompanySector: allCS.find(() => companySector).key,
              birthday,
              companyBusinessUnitDescription: companyBusinessUnit,
              companyJobRoleDescription: companyJobRole,
              companySectorDescription: companySector,
              gender,
              hiredDate,
              idStandardJobRole: allSJR.find(() => stdJR).key,
              standardJobRoleDescription: stdJR,
              age: Number(age)
            }
        })
      const dNU = await dataNewUser?.data?.addNewUser?.idUser
      try {
        await addNewUserConfiguration(
          {
            variables:
            {
              idUser: String(dNU),
              ...dataNewUser,
              showNotificationsToLevel: 3,
              optionConfiguration1: '',
              optionConfiguration2: '',
              optionConfiguration3: '',
              theme: 'light',
              personalPhone: '',
              personalEmail: '',
              personalAddress: '',
              aboutMe: ''
            }
          }
        )
      } catch (error) {
        setSave(error)
        console.error(error.message)
      }
      setSave(false)
      console.info('dataNewUserConfiguration\n', dataNewUserConfiguration)
      Alert.alert('New user added 💪')
    } catch (error) {
      setSave(false)
      console.error(error.message)
    }
  }
  const today = new Date()
  const startDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM/DD')
  return (
    <ScrollView>
      <View style={styles.root}>

        <CustomInput name='idEmployee' extraTitle='Employee Id' placeholder='✏️' control={control} rules={CIRules('Employee Id', 3)} />
        <CustomInput name='password' extraTitle='password' placeholder='✏️' control={control} rules={CIRules('password', 5)} secureTextEntry />
        <CustomInput name='firstName' extraTitle='First Name' placeholder='✏️' control={control} rules={CIRules('First Name', 3)} />
        <CustomInput name='secondName' extraTitle='Second Name' placeholder='✏️' control={control} rules={CIRules('Second Name', 0)} />
        <CustomInput name='lastName' extraTitle='Last Name' placeholder='✏️' control={control} rules={CIRules('Last Name', 3)} />
        <CustomInput name='secondLastName' extraTitle='Second Last Name' placeholder='✏️' control={control} rules={CIRules('Second Last Name', 0)} />
        <CustomInput name='nickName' extraTitle='nickname' placeholder='✏️' control={control} rules={CIRules('nickname', 3)} />
        <CustomInput name='email' extraTitle='email' placeholder='✏️' control={control} rules={CIRules('email', 8)} />
        <CustomInput name='phone' extraTitle='phone' placeholder='✏️' control={control} rules={CIRules('phone', 6)} />
        {companySector !== undefined && <Text>Company Sector:</Text>}
        <CustomSelectList name='companySectorDescription' control={control} data={allCS} setSelected={setCompanySector} placeholder='🔠 CompanySector' />
        {stdJR !== '' && <Text>Standard Job Role:</Text>}
        <CustomSelectList name='standardJobRoleDescription' control={control} data={allSJR} setSelected={setStdJR} placeholder='📦 Standard Job Role' />
        {companyJobRole && <Text>Company Job Role:</Text>}
        <CustomSelectList name='companyJobRoleDescription' control={control} data={allCJRD} setSelected={setCompanyJobRole} placeholder='💼 Company Job Role' />
        {gender !== '' && <Text>Gender:</Text>}
        <CustomSelectList name='gender' control={control} data={genderList} setSelected={setGender} placeholder='👤 Gender' />
        {companyBusinessUnit !== '' && <Text>Company Business Unit:</Text>}
        <CustomSelectList name='companyBusinessUnitDescription' control={control} data={allBUFC} setSelected={setCompanyBusinessUnit} placeholder='🏢 Company Business Unit' />

        <Text style={styles.text}>Birthday: 🎂 {birthday} 🎂, edad  <Text control={control} name='age' style={styles.text}>{handleAge(birthday)}</Text> </Text>
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
        <CustomActivityIndicator visible={save} />
        {
          allowAddNewUser && <Button onPress={handleSubmit(onAddNewUserPressed)} disabled={!allowAddNewUser} title={`Add New User 👷, ${usersLeft} left`} />
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
          }}
          placeholder='🔽 Select user'
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
