import React from 'react'
import { Text as DefaultText, View, ScrollView } from 'react-native'
import {
  Button as DefaultButton,
  Card as DefaultCard,
  Input as DefaultInput
} from 'react-native-elements'
import { useTheme } from '../../contexts/ThemeContext'
import { MaterialIcons } from '@expo/vector-icons'

const customTextStyles = {
  header: {
    fontSize: 35,
    fontWeight: '500'
  },
  subheader: {
    fontSize: 25,
    fontWeight: '500'
  },
  body: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 23
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400'
  }
}

export const useThemeColor = (colorName) => {
  const { colors } = useTheme()
  return colors[colorName]
}

export const Text = ({ style, variant, align, ...rest }) => {
  const color = variant
    ? useThemeColor('text')[variant]
    : useThemeColor('text')['body']

  const customStyle = variant
    ? customTextStyles[variant]
    : customTextStyles.body

  return (
    <DefaultText
      style={[{ color, textAlign: align || 'left' }, customStyle, style]}
      {...rest}
    />
  )
}

export const Layout = ({ style, noScroll, noPadding, aref, ...rest }) => {
  const backgroundColor = useThemeColor('background')
  const Layout = noScroll ? (
    <View
      ref={aref}
      style={[
        {
          backgroundColor,
          flex: 1,
          paddingTop: !noPadding && 25,
          paddingHorizontal: !noPadding && 25,
          style
        }
      ]}
      {...rest}
    />
  ) : (
    <ScrollView
      ref={aref}
      keyboardShouldPersistTaps='handled'
      indicatorStyle={useThemeColor('scrollIndicator')}
      contentContainerStyle={{
        flexGrow: 1,
        padding: noPadding ? 0 : 25
      }}
      style={[{ backgroundColor }, style]}
      {...rest}
    />
  )

  return Layout
}

export const Button = ({ label, capped, noMargin, icon, ...rest }) => {
  const { isDark } = useTheme()
  const buttonStyle = {
    backgroundColor: useThemeColor('accent'),
    padding: 16,
    borderColor: useThemeColor('accent'),
    borderRadius: 8,
    width: capped ? '75%' : '90%',
    alignSelf: 'center',
    marginVertical: 16
  }

  const titleStyle = {
    color: isDark ? '#000' : '#FFF',
    fontWeight: '500'
  }

  const containerStyle = {
    shadowColor: '#000',
    shadowOffset: {
      height: 3
    },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 2
  }

  const loadingProps = {
    color: useThemeColor('background')
  }

  const disabledStyle = { backgroundColor: useThemeColor('divider') }

  return (
    <DefaultButton
      title={label}
      {...{
        buttonStyle,
        titleStyle,
        containerStyle,
        loadingProps,
        disabledStyle,
        ...rest
      }}
      iconRight
      icon={
        <MaterialIcons
          name={icon}
          size={24}
          style={{ marginLeft: 8 }}
          color={isDark ? '#000' : '#FFF'}
        />
      }
    />
  )
}

export const ClearButton = ({ label, noMargin, noColor, icon, ...rest }) => {
  const titleStyle = {
    color: noColor ? useThemeColor('text')['body'] : useThemeColor('accent'),
    fontWeight: '500'
  }

  const buttonStyle = {
    padding: 16,
    marginVertical: noMargin ? 0 : 16
  }

  const loadingProps = {
    color: noColor ? useThemeColor('text')['body'] : useThemeColor('accent')
  }

  return (
    <DefaultButton
      title={label}
      type='clear'
      {...{ titleStyle, buttonStyle, loadingProps, ...rest }}
      iconRight
      icon={
        <MaterialIcons
          name={icon}
          size={24}
          style={{ marginLeft: 8, color: useThemeColor('accent') }}
        />
      }
    />
  )
}

export const Card = ({ ...rest }) => {
  const containerStyle = {
    backgroundColor: useThemeColor('elevated'),
    borderWidth: 0,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    paddingTop: 16,
    marginBottom: 8
  }

  return <DefaultCard {...{ containerStyle, ...rest }} />
}

export const Input = ({ aref, prefix, ...rest }) => {
  const inputStyle = { color: useThemeColor('text')['body'] }
  const placeholderTextColor = useThemeColor('text')['subtitle']
  const labelStyle = {
    color: useThemeColor('text')['body']
  }
  const inputContainerStyle = {
    borderBottomColor: useThemeColor('text')['subtitle']
  }

  return (
    <DefaultInput
      ref={aref}
      maxLength={50}
      leftIcon={
        prefix && (
          <Text style={{ color: useThemeColor('text')['subtitle'] }}>
            {prefix}
          </Text>
        )
      }
      {...{
        inputStyle,
        placeholderTextColor,
        labelStyle,
        inputContainerStyle,
        ...rest
      }}
    />
  )
}

export const Wishlist = () => (
  <Text style={[customTextStyles.body, { color: useThemeColor('accent') }]}>
    Wishlist
  </Text>
)

export const Divider = () => (
  <View
    style={{
      height: 1,
      backgroundColor: useThemeColor('divider'),
      marginVertical: 15
    }}
  />
)
