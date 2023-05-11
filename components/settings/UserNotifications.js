import { View } from 'react'
import { Text } from 'react-native-paper'
import { styles } from './styles.js'
import Switch from '../../globals/Switch.js'

// Pendiente estilar

const UserNotifications = () => {
  return (
    <View style={styles.centered}>
      <Text variant='bodyLarge'>Notifications</Text><Switch />
    </View>
  )
}

export default UserNotifications
