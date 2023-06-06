import React, { useEffect, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import BottomTab from '../navigation/bottomTabs.js'
import MyFab from '../components/fab.jsx'
import { Stack } from '../navigation/navigation.js'
import LoginScreen from '../ValidationSchemas/Login.jsx'
import { DataContext } from '../context/DataContext.js'
import appThemes from '../utils/appThemes.js'
import Constants from 'expo-constants'

export const FirstScreen = () => {
  const { data, setData } = useContext(DataContext)
  useEffect(() => { setData(data) }, [])
  const combinedTheme = appThemes()

  return (
    <>
      <PaperProvider theme={combinedTheme}>
        <SafeAreaProvider style={{ flex: 1, marginTop: Constants.statusBarHeight + 3 }}>
          <NavigationContainer theme={combinedTheme}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animationEnabled: true,
                detachPreviousScreen: true
              }}
            >
              {
                !data.loged
                  ? <Stack.Screen name='Login' component={LoginScreen} navigationKey='Login' />
                  : <Stack.Screen name='BottomTabs' component={BottomTab} navigationKey='BottomTabs' />
              }
            </Stack.Navigator>
          </NavigationContainer>
          {
            data.loged && <MyFab />
          }
        </SafeAreaProvider>
      </PaperProvider>
    </>
  )
}
