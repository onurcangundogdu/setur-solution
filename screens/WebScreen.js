import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview';

const WebScreen = props => {
  return (
    <WebView source={{ uri: 'https://www.setur.com.tr/' }} />
  )
}

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default WebScreen
