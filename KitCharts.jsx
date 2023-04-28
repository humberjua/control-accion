import React from 'react'
import { Dimensions } from 'react-native'

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart
} from 'react-native-chart-kit'

const screenWidth = Dimensions.get('window').width - 5
const screenHeight = Dimensions.get('window').height / 3

export const MyKitLineChart = () => {
  return (
  // En esta parte va el gráfico
    <LineChart
      data={{
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100
            ]
          }
        ]
      }}
      width={screenWidth} // from react-native
      height={screenHeight}
      yAxisLabel='$'
      yAxisSuffix='k'
      yAxisInterval={2} // optional, defaults to 1
      chartConfig={{
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#ab8c00',
        backgroundGradientTo: 'black',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        fillShadowGradient: 10,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#ffa726',
          backgroundColor: 'ccc726'
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
  )
}

export const MyKitPieChart = () => {
  const data = [
    {
      name: 'Seoul',
      population: 21500000,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'Toronto',
      population: 2800000,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'Beijing',
      population: 527612,
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'New York',
      population: 8538000,
      color: 'magenta',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'Moscow',
      population: 11920000,
      color: 'rgb(0, 0, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    }
  ]

  const chartConfig = {
    color: (opacity = 0.1) => `rgba(26, 26, 146, ${opacity})`
  }

  return (
    <PieChart
      data={data}
      width={screenWidth}
      height={screenHeight * 1.2}
      chartConfig={chartConfig}
      accessor='population'
      backgroundColor='white'
      paddingLeft='15'
      center={[10, 10]}
      absolute
    />
  )
}

export const MyKitBarChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [40, 45, 30, 60, 75, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ['Rainy Days'] // optional
  }

  const chartConfig = {
    color: (opacity = 1) => `rgba(210, 200, 16, ${opacity})`
  }

  return (
    <BarChart
      data={data}
      width={screenWidth}
      height={screenHeight}
      chartConfig={chartConfig}
      // xLabelsOffset={true}
      // fromZero={true}
    />
  )
}

export const MyKitProgresiveRing = () => {
  const data = {
    labels: ['Swim', 'Bike', 'Run'], // optional
    data: [0.2, 0.6, 0.8]
  }

  const chartConfig = {
    color: (opacity = 1) => `rgba(255, 200, 16, ${opacity})`
  }

  return (
    <ProgressChart
      backgroundColor='black'
      data={data}
      width={screenWidth}
      height={screenHeight}
      strokeWidth={16}
      radius={32}
      chartConfig={chartConfig}
      hideLegend={false}
    />
  )
}
