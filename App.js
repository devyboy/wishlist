import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from './contexts/ThemeContext'
import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'

const App = () => {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </SafeAreaProvider>
    )
  }
}

export default App
