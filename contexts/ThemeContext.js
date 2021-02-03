import React from 'react'
import Colors from '../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const ThemeContext = React.createContext({
  isDark: false,
  colorTheme: 'light',
  colors: Colors['light'],
  toggleTheme: () => {}
})

export const ThemeProvider = (props) => {
  const [isDark, setIsDark] = React.useState(false)
  const colorTheme = isDark ? 'dark' : 'light'

  React.useEffect(() => {
    AsyncStorage.getItem('theme').then((res) => {
      setIsDark(res === 'dark')
    })
  }, [isDark])

  const toggleTheme = () => {
    const color = isDark ? 'light' : 'dark'
    AsyncStorage.setItem('theme', color).then(() => setIsDark((prev) => !prev))
  }

  const defaultTheme = {
    isDark,
    colors: Colors[colorTheme],
    colorTheme,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => React.useContext(ThemeContext)
