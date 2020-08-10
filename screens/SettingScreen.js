import React, { useState } from 'react'
import { Text, StyleSheet, Button, ScrollView } from 'react-native'
import axios from 'axios'
import Input from '../components/Input'
import Header from '../components/Header'
import controls from '../controls.json'
import { checkValidity } from '../helpers/checkValidity'
import Colors from '../constants/colors'

const SettingScreen = () => {
  const initialState = controls.controls.reduce((acc, cur) => {
    acc[cur.caption] = { value: '', isValid: false }
    return acc
  }, {})

  const [formState, setFormState] = useState(initialState)

  const changeHandler = (newValue, caption) => {
    const { validator } = controls.controls.find(input => input.caption === caption)
    
    setFormState({
      ...formState,
      [caption]: {
        ...formState[caption],
        value: newValue,
        isValid: checkValidity(newValue, validator)
      }
    })
  }

  const submitHandler = () => {
  }

  return (
    <>
      <Header title={controls.title} />
      <ScrollView>
        {
          controls.controls.map((input, index) => <Input 
            key={index} 
            type={input.type} 
            caption={input.caption} 
            items={input.items}
            multiple={input.multiple}
            value={formState[input.caption].value}
            changeHandler={newValue => changeHandler(newValue, input.caption)}
          />)
        }
        <Button title="Submit" onPress={submitHandler} color={Colors.secondary} />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({

})

export default SettingScreen
