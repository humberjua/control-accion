import { gql, useQuery } from '@apollo/client'

/*
  Query:allOpenTickets:[ticket]!
*/

const QAllOpenTickets = gql`
query AllOpenTickets {
  allOpenTickets {
    idTicket
    idUser
    idEmployee
    firstName
    secondName
    lastName
    secondLastName
    nickName
    email
    phone
    companyName
    idCompanyBusinessUnit
    companyBusinessUnitDescription
    idCompanySector
    companySectorDescription
    idcompanyJobRole
    companyJobRoleDescription
    idStandardTicket
    eventProbabilityLevel
    eventConsequenceLevel
    standardTicketDescription
    idStandardJobRole
    standardJobRoleDescription
    ticketCustomDescription
    dateTimeTicketPost
    dateTimeEvent
    monthEvent
    yearEvent
    ticketImage1
    ticketImage2
    ticketImage3
    ticketImage4
    ticketVideo
    ticketSolved
    ticketLike
    injuredPeople
    lostProduction
    lostProductionTotalTimeDuration
    dateTimeEventResolved
    ticketClosed
    ticketExtraFile
  }
}

`

export const AllOpenTickets = () => {
  const { loading, error, data } = useQuery(QAllOpenTickets)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.allOpenTickets.map(el => JSON.stringify(el))
}

/*
  Query:allClosedTickets:[ticket]!
*/

const QAllClosedTickets = gql`
query AllClosedTickets {
  allClosedTickets {
    idTicket
    idUser
    idEmployee
    firstName
    secondName
    lastName
    secondLastName
    nickName
    email
    phone
    companyName
    idCompanyBusinessUnit
    companyBusinessUnitDescription
    idCompanySector
    companySectorDescription
    idcompanyJobRole
    companyJobRoleDescription
    idStandardTicket
    eventProbabilityLevel
    eventConsequenceLevel
    standardTicketDescription
    idStandardJobRole
    standardJobRoleDescription
    ticketCustomDescription
    dateTimeTicketPost
    dateTimeEvent
    monthEvent
    yearEvent
    ticketImage1
    ticketImage2
    ticketImage3
    ticketImage4
    ticketVideo
    ticketSolved
    ticketLike
    injuredPeople
    lostProduction
    lostProductionTotalTimeDuration
    dateTimeEventResolved
    ticketClosed
    ticketExtraFile
  }
}

`

export const AllClosedTickets = () => {
  const { loading, error, data } = useQuery(QAllClosedTickets)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.allClosedTickets.map(el => JSON.stringify(el))
}
/*
  Query:ticketsOpenCount:Int!
*/

const QTicketsOpenCount = gql`
query TicketsOpenCount {
  ticketsOpenCount
}

`

export const TicketsOpenCount = () => {
  const { loading, error, data } = useQuery(QTicketsOpenCount)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  const result = data.ticketsOpenCount

  return result
}

/*
  Query:ticketsClosedCount:Int!
*/

const QTicketsClosedCount = gql`
query TicketsClosedCount {
  ticketsClosedCount
}

`

export const TicketsClosedCount = () => {
  const { loading, error, data } = useQuery(QTicketsClosedCount)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  const result = data.ticketsClosedCount

  return result
}

/*
  Query:ticketsWithVideo(ticketVideo: YesNo):[ticket]!
*/

const QTicketsWithVideo = gql`
query TicketsWithVideo {
  ticketsWithVideo {
    idTicket
    idUser
    idEmployee
    firstName
    secondName
    lastName
    secondLastName
    nickName
    email
    phone
    companyName
    idCompanyBusinessUnit
    companyBusinessUnitDescription
    idCompanySector
    companySectorDescription
    idcompanyJobRole
    companyJobRoleDescription
    idStandardTicket
    eventProbabilityLevel
    eventConsequenceLevel
    standardTicketDescription
    idStandardJobRole
    standardJobRoleDescription
    ticketCustomDescription
    dateTimeTicketPost
    dateTimeEvent
    monthEvent
    yearEvent
    ticketImage1
    ticketImage2
    ticketImage3
    ticketImage4
    ticketVideo
    ticketSolved
    ticketLike
    injuredPeople
    lostProduction
    lostProductionTotalTimeDuration
    dateTimeEventResolved
    ticketClosed
    ticketExtraFile
  }
}

`

export const TicketsWithVideo = () => {
  const { loading, error, data } = useQuery(QTicketsWithVideo)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.ticketsWithVideo.map(el => JSON.stringify(el))
}

/*
  Query:allOpenTicketsFrom(companyName:String!):[ticket]!
*/

