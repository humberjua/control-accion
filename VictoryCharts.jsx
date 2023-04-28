import React from 'react'
import { StyleSheet, View, Dimensions, Platform } from 'react-native'
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryHistogram,
  VictoryBoxPlot,
  VictoryArea,
  VictoryVoronoi,
  VictoryAxis
} from 'victory-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fccc'
  },
  histogram: {
    data: { fill: '#c43a31' }
  },
  boxplot: {
    backgroundColor: '#f5aaac'
  },
  area: {
    data: { fill: '#c43a31' }
  },
  voronoi: {
    data: { stroke: '#c43a31', strokeWidth: 2, fill: 'lightyellow' }
  }
})

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height
const keys = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]

export const MyVictoryChartBar = ({ data = {}, xLegend = 'x', yLegend = 'y', duration = 2000, animation = 'elasticIn' }) => {
  return (
    <View style={styles.container}>

      <VictoryChart
        theme={VictoryTheme.material}
        key={keys[0]}
      >
        <VictoryBar
          data={data} x={xLegend} y={yLegend}
          animate={{
            easing: animation,
            duration: parseInt(duration)
          }}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPress: () => {
                  return [
                    {
                      mutation: (props) => {
                        const fill = props.style && props.style.fill
                        return fill === 'tomato' ? null : { style: Object.assign(props.style, { fill: 'tomato' }) }
                      }
                    }
                  ]
                },
                onClick: () => {
                  return [
                    {
                      mutation: (props) => {
                        const fill = props.style && props.style.fill
                        return fill === 'green' ? null : { style: Object.assign(props.style, { fill: 'green' }) }
                      }
                    }
                  ]
                }
              }
            },
            {
              target: 'data',
              eventHandlers: {
                onPress: () => {
                  return [
                    {
                      mutation: (props) => {
                        const fill = props.style && props.style.fill
                        return fill === 'tomato' ? null : { style: Object.assign(props.style, { fill: 'tomato' }) }
                      }
                    }
                  ]
                },
                onClick: () => {
                  return [
                    {
                      mutation: (props) => {
                        const fill = props.style && props.style.fill
                        return fill === 'green' ? null : { style: Object.assign(props.style, { fill: 'green' }) }
                      }
                    }
                  ]
                }
              }
            }
          ]}

        />
      </VictoryChart>
    </View>
  )
}

export const MyVictoryHistogram = () => {
  const data = [
    { x: 1 }, // Cuenta las ocurrencias de un valor, graficará 1 ocurrencia de x=1, 1 de x=2 y
    { x: 2 }, // 2 ocurrencias de x=5
    { x: 5 },
    { x: 5 }
  ]

  return (
    <View style={styles.histogram}>
      <VictoryChart
        domainPadding={{ x: 2 }}
        key={keys[1]}
      >
        <VictoryHistogram
          style={{ data: { fill: '#c43a31' } }}
          data={data}
          binSpacing={10}
          cornerRadius={{ topRight: ({ datum }) => datum.y * 20 }}
          animate={{
            onLoad: {
              duration: 2000,
              easing: 'fill'
            }
          }}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPress: () => {
                  return [
                    {
                      mutation: (props) => {
                        const fill = props.style && props.style.fill
                        return fill === 'tomato' ? null : { style: Object.assign(props.style, { fill: 'tomato' }) }
                      }
                    }
                  ]
                },
                onClick: () => {
                  return [
                    {
                      mutation: (props) => {
                        const fill = props.style && props.style.fill
                        return fill === 'green' ? null : { style: Object.assign(props.style, { fill: 'green' }) }
                      }
                    }
                  ]
                }
              }
            },
            {
              target: 'data',
              eventHandlers: {
                onPress: () => {
                  return [
                    {
                      mutation: (props) => {
                        const fill = props.style && props.style.fill
                        return fill === 'tomato' ? null : { style: Object.assign(props.style, { fill: 'tomato' }) }
                      }
                    }
                  ]
                },
                onClick: () => {
                  return [
                    {
                      mutation: (props) => {
                        const fill = props.style && props.style.fill
                        return fill === 'green' ? null : { style: Object.assign(props.style, { fill: 'green' }) }
                      }
                    }
                  ]
                }
              }
            }
          ]}

        />
      </VictoryChart>
    </View>
  )
}

