import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import CustomText from './CustomText'
import Colors from '../../constants/colors'

const Input = ({ caption, value, changeHandler, isValid, isTouched, blurHandler }) => {
  let errorMessage = ''
  if(!isValid && isTouched) {
    errorMessage = 'Invalid value'
  }

  return <View style={styles.inputContainer}>
    <CustomText style={styles.label}>{caption}</CustomText>
    <TextInput 
        placeholder={caption} 
        style={styles.textInput} 
        value={value} 
        onChangeText={changeHandler}
        onBlur={blurHandler}
        blurOnSubmit
        autoCapitalize='none'
        autoCorrect={false}
        keyboardType='email-address'
      />
      <CustomText style={styles.errorText}>{errorMessage}</CustomText>
  </View>
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10
  },
  label: {
    fontSize: 18
  },
  textInput: {
    borderBottomColor: Colors.dark,
    borderBottomWidth: 1,
    padding: 10
  },
  errorText: {
    color: Colors.primary,
    fontSize: 16
  }
})

export default Input
