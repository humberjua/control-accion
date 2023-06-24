import { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Button,
  Alert
} from 'react-native'
import { gql, useMutation } from '@apollo/client'
import CustomInput from '../components/CustomInput'
import { useForm } from 'react-hook-form'
import { CIRules } from '../components/CIRules.js'
import CustomActivityIndicator from '../components/CustomActivityIndicator.js'
import CustomCheckBox from '../components/CustomCheckBox'
import { FindStandardJobRole } from '../apqueries/standardJobRoleQ'

const editStandardJobRoleM = gql`
mutation EditStandardJobRoleDescription($idStandardJobRole: ID!, $standardJobRoleDescription: String!) {
  editStandardJobRoleDescription(idStandardJobRole: $idStandardJobRole, standardJobRoleDescription: $standardJobRoleDescription) {
    idStandardJobRole
    standardJobRoleDescription
    internalId
    reserved
  }
}

`

export const StandardJobRoleMEdit = ({ defaultValues }) => {
  // console.info('defaultValues=\n', defaultValues)
  const [load, setLoad] = useState(false)
  const idToFind = defaultValues.idStandardJobRole
  // console.info('idToFind =========> ', idToFind)
  const findStandardJobRole = FindStandardJobRole(idToFind)
  // console.info('findStandardJobRole\n', findStandardJobRole)
  const [values, setValues] = useState(findStandardJobRole)
  // console.log('values ===================> ', values)
  useEffect(() => {
    if (findStandardJobRole) {
      setValues({
        idStandardJobRole: defaultValues.idStandardJobRole,
        standardJobRoleDescription: defaultValues.standardJobRoleDescription,
        internalId: findStandardJobRole.internalId,
        reserved: findStandardJobRole.reserved
      })
    }
  }, [defaultValues])
  const { control, handleSubmit, watch, formState: { errors } } = useForm(
    {
      defaultValues: {
        idStandardJobRole: values?.idStandardJobRole,
        standardJobRoleDescription: values?.standardJobRoleDescription,
        internalId: values?.internalId,
        reserved: values?.reserved
      }
    })
  const [editStandardJobRoleDescription] = useMutation(editStandardJobRoleM)

  const onEditSelectedStandardJobRolePressed = async (useFormData) => {
    setLoad(true)
    try {
      await editStandardJobRoleDescription(
        {
          variables: {
            idStandardJobRole: useFormData.idStandardJobRole,
            standardJobRoleDescription: useFormData.standardJobRoleDescription,
            internalId: useFormData.internalId,
            reserved: useFormData.reserved
          }
        }
      )
      setLoad(false)
      Alert.alert('💪 Standard Job Role succesfully edited...')
    } catch (error) {
      setLoad(false)
      console.info(error)
    }
  }
  // useEffect(() => setValues(findStandardJobRole), [defaultValues])
  // useEffect(() => {
  //   if (findStandardJobRole) {
  //     setValues(findStandardJobRole)
  //   }
  // }, [findStandardJobRole])
  useEffect(() => setLoad(load), [])
  return (
    <View style={styles.root}>
      <CustomInput
        name='standardJobRoleDescription'
        control={control}
        rules={CIRules('standardJobRoleDescription', 3)}
        extraTitle='Edit Standard Job Role Description'
      />
      <CustomInput
        name='internalId'
        control={control}
        rules={CIRules('internalId', 3)}
        extraTitle='Edit Internal Id'
      />
      <CustomCheckBox
        name='reserved'
        control={control}
        title='Reserved'
      />
      <CustomActivityIndicator visible={load} />
      <Button title='Edit Selecetd Standard Job Role' onPress={onEditSelectedStandardJobRolePressed} />
    </View>
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
  },
  button: {
    backgroundColor: 'rgb(211,111,111)',
    alignSelf: 'stretch',
    borderRadius: '15'
  }
})
