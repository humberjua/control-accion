import { View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

import UserAvatar from '../../components/settings/UserAvatar'
import UserSearch from '../../components/settings/UserSearch'
import UserNotifications from '../../components/settings/UserNotifications'

function SettingsScreen () {
  const theme = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView
      name='SettingsScreen'
      style={{
        flex: 1,
        paddingBottom: insets.bottom
      }}
    >

      <View theme={theme}>

        <UserAvatar />

        <UserSearch />

        {/* <UserNotifications /> Por alguna razon no lo importa, pendiente revisar */}

        <UserNotifications />

        <View>
          <Text>This is the Settings Screen!</Text>
        </View>

        <Button icon='logout' mode='contained' onPress={() => console.log('Presionaste para Logout')} style={{ margin: 10 }} buttonColor='#e64a19'>
          Logout
        </Button>

      </View>

    </SafeAreaView>
  )
}

export default SettingsScreen
