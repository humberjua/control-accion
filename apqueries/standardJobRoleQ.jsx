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
