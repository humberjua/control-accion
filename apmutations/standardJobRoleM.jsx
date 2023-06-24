import { useState, useEffect } from 'react'
import { View, Button, Alert } from 'react-native'
import { gql, useMutation } from '@apollo/client'
import { useAllStandardJobRoles } from '../hooks/standardJobRoleQH'
import { ScrollView } from 'react-native-gesture-handler'
import { SelectList } from 'react-native-dropdown-select-list'
import CustomInput from '../components/CustomInput'
import { useForm } from 'react-hook-form'
import { CIRules } from '../components/CIRules.js'
import CustomActivityIndicator from '../components/CustomActivityIndicator.js'
import { StandardJobRoleMEdit } from './standardJobRoleMedit'
import CustomCheckBox from '../components/CustomCheckBox'

const addNewStandardJobRoleM = gql`
mutation AddNewStandardJobRole($standardJobRoleDescription: String!, $internalId: String, $reserved: Boolean) {
  addNewStandardJobRole(standardJobRoleDescription: $standardJobRoleDescription, internalId: $internalId, reserved: $reserved) {
    idStandardJobRole
    standardJobRoleDescription
    internalId
    reserved
  }
}

`

export const AddNewStandardJobRoleScreen = () => {
  const [add, setAdd] = useState(false)
  const { control, handleSubmit, watch, formState: { errors } } = useForm(
    {
      defaultValues: {
        standardJobRoleDescription: 'New Standard Job Role Description',
        internalId: 'New Internal Id for this position',
        reserved: false
      }
    })
  const [addNewStandardJobRole] = useMutation(addNewStandardJobRoleM)
  const onAddNewStandardJobRolePressed = async (useFormData) => {
    setAdd(true)
    try {
      await addNewStandardJobRole(
        {
          variables:
            {
              ...useFormData
            }
        })
      setAdd(false)
      Alert.alert('New Standard Job Role added 💪')
    } catch (error) {
      setAdd(false)
      console.error(error.message)
    }
  }
  useEffect(() => setAdd(false), [])
  return (
    <ScrollView>
      <View>
        <CustomInput control={control} placeholder='New Standard Job Role Description' name='standardJobRoleDescription' rules={CIRules('standardJobRoleDescription', 3)} />
        <CustomInput control={control} placeholder='Internal Id for this position' name='internalId' rules={CIRules('internalId', 3)} />
        <CustomCheckBox control={control} title='Reserved' name='reserved' />
        <CustomActivityIndicator visible={add} />
        <Button title='Add New Standard Job Role' onPress={onAddNewStandardJobRolePressed} />
      </View>
    </ScrollView>
  )
}

export const EditStandardJobRoleScreen = () => {
  const allStandardJobRoles = useAllStandardJobRoles()
  const [sJobRoleSelected, setSJobRoleSelected] = useState('')
  const [jobRoleSelected, setJobRoleSelected] = useState({})
  let ASS = [{ key: '', value: '' }]
  if (allStandardJobRoles !== undefined) {
    try {
      ASS = allStandardJobRoles.map(el => {
        return (
          {
            key: el.idStandardJobRole,
            value: el.standardJobRoleDescription
          }
        )
      })
    } catch (error) {

    }
  }
  useEffect(() => {
    setSJobRoleSelected(sJobRoleSelected)
  }, [])

  useEffect(() => setJobRoleSelected(jobRoleSelected), [])
  return (
    <ScrollView>
      <View>
        <SelectList
          boxStyles={{ backgroundColor: 'lightgray' }}
          inputStyles={{ fontSize: 14 }}
          dropdownStyles={{ backgroundColor: 'lightgray' }}
          dropdownItemStyles={{ marginHorizontal: 10 }}
          dropdownTextStyles={{ color: 'black' }}
          name='allStandardJobRoles'
          data={ASS}
          save='key'
          onSelect={() => {
            // setDefaultValues({})
            // setSectorSelected(defaultValues)
          }}
          setSelected={(val) => {
            setSJobRoleSelected(val)
            setJobRoleSelected(ASS.filter((el) => el.key === val))
          }}
          placeholder='🔽 Select Standard Job Role'
        />
        {
          sJobRoleSelected && <StandardJobRoleMEdit defaultValues={
            { idStandardJobRole: jobRoleSelected[0].key, standardJobRoleDescription: jobRoleSelected[0].value }
          }
                              />
        }
      </View>
    </ScrollView>
  )
}
