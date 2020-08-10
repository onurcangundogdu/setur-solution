import React from 'react'
import { WebView } from 'react-native-webview'

const WebScreen = props => {
  return (
    <WebView source={{ uri: 'https://www.setur.com.tr/' }} />
  )
}

export default WebScreen
