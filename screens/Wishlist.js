import React from 'react'
import { View } from 'react-native'
import { useTheme } from '../contexts/ThemeContext'
import { Text, Layout, Button } from '../components/ThemedComponents'
import { StatusBar } from 'expo-status-bar'

export default function TabOneScreen({ navigation }) {
  const { colors, isDark } = useTheme()

  return (
    <Layout>
      <StatusBar style={isDark ? 'dark' : 'light'} />
      <Text variant='header'>Wishlist</Text>
      <Text variant='subheader'>Subheader</Text>
      <Text variant='body'>Body</Text>
      <Text variant='subtitle'>Subtitle</Text>
      <View
        style={{
          height: 1,
          backgroundColor: colors.divider,
          marginVertical: 15
        }}
      />
      <Text variant='body'>
        Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Id aliquet lectus
        proin nibh nisl condimentum id venenatis. Aenean pharetra magna ac
        placerat vestibulum lectus. In pellentesque massa placerat duis
        ultricies lacus sed turpis. Id semper risus in hendrerit gravida rutrum.
        Mattis enim ut tellus elementum sagittis vitae et leo. Sit amet
        porttitor eget dolor morbi non arcu. Faucibus a pellentesque sit amet
        porttitor. Venenatis a condimentum vitae sapien pellentesque. Tellus
        cras adipiscing enim eu turpis egestas pretium aenean. Accumsan lacus
        vel facilisis volutpat est velit egestas dui id.
        {'\n'}
      </Text>
      <Text variant='body'>
        Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Id aliquet lectus
        proin nibh nisl condimentum id venenatis. Aenean pharetra magna ac
        placerat vestibulum lectus. In pellentesque massa placerat duis
        ultricies lacus sed turpis. Id semper risus in hendrerit gravida rutrum.
        Mattis enim ut tellus elementum sagittis vitae et leo. Sit amet
        porttitor eget dolor morbi non arcu. Faucibus a pellentesque sit amet
        porttitor. Venenatis a condimentum vitae sapien pellentesque. Tellus
        cras adipiscing enim eu turpis egestas pretium aenean. Accumsan lacus
        vel facilisis volutpat est velit egestas dui id.
      </Text>

      <Button
        label='Open details'
        onPress={() => navigation.navigate('Modal')}
      />
    </Layout>
  )
}