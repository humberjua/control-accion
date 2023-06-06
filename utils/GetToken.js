import * as Notifications from 'expo-notifications'

export const GetToken = async () => {
  const { status } = await Notifications.getPermissionsAsync()
  if (status !== 'granted') {
    console.log('Permission to notifications was denied')
    return
  }
  const token = (await (Notifications.getExpoPushTokenAsync())).data
  console.log('token= ', token)

  return token
}
