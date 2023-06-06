import { gql, useQuery } from '@apollo/client'

/*
  Query:allStandardTickets:[standardTicket]!
*/

const QAllStandardTickets = gql`
query AllStandardTickets {
  allStandardTickets {
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

export const AllStandardTickets = () => {
  const { loading, error, data } = useQuery(QAllStandardTickets)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.allStandardTickets.map(el => JSON.stringify(el))
}

/*
  Query:standardTicketsCount:Int!
*/

const QStandardTicketsCount = gql`
query StandardTicketsCount {
  standardTicketsCount
}

`

export const StandardTicketsCount = () => {
  const { loading, error, data } = useQuery(QStandardTicketsCount)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  const result = data.standardTicketCount

  return result
}
