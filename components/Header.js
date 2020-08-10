import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import Colors from '../constants/colors'

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 80,
    paddingTop: 30,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: Colors.white,
    fontSize: 20
  }
})

export default Header
