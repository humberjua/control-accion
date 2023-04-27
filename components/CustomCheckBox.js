import { View, StyleSheet, Text } from 'react-native'
import { Controller } from 'react-hook-form'
import { Checkbox } from 'expo-checkbox'

const CustomCheckBox = ({
  control,
  name,
  rules = {},
  title = ' ' + name + ' '
}) => {
  return (
    <>
      <View style={styles.container}>
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { value, onChange } }) => (
            <Checkbox
              name={name}
              value={value}
              onValueChange={onChange}
              onChange={onChange}
              color={value ? '#4630EB' : undefined}
            />
          )}
        />
        <Text style={styles.text}>{' ' + title + ' '}</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    flex: 0,
    flexDirection: 'row',

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

export default CustomCheckBox
