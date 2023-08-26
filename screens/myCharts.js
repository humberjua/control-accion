import { useEffect, useState } from 'react'
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  Text,
  Pressable,
  Dimensions
} from 'react-native'
import { Divider, useTheme, ActivityIndicator } from 'react-native-paper'
import { useMe } from '../hooks/userQH'
import SmallChartView from '../components/SmallChartView'

const MyFavoriteCharts = () => {
  const screenHeight = Dimensions.get('screen').height
  const [height, setHeight] = useState(200)
  const [visible, setVisible] = useState([true, true, true])
  // Estos 2 arrays deberán surgir de consultas...
  const mFC = ['Histogram', 'Area', 'ProgresiveRing']
  const data = [
    [
      { x: 1 }, // Cuenta las ocurrencias de un valor, graficará 1 ocurrencia de x=1, 1 de x=2 y
      { x: 3 }, // 2 ocurrencias de x=5
      { x: 5 },
      { x: 5 }
    ],
    [
      { x: 0, y: 1, y0: 0 },
      { x: 2, y: 3, y0: 1 },
      { x: 3, y: 5, y0: 1 },
      { x: 4, y: 4, y0: 2 },
      { x: 5, y: 6, y0: 2 }
    ],
    [
      {
        labels: ['Swim', 'Bike', 'Run'], // optional
        data: [0.1, 0.6, 0.8]
      }
    ],
    [
      { x: 1, y: 2, y0: 1 },
      { x: 2, y: 3, y0: 2 },
      { x: 3, y: 5, y0: 2 },
      { x: 4, y: 4, y0: 3 },
      { x: 5, y: 6, y0: 3 }
    ]
  ]

  let i = -1
  useEffect(() => setVisible(visible), [visible])
  return mFC.map((el, index) => {
    i++
    return (
      <View key={i}>
        <Pressable
          onPress={() => {
            setHeight(height !== screenHeight / 2 ? screenHeight / 2 : 200)
            setVisible(visible.map((value, newIndex) => newIndex === index ? value : !value))
          }}
          style={({ pressed }) => {
            return { opacity: pressed ? 0.2 : 1 }
          }}
        >
          <SmallChartView chartToShow={el} height={height} data={data[i]} visible={visible[i]} />
        </Pressable>
      </View>
    )
  })
}

export default function MyCharts () {
  const [loaded, setLoaded] = useState(false)
  const theme = useTheme()
  const { me } = useMe()
  if (!me) return
  return (
    <ScrollView>
      <View theme={theme} onLayout={() => setLoaded(true)}>
        <Text style={styles.text}>{me.nickName}
          <Image
            style={styles.image}
            source={{
              uri: me.userProfileImage
            }}
          />
        </Text>
        <Divider style={{ borderWidth: 1, paddingBottom: 10, paddinTop: 10, borderColor: 'white', backgroundColor: 'white' }} />
        {
          !loaded && <ActivityIndicator size='large' hidesWhenStopped theme={theme} />
        }
        {/*
          En esta parte hay que agregar el código que haga:
            1)_ Hacer una consulta para saber cuales son los graficos favoritos del usuario, por defecto serán "Histogram", "Area" y "Voronoi"
            2)_ Hacer una consulta que traiga los datos (data) de cada gráfico para llamarlo
            3)_ Mostrar a todos los gráficos favoritos del usuario
            4)_ Una vez que se presione un gráfico, redefinir su tamaño (para que sea máximo) y dejar visible sólo a este, con la flechita (atrás visible)
        */}
        <MyFavoriteCharts />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    resizeMode: 'stretch',
    paddingTop: 5,
    paddingBottom: 10
  },
  text: {
    fontSize: 18,
    alignSelf: 'center'
  },
  divider: {
    paddingBottom: 2,
    paddingTop: 2
  }
})
