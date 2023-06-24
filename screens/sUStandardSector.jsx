import { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import DuoToggleSwitch from 'react-native-duo-toggle-switch'
import { AddNewStandardSectorScreen, EditStandardSectorScreen } from '../apmutations/standardSectorM'

const SUStandardSector = () => {
  const theme = useTheme()
  const [newStandardSector, setNewStandardSector] = useState(true)
  useEffect(() => setNewStandardSector(newStandardSector), [])

  return (
    <View theme={theme} name='SUStandardSector'>
      <Text style={{ fontSize: 15, fontWeight: '700' }}>Standard Sectors administration screen.</Text>
      <DuoToggleSwitch
        style={styles.DuoToggleSwitch}
        primaryText='ADD NEW'
        secondaryText='EDIT'
        onPrimaryPress={() => setNewStandardSector(true)}
        onSecondaryPress={() => setNewStandardSector(false)}
      />
      {
        newStandardSector ? <AddNewStandardSectorScreen /> : <EditStandardSectorScreen />
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

export default SUStandardSector
