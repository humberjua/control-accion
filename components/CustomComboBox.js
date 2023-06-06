import { View, StyleSheet, Text } from 'react-native'
import { Controller } from 'react-hook-form'
import SelectDropdown from 'react-native-select-dropdown'

const CustomComboBox = ({
  control,
  name,
  items,
  title = name,
  selectedValue = items[0]
}) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <Controller
          control={control}
          name={name}
          render={({ field: { value, onChange, onBlur, name, ref } }) => (
            <SelectDropdown
              data={items}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
            />
          )}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    flex: 0,
    flexDirection: 'column',

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

export default CustomComboBox
