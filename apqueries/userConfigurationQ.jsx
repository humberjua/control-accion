import { gql, useQuery } from '@apollo/client'

/*
  Query:userConfigurationFromCompany(companyName:String!):[userConfiguration]!
*/

const QUserConfigurationFromCompany = gql`
query UserConfigurationFromCompany($companyName: String!) {
  userConfigurationFromCompany(companyName: $companyName) {
    idUserConfiguration
    idUser
    idEmployee
    firstName
    secondName
    lastName
    secondLastName
    nickName
    email
    phone
    idCompany
    companyName
    idCompanyBusinessUnit
    companyBusinessUnitDescription
    idStandardJobRole
    standardJobRoleDescription
    idCompanySector
    companySectorDescription
    idcompanyJobRole
    companyJobRoleDescription
    theme
    showNotificationsToLevel
    optionConfiguration1
    optionConfiguration2
    optionConfiguration3
  }
}

`

export const UserConfigurationFromCompany = ({ companyName }) => {
  const { loading, error, data } = useQuery(QUserConfigurationFromCompany, { variables: { companyName } })
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.userConfigurationFromCompany.map(el => JSON.stringify(el))
}
/*
  Query:userConfigurationByIdEmployee(idEmployee:String!):userConfiguration!
*/

const QUserConfigurationByIdEmployee = gql`
query UserConfigurationByIdEmployee($idEmployee: String!) {
  userConfigurationByIdEmployee(idEmployee: $idEmployee) {
    idUserConfiguration
    idUser
    idEmployee
    firstName
    secondName
    lastName
    secondLastName
    nickName
    email
    phone
    idCompany
    companyName
    idCompanyBusinessUnit
    companyBusinessUnitDescription
    idStandardJobRole
    standardJobRoleDescription
    idCompanySector
    companySectorDescription
    idcompanyJobRole
    companyJobRoleDescription
    theme
    showNotificationsToLevel
    optionConfiguration1
    optionConfiguration2
    optionConfiguration3
  }
}

`

export const UserConfigurationByIdEmployee = ({ idEmployee }) => {
  const { loading, error, data } = useQuery(QUserConfigurationByIdEmployee, { variables: { idEmployee } })
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.userConfigurationByIdEmployee.map(el => JSON.stringify(el))
}
