import { gql, useQuery } from '@apollo/client'

/*
Query:allUsers: Int!
*/

// Query definition from BE. All constants definitions used for useQuery hooks, will have a Q letter at the end
const allUsersQ = gql`
query AllUsers {
  allUsers
}

`

export const useAllUsers = () => {
  const { loading, error, data } = useQuery(allUsersQ)
  if (loading) {
    return 'loading...'
  }
  if (!error) {
    return `Error... ${error}`
  }

  const allUsers = data.allUsers

  return { allUsers }
}

/*
Query:allUsersFromCompany(companyName:String!): [user]!
*/

// Query definition from BE. All constants definitions used for useQuery hooks, will have a Q letter at the end
const allUsersFromCompanyQ = gql`
query AllUsersFromCompany($companyName: String!) {
  allUsersFromCompany(companyName: $companyName) {
    idUser
    idEmployee
    password
    firstName
    secondName
    lastName
    secondLastName
    nickName
    email
    phone
    idCompany
    fullName
    companyName
    idCompanyBusinessUnit
    companyBusinessUnitDescription
    idCompanySector
    companySectorDescription
    idStandardJobRole
    standardJobRoleDescription
    idcompanyJobRole
    companyJobRoleDescription
    userProfileImage
    isCompanyAppAdmin
    hiredDate
    active
  }
}

`

export const useAllUsersFromCompany = ({ companyName }) => {
  const { loading, error, data } = useQuery(allUsersFromCompanyQ, { variables: { companyName } })
  if (loading) {
    return 'loading...'
  }
  if (error) {
    return `Error... ${error}`
  }

  const allUsersFromCompany = data.allUsersFromCompany.map(el => el)

  return { allUsersFromCompany }
}

/*
Query:me:user
*/

// Query definition from BE. All constants definitions used for useQuery hooks, will have a Q letter at the end
const meQ = gql`
query Me {
  me {
    idUser
    idEmployee
    password
    firstName
    secondName
    lastName
    secondLastName
    nickName
    email
    phone
    idCompany
    fullName
    companyName
    idCompanyBusinessUnit
    companyBusinessUnitDescription
    idCompanySector
    companySectorDescription
    idStandardJobRole
    standardJobRoleDescription
    idcompanyJobRole
    companyJobRoleDescription
    userProfileImage
    isCompanyAppAdmin
    hiredDate
    active
    isSuperUser
  }
}

`

export const useMe = ({ token }) => {
  const { loading, error, data } = useQuery(
    meQ,
    { variables: {} },
    { headers: { Authorization: 'BEARER' + token } }
  )
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  const me = data.me.map(el => el)

  return { me }
}
