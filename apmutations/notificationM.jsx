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
import { CIRules, CIRulesNumber } from '../components/CIRules.js'
import { ErrorText } from '../components/ErrorText.js'
import { GetToken } from '../utils/getToken.js'
const numericKeyboard = Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'

/*
  Mutation: addNewNotification
*/

// Mutation definition from BE. All constants definitions used for useMutation hook, will have an M letter at the end
const addNewNotificationM = gql`
mutation AddNewNotification($idUser: ID!, $idEmployee: ID!, $firstName: String!, $secondName: String!, $lastName: String!, $secondLastName: String!, $nickName: String!, $email: String!, $phone: String!, $companyName: String!, $idCompanyBusinessUnit: ID!, $companyBusinessUnitDescription: String!, $idCompanySector: ID!, $companySectorDescription: String!, $idcompanyJobRole: ID!, $companyJobRoleDescription: String!, $showNotificationsToLevel: Int!, $dateStamp: String!, $notificationLevel: Int!, $notificationTitle: String!, $notificationDescription: String!, $token: String!) {
  addNewNotification(idUser: $idUser, idEmployee: $idEmployee, firstName: $firstName, secondName: $secondName, lastName: $lastName, secondLastName: $secondLastName, nickName: $nickName, email: $email, phone: $phone, companyName: $companyName, idCompanyBusinessUnit: $idCompanyBusinessUnit, companyBusinessUnitDescription: $companyBusinessUnitDescription, idCompanySector: $idCompanySector, companySectorDescription: $companySectorDescription, idcompanyJobRole: $idcompanyJobRole, companyJobRoleDescription: $companyJobRoleDescription, showNotificationsToLevel: $showNotificationsToLevel, dateStamp: $dateStamp, notificationLevel: $notificationLevel, notificationTitle: $notificationTitle, notificationDescription: $notificationDescription, token: $token) {
    idNotification
    idUser
    idEmployee
    firstName
    secondName
    lastName
    secondLastName
    nickName
    email
    phone
    companyName
    idCompanyBusinessUnit
    companyBusinessUnitDescription
    idCompanySector
    companySectorDescription
    idcompanyJobRole
    companyJobRoleDescription
    showNotificationsToLevel
    dateStamp
    notificationLevel
    notificationTitle
    notificationDescription
    token
  }
}
`

const token = GetToken()
export const AddNewNotificationScreen = ({ newNotificationData }) => {
  if (!newNotificationData) return

  const [addNewNotification, idNotification] = useMutation(addNewNotificationM)

  const doAddIt = async (newValues) => {
    try {
      await addNewNotification(
        {
          variables:
            {
              ...newValues,
              showNotificationsToLevel: Number(newValues.showNotificationsToLevel),
              notificationLevel: Number(newValues.notificationLevel),
              dateStamp: new Date(Number(newValues.dateStamp)).toLocaleDateString(),
              token
            }
        })
    } catch (error) {
      console.error(error.message)
    }
  }
  doAddIt(newNotificationData)

  return (
    { idNotification }
  )
}

/*
  Mutation:editNotification
*/

// Mutation definition from BE. All constants definitions used for useMutation hook, will have an M letter at the end
const editNotificationM = gql`
mutation Mutation($idNotification: ID!, $notificationLevel: Int, $notificationTitle: String, $notificationDescription: String) {
  editNotification(idNotification: $idNotification, notificationLevel: $notificationLevel, notificationTitle: $notificationTitle, notificationDescription: $notificationDescription) {
    idNotification
    idUser
    idEmployee
    firstName
    secondName
    lastName
    secondLastName
    nickName
    email
    phone
    companyName
    idCompanyBusinessUnit
    companyBusinessUnitDescription
    idCompanySector
    companySectorDescription
    idcompanyJobRole
    companyJobRoleDescription
    showNotificationsToLevel
    dateStamp
    notificationLevel
    notificationTitle
    notificationDescription
    token
  }
}
`

export const EditNotificationScreen = ({ preValues }) => {
  const { control, handleSubmit, formState: { errors } } = useForm(
    {
      defaultValues: { ...preValues }
    })

  const [editNotification] = useMutation(editNotificationM)

  const onEditSelectedNotificationPressed = async (useFormData) => {
    try {
      await editNotification(
        {
          variables:
          {
            ...useFormData,
            showNotificationsToLevel: Number(useFormData.showNotificationsToLevel),
            notificationLevel: Number(useFormData.notificationLevel),
            dateStamp: new Date(Number(useFormData.dateStamp)).toLocaleDateString(),
            token
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
        <Button title='Save changes into Notification' onPress={handleSubmit(onEditSelectedNotificationPressed)} />
        <CustomInput name='idUser' placeholder='Id User' control={control} rules={CIRules('Id User', 3)} readOnly />
        <CustomInput name='idEmployee' placeholder='Id Employee' control={control} rules={CIRules('Id Employee', 3)} readOnly />
        <CustomInput name='firstName' placeholder='First Name' control={control} rules={CIRules('First Name', 3)} readOnly />
        <CustomInput name='secondName' placeholder='Second Name' control={control} rules={CIRules('Second Name', 3)} readOnly />
        <CustomInput name='lastName' placeholder='Last Name' control={control} rules={CIRules('Last Name', 3)} readOnly />
        <CustomInput name='secondLastName' placeholder='Second Last Name' control={control} rules={CIRules('Second Last Name', 3)} readOnly />
        <CustomInput name='nickName' placeholder='Nickname' control={control} rules={CIRules('Nickname', 3)} readOnly />
        <CustomInput name='email' placeholder='email' control={control} rules={CIRules('email', 3)} readOnly />
        <CustomInput name='phone' placeholder='phone' control={control} rules={CIRules('phone', 3)} readOnly />
        <CustomInput name='companyName' placeholder='companyName' control={control} rules={CIRules('companyName', 3)} readOnly />
        <CustomInput name='idCompanyBusinessUnit' placeholder='idCompanyBusinessUnit' control={control} rules={CIRules('idCompanyBusinessUnit', 3)} readOnly />
        <CustomInput name='companyBusinessUnitDescription' placeholder='companyBusinessUnitDescription' control={control} rules={CIRules('companyBusinessUnitDescription', 3)} readOnly />
        <CustomInput name='idCompanySector' placeholder='idCompanySector' control={control} rules={CIRules('idCompanySector', 3)} readOnly />
        <CustomInput name='companySectorDescription' placeholder='companySectorDescription' control={control} rules={CIRules('companySectorDescription', 3)} readOnly />
        <CustomInput name='idcompanyJobRole' placeholder='idcompanyJobRole' control={control} rules={CIRules('idcompanyJobRole', 3)} readOnly />
        <CustomInput name='companyJobRoleDescription' placeholder='companyJobRoleDescription' control={control} rules={CIRules('companyJobRoleDescription', 3)} readOnly />
        <CustomInput name='showNotificationsToLevel' placeholder='showNotificationsToLevel' control={control} rules={CIRulesNumber('showNotificationsToLevel')} readOnly />
        <CustomInput name='dateStamp' placeholder='dateStamp' control={control} rules={CIRules('dateStamp')} readOnly />

        <CustomInput name='notificationLevel' placeholder='notificationLevel' control={control} rules={CIRulesNumber('notificationLevel')} keyboardType={numericKeyboard} />
        <CustomInput name='notificationTitle' placeholder='notificationTitle' control={control} rules={CIRules('notificationTitle', 3)} />
        <CustomInput name='notificationDescription' placeholder='notificationDescription' control={control} rules={CIRules('notificationDescription', 8)} />

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
