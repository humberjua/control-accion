import { gql, useQuery } from '@apollo/client'

/*
  Query:userChartByIdUser(idUser:String!):[userChart]!
*/

const QUserChartByIdUser = gql`
query UserChartByIdUser($idUser: String!) {
  userChartByIdUser(idUser: $idUser) {
    idUserChart
    idUser
    idChart
    chartDescription
    userChartDescription
    showingOrder
    fromDay
    toDay
    x1
    x2
    x3
    x4
    y1DataField
    y1DataGroupingWay
    y1Value
    y2DataField
    y2DataGroupingWay
    y2Value
    y3DataField
    y3DataGroupingWay
    y3Value
    y4DataField
    y4DataGroupingWay
    y4Value
    showLabelX1
    labelX1
    showLabelX2
    labelX2
    showLabelX3
    labelX3
    showLabelX4
    labelX4
    showLabelY1
    labelY1
    showLabelY2
    labelY2
    showLabelY3
    labelY3
    showLabelY4
    labelY4
    showTitle
    title
  }
}

`

export const UserChartByIdUser = ({ idUser }) => {
  const { loading, error, data } = useQuery(QUserChartByIdUser, { variables: { idUser } })
  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error! ${error}`
  }

  return data.userChartByIdUser.map(el => JSON.stringify(el))
}
