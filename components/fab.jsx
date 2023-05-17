import * as React from 'react'
import { StyleSheet } from 'react-native'
import { FAB as Fab } from 'react-native-paper'
import { DataContext } from '../context/DataContext.js'

const MyFab = () => {
  const { data } = React.useContext(DataContext)
  return (
    <Fab
      icon='plus'
      style={styles.fab}
      size={20}
      onPress={() => {
        if (data.loged) {
          console.info('avanti = ', data.nickName)
        } else {
          // console.info('negativa la maniobra')
        }
      }}
    />
  )
}
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 30,
    marginBottom: 105,
    right: 0,
    bottom: 0,
    borderRadius: 15,
    alignContent: 'center'
  }
})

export default MyFab
