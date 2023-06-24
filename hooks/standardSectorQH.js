import { gql, useQuery } from '@apollo/client'

/*
  Query:allStandardSectors:[standardSector]!
*/

const QAllStandardSectors = gql`
query AllStandardSectors {
  allStandardSectors {
    idStandardSector
    standardSectorDescription
  }
}

`

export const useAllStandardSectors = () => {
  const { loading, error, data } = useQuery(QAllStandardSectors)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.allStandardSectors // .map(el => JSON.stringify(el))
}
