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

const editStandardSectorM = gql`
mutation EditStandardSectorDescription($idStandardSector: ID!, $standardSectorDescription: String!) {
  editStandardSectorDescription(idStandardSector: $idStandardSector, standardSectorDescription: $standardSectorDescription) {
    idStandardSector
    standardSectorDescription
  }
}

`

export const StandardSectorMEdit = ({ defaultValues }) => {
  console.info(defaultValues)
  const [load, setLoad] = useState(false)
  const [values, setValues] = useState(defaultValues)
  const { control, handleSubmit, watch, formState: { errors } } = useForm(
    {
      defaultValues: {
        idStandardSector: values.idStandardSector,
        standardSectorDescription: values.standardSectorDescription
      }
    })
  const [editStandardSectorDescription] = useMutation(editStandardSectorM)

  const onEditSelectedStandardSectorPressed = async (useFormData) => {
    setLoad(true)
    try {
      await editStandardSectorDescription(
        {
          variables: {
            idStandardSector: useFormData.idStandardSector,
            standardSectorDescription: useFormData.standardSectorDescription
          }
        }
      )
      setLoad(false)
      Alert.alert('💪 Standard Sector succesfully edited...')
    } catch (error) {
      setLoad(false)
      console.info(error)
    }
  }
  useEffect(() => setLoad(load), [])
  useEffect(() => setValues(values), [values])
  return (
    <View style={styles.root}>
      <CustomInput
        name='standardSectorDescription'
        control={control}
        rules={CIRules('standardSectorDescription', 3)}
        extraTitle='Edit Standard Sector Description'
      />
      <CustomActivityIndicator visible={load} />
      <Button title='Edit Selecetd Standard Job' onPress={onEditSelectedStandardSectorPressed} />
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
