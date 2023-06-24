import { useState, useEffect } from 'react'
import { View, Alert, StyleSheet, Text, FlatList } from 'react-native'

import { gql, useMutation } from '@apollo/client'
import { ScrollView } from 'react-native-gesture-handler'
// import CustomInput from '../components/CustomInput'
import CustomPaperListAcordion from '../components/CustomPaperListAcordion'
import CustomPaperInput from '../components/customPaperInput'
import { useForm } from 'react-hook-form'
import { CIRules } from '../components/CIRules.js'
import CustomActivityIndicator from '../components/CustomActivityIndicator.js'
import { Button } from 'react-native-paper'
import { AllStandardTickets, useAllStandardTickets } from '../hooks/standardTicketsQH'
import { useAllEventConsequences } from '../hooks/eventConsequenceQH'
import { useAllEventProbabilities } from '../hooks/eventProbabilityQH'

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
        <CustomPaperListAcordion control={control} name='idEventConsequences' expand={false} icon='alert' title='Event-Consequence data' data={eCD2ListAcordion} />
        <CustomPaperListAcordion control={control} name='idEventProbability' expand={false} icon='alert' title='Event-Probability data' data={ePD2ListAcordion} />
        <CustomPaperInput control={control} placeholder='New Standard Ticket Description' name='standardTicketDescription' rules={CIRules('standardTicketDescription', 3)} />
        <Button
          style={{ width: '70%', alignContent: 'center', justifyContent: 'center', alignSelf: 'center' }}
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

export const EditStandardTicketScreen = () => {
  console.log('Edit Standard Ticket Screen Selected')
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
