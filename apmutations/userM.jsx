import { gql, useMutation } from '@apollo/client'
import {
  View,
  ScrollView,
  Button,
  StyleSheet,
  Platform
} from 'react-native'
import { useForm } from 'react-hook-form'
import CustomInput from '../components/CustomInput.js'
import CustomCheckBox from '../components/CustomCheckBox.js'
import CustomPicker from '../components/CustomPicker.js'
import { CIRules, CIRulesNumber } from '../components/CIRules.js'
import { ErrorText } from '../components/ErrorText.js'

const numericKeyboard = Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'
// const phoneKeyboard = 'phone-pad'

/*
  Se debe en primer lugar, averiguar si se trata de un superUser
  de un adminApp o de un usuario común
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

export const AddNewUserScreen = ({ creatorData }) => {
// within creatorData comes the following information:
// isSuperUser ? list of companies from wich selection comes
// list of sectors, list of companyJobRoleDescription
// and if not, the name of the selected company with there own data
  const preValues = {

  }
  const { control, handleSubmit, watch, formState: { errors } } = useForm(
    {
      defaultValues: preValues
    })

  const [addNewUser] = useMutation(addNewUserM)

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
  const firstName = watch('firstName')
  const secondName = watch('secondName')
  const lastName = watch('lastName')
  const secondLastName = watch('secondLastName')
  // let fullName = watch('fullName')
  const fullName = `${lastName} ${secondLastName === null ? '' : ' ' + secondLastName}, ${firstName} + ${secondName === null ? '' : secondName}`
  return (
    <ScrollView>
      <View style={styles.root}>
        {/* <Image
          source={Logo} // We need a logo
          style={[styles.logo, {height: height*0.3}]}
          resizeMode='contain'
        /> */}
        <ErrorText errors={errors} />
        <Button title='Add New User' onPress={handleSubmit(onAddNewUserPressed)} />
        <CustomInput name='idEmployee' placeholder='Employee Id' control={control} rules={CIRules('Employee Id', 3)} />
        <CustomInput name='password' placeholder='password' control={control} rules={CIRules('password', 6)} secureTextEntry />
        <CustomInput name='firstName' placeholder='First Name' control={control} rules={CIRules('First Name', 3)} />
        <CustomInput name='secondName' placeholder='Second Name' control={control} rules={CIRules('Second Name', 3)} />
        <CustomInput name='lastName' placeholder='Last Name' control={control} rules={CIRules('Last Name', 3)} />
        <CustomInput name='secondLastName' placeholder='Second Last Name' control={control} rules={CIRules('Second Last Name', 3)} />
        <CustomInput name='fullName' placeholder='Full name' control={control} rules={CIRules('Full Name', 3)} readOnly />
        <CustomInput name='nickName' placeholder='nickname' control={control} rules={CIRules('nickname', 3)} />
        <CustomInput name='email' placeholder='email' control={control} rules={CIRules('email', 8)} />

        <CustomPicker name='gender' control={control} items={['M', 'F', 'O']} title='Gender' />
        <CustomInput name='age' placeholder='age' keyboardType={numericKeyboard} rules={CIRulesNumber('age', true, 12, 70)} />
        <CustomInput name='phone' placeholder='phone' keyboardType={numericKeyboard} rules={CIRules('phone', 6)} />

        <CustomCheckBox name='showLabelX1' control={control} title='Show label X1?' />

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

export const EditUserScreen = ({ preValues }) => {
  // console.log('preValues= \n', preValues)
  const { control, handleSubmit, watch, formState: { errors } } = useForm(
    {
      defaultValues: { ...preValues }
    })

  const [editUser] = useMutation(editUserM)

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
        {/* <Image
          source={Logo} // We need a logo
          style={[styles.logo, {height: height*0.3}]}
          resizeMode='contain'
        /> */}
        <ErrorText errors={errors} />
        <Button title='Save changes into Chart' onPress={handleSubmit(onEditSelectedUserPressed)} />
        <CustomInput name='chartDescription' placeholder='Chart description' control={control} rules={CIRules('Chart Description', 3)} />
        <CustomInput name='chartWidth' placeholder='Chart width' control={control} rules={CIRulesNumber('Chart width')} keyboardType={numericKeyboard} />
        <CustomInput name='chartHeight' placeholder='Chart height' control={control} rules={CIRulesNumber('Chart height')} keyboardType={numericKeyboard} />

        <CustomCheckBox name='isAndroidChart' control={control} title='Android chart?' />
        <CustomCheckBox name='isIOSChart' control={control} title='IOS chart?' />
        <CustomCheckBox name='isWebChart' control={control} title='Web chart?' />

        <CustomInput name='x1' placeholder='x1' control={control} rules={CIRules('x1', 3)} />
        <CustomCheckBox name='showLabelX1' control={control} title='Show label X1?' />
        <CustomCheckBox name='showLabelY1' control={control} title='Show label Y1?' />
        <CustomInput name='y1DataField' placeholder='Y1 data field' control={control} rules={CIRules('y1DataField', 3)} />
        <CustomInput name='y1DataGroupingWay' placeholder='Y1 data groupingWay' control={control} rules={CIRules('y1DataGroupingWay', 3)} />
        <CustomInput name='y1Value' placeholder='Y1 value' control={control} rules={CIRules('y1Value', 3)} />

      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 400
  }
})
