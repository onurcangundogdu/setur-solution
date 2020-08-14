import React, { useState, useEffect } from 'react'
import { StyleSheet, Button, ScrollView, ActivityIndicator, Alert } from 'react-native'
import Input from '../components/UI/Input'
import Header from '../components/UI/Header'
import controls from '../controls.json'
import { checkValidity } from '../helpers/checkValidity'
import Colors from '../constants/colors'

const getInitialState = () => controls.controls.reduce((acc, cur) => {
  acc[cur.caption] = { value: '', isValid: false, isTouched: false }
  return acc
}, {})

const SettingScreen = ({ navigation }) => {
  const [formState, setFormState] = useState(getInitialState())
  const [requestRunning, setRequestRunning] = useState(false)
  const [error, setError] = useState('')

  const changeHandler = (newValue, caption) => {
    const { validator } = controls.controls.find(input => input.caption === caption)
    
    setFormState({
      ...formState,
      [caption]: {
        ...formState[caption],
        value: newValue,
        isValid: checkValidity(newValue, validator),
        isTouched: true
      }
    })
  }

  const blurHandler = (caption) => {
    const { validator } = controls.controls.find(input => input.caption === caption)

    setFormState({
      ...formState,
      [caption]: {
        ...formState[caption],
        isValid: checkValidity(formState[caption].value, validator),
        isTouched: true
      }
    })
  }

  const submitHandler = async () => {
    setRequestRunning(true)
    setError('')
    try {
      // http request
      navigation.navigate('Home')
    } catch (err) {
      setError(err.message)
    } finally {
      setRequestRunning(false)
    }
  }

  useEffect(() => {
    if(error) {
      Alert.alert('Error', error, [{ text: 'OK', onPress: () => setError(''), style: 'cancel' }])
    }
  }, [error])

  return (
    <>
      <Header title={controls.title} />
      <ScrollView style={{margin: 20}}>
        {
          controls.controls.map((input, index) => <Input 
            key={index} 
            caption={input.caption} 
            value={formState[input.caption].value}
            changeHandler={newValue => changeHandler(newValue, input.caption)}
            blurHandler={() => blurHandler(input.caption)}
            isValid={formState[input.caption].isValid}
            isTouched={formState[input.caption].isTouched}
          />)
        }
        { requestRunning ? <ActivityIndicator size='small' color={Colors.primary} /> 
            : <Button title="Submit" onPress={submitHandler} color={Colors.secondary} /> }
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
})

export default SettingScreen
