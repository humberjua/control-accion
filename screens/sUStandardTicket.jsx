import { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import DuoToggleSwitch from 'react-native-duo-toggle-switch'
import { AddNewStandardTicketScreen, EditStandardTicketScreen } from '../apmutations/standardTicketM'

const SUStandardTicket = () => {
  const theme = useTheme()
  const [newStandardTicket, setNewStandardTicket] = useState(true)
  useEffect(() => setNewStandardTicket(newStandardTicket), [])

  return (
    <View theme={theme} name='SUStandardTicket'>
      <Text style={{ fontSize: 15, fontWeight: '700' }}>Standard Tickets Administration Screen.</Text>
      <DuoToggleSwitch
        style={styles.DuoToggleSwitch}
        primaryText='ADD NEW'
        secondaryText='EDIT'
        onPrimaryPress={() => setNewStandardTicket(true)}
        onSecondaryPress={() => setNewStandardTicket(false)}
      />
      {
        newStandardTicket ? <AddNewStandardTicketScreen /> : <EditStandardTicketScreen />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  DuoToggleSwitch: {
    width: 178,
    height: 40,
    alignSelf: 'center',
    gap: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    direction: 'rtl',
    elevation: 20,
    backgroundColor: 'lightgray',
    fontWeight: '500',
    justifyContent: 'center'
  }
})

export default SUStandardTicket
