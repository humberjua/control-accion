import createApolloClient from './utils/apolloClient.js'
import { ApolloProvider } from '@apollo/client'
import {
  // Text,
  // Button,
  ScrollView,
  SafeAreaView,
  StyleSheet
} from 'react-native'
import React, { Component } from 'react'
import { NativeRouter } from 'react-router-native'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'

import { MyVictoryBoxPlot, MyVictoryChartBar, MyVictoryHistogram, MyVictoryArea, MyVictoryVoronoi } from './VictoryCharts.jsx'
// import { MyKitLineChart, MyKitPieChart, MyKitBarChart, MyKitProgresiveRing } from './KitCharts.jsx'
// import { AllBusinessUnits, CompanyBusinessUnitCount, BusinessUnitsFrom } from './apqueries/companyBusinessUnitQ.jsx'
// import { AllCompanySectors } from './apqueries/companySectorQ.jsx'
// import { AddNewChartScreen, EditChartScreen } from './apmutations/chartM.jsx'
import { ChartMEdit } from './apmutations/chartMEdit.jsx'
import * as Notifications from 'expo-notifications'
import { GetToken } from './utils/GetToken.js'

const apolloClient = createApolloClient()
// const data = [
//   { x: 1, y: 10000 },
//   { x: 2, y: 16500 },
//   { x: 3, y: 14250 },
//   { x: 3.5, y: 20000 }
// ]

class App extends Component {
  componentDidMount () {
    GetToken()
  }

  render () {
    return (
      <ApolloProvider client={apolloClient}>
        <SafeAreaView style={styles.container}>
          <StatusBar style='dark' />
          <NativeRouter>
            <ScrollView>
              {/* <Text> *** AllBusinessUnits *** </Text>
              <Text> <AllBusinessUnits /> </Text>
              <Text> *** CompanyBusinessUnitCount *** </Text>
              <Text> <CompanyBusinessUnitCount companyName='Fantasy Corporation' /> </Text>
              <Text> *** BusinessUnitsFrom *** </Text>
              <Text> <BusinessUnitsFrom companyName='Fantasy Corporation' /> </Text>
              <Text> *** AllCompanySectors *** </Text>
              <Text> <AllCompanySectors companyName='Fantasy Corporation' /> </Text>
              <Button key='button' title='Botonaso' /> */}
              {/* <AddNewChartScreen /> */}
              <ChartMEdit />
              {/* <Text>**********************</Text>
              <Text>*** Victory Charts ***</Text>
              <Text>**********************</Text>
              <MyVictoryChartBar data={data} xLegend='x' yLegend='y' duration='2000' animation='circle' /> */}
              {/* <MyVictoryBoxPlot /> */}
              <MyVictoryHistogram />
              {/* <MyVictoryArea />
              <MyVictoryVoronoi />
              <Text>******************</Text>
              <Text>*** Kit Charts ***</Text>
              <Text>******************</Text>
              <MyKitLineChart />
              <MyKitPieChart />
              <MyKitBarChart />
              <MyKitProgresiveRing /> */}
            </ScrollView>
          </NativeRouter>
        </SafeAreaView>
      </ApolloProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 5
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
})

export default App
