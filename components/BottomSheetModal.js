import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { Text, Button, ClearButton, Divider } from './themed/ThemedComponents'
import { View, TouchableWithoutFeedback } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Share } from 'react-native'

const BottomSheetModal = ({
  navigation,
  route: {
    params: { clear, options, favs, setItems }
  }
}) => {
  const sheetRef = React.useRef(null)
  const { colors, isDark } = useTheme()

  const closeSheet = () => {
    navigation.navigate('Main')
  }

  const clearFavs = () => {
    setItems()
    AsyncStorage.removeItem('favorites').then(() => closeSheet())
  }

  const shareFavs = () => {
    let formattedMessage = ''

    favs.forEach(
      (item, idx) =>
        (formattedMessage += `${idx + 1}: ${item.title}: ${item.price}\n`)
    )

    Share.share({ message: formattedMessage })
  }

  const DragHandle = () => (
    <View
      style={{
        backgroundColor: isDark ? '#AAA' : '#CCC',
        height: 7,
        width: 60,
        marginVertical: 12,
        borderRadius: 5,
        alignSelf: 'center'
      }}
    />
  )

  const renderHeader = () => <View style={{ height: 15 }} />

  const renderContent = () => (
    <View
      style={{
        height: '100%'
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.elevated,
          paddingHorizontal: 24
        }}
      >
        <DragHandle />
        {options && (
          <>
            <Text variant='subheader' style={{ marginVertical: 8 }}>
              Options
            </Text>
            <Divider />
            <Button
              label='Export Favorites'
              icon='ios-share'
              onPress={shareFavs}
            />
            <ClearButton
              label='Clear favorites'
              icon='delete-outline'
              onPress={() =>
                navigation.navigate('Modal', { clear: true, options: false })
              }
            />
          </>
        )}
        {clear && (
          <>
            <Text variant='subheader' style={{ marginVertical: 8 }}>
              Clear favorites?
            </Text>
            <Text variant='body'>
              Are you sure you want to clear your saved items? This action is
              permanent.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-around',
                marginTop: 24
              }}
            >
              <ClearButton label='Delete' onPress={clearFavs} />
              <Button
                capped
                label='Cancel'
                onPress={() =>
                  navigation.navigate('Modal', { clear: false, options: true })
                }
              />
            </View>
          </>
        )}
      </View>
    </View>
  )

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={closeSheet}>
        <View style={{ flex: 1 }} />
      </TouchableWithoutFeedback>
      <BottomSheet
        ref={sheetRef}
        initialSnap={1}
        borderRadius={16}
        onCloseEnd={closeSheet}
        snapPoints={['40%', '40%', 0]}
        renderContent={renderContent}
        renderHeader={renderHeader}
        overdragResistanceFactor={0}
      />
    </View>
  )
}

export default BottomSheetModal
