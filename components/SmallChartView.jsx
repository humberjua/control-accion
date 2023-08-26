import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { MyVictoryHistogram, MyVictoryArea, MyVictoryChartBar, MyVictoryVoronoi } from '../VictoryCharts'
import { MyKitBarChart, MyKitLineChart, MyKitPieChart, MyKitProgresiveRing } from '../KitCharts'

const SmallChartView = ({ chartToShow = 'Histogram', data = {}, height = 200, visible = true }) => {
  if (!visible) return
  return (
    <ScrollView>
      <View style={styles.chart}>
        <Text> {chartToShow}. ⭐ </Text>
        {
          chartToShow === 'Histogram'
            ? <MyVictoryHistogram height={height} data={data} visible={visible} />
            : chartToShow === 'Area'
              ? <MyVictoryArea height={height} data={data} visible={visible} />
              : chartToShow === 'ChartBar'
                ? <MyVictoryChartBar height={height} data={data} visible={visible} />
                : chartToShow === 'KitBar'
                  ? <MyKitBarChart height={height} data={data} visible={visible} />
                  : chartToShow === 'KitLine'
                    ? <MyKitLineChart height={height} data={data} visible={visible} />
                    : chartToShow === 'KitPie'
                      ? <MyKitPieChart height={height} data={data} visible={visible} />
                      : chartToShow === 'ProgresiveRing'
                        ? <MyKitProgresiveRing height={height} data={data} visible={visible} />
                        : <MyVictoryVoronoi height={height} data={data} visible={visible} />
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  chart: {
    paddingTop: 10,
    borderWidth: 1,
    borderRadius: 10
  }
})

export default SmallChartView
