/* import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>This is the Settings Screen!</Text>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */


// ! Login Screen

import * as React from 'react';

import { View } from 'react-native';

import { HelperText, TextInput, useTheme } from 'react-native-paper';

export default function SettingsScreen() {

  const theme = useTheme();

  const [text, setText] = React.useState('');

  const onChangeText = text => setText(text);

  return (
    <View theme={theme}>

      <TextInput
        label="User"
        value={text}
        onChangeText={onChangeText}
      />

      <HelperText type="info" visible={true}>
        Login with your Email or User ID
      </HelperText>

    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
