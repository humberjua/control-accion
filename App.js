import React from 'react';

import LoginProvider from './context/loginProvider';

import { NavigationContainer } from '@react-navigation/native';

import { Provider as PaperProvider } from 'react-native-paper';

import appThemes from './utils/appThemes';

import BottomTab from './navigation/bottomTabs';
import MyFab from './components/fab';

import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {

  const combinedTheme = appThemes();

  return (
  <LoginProvider>
    <PaperProvider theme={combinedTheme}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <NavigationContainer theme={combinedTheme}>

          <BottomTab />
            
        </NavigationContainer>
        
        <MyFab />
      
      </SafeAreaProvider>
    </PaperProvider >
  </LoginProvider>
  );
}
