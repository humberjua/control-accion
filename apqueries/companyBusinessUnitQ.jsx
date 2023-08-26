import { gql, useQuery } from '@apollo/client'

/*
  Query: allBusinessUnits: [companyBusinessUnit]!
*/
const QAllBusinessUnits = gql`
query AllBusinessUnits {
  allBusinessUnits {
    idCompanyBusinessUnit
    idCompany
    companyName
    companyBusinessUnitDescription
  }
}

`

export const AllBusinessUnits = () => {
  const { loading, error, data } = useQuery(QAllBusinessUnits)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }
  return data.allBusinessUnits.map(el => JSON.stringify(el))
}

/*
  Query: companyBusinessUnitCount(companyName:String!): Int!
*/
const QCompanyBusinessUnitCount = gql`
query CompanyBusinessUnitCount($companyName: String!) {
  companyBusinessUnitCount(companyName: $companyName)
}

`
export const CompanyBusinessUnitCount = ({ companyName }) => {
  const { loading, error, data } = useQuery(QCompanyBusinessUnitCount, { variables: { companyName } })
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }
  return data.companyBusinessUnitCount // En este caso, solo devuelve un valor.
}

/*
  Query: businessUnitsFrom(companyName:String!): [companyBusinessUnit]
*/
const QBusinessUnitsFrom = gql`
query BusinessUnitsFrom($companyName: String!) {
  businessUnitsFrom(companyName: $companyName) {
     idCompany
     idCompanyBusinessUnit
     companyName
     companyBusinessUnitDescription
  }
}

`

export const BusinessUnitsFrom = ({ companyName }) => {
  const { loading, error, data } = useQuery(QBusinessUnitsFrom, { variables: { companyName } })
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.businessUnitsFrom// .map(el => JSON.stringify(el))
}
