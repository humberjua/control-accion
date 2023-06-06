import { gql, useQuery } from '@apollo/client'

/*
  Query:companyCount: Int!
*/

const QCompanyCount = gql`
query CompanyCount {
  companyCount
}

`

export const CompanyCount = () => {
  const { loading, error, data } = useQuery(QCompanyCount)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }
  const result = data.companyCount

  return result
}

/*
  Query:allCompanies: [companyData]!
*/

const QAllCompanies = gql`
query AllCompanies {
  allCompanies {
    idCompany
    companyName
    companyCategory
    headQuartersCountry
    headQuartersCity
    headQuartersStreet
    headQuartersNumber
    headQuartersZipCode
    address
    headQuartersMainContactPhone
    headQuartersMainContactEmail
    companyInternalDescription
    companyLogo
  }
}

`

export const AllCompanies = () => {
  const { loading, error, data } = useQuery(QAllCompanies)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }
  return data.allCompanies.map(el => JSON.stringify(el))
}

/*
  Query:findCompany(companyName: String! ): companyData
*/

const QFindCompany = gql`
query FindCompany($companyName: String!) {
  findCompany(companyName: $companyName) {
    idCompany
    companyName
    companyCategory
    headQuartersCountry
    headQuartersCity
    headQuartersStreet
    headQuartersNumber
    headQuartersZipCode
    address
    headQuartersMainContactPhone
    headQuartersMainContactEmail
    companyInternalDescription
    companyLogo
  }
}

`

export const FindCompany = ({ companyName }) => {
  const { loading, error, data } = useQuery(QFindCompany, { variables: { companyName } })
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }
  return data.allCompanies.map(el => JSON.stringify(el))
}
