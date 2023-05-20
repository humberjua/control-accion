import { ActivityIndicator, MD2Colors } from 'react-native-paper'

const CustomActivityIndicator = ({ visible = true }) => {
  return (
    <ActivityIndicator animating={visible} color={MD2Colors.blue500} size='large' hidesWhenStopped />
  )
}

export default CustomActivityIndicator
