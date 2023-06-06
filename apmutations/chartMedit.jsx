import { useState } from 'react'
import { Text } from 'react-native'
import { EditChartScreen } from './chartM.jsx'
import { useChartsCount, useAllCharts } from '../hooks/chartQH.jsx'
import SelectDropdown from 'react-native-select-dropdown'

let preCharts = ['no charts founds...']

export const ChartMEdit = () => {
  let [result, setResult] = useState('')
  const { allChartsData } = useAllCharts()
  const { chartsCountData } = useChartsCount()
  try {
    if (chartsCountData > 0) {
      preCharts = allChartsData.map(el => el.chartDescription)
    }
    return (
      <>
        <Text>
          Select one Chart for edit
        </Text>
        <SelectDropdown
          data={preCharts}
          onSelect={(selectedItem, index) => {
            delete allChartsData[index].__typename
            result = {
              ...allChartsData[index],
              chartHeight: allChartsData[index].chartHeight.toString(),
              chartWidth: allChartsData[index].chartWidth.toString(),
              fromDay: new Date(Number(allChartsData[index].fromDay)).toLocaleDateString(),
              toDay: new Date(Number(allChartsData[index].toDay)).toLocaleDateString()
            }
            setResult(result)
            return (
              <>
              </>
            )
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return (selectedItem)
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />
        {result === '' || <EditChartScreen preValues={result} replace />}
      </>
    )
  } catch (error) {
    console.log('error= ', error.message)
  }
}
