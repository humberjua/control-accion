import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext.js'
import { View, StyleSheet } from 'react-native'
import { FAB as Fab, Portal } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const MyFab = () => {
  const { data } = useContext(DataContext)
  const [view, setView] = useState(false)
  const [state, setState] = useState({ open: false })
  const onStateChange = ({ open }) => setState({ open })
  const { open } = state
  const navigation = useNavigation()

  useEffect(() => setView(data.fabView), [data])

  return (
    <View style={styles.container}>
      <Portal>
        <Fab.Group
          open={open}
          visible={view}
          style={styles.button}
          backdropColor='#00000000'
          icon={open ? 'close' : 'plus'}
          actions={[
            {
              icon: 'alert-octagon',
              label: 'Evento Inseguro',
              onPress: () => navigation.navigate('EventoInseguro')
            },
            {
              icon: 'car-brake-alert',
              label: 'Accionar Inseguro',
              onPress: () => console.log('Pressed Accionar Inseguro')
            }
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  button: {
    marginBottom: 80
  }
})

export default MyFab
