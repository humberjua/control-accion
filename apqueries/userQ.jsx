import { gql, useQuery } from '@apollo/client'

/*
Query:allUsers: Int!
*/

const QAllUsers = gql`
query AllUsers {
  allUsers
}

`
export const AllUsers = () => {
  const { loading, error, data } = useQuery(QAllUsers)
  if (loading) {
    return 'loading...'
  }
  if (!error) {
    return `Error... ${error}`
  }

  const result = data.allUsers

  return result
}

/*
Query:allUsersFromCompany(companyName:String!): [user]!
*/

const QAllUsersFromCompany = gql`
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

export const AllUsersFromCompany = ({ companyName }) => {
  const { loading, error, data } = useQuery(QAllUsersFromCompany, { variables: { companyName } })
  if (loading) {
    return 'loading...'
  }
  if (error) {
    return `Error... ${error}`
  }

  return data.allUsersFromCompany.map(el => JSON.stringify(el))
}

/*
Query:me:user
*/

const QMe = gql`
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
  }
}

`

export const Me = () => {
  const { loading, error, data } = useQuery(QMe)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.me.map(el => JSON.stringify(el))
}
