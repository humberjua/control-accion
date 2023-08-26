import { useState, useEffect } from 'react'
import { View, Alert, StyleSheet, Text, Platform } from 'react-native'

import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { ScrollView } from 'react-native-gesture-handler'
import CustomPaperListAcordion from '../components/CustomListAcordionPaper'
import CustomPaperInput from '../components/customInputPaper'
import { useForm } from 'react-hook-form'
import { CIRules, CIRulesNumber } from '../components/CIRules.js'
import CustomActivityIndicator from '../components/CustomActivityIndicator.js'
import { Button } from 'react-native-paper'
import { useAllStandardTickets } from '../hooks/standardTicketsQH'
import { useAllEventConsequences } from '../hooks/eventConsequenceQH'
import { useAllEventProbabilities } from '../hooks/eventProbabilityQH'
import { SelectList } from 'react-native-dropdown-select-list'
import { EditStandardTicketMEdit } from '../apmutations/standardTicketMEdit'

const numericKeyboard = Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'

const addNewStandardTicketM = gql`
mutation AddNewStandardTicket($idEventProbability: ID!, $eventProbabilityLevel: String!, $eventProbabilityDescription: String!, $idEventConsequence: String!, $eventConsequenceLevel: Int!, $eventConsequenceDescription: String!, $standardTicketDescription: String!, $format1Image: String!, $format2Image: String!, $format3Image: String!, $format1Video: String!, $format2Video: String!, $format3Video: String!, $maxVideoDuration: Int!) {
  addNewStandardTicket(idEventProbability: $idEventProbability, eventProbabilityLevel: $eventProbabilityLevel, eventProbabilityDescription: $eventProbabilityDescription, idEventConsequence: $idEventConsequence, eventConsequenceLevel: $eventConsequenceLevel, eventConsequenceDescription: $eventConsequenceDescription, standardTicketDescription: $standardTicketDescription, format1Image: $format1Image, format2Image: $format2Image, format3Image: $format3Image, format1Video: $format1Video, format2Video: $format2Video, format3Video: $format3Video, maxVideoDuration: $maxVideoDuration) {
    idStandardTicket
    idEventProbability
    eventProbabilityLevel
    eventProbabilityDescription
    idEventConsequence
    eventConsequenceLevel
    eventConsequenceDescription
    standardTicketDescription
    format1Image
    format2Image
    format3Image
    format1Video
    format2Video
    format3Video
    maxVideoDuration
  }
}

`

