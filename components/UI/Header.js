import React from 'react'
import { View, StyleSheet} from 'react-native'
import CustomText from './CustomText'
import Colors from '../../constants/colors'
import { fontFamily, fontSize } from '../../constants/fonts'
import whitespaces from '../../constants/whitespaces'

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
    paddingTop: whitespaces.medium,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: Colors.white,
    fontFamily: fontFamily.sourceBold,
    fontSize: fontSize.large
  }
})

export default Header
