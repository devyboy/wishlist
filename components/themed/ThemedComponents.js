import React from 'react'
import {
  Text as DefaultText,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Keyboard
} from 'react-native'
import {
  Button as DefaultButton,
  Card as DefaultCard,
  Input as DefaultInput
} from 'react-native-elements'
import { useTheme } from '../../contexts/ThemeContext'

const customTextStyles = {
  header: {
    fontSize: 40,
    fontWeight: '500'
  },
  subheader: {
    fontSize: 25,
    fontWeight: '500'
  },
  body: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 28
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

export const Text = ({ style, variant, ...rest }) => {
  const color = variant
    ? useThemeColor('text')[variant]
    : useThemeColor('text')['body']

  const customStyle = variant
    ? customTextStyles[variant]
    : customTextStyles.body

  return <DefaultText style={[{ color }, customStyle, style]} {...rest} />
}

export const Layout = ({ style, noScroll, noPadding, aref, ...rest }) => {
  const backgroundColor = useThemeColor('background')
  const Layout = noScroll ? (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        ref={aref}
        style={[
          { backgroundColor, flex: 1, padding: noPadding ? 0 : 25 },
          style
        ]}
        {...rest}
      />
    </TouchableWithoutFeedback>
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

export const Button = ({ label, capped, noMargin, ...rest }) => {
  const { isDark } = useTheme()
  const buttonStyle = {
    backgroundColor: useThemeColor('accent'),
    padding: 16,
    borderColor: useThemeColor('accent'),
    borderWidth: 1.5,
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
      height: 2
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 2
  }

  const loadingProps = {
    color: useThemeColor('background')
  }

  return (
    <DefaultButton
      title={label}
      {...{ buttonStyle, titleStyle, containerStyle, loadingProps, ...rest }}
    />
  )
}

export const ClearButton = ({ label, noMargin, noColor, ...rest }) => {
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
    paddingTop: 24
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
  <Text style={[customTextStyles.body]}>Wishlist</Text>
)
