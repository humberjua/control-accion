// ! Register Screen

import React, { useState } from 'react';

import { View } from 'react-native';

import { Text, TextInput, Button, useTheme } from 'react-native-paper';

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Text Input Email o User ID del usuario. Pendiente: Agregar confirmacion del user ID a traves de Yup.

const User = () => {

  const [email, setEmail] = useState('');

  const [checkValidEmail, setCheckValidEmail] = useState('');

  const handleCheckEmail = (text) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  }

  return (

    <View>

      <TextInput
        label="User"
        value={email}
        placeholder="Email or User ID"
        onChangeText={handleCheckEmail}
        style={{ margin: 10 }}
        right={<TextInput.Icon icon="account" />}
      />

    {checkValidEmail ? <Text> Email adress is not valid </Text> : <Text> </Text>}

    </View>
  );
}

// Text Input de creacion de Password con confirmacion.

const Password = () => {

  const [password, setPassword] = useState('');

  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [revealPassword, setRevealPassword] = useState(true);



  return (

    <View>
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={{ margin: 10 }}
        secureTextEntry={revealPassword}
        right={
        <TextInput.Icon
          icon="eye"
          onPress={() => setRevealPassword(!revealPassword)} />
        }
      />

      <TextInput
        label="Confirm Password"
        value={passwordConfirm}
        onChangeText={text => setPasswordConfirm(text)}
        style={{ margin: 10 }}
        secureTextEntry={revealPassword}
        right={
          <TextInput.Icon
            icon="eye"
            onPress={() => setRevealPassword(!revealPassword)} />
        }
      />


    </View>
  );
}

export default function RegisterScreen({ navigation }) {

  const theme = useTheme();

  const insets = useSafeAreaInsets();

  return (

    <SafeAreaView
      name='RegisterScreen'
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
      }}>


      <View theme={theme}>

        <Text variant="displayLarge" style={{ textAlign: "center", marginTop: 50, marginBottom: 30 }}>
          Logo
        </Text>


        <User />

        <Password />


        <Button mode="contained" onPress={() => console.log('Pressed')} style={{ margin: 10 }} buttonColor="rgb(0, 106, 106)" >
          Continue
        </Button>

        <Button mode="outlined" onPress={() => navigation.navigate('LoginScreen', { name: 'Login Screen' })} style={{ margin: 10 }} textColor="rgb(0, 106, 106)" >
          Back to Login
        </Button>

      </View>
    </SafeAreaView>
  );
}


/* 

Nombre
Apellido
User ID
Usuario
Email
Password

*/