export const AddNewStandardTicketScreen = () => {
  const [add, setAdd] = useState(false)
  const allEventConsequencesData = useAllEventConsequences()

  let eCD2ListAcordion = []
  if (allEventConsequencesData !== 'Loading...') {
    eCD2ListAcordion = allEventConsequencesData.map((el) => {
      // deberá tener esta estructura. [id, main description (title), value, second description, second value ]
      const result = {
        id: el.idEventConsequence,
        description: el.eventConsequenceDescription,
        value: el.eventConsequenceLevel,
        customDescription: el.eventConsequenceCustomDescription,
        secondValue: null
      }
      return result
    })
  }

  const allEventProbabilities = useAllEventProbabilities()
  let ePD2ListAcordion = []
  if (allEventProbabilities !== 'Loading...') {
    ePD2ListAcordion = allEventProbabilities.map((el) => {
      const result = {
        id: el.idEventProbability,
        description: el.eventProbabilityDescription,
        value: el.eventProbabilityLevel,
        customDescription: el.eventProbabilityCustomDescription,
        secondValue: null
      }
      return result
    })
  }
  const { control, handleSubmit, watch, formState: { errors } } = useForm(
    {
      defaultValues: {
        idEventProbability: '',
        eventProbabilityLevel: 'E',
        eventProbabilityDescription: 'RARE',
        idEventConsequence: '',
        eventConsequenceLevel: 5,
        eventConsequenceDescription: 'CATASTROPHIC',
        standardTicketDescription: 'New Standard Ticket Description',
        format1Image: 'jpg',
        format2Image: 'jpeg',
        format3Image: 'png',
        format1Video: 'mp4',
        format2Video: 'mpeg',
        format3Video: 'avi',
        maxVideoDuration: 5
      }
    })
  const [addNewStandardTicket] = useMutation(addNewStandardTicketM)
  const onAddNewStandardTicketPressed = async (useFormData) => {
    setAdd(true)
    try {
      await addNewStandardTicket(
        {
          variables:
            {
              ...useFormData
            }
        })
      setAdd(false)
      Alert.alert('New Standard Ticket added 💪')
    } catch (error) {
      setAdd(false)
      console.error(error.message)
    }
  }
  useEffect(() => setAdd(false), [])
  return (
    <ScrollView>
      <View>
        <CustomPaperInput control={control} placeholder='New Standard Ticket Description' name='standardTicketDescription' rules={CIRules('standardTicketDescription', 3)} />
        <CustomPaperListAcordion control={control} name='idEventConsequences' expand={false} icon='alert' title='Event-Consequence data' data={eCD2ListAcordion} />
        <CustomPaperListAcordion control={control} name='idEventProbability' expand={false} icon='alert' title='Event-Probability data' data={ePD2ListAcordion} />
        <CustomPaperInput control={control} extraTitle='format image 1' placeholder='✏️' name='format1Image' rules={CIRules('format1Image', 3)} />
        <CustomPaperInput control={control} extraTitle='format image 2' placeholder='✏️' name='format2Image' rules={CIRules('format2Image', 3)} />
        <CustomPaperInput control={control} extraTitle='format image 3' placeholder='✏️' name='format3Image' rules={CIRules('format3Image', 3)} />
        <CustomPaperInput control={control} extraTitle='format video 1' placeholder='✏️' name='format1Video' rules={CIRules('format1Video', 3)} />
        <CustomPaperInput control={control} extraTitle='format video 2' placeholder='✏️' name='format2Video' rules={CIRules('format2Video', 3)} />
        <CustomPaperInput control={control} extraTitle='format video 3' placeholder='✏️' name='format3Video' rules={CIRules('format3Video', 3)} />
        <CustomPaperInput control={control} extraTitle='Maximum Video Duration' placeholder='✏️' name='maxVideoDuration' rules={CIRulesNumber('maxVideoDuration', true, 1, 10)} keyboardType={numericKeyboard} />
        <Button
          style={{ width: '70%', alignContent: 'center', justifyContent: 'center', alignSelf: 'center', paddingBottom: 40 }}
          icon='ticket'
          mode='contained'
          onPress={onAddNewStandardTicketPressed}
        >
          Add New Standard Ticket
        </Button>
        <CustomActivityIndicator visible={add} />
      </View>
    </ScrollView>
  )
}

const findStandardTicketQ = gql`
query FindStandardTicket($idStandardTicket: ID!) {
  findStandardTicket(idStandardTicket: $idStandardTicket) {
    idStandardTicket
    idEventProbability
    eventProbabilityLevel
    eventProbabilityDescription
    idEventConsequence
    eventConsequenceLevel
    eventConsequenceDescription
    standardTicketDescription
    format1Image
    format2Image
    format3Image
    format1Video
    format2Video
    format3Video
    maxVideoDuration
  }
}

`

export const EditStandardTicketScreen = () => {
  const allStandardTicketsData = useAllStandardTickets()
  let aSTD = []
  const [selected, setSelected] = useState(false)
  const [defaultValues, setDefaultValues] = useState({})
  const [getDataFromSelectedTicket, dataFromSelectedTicket] = useLazyQuery(findStandardTicketQ)
  if (allStandardTicketsData !== 'Loading...') {
    aSTD = allStandardTicketsData.map(el => {
      const result = {
        key: el.idStandardTicket,
        value: el.standardTicketDescription
      }
      return result
    })
  }
  useEffect(() => setDefaultValues(), [selected])
  useEffect(() => {
    if (dataFromSelectedTicket.data) {
      setDefaultValues(dataFromSelectedTicket.data.findStandardTicket)
      console.info(dataFromSelectedTicket.data.findStandardTicket)
    }
  }, [dataFromSelectedTicket.data])

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Select standard ticket to edit</Text>
      <SelectList
        boxStyles={{ backgroundColor: 'lightgray' }}
        inputStyles={{ fontSize: 14 }}
        dropdownStyles={{ backgroundColor: 'lightgray' }}
        dropdownItemStyles={{ marginHorizontal: 10 }}
        dropdownTextStyles={{ color: 'black' }}
        name='allStandardTickets'
        data={aSTD}
        save='key'
        onSelect={() => {
          setDefaultValues({})
        }}
        setSelected={(val) => {
          getDataFromSelectedTicket({ variables: { idStandardTicket: val } })
          setSelected(val)
        }}
        placeholder='🎫 Select Standard Ticket'
      />
      {
        selected && <EditStandardTicketMEdit defaultValues={defaultValues} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 0
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
  },
  text: {
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 2,
    alignSelf: 'center',
    color: 'rgba(120,120,120,50)'
  }
})