export const MyVictoryBoxPlot = () => {
  const data = [
    { x: 1, y: [1, 2, 3, 5] },
    { x: 2, y: [3, 2, 8, 10] },
    { x: 3, y: [2, 8, 6, 5] },
    { x: 4, y: [1, 3, 2, 9] }
  ]

  if (Platform.OS === 'web') {
    return (
      <View style={styles.boxplot}>
        <VictoryChart domainPadding={10} key={keys[2]}>
          <VictoryBoxPlot
            horizontal
            labels
            data={data}
            events={[
              {
                target: 'q1',
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        mutation: (props) => {
                          const fill = props.style && props.style.fill
                          return fill === 'green' ? null : { style: Object.assign(props.style, { fill: 'green' }) }
                        }
                      }
                    ]
                  }
                }
              },
              {
                target: 'q3',
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        mutation: (props) => {
                          const fill = props.style && props.style.fill
                          return fill === 'green' ? null : { style: Object.assign(props.style, { fill: 'green' }) }
                        }
                      }
                    ]
                  }
                }
              }
            ]}
          />
        </VictoryChart>
      </View>
    )
  } else {
    return (
      <View style={styles.boxplot}>
        <VictoryChart domainPadding={10} key={keys[2]}>
          <VictoryBoxPlot
            horizontal
            labels
            data={data}
            events={[
              {
                target: 'q1',
                eventHandlers: {
                  onPress: () => {
                    return [
                      {
                        mutation: (props) => {
                          const fill = props.style && props.style.fill
                          return fill === 'tomato' ? null : { style: Object.assign(props.style, { fill: 'tomato' }) }
                        }
                      }
                    ]
                  }
                }
              },
              {
                target: 'q3',
                eventHandlers: {
                  onPress: () => {
                    return [
                      {
                        mutation: (props) => {
                          const fill = props.style && props.style.fill
                          return fill === 'tomato' ? null : { style: Object.assign(props.style, { fill: 'tomato' }) }
                        }
                      }
                    ]
                  }
                }
              }
            ]}
          />
        </VictoryChart>
      </View>
    )
  }
}

export const MyVictoryArea = () => {
  const data = [
    { x: 1, y: 1, y0: 0 },
    { x: 2, y: 3, y0: 1 },
    { x: 3, y: 5, y0: 1 },
    { x: 4, y: 4, y0: 2 },
    { x: 5, y: 6, y0: 2 }
  ]

  return (
    <View style={styles.area}>
      <VictoryChart
        theme={VictoryTheme.material}
        flex={1}
        key={keys[3]}
      >
        <VictoryArea
          interpolation='natural'
          labels={({ datum }) => datum.y}
          data={data}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPress: () => {
                  return [
                    {
                      mutation: (props) => {
                        const fill = props.style && props.style.fill
                        return fill === 'tomato' ? null : { style: Object.assign(props.style, { fill: 'tomato' }) }
                      }
                    }
                  ]
                },
                onClick: () => {
                  return [
                    {
                      mutation: (props) => {
                        const fill = props.style && props.style.fill
                        return fill === 'green' ? null : { style: Object.assign(props.style, { fill: 'green' }) }
                      }
                    }
                  ]
                }
              }
            },
            {
              target: 'data',
              eventHandlers: {
                onPress: () => {
                  return [
                    {
                      mutation: (props) => {
                        const fill = props.style && props.style.fill
                        return fill === 'tomato' ? null : { style: Object.assign(props.style, { fill: 'tomato' }) }
                      }
                    }
                  ]
                },
                onClick: () => {
                  return [
                    {
                      mutation: (props) => {
                        const fill = props.style && props.style.fill
                        return fill === 'green' ? null : { style: Object.assign(props.style, { fill: 'green' }) }
                      }
                    }
                  ]
                }
              }
            }
          ]}

        />
      </VictoryChart>
    </View>
  )
}

export const MyVictoryVoronoi = () => {
  const data = [
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 7 }
  ]

  const domain = { x: [0, 5], y: [0, 7] }

  return (
    <View>
      <VictoryChart
        theme={VictoryTheme.material}
        domain={domain}
        // height={screenHeight/2}
        // width={screenWidth}
        key={keys[4]}
      >
        <VictoryVoronoi
          style={styles.voronoi}
          data={data}
        />
        {/* Esta parte de acá abajo es la que mete los ejes en el gráfico
            Es decir, que mezcla 2 cosas (un grafico voronoi con 2 ejes),
            y por lo tanto podría mezclar un tercero...
         */}
        <VictoryAxis
          crossAxis
          width={screenWidth}
          height={screenHeight}
          // domain={[200, 200]}
          theme={VictoryTheme.material}
          offsetY={100}
          label='Label x'
        />
        <VictoryAxis
          dependentAxis crossAxis
          width={screenWidth}
          height={screenHeight}
          // domain={[200, 200]}
          theme={VictoryTheme.material}
          offsetX={100}
          label='Label y'
        />
      </VictoryChart>
    </View>
  )
}
