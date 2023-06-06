import { gql, useQuery } from '@apollo/client'

/*
  Query:allEventMatrixValues:[eventMatrix]!
*/

const QAllEventMatrixValues = gql`
query AllEventMatrixValues {
  allEventMatrixValues {
    idEventMatrix
    idEventProbability
    eventProbabilityLevel
    eventProbabilityDescription
    eventProbabilityCustomDescription
    idEventConsequence
    eventConsequenceLevel
    eventConsequenceDescription
    eventConsequenceCustomDescription
    eventMatrixLabel
    eventMatrixColor
  }
}

`

export const AllEventMatrixValues = () => {
  const { loading, error, data } = useQuery(QAllEventMatrixValues)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.allEventMatrixValues.map(el => JSON.stringify(el))
}

/*
  Query:eventMatrixByConsequenceLevel(eventConsequenceLevel:Int!):[eventMatrix]!
*/

const QEventMatrixByConsequenceLevel = gql`
query EventMatrixByConsequenceLevel($eventConsequenceLevel: Int!) {
  eventMatrixByConsequenceLevel(eventConsequenceLevel: $eventConsequenceLevel) {
    idEventMatrix
    idEventProbability
    eventProbabilityLevel
    eventProbabilityDescription
    eventProbabilityCustomDescription
    idEventConsequence
    eventConsequenceLevel
    eventConsequenceDescription
    eventConsequenceCustomDescription
    eventMatrixLabel
    eventMatrixColor
  }
}

`

export const EventMatrixByConsequenceLevel = ({ eventConsequenceLevel }) => {
  const { loading, error, data } = useQuery(QEventMatrixByConsequenceLevel, { variables: { eventConsequenceLevel } })
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.eventMatrixByConsequenceLevel.map(el => JSON.stringify(el))
}

/*
  Query:eventMatrixByProbabilityLevel(eventProbabilityLevel:String!):[eventMatrix]!
*/

const QEventMatrixByProbabilityLevel = gql`
query EventMatrixByProbabilityLevel($eventProbabilityLevel: String!) {
  eventMatrixByProbabilityLevel(eventProbabilityLevel: $eventProbabilityLevel) {
    idEventMatrix
    idEventProbability
    eventProbabilityLevel
    eventProbabilityDescription
    eventProbabilityCustomDescription
    idEventConsequence
    eventConsequenceLevel
    eventConsequenceDescription
    eventConsequenceCustomDescription
    eventMatrixLabel
    eventMatrixColor
  }
}

`

export const EventMatrixByProbabilityLevel = ({ eventProbabilityLevel }) => {
  const { loading, error, data } = useQuery(QEventMatrixByProbabilityLevel, { variables: { eventProbabilityLevel } })
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.eventMatrixByProbabilityLevel.map(el => JSON.stringify(el))
}
