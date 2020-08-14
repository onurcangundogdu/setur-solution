import React, { useState } from 'react'
import { View, StyleSheet, Platform, Alert } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import WebScreen from './screens/WebScreen'
import SettingScreen from './screens/SettingScreen'
import Colors from './constants/colors'
import Fonts from './constants/fonts'
import { Ionicons } from '@expo/vector-icons'

const BottomTab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName = ''
    if(route.name === 'Home') {
      iconName = Platform.OS === 'android' ? 'md-home' : 'ios-home'
    } else if (route.name === 'Setting') {
      iconName = Platform.OS === 'android' ? 'md-settings' : 'ios-settings'
    }

    return <Ionicons name={iconName} color={color} size={size} />
  }
})

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
      onError={err => Alert.alert('Error', err.message, [{ text: 'OK', onPress: () => setIsReady(true), style: 'default' }])} 
    />
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <BottomTab.Navigator 
          initialRouteName="Home"
          screenOptions={screenOptions} 
          tabBarOptions={{ activeTintColor: Colors.primary, inactiveTintColor: Colors.gray, labelStyle: styles.labelStyle}}
        >
          <BottomTab.Screen name="Home" component={WebScreen} options={{ title: 'Home' }} />
          <BottomTab.Screen name="Setting" component={SettingScreen} options={{ title: 'Settings'}} />
        </BottomTab.Navigator>
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  labelStyle: {
    fontSize: 12,
    fontFamily: Fonts.sourceBold
  }
})