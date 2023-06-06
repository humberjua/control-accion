import { useState } from 'react'
import { Text } from 'react-native'
import { EditNotificationScreen } from './notificationM.jsx'
import { useNotificationByIdUser, useNotificationsCountFromUser } from '../hooks/notificationQH.jsx'
import SelectDropdown from 'react-native-select-dropdown'

let preNotifications = ['no notifications found...']

export const ChartMEdit = () => {
  let [result, setResult] = useState('')
  const { notificationByIdUser } = useNotificationByIdUser()
  const { notificationsCountFromUser } = useNotificationsCountFromUser()
  try {
    if (notificationsCountFromUser > 0) {
      preNotifications = notificationByIdUser.map(el => el.chartDescription)
    }
    return (
      <>
        <Text>
          Select one Notification for edit
        </Text>
        <SelectDropdown
          data={preNotifications}
          onSelect={(selectedItem, index) => {
            delete notificationByIdUser[index].__typename
            result = {
              ...notificationByIdUser[index]
            }
            setResult(result)
            return (
              <>
              </>
            )
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return (selectedItem)
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />
        {result === '' || <EditNotificationScreen preValues={result} replace />}
      </>
    )
  } catch (error) {
    console.log('error= ', error.message)
  }
}
