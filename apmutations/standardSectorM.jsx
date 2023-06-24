import { useState, useEffect } from 'react'
import { View, Button, Alert } from 'react-native'
import { gql, useMutation } from '@apollo/client'
import { useAllStandardSectors } from '../hooks/standardSectorQH'
import { ScrollView } from 'react-native-gesture-handler'
import { SelectList } from 'react-native-dropdown-select-list'
import CustomInput from '../components/CustomInput'
import { useForm } from 'react-hook-form'
import { CIRules } from '../components/CIRules.js'
import CustomActivityIndicator from '../components/CustomActivityIndicator.js'
import { StandardSectorMEdit } from './standardSectorMedit'

const addNewStandardSectorM = gql`
mutation AddNewStandardSector($standardSectorDescription: String!) {
  addNewStandardSector(standardSectorDescription: $standardSectorDescription) {
    idStandardSector
    standardSectorDescription
  }
}

`

export const AddNewStandardSectorScreen = () => {
  const [add, setAdd] = useState(false)
  const { control, handleSubmit, watch, formState: { errors } } = useForm(
    {
      defaultValues: {
        standardSectorDescription: 'New Standard Sector Description'
      }
    })
  const [addNewStandardSector] = useMutation(addNewStandardSectorM)
  const onAddNewStandardSectorPressed = async (useFormData) => {
    setAdd(true)
    try {
      await addNewStandardSector(
        {
          variables:
            {
              ...useFormData
            }
        })
      setAdd(false)
      Alert.alert('New Standard Sector added 💪')
    } catch (error) {
      setAdd(false)
      console.error(error.message)
    }
  }
  useEffect(() => setAdd(false), [])
  return (
    <ScrollView>
      <View>
        <CustomInput control={control} placeholder='New Standard Sector Description' name='standardSectorDescription' rules={CIRules('standardSectorDescription', 3)} />
        <Button title='Add New Standard Sector' onPress={onAddNewStandardSectorPressed} />
        <CustomActivityIndicator visible={add} />
      </View>
    </ScrollView>
  )
}

export const EditStandardSectorScreen = () => {
  const allStandardSectors = useAllStandardSectors()
  const [sSectorSelected, setSSelected] = useState('')
  const [sectorSelected, setSectorSelected] = useState({})
  let ASS = [{ key: '', value: '' }]
  if (allStandardSectors !== undefined) {
    try {
      ASS = allStandardSectors.map(el => {
        return (
          {
            key: el.idStandardSector,
            value: el.standardSectorDescription
          }
        )
      })
    } catch (error) {

    }
  }
  useEffect(() => {
    setSSelected(sSectorSelected)
  }, [])

  useEffect(() => setSectorSelected(sectorSelected), [])
  return (
    <ScrollView>
      <View>
        <SelectList
          boxStyles={{ backgroundColor: 'lightgray' }}
          inputStyles={{ fontSize: 14 }}
          dropdownStyles={{ backgroundColor: 'lightgray' }}
          dropdownItemStyles={{ marginHorizontal: 10 }}
          dropdownTextStyles={{ color: 'black' }}
          name='allStandardSectors'
          data={ASS}
          save='key'
          onSelect={() => {
            // setDefaultValues({})
            // setSectorSelected(defaultValues)
          }}
          setSelected={(val) => {
            setSSelected(val)
            setSectorSelected(ASS.filter((el) => el.key === val))
          }}
          placeholder='🔽 Select Standard Sector'
        />
        {
          sSectorSelected && <StandardSectorMEdit defaultValues={{ idStandardSector: sectorSelected[0].key, standardSectorDescription: sectorSelected[0].value }} />
        }
      </View>
    </ScrollView>

  )
}
