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

const editStandardTicketM = gql`
mutation EditStandardTicket($idStandardTicket: ID!, $idEventProbability: ID, $eventProbabilityLevel: String, $eventProbabilityDescription: String, $idEventConsequence: String, $eventConsequenceLevel: Int, $eventConsequenceDescription: String, $standardTicketDescription: String, $format1Image: String, $format2Image: String, $format3Image: String, $format1Video: String, $format2Video: String, $format3Video: String, $maxVideoDuration: Int) {
  editStandardTicket(idStandardTicket: $idStandardTicket, idEventProbability: $idEventProbability, eventProbabilityLevel: $eventProbabilityLevel, eventProbabilityDescription: $eventProbabilityDescription, idEventConsequence: $idEventConsequence, eventConsequenceLevel: $eventConsequenceLevel, eventConsequenceDescription: $eventConsequenceDescription, standardTicketDescription: $standardTicketDescription, format1Image: $format1Image, format2Image: $format2Image, format3Image: $format3Image, format1Video: $format1Video, format2Video: $format2Video, format3Video: $format3Video, maxVideoDuration: $maxVideoDuration) {
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

export const EditStandardTicketMEdit = ({ defaultValues }) => {

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
