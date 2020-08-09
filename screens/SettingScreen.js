import React from 'react'
import { Text, View, StyleSheet} from 'react-native'
import controls from '../controls.json'

const SettingScreen = props => {
  console.log(controls)
  return (
    <View style={styles.screen}>
      <Text>Setting Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default SettingScreen
