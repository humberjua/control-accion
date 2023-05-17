import { useState, useEffect } from 'react'

import { Appearance } from 'react-native'

import {
  MD3LightTheme as MDLightTheme,
  MD3DarkTheme as MDDarkTheme,
  adaptNavigationTheme
} from 'react-native-paper'

import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native'

export default function Theming () {
  const lightTheme = {
    ...MDLightTheme
  }

  const darkTheme = {
    ...MDDarkTheme
  }

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme
  })

  const CombinedDefaultTheme = {
    ...lightTheme,
    ...LightTheme,
    colors: {
      ...lightTheme.colors,
      ...LightTheme.colors
    }
  }

  const CombinedDarkTheme = {
    ...darkTheme,
    ...DarkTheme,
    colors: {
      ...darkTheme.colors,
      ...DarkTheme.colors
    }
  }

  const [colorScheme, setColorScheme] = useState(
    Appearance.getColorScheme()
  )

  useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) => setColorScheme(colorScheme))
  }, [])

  const isDarkMode = colorScheme === 'dark'

  const combinedTheme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme

  return combinedTheme
}
