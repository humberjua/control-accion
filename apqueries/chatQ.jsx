import { gql, useQuery } from '@apollo/client'

/*
  Query: chatByIdUser(idUser:ID!):[chat]!
*/

const QChatByIdUser = gql`
query ChatByIdUser($idUser: ID!) {
  chatByIdUser(idUser: $idUser) {
    idChat
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
    idUserTo
    userProfileImage
    userProfileImageTo
    chatText
    chatDateTimePost
    idConversation
  }
}

`

export const ChatByIdUser = ({ idUser }) => {
  const { loading, error, data } = useQuery(QChatByIdUser, { variables: { idUser } })
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.chatByIdUser.map(el => JSON.stringify(el))
}

/*
  Query:chatBy2Users(idUser:ID!,idUserTo:ID!):[chat]!
*/

const QChatBy2Users = gql`
query ChatBy2Users($idUser: ID!, $idUserTo: ID!) {
  chatBy2Users(idUser: $idUser, idUserTo: $idUserTo) {
    idChat
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
    idUserTo
    userProfileImage
    userProfileImageTo
    chatText
    chatDateTimePost
    idConversation
  }
}

`

export const ChatBy2Users = ({ idUser, idUserTo }) => {
  const { loading, error, data } = useQuery(QChatBy2Users, { variables: { idUser, idUserTo } })
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.chatBy2Users.map(el => JSON.stringify(el))
}

/*
  Query: chatByConversation(idConversation:ID!):[chat]!
*/

const QChatByConversation = gql`
query ChatByConversation($idConversation: ID!) {
  chatByConversation(idConversation: $idConversation) {
    idChat
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
    idUserTo
    userProfileImage
    userProfileImageTo
    chatText
    chatDateTimePost
    idConversation
  }
}

`

export const ChatByConversation = (idConversation) => {
  const { loading, error, data } = useQuery(QChatByConversation, { variables: { idConversation } })
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.chatByConversation.map(el => JSON.stringify(el))
}