const QAllOpenTicketsFrom = gql`
query AllOpenTicketsFrom($companyName: String!) {
  allOpenTicketsFrom(companyName: $companyName) {
    idTicket
    idUser
    idEmployee
    firstName
    secondName
    lastName
    secondLastName
    nickName
    email
    phone
    companyName
    idCompanyBusinessUnit
    companyBusinessUnitDescription
    idCompanySector
    companySectorDescription
    idcompanyJobRole
    companyJobRoleDescription
    idStandardTicket
    eventProbabilityLevel
    eventConsequenceLevel
    standardTicketDescription
    idStandardJobRole
    standardJobRoleDescription
    ticketCustomDescription
    dateTimeTicketPost
    dateTimeEvent
    monthEvent
    yearEvent
    ticketImage1
    ticketImage2
    ticketImage3
    ticketImage4
    ticketVideo
    ticketSolved
    ticketLike
    injuredPeople
    lostProduction
    lostProductionTotalTimeDuration
    dateTimeEventResolved
    ticketClosed
    ticketExtraFile
  }
}

`

export const AllOpenTicketsFrom = ({ companyName }) => {
  const { loading, error, data } = useQuery(QAllOpenTicketsFrom, { variables: { companyName } })
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.allOpenTicketsFrom.map(el => JSON.stringify(el))
}

/*
  Query:allClosedTicketsFrom(companyName:String!):[ticket]!
*/

const QAllClosedTicketsFrom = gql`
query AllClosedTicketsFrom($companyName: String!) {
  allClosedTicketsFrom(companyName: $companyName) {
    idTicket
    idUser
    idEmployee
    firstName
    secondName
    lastName
    secondLastName
    nickName
    email
    phone
    companyName
    idCompanyBusinessUnit
    companyBusinessUnitDescription
    idCompanySector
    companySectorDescription
    idcompanyJobRole
    companyJobRoleDescription
    idStandardTicket
    eventProbabilityLevel
    eventConsequenceLevel
    standardTicketDescription
    idStandardJobRole
    standardJobRoleDescription
    ticketCustomDescription
    dateTimeTicketPost
    dateTimeEvent
    monthEvent
    yearEvent
    ticketImage1
    ticketImage2
    ticketImage3
    ticketImage4
    ticketVideo
    ticketSolved
    ticketLike
    injuredPeople
    lostProduction
    lostProductionTotalTimeDuration
    dateTimeEventResolved
    ticketClosed
    ticketExtraFile
  }
}

`

export const AllClosedTicketsFrom = ({ companyName }) => {
  const { loading, error, data } = useQuery(QAllClosedTicketsFrom, { variables: { companyName } })
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.allClosedTicketsFrom.map(el => JSON.stringify(el))
}

/*
  Query:ticketsOpenCountFrom(companyName:String!):Int!
*/

const QTicketsOpenCountFrom = gql`
query TicketsOpenCountFrom($companyName: String!) {
  ticketsOpenCountFrom(companyName: $companyName)
}

`

export const TicketsOpenCountFrom = ({ companyName }) => {
  const { loading, error, data } = useQuery(QTicketsOpenCountFrom, { variables: { companyName } })
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  const result = data.ticketsOpenCountFrom

  return result
}

/*
  Query:ticketsClosedCountFrom(companyName:String!):Int!
*/

const QTicketsClosedCountFrom = gql`
query TicketsClosedCountFrom($companyName: String!) {
  ticketsClosedCountFrom(companyName: $companyName)
}

`

export const TicketsClosedCountFrom = ({ companyName }) => {
  const { loading, error, data } = useQuery(QTicketsClosedCountFrom, { variables: { companyName } })
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  const result = data.ticketsClosedCountFrom

  return result
}

/*
  Query:ticketsWithVideoFrom(companyName:String!, ticketVideo: YesNo):[ticket]!
*/

const QTicketsWithVideoFrom = gql`
query TicketsWithVideoFrom($companyName: String!) {
  ticketsWithVideoFrom(companyName: $companyName) {
    idTicket
    idUser
    idEmployee
    firstName
    secondName
    lastName
    secondLastName
    nickName
    email
    phone
    companyName
    idCompanyBusinessUnit
    companyBusinessUnitDescription
    idCompanySector
    companySectorDescription
    idcompanyJobRole
    companyJobRoleDescription
    idStandardTicket
    eventProbabilityLevel
    eventConsequenceLevel
    standardTicketDescription
    idStandardJobRole
    standardJobRoleDescription
    ticketCustomDescription
    dateTimeTicketPost
    dateTimeEvent
    monthEvent
    yearEvent
    ticketImage1
    ticketImage2
    ticketImage3
    ticketImage4
    ticketVideo
    ticketSolved
    ticketLike
    injuredPeople
    lostProduction
    lostProductionTotalTimeDuration
    dateTimeEventResolved
    ticketClosed
    ticketExtraFile
  }
}

`

export const TicketsWithVideoFrom = ({ companyName }) => {
  const { loading, error, data } = useQuery(QTicketsWithVideoFrom, { variables: { companyName } })
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.ticketsWithVideoFrom.map(el => JSON.stringify(el))
}
