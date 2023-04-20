import { Text, View } from 'react-native';

import { useTheme } from 'react-native-paper'

export default function MyCharts() {

  const theme = useTheme();

  return (
    <View theme={theme}>
      <Text>This is the My Charts Screen!</Text>
    </View>
  );
}
