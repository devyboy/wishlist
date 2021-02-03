import { Ionicons } from '@expo/vector-icons'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import * as React from 'react'

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false)

  React.useEffect(() => {
    SplashScreen.preventAutoHideAsync()
    Font.loadAsync({
      ...Ionicons.font
    }).then(() => {
      setLoadingComplete(true)
      SplashScreen.hideAsync()
    })
  }, [])

  return isLoadingComplete
}
