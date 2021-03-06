import React, { useState } from 'react'
import {View, StyleSheet, TouchableOpacity, Platform, TouchableNativeFeedback, Modal, Button} from 'react-native'
import CustomText from './CustomText'
import Colors from '../../constants/colors'
import { fontFamily, fontSize } from '../../constants/fonts'
import whitespaces from '../../constants/whitespaces'
import { Ionicons } from '@expo/vector-icons'

const Select = ({ caption, value, changeHandler, isValid, isTouched, blurHandler, items, multiple }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  let errorMessage = ''
  if(!isValid && isTouched) {
    errorMessage = 'Invalid value'
  }

  const rightArrowIcon = Platform.OS === 'android' ? 'md-arrow-dropright-circle' : 'ios-arrow-dropright-circle'

  let TouchableComponent = TouchableOpacity
  if(Platform.OS === 'android' && Platform.Version > 21) {
    TouchableComponent = TouchableNativeFeedback
  }

  let combinedText = ''
  if(value) {
    value.split(',').forEach(val => {
      combinedText += items[val] + ','
    })
    combinedText = combinedText.slice(0, -1)
  }

  return <View style={styles.inputContainer}>
    <TouchableComponent onPress={() => setIsModalVisible(true)}>
      <View style={styles.captionAndArrowContainer}>
        <CustomText style={styles.label}>{caption}</CustomText>
        <Ionicons name={rightArrowIcon} color={Colors.primary} size={24}/>
      </View>
    </TouchableComponent>
    {
      !!combinedText && <CustomText style={styles.value}>{combinedText}</CustomText>
    }
    {
      !!errorMessage && <CustomText style={styles.errorText}>{errorMessage}</CustomText>
    }
    <Modal animationType="slide" visible={isModalVisible} onRequestClose={() => {
      setIsModalVisible(false)
      blurHandler(caption)
    }}>
      <View style={styles.modal}>
        <CustomText style={styles.modalHeading}>Please Select</CustomText>
        {
          Object.keys(items).map(key => {
            let checkboxIcon = Platform.OS === 'android' ? 'md-square-outline' : 'ios-square-outline'
            if (value.split(',').includes(key)) {
              checkboxIcon = Platform.OS === 'android' ? 'md-checkbox' : 'ios-checkbox'
            }
            return <TouchableComponent key={key} onPress={() => {
              let values = value ? value.split(',') : []
              if(multiple) {
                if(values.includes(key)){
                  values = values.filter(val => val !== key)
                } else {
                  values.push(key)
                }
              } else {
                values = [key]
              }
              changeHandler(values.join(','), caption)
            }}>
              <View style={styles.select}>
                <Ionicons name={checkboxIcon} size={24} color={Colors.primary}/>
                <CustomText style={styles.selectValue}>{items[key]}</CustomText>
              </View>
            </TouchableComponent>})
        }
        <View style={styles.button}>
          <Button
            title="Done"
            onPress={() => {
              setIsModalVisible(false)
              blurHandler(caption)
            }} 
            color={Colors.secondary} 
          />
        </View>
      </View>
    </Modal>
  </View>
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: whitespaces.small
  },
  label: {
    fontSize: fontSize.medium
  },
  errorText: {
    color: Colors.primary,
    fontSize: fontSize.medium
  },
  captionAndArrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: whitespaces.small
  },
  value: {
    fontSize: fontSize.small,
    color: Colors.secondary,
    fontFamily: fontFamily.sourceBold
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalHeading: {
    marginBottom: whitespaces.large,
    fontSize: fontSize.large
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: whitespaces.medium
  },
  selectValue: {
    marginLeft: whitespaces.medium
  },
  button: {
    width: 150,
    marginTop: whitespaces.large
  }
})

export default Select
