import * as React from 'react'
import { View } from 'react-native'
import { Text, TextInput, Button, useTheme } from 'react-native-paper'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from './registerScreen'

// Componente Text Input del Username

const User = () => {
  const [user, setUser] = React.useState('')

  return (
    <View>
      <TextInput
        label='User'
        value={user}
        placeholder='Email or User ID'
        onChangeText={text => setUser(text)}
        style={{ margin: 10 }}
        right={<TextInput.Icon icon='account' />}
      />
    </View>
  )
}

// Componente Text Input del Password
const Password = () => {
  const [password, setPassword] = React.useState('')
  return (

    <View>

      <TextInput
        label='Password'
        value={password}
        onChangeText={text => setPassword(text)}
        style={{ margin: 10 }}
        secureTextEntry
        right={<TextInput.Icon icon='eye' />}
      />

      <Button onPress={() => console.log('Pressed')} style={{ margin: 10 }} textColor='rgb(111, 121, 121)'>
        Forgot your password?
      </Button>

    </View>
  )
}

// * Pantalla de Login

function Login ({ navigation }) {
  const theme = useTheme()

  return (
    <View theme={theme}>
      <Text variant='displayLarge' style={{ textAlign: 'center', marginTop: 50, marginBottom: 30 }}>
        Logo
      </Text>

      <User />

      <Password />

      <Button icon='login' mode='contained' onPress={() => console.log('Pressed')} style={{ margin: 10 }} buttonColor='rgb(0, 106, 106)'>
        Login
      </Button>

      <Button icon='account' mode='outlined' onPress={() => navigation.navigate('RegisterScreen', { name: 'Register Screen' })} style={{ margin: 10 }} textColor='rgb(0, 106, 106)'>
        Register
      </Button>

    </View>
  )
}

const Stack = createNativeStackNavigator()

// * Navegacion en pantalla de Login

export default function InitialScreen () {
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView
      name='LoginScreen'
      style={{
        flex: 1,
        paddingBottom: insets.bottom
      }}
    >

      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{ headerShown: false }} />
      </Stack.Navigator>

    </SafeAreaView>
  )
}
