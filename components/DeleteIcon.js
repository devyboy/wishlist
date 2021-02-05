import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '../contexts/ThemeContext'
import { TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DeleteIcon = ({ index, favorites, setItems }) => {
  const { colors } = useTheme()
  const [tapped, setTapped] = React.useState(false)

  const deleteItem = () => {
    if (tapped) {
      if (favorites.length === 1) {
        AsyncStorage.removeItem('favorites')
        setItems()
      } else {
        const newFavs = favorites.filter((x, idx) => idx !== index)
        setItems(newFavs)
        AsyncStorage.setItem('favorites', JSON.stringify(newFavs))
      }
    } else {
      setTapped(true)
      setTimeout(() => setTapped(false), 5000)
    }
  }

  return (
    <TouchableOpacity onPress={deleteItem}>
      <MaterialIcons
        name={'close'}
        size={20}
        color={tapped ? colors.error : colors.text.subtitle}
      />
    </TouchableOpacity>
  )
}

export default DeleteIcon
