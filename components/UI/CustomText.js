import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { fontFamily, fontSize } from '../../constants/fonts'
import Colors from '../../constants/colors'

const CustomText = props => {
  return (
    <Text style={{...styles.default, ...props.style}}>{props.children}</Text>
  )
}

const styles = StyleSheet.create({
  default: {
    fontFamily: fontFamily.source,
    fontSize: fontSize.medium,
    color: Colors.black,
    letterSpacing: 0.5
  }
})

export default CustomText
