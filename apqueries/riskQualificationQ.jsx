import { gql, useQuery } from '@apollo/client'

/*
  Query:allRiskQualifications:[riskQualification]!
*/

const QAllRiskQualifications = gql`
query AllRiskQualifications {
  allRiskQualifications {
    idRiskQualification
    riskQualificationLevel
    riskQualificationInitials
    riskQualificationDescription
  }
}

`

export const AllRiskQualifications = () => {
  const { loading, error, data } = useQuery(QAllRiskQualifications)
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.allRiskQualifications.map(el => JSON.stringify(el))
}
