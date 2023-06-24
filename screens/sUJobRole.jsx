import { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import DuoToggleSwitch from 'react-native-duo-toggle-switch'
import { AddNewStandardJobRoleScreen, EditStandardJobRoleScreen } from '../apmutations/standardJobRoleM'

const SUJobRole = () => {
  const theme = useTheme()
  const [newStandardJobRole, setNewStandardJobRole] = useState(true)
  useEffect(() => setNewStandardJobRole(newStandardJobRole), [])

  return (
    <View theme={theme} name='SUStandardSector'>
      <Text style={{ fontSize: 15, fontWeight: '700' }}>Standard Job Role Administration Screen.</Text>
      <DuoToggleSwitch
        style={styles.DuoToggleSwitch}
        primaryText='ADD NEW'
        secondaryText='EDIT'
        onPrimaryPress={() => setNewStandardJobRole(true)}
        onSecondaryPress={() => setNewStandardJobRole(false)}
      />
      {
        newStandardJobRole ? <AddNewStandardJobRoleScreen /> : <EditStandardJobRoleScreen />
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

export default SUJobRole
