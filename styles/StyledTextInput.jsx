import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  TextInput: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'darkgrey',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10
  },
  error: {
    borderColor: 'red'
  }
})

const StyledTextInput = ({ style = {}, error, ...props }) => {
  const inputStyle = [
    styles.TextInput,
    style,
    error && styles.error
  ]
  return <TextInput style={inputStyle} {...props} />
}

export default StyledTextInput
