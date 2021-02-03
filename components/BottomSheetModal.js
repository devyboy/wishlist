import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { Text } from '../components/ThemedComponents'
import { View, TouchableWithoutFeedback } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'

const BottomSheetModal = ({ navigation }) => {
  const sheetRef = React.useRef(null)
  const { colors, isDark } = useTheme()

  const closeSheet = () => {
    navigation.navigate('Main')
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
        <Text variant='body'>Swipe down to close</Text>
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
        snapPoints={['75%', '50%', 0]}
        renderContent={renderContent}
        renderHeader={renderHeader}
        overdragResistanceFactor={0}
      />
    </View>
  )
}

export default BottomSheetModal
