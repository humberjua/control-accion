import { gql, useQuery } from '@apollo/client'

/*
  Query:allStandardJobRoles: [standardJobRole]!
*/

const QAllStandardJobRoles = gql`
query AllStandardJobRoles {
  allStandardJobRoles {
    idStandardJobRole
    standardJobRoleDescription
    internalId
    reserved
  }
}

`

export const AllStandardJobRoles = () => {
  const { loading, error, data } = useQuery(QAllStandardJobRoles)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.allStandardJobRoles.map(el => JSON.stringify(el))
}

/*
  Query: findStandardJobRole: standardJobRole
*/

const findStandardJobRoleQ = gql`
query FindStandardJobRole($idStandardJobRole: String!) {
  findStandardJobRole(idStandardJobRole: $idStandardJobRole) {
    idStandardJobRole
    standardJobRoleDescription
    internalId
    reserved
  }
}

`
export const FindStandardJobRole = async (idStandardJobRole) => {
  // console.log('idStandardJobRole =========>', idStandardJobRole)
  const { loading, error, data } = useQuery(findStandardJobRoleQ, { variables: { idStandardJobRole } })
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  // console.info('data from FindStandardJobRole=', await data)
  const result = await data // .FindStandardJobRole.map(el => el)
  try {
    return await result
  } catch (error) {}
}
