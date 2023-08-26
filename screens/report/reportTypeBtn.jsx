import * as React from 'react'
import { View } from 'react-native'
import { RadioButton, Text } from 'react-native-paper'

const ReportTypeBtn = () => {
  const [value, setValue] = React.useState('first')

  return (
    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
      <View>
        <Text>Evento</Text>
        <RadioButton value='first' />
      </View>
      <View>
        <Text>Procedimiento</Text>
        <RadioButton value='second' />
      </View>
    </RadioButton.Group>
  )
}

export default ReportTypeBtn
