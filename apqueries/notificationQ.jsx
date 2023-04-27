import { gql, useQuery } from '@apollo/client'

/*
  Query:notificationByIdUser(idUser:ID!):[notification]!
*/

const QNotificationByIdUser = gql`
query NotificationByIdUser($idUser: ID!) {
  notificationByIdUser(idUser: $idUser) {
    idNotification
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
    showNotificationsToLevel
    notificationLevel
    notificationTitle
    notificationDescription
    isActive
  }
}

`

export const NotificationByIdUser = ({ idUser }) => {
  const { loading, error, data } = useQuery(QNotificationByIdUser, { variables: { idUser } })
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.notificationByIdUser.map(el => JSON.stringify(el))
}

/*
  Query:notificationsToLevel(idUser:ID!,showNotificationsToLevel:Int!):[notification]!
*/

const QNotificationsToLevel = gql`
query NotificationsToLevel($idUser: ID!, $showNotificationsToLevel: Int!) {
  notificationsToLevel(idUser: $idUser, showNotificationsToLevel: $showNotificationsToLevel) {
    idNotification
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
    showNotificationsToLevel
    notificationLevel
    notificationTitle
    notificationDescription
    isActive
  }
}

`

export const NotificationsToLevel = ({ idUser, showNotificationsToLevel }) => {
  const { loading, error, data } = useQuery(QNotificationsToLevel, { variables: { idUser, showNotificationsToLevel } })
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.notificationsToLevel.map(el => JSON.stringify(el))
}
