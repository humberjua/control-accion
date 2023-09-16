import { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Button,
  Alert,
  Pressable,
  Text
} from 'react-native'
import { gql, useMutation } from '@apollo/client'
import CustomInput from '../components/CustomInput'
import { useForm } from 'react-hook-form'
import { CIRules } from '../components/CIRules.js'
import CustomActivityIndicator from '../components/CustomActivityIndicator.js'
import { TextSize } from 'victory-native'

const editStandardSectorM = gql`
mutation EditStandardSectorDescription($idStandardSector: ID!, $standardSectorDescription: String!) {
  editStandardSectorDescription(idStandardSector: $idStandardSector, standardSectorDescription: $standardSectorDescription) {
    idStandardSector
    standardSectorDescription
  }
}

`

export const StandardSectorMEdit = ({ defaultValues }) => {
  // console.info(defaultValues)
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
      {load && <CustomActivityIndicator visible={load} />}
      <Pressable
        onPress={() => {
          handleSubmit(onEditSelectedStandardSectorPressed)
        }}
        style={({ pressed }) => {
          return { opacity: pressed ? 0.2 : 1 }
        }}
      >
        <Text style={styles.button}>Save changes</Text>
      </Pressable>
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
    borderRadius: 10,
    fontSize: 18,
    height: 30,
    fontWeight: '500',
    paddingLeft: 5,
    paddingRight: 5,
    color: 'lightgray'
  }
})
