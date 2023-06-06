import { gql, useQuery } from '@apollo/client'

/*
  Query:allCompanyJobRoles(companyName:String!): [companyJobRole]!
*/

const QAllCompanyJobRoles = gql`
query AllCompanyJobRoles($companyName: String!) {
  allCompanyJobRoles(companyName: $companyName) {
    idCompanyJobRole
    idCompany
    companyName
    idCompanyBusinessUnit
    companyBusinessUnitDescription
    idCompanySector
    companySectorDescription
    idStandardJobRole
    standardJobRoleDescription
    companyJobRoleDescription
  }
}

`

export const AllCompanyJobRoles = ({ companyName }) => {
  const { loading, error, data } = useQuery(QAllCompanyJobRoles)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.allCompanyJobRoles.map(el => JSON.stringify(el))
}
