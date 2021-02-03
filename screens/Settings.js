import React from 'react'
import { Layout, Text } from '../components/themed/ThemedComponents'
import { Switch } from 'react-native'
import { ListItem } from 'react-native-elements'
import { useTheme } from '../contexts/ThemeContext'

const Settings = ({ navigation }) => {
  const { isDark, toggleTheme, colors } = useTheme()
  const [isEnabled, setEnabled] = React.useState(isDark)

  React.useEffect(() => {
    setEnabled(isDark)
  }, [isDark])

  const toggleSwitch = () => {
    toggleTheme()
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
          value={isEnabled}
          trackColor={{ true: colors.accent }}
        />
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
