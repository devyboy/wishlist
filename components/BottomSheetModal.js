import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { Text, Button, ClearButton, Divider } from './themed/ThemedComponents'
import {
  View,
  TouchableWithoutFeedback,
  Image,
  Share,
  ScrollView
} from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as WebBrowser from 'expo-web-browser'

const BottomSheetModal = ({
  navigation,
  route: {
    params: { clear, options, favs, item, setItems }
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

  const shareFavs = async () => {
    const showNum = await AsyncStorage.getItem('showNumber').then((res) =>
      JSON.parse(res)
    )
    const showPrice = await AsyncStorage.getItem('showPrice').then((res) =>
      JSON.parse(res)
    )
    const showLink = await AsyncStorage.getItem('showLink').then((res) =>
      JSON.parse(res)
    )

    let formattedMessage = ''

    favs.forEach((item, idx) => {
      showNum ? (formattedMessage += `${idx + 1}: `) : null
      formattedMessage += item.title
      showPrice ? (formattedMessage += ` | ${item.price} `) : null
      showLink ? (formattedMessage += ` | ${item.url}`) : null
      formattedMessage += '\n\n'
    })

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
        {item && (
          <>
            <Text variant='subheader'>View item</Text>
            <Divider />
            <ScrollView>
              <Text variant='subtitle'>{item.category}</Text>
              <Text variant='body' style={{ marginVertical: 8 }}>
                {item.title}
              </Text>
              <Text variant='body' style={{ color: colors.success }}>
                {item.price}
              </Text>
              <View style={styles.imageContainer}>
                <Image
                  resizeMode={'contain'}
                  source={{
                    uri: item.image
                  }}
                  style={styles.productImage}
                />
              </View>
              <Text variant='subtitle' style={{ marginBottom: 8 }}>
                About this item
              </Text>
              <Text variant='body'>{item.description}</Text>
              <Button
                style={{ marginVertical: 32 }}
                label='View in browser'
                onPress={() => WebBrowser.openBrowserAsync(item.url)}
              />
            </ScrollView>
          </>
        )}
        {options && (
          <>
            <Text variant='subheader' style={{ marginVertical: 8 }}>
              Options
            </Text>
            <Divider />
            <Button
              label='Export Favorites'
              onPress={shareFavs}
              icon='ios-share'
            />
            <ClearButton
              label='Clear favorites'
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
            <Divider />
            <Text variant='body'>
              Are you sure you want to clear your saved items? This action is
              permanent.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-around',
                marginTop: 8
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
        snapPoints={item ? ['80%', '80%', 0] : ['40%', '40%', 0]}
        renderContent={renderContent}
        renderHeader={renderHeader}
        overdragResistanceFactor={0}
      />
    </View>
  )
}

const styles = {
  productImage: {
    height: 150,
    width: 200,
    alignSelf: 'center'
  },
  imageContainer: {
    marginTop: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.2,
    shadowRadius: 3
  }
}

export default BottomSheetModal
