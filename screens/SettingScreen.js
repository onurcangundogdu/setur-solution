import React, { useState, useEffect } from 'react'
import { StyleSheet, Button, ScrollView, ActivityIndicator, Alert } from 'react-native'
import Input from '../components/UI/Input'
import Select from '../components/UI/Select'
import Header from '../components/UI/Header'
import controls from '../controls.json'
import { checkValidity } from '../helpers/checkValidity'
import Colors from '../constants/colors'
import { API_URL } from '../constants/api'

const getInitialState = () => controls.controls.reduce((acc, cur) => {
  acc[cur.caption] = { value: '', isValid: false, isTouched: false }
  return acc
}, {})

const SettingScreen = ({ navigation }) => {
  const [formState, setFormState] = useState(getInitialState())
  const [isFormValid, setIsFormValid] = useState(false)
  const [requestRunning, setRequestRunning] = useState(false)
  const [error, setError] = useState('')

  const changeHandler = (newValue, caption) => {
    const { validator } = controls.controls.find(input => input.caption === caption)
    const isInputValid = checkValidity(newValue, validator)
    
    setFormState({
      ...formState,
      [caption]: {
        ...formState[caption],
        value: newValue,
        isValid: isInputValid,
        isTouched: true
      }
    })

    let formValid = true
    Object.keys(formState).forEach(cap => {
      formValid = formValid && (cap === caption ? isInputValid : formState[cap].isValid)
    })

    setIsFormValid(formValid)
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
    
    const data = Object.keys(formState).reduce((prev, cur) => {
      prev[cur] = formState[cur].value
      return prev
    }, {})

    try {
      const response = await fetch(`${API_URL}/settings.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if(!response.ok) {
        throw new Error('Http error!')
      }

      await response.json()

      setFormState(getInitialState())
      setIsFormValid(false)
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
          controls.controls.map((input, index) => {
            if(input.type === 'input') {
              return <Input 
                key={index} 
                caption={input.caption} 
                value={formState[input.caption].value}
                changeHandler={newValue => changeHandler(newValue, input.caption)}
                blurHandler={() => blurHandler(input.caption)}
                isValid={formState[input.caption].isValid}
                isTouched={formState[input.caption].isTouched}
              />
            }
            else if (input.type === 'choice') {
              return <Select 
                key={index} 
                caption={input.caption} 
                value={formState[input.caption].value}
                changeHandler={newValue => changeHandler(newValue, input.caption)}
                isValid={formState[input.caption].isValid}
                isTouched={formState[input.caption].isTouched}
                blurHandler={() => blurHandler(input.caption)}
                items={input.items}
                multiple={input.multiple}
              />
            }
          })
        }
        { requestRunning ? <ActivityIndicator size='small' color={Colors.primary} /> 
            : <Button title="Submit" onPress={submitHandler} color={Colors.secondary} disabled={!isFormValid} /> }
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
})

export default SettingScreen
