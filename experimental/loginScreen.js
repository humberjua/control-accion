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
