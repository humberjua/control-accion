import { gql, useQuery } from '@apollo/client'

/*
  Query: allCompanies
*/

// Query definition from BE. All constants definitions used for useQuery hooks, will have a Q letter at the end
const allCompaniesQ = gql`
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

export const useAllCompanies = () => {
  const { loading, error, data } = useQuery(allCompaniesQ)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  const allCompaniesData = data.allCompanies.map(el => el)

  return { allCompaniesData }
}
