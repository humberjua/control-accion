import * as React from 'react'
import { StyleSheet } from 'react-native'
import { FAB as Fab } from 'react-native-paper'

const MyFab = () => (
  <Fab
    icon='plus'
    style={styles.fab}
    onPress={() => console.log('Pressed')}
  />
)

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 30,
    marginBottom: 105,
    right: 0,
    bottom: 0
  }
})

export default MyFab
