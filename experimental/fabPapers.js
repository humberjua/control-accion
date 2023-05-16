/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react'
import { View } from 'react-native'
import { FAB, Portal, PaperProvider } from 'react-native-paper'

const NewButton = () => {
  const [state, setState] = useState({ open: false })

  const onStateChange = ({ open }) => setState({ open })

  const { open } = state

  return (
    <View>
      <PaperProvider>
        <Portal>
          <FAB.Group
            open={open}
            visible
            icon={open ? 'calendar-today' : 'plus'}
            actions={[
              { icon: 'plus', onPress: () => console.log('Pressed add') },
              {
                icon: 'star',
                label: 'Star',
                onPress: () => console.log('Pressed star')
              },
              {
                icon: 'email',
                label: 'Email',
                onPress: () => console.log('Pressed email')
              },
              {
                icon: 'bell',
                label: 'Remind',
                onPress: () => console.log('Pressed notifications')
              }
            ]}
            onStateChange={onStateChange}
          />
        </Portal>
      </PaperProvider>
    </View>
  )
}

export default NewButton
