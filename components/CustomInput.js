import React from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'
import { Controller } from 'react-hook-form'

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  keyboardType,
  extraTitle = '',
  readOnly = false,
  isDate = false,
  visible = true,
  isEmail = false
}) => {
  // const DATE_PATTERN = (?:19|20)(?:[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:29|30))|(?:(?:0[13578]|1[02])-31))|(?:[13579][26]|[02468][048])-02-29)
  // const DATE_PATTERN = \d{2}[-/]\d{2}[-/]\d{2}\d{2}?
  const DATE_PATTERN = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/
  const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={[styles.container, { borderColor: error ? 'red' : '#e8e8e8' }]}>
            {extraTitle !== '' ? <Text style={styles.text}>{extraTitle}</Text> : <Text style={styles.text}>{placeholder}</Text>}
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType !== null ? keyboardType : 'default'}
              readOnly={readOnly}
              pattern={isDate ? DATE_PATTERN : isEmail ? EMAIL_PATTERN : ''}
            />
          </View>
          {error && <Text style={{ color: 'red', alignSelf: 'stretch' }}> {error.message || 'Error...'} </Text>}
        </>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5
  },
  input: {},
  text: {
    color: 'gray'
  }
})

export default CustomInput
