import { gql, useQuery } from '@apollo/client'

/*
Query:allUsers: Int!
*/

// Query definition from BE. All constants definitions used for useQuery hooks, will have a Q letter at the end
const allUsersQ = gql`
query Query {
  allUsers
}

`

export const useAllUsers = () => {
  const { loading, error, data } = useQuery(allUsersQ)
  if (loading) {
    return 'loading...'
  }
  if (error) {
    return `Error... ${error}`
  }
  const allUsers = data.allUsers
  return allUsers
}

/*
Query:totalUsersFromCompany: Int!
*/

// Query definition from BE. All constants definitions used for useQuery hooks, will have a Q letter at the end
const totalUsersFromCompanyQ = gql`
query Query($companyName: String!, $isCompanyAppAdmin: Boolean) {
  totalUsersFromCompany(companyName: $companyName, isCompanyAppAdmin: $isCompanyAppAdmin)
}

`

export const useTotalUsersFromCompany = (companyName, isCompanyAppAdmin = undefined) => {
  const parameters = isCompanyAppAdmin === undefined
    ? { variables: { companyName } }
    : { variables: { companyName, isCompanyAppAdmin } }

  const { loading, error, data } = useQuery(totalUsersFromCompanyQ, parameters)
  if (loading) {
    return 'loading...'
  }
  if (error) {
    return `Error... ${error}`
  }
  const totalUsersFromCompany = data.totalUsersFromCompany
  return totalUsersFromCompany
}

/*
Query:allUsersFromCompany(companyName:String!): [user]!
*/

// Query definition from BE. All constants definitions used for useQuery hooks, will have a Q letter at the end
const allUsersFromCompanyQ = gql`
query AllUsersFromCompany($companyName: String!, $isCompanyAppAdmin: Boolean) {
  allUsersFromCompany(companyName: $companyName, isCompanyAppAdmin: $isCompanyAppAdmin) {
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

export const useAllUsersFromCompany = (companyName, isCompanyAppAdmin = null) => {
  const params = isCompanyAppAdmin !== null
    ? { variables: { companyName, isCompanyAppAdmin } }
    : { variables: { companyName } }

  const { loading, error, data } = useQuery(allUsersFromCompanyQ, params)
  if (loading) {
    return 'loading...'
  }
  if (error) {
    console.error(error.message)
    return `Error... ${error}`
  }

  const allUsersFromCompany = data.allUsersFromCompany

  if (allUsersFromCompany) {
    return allUsersFromCompany
  } else {
    return {}
  }
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
    gender
    birthday
    age
  }
}

`

// export const useMe = (token) => {
export const useMe = () => {
  const { loading, error, data } = useQuery(meQ)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }
  const meData = data
  if (meData) {
    // acá al exportar meData solamente en lugar de meData.me, cuando se llame a este hook, se lo deberá hacer así: const { me } = useMe()
    return meData
  } else {
    return {}
  }
}
