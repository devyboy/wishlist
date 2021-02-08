import React from 'react'
import { Layout, Text } from '../components/themed/ThemedComponents'
import { Switch } from 'react-native'
import { ListItem, CheckBox as DefaultCheckbox } from 'react-native-elements'
import { useTheme } from '../contexts/ThemeContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Settings = ({ navigation }) => {
  const { isDark, colors, toggleTheme } = useTheme()
  const [isDarkEnabled, setDarkEnabled] = React.useState(isDark)
  const [showNumber, setShowNumber] = React.useState()
  const [showPrice, setShowPrice] = React.useState()
  const [showLink, setShowLink] = React.useState()

  React.useEffect(() => {
    setDarkEnabled(isDark)
  }, [isDark])

  React.useEffect(() => {
    AsyncStorage.multiGet(['showNumber', 'showLink', 'showPrice']).then(
      (res) => {
        setShowNumber(JSON.parse(res[0][1]))
        setShowPrice(JSON.parse(res[1][1]))
        setShowLink(JSON.parse(res[2][1]))
      }
    )
  }, [])

  const toggleSwitch = () => {
    toggleTheme()
  }

  const toggleNumber = () => {
    showNumber
      ? AsyncStorage.removeItem('showNumber').then(() => setShowNumber(false))
      : AsyncStorage.setItem('showNumber', 'true').then(() =>
          setShowNumber(true)
        )
  }

  const togglePrice = () => {
    showPrice
      ? AsyncStorage.removeItem('showPrice').then(() => setShowPrice(false))
      : AsyncStorage.setItem('showPrice', 'true').then(() => setShowPrice(true))
  }

  const toggleLink = () => {
    showLink
      ? AsyncStorage.removeItem('showLink').then(() => setShowLink(false))
      : AsyncStorage.setItem('showLink', 'true').then(() => setShowLink(true))
  }

  const ListHeader = ({ label }) => (
    <Text
      variant='subheader'
      style={{
        marginTop: 24,
        marginBottom: 4,
        paddingLeft: 16
      }}
    >
      {label}
    </Text>
  )

  const styles = {
    listItem: {
      backgroundColor: colors.background,
      borderBottomColor: colors.divider,
      paddingLeft: 24
    },
    listItemTitle: {
      color: colors.text.body
    },
    signOutTitle: {
      color: colors.error
    }
  }

  const CheckBox = ({ checked, onPress }) => (
    <DefaultCheckbox
      onIconPress={onPress}
      checked={checked}
      containerStyle={{ padding: 0 }}
      iconType='material'
      checkedIcon='check-circle'
      uncheckedIcon='radio-button-unchecked'
      checkedColor={colors.accent}
    />
  )

  return (
    <Layout noPadding>
      <ListHeader label='Appearance' />
      <ListItem bottomDivider containerStyle={styles.listItem}>
        <ListItem.Content>
          <ListItem.Title style={styles.listItemTitle}>
            Dark theme
          </ListItem.Title>
        </ListItem.Content>
        <Switch
          onValueChange={toggleSwitch}
          value={isDarkEnabled}
          trackColor={{ true: colors.accent }}
        />
      </ListItem>

      <ListHeader label='Export' />
      <ListItem bottomDivider containerStyle={styles.listItem}>
        <ListItem.Content>
          <ListItem.Title style={styles.listItemTitle}>
            Item number
          </ListItem.Title>
        </ListItem.Content>
        <CheckBox checked={showNumber} onPress={toggleNumber} />
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.listItem}>
        <ListItem.Content>
          <ListItem.Title style={styles.listItemTitle}>Price</ListItem.Title>
        </ListItem.Content>
        <CheckBox checked={showPrice} onPress={togglePrice} />
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.listItem}>
        <ListItem.Content>
          <ListItem.Title style={styles.listItemTitle}>Link</ListItem.Title>
        </ListItem.Content>
        <CheckBox checked={showLink} onPress={toggleLink} />
      </ListItem>

      <ListHeader label='Account' />
      <ListItem
        bottomDivider
        containerStyle={styles.listItem}
        onPress={() => navigation.replace('Auth')}
        activeOpacity={0.95}
        underlayColor={colors.text.header}
      >
        <ListItem.Content>
          <ListItem.Title style={styles.signOutTitle}>Sign out</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </Layout>
  )
}

export default Settings
