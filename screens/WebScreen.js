import React from 'react'
import { WebView } from 'react-native-webview'
import Header from '../components/UI/Header'

const WebScreen = () => {
  return (
    <>
      <Header title="Setur" />
      <WebView source={{ uri: 'https://www.setur.com.tr/' }} />
    </>
  )
}

export default WebScreen
