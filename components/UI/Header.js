import React from 'react'
import { View, StyleSheet} from 'react-native'
import CustomText from './CustomText'
import Colors from '../../constants/colors'
import Fonts from '../../constants/fonts'

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <CustomText style={styles.headerText}>{title}</CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: Colors.white,
    fontFamily: Fonts.sourceBold,
    fontSize: 22
  }
})

export default Header
