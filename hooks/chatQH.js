import { gql, useQuery } from '@apollo/client'

const chatBy2UsersQ = gql`
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

export const useChatBy2Users = (idUser, idUserTo) => {
  const { loading, error, data } = useQuery(chatBy2UsersQ, { variables: { idUser, idUserTo } })
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }
  const chatBy2UsersData = data.chatBy2Users.map(el => el) // en este caso, chatBy2Users devuelve un arreglo
  // Averiguar, como cuerno se ordena la query desde el punto de vista de mongo

  return { chatBy2UsersData }
}
