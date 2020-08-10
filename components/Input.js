import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

const Input = ({ type, caption, items, multiple, value, changeHandler }) => {
  let renderedInput = null
  
  switch(type) {
    case 'input':
      renderedInput = <TextInput 
        placeholder={caption} 
        style={styles.textInput} 
        value={value} 
        onChangeText={changeHandler} 
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
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 10
  },
  inputLabel: {
  }
})

export default Input
