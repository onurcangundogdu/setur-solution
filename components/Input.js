import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import Colors from '../constants/colors'

const Input = ({ type, caption, items, multiple, value, changeHandler }) => {
  let renderedInput = null
  
  switch(type) {
    case 'input':
      renderedInput = <TextInput 
        placeholder={caption} 
        style={styles.textInput} 
        value={value} 
        onChangeText={changeHandler} 
        blurOnSubmit
        autoCapitalize='none'
        autoCorrect={false}
        keyboardType='email-address'
      />
      break
    default:
      renderedInput = <Text>Unknown Input Type</Text>
  }

  return <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{caption}</Text>
    { renderedInput }
  </View>
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10
  },
  textInput: {
    borderBottomColor: Colors.dark,
    borderBottomWidth: 1,
    padding: 10
  },
  inputLabel: {
  }
})

export default Input
