import { View } from 'react-native';

import { Avatar, Text, IconButton } from 'react-native-paper';

import { styles } from './styles.js'

const UserAvatar = () => {

  return (
  <View>
    <View style={styles.centered}>
      <Avatar.Icon size={72} icon="account-circle-outline"  />
    </View>
      <View style={{justifyContent: "center", alignItems: "center" }}>
        <Text variant="headlineSmall" style={{ textAlignVertical: "center", textAlign: "center", marginTop: 15 }}> John Doe </Text>
          <IconButton
            icon="account-edit"
            size={35}
            onPress={() => console.log('Presionaste para editar perfil')}
          />
    </View>
  </View>
  );
};

export default UserAvatar;
