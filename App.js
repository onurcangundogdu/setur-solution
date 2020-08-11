import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import WebScreen from './screens/WebScreen'
import SettingScreen from './screens/SettingScreen'

const Tab = createBottomTabNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    'source-light': require('./assets/fonts/SourceSansPro-Light.ttf'),
    'source': require('./assets/fonts/SourceSansPro-Regular.ttf'),
    'source-bold': require('./assets/fonts/SourceSansPro-SemiBold.ttf')
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)

  if(!isReady) {
    return <AppLoading 
      startAsync={fetchFonts} 
      onFinish={() => setIsReady(true)} 
      onError={err => console.log(err)} 
    />
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={WebScreen} />
          <Tab.Screen name="Setting" component={SettingScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})