import * as React from 'react'
import ReportTypeBtn from './reportTypeBtn'
import { View, Text } from 'react-native'
import { TextInput, Divider, useTheme, HelperText, Button } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'

export default function ReportScreen () {
  const theme = useTheme()
  const [textOne, setTextOne] = React.useState('')
  const [textTwo, setTextTwo] = React.useState('')

  const [date, setDate] = React.useState(new Date(1598051730000))
  const [mode, setMode] = React.useState('date')
  const [show, setShow] = React.useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(false)
    setDate(currentDate)
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode('date')
  }

  const showTimepicker = () => {
    showMode('time')
  }

  return (
    <View theme={theme} style={{ padding: 10 }}>
      <TextInput
        mode='outlined'
        label='Incidente'
        value={textOne}
        onChangeText={textOne => setTextOne(textOne)}
      />
      <HelperText type='info'>
        Encabezado del reporte
      </HelperText>

      <View style={{ margin: 5 }}>

      </View>

      <ReportTypeBtn />
      <View style={{ margin: 10 }}>
        <Divider />
        <Divider />
      </View>

      <View>
        <View style={{ margin: 5 }}>

        </View>

        <View style={{ margin: 5 }}>

        </View>

        <Button icon='calendar' mode='contained' onPress={showDatepicker} compact>
          Fecha del Evento
        </Button>

        <View style={{ margin: 5 }}>
        </View>

        <Button icon='clock' mode='contained' onPress={showTimepicker} compact>
          Horario del Evento
        </Button>

        <View style={{ margin: 10 }}>
        </View>

        <Text style={{ textAlign: 'center' }}>Datos seleccionados: {date.toLocaleString()}</Text>
        {show && (
          <DateTimePicker
            testID='dateTimePicker'
            value={date}
            mode={mode}
            is24Hour
            onChange={onChange}
          />
        )}
      </View>

      <View style={{ margin: 5 }}>

      </View>
      <View style={{ margin: 5 }}>

      </View>

      <View style={{ margin: 10 }}>
        <Divider />
        <Divider />
      </View>

      <TextInput
        mode='outlined'
        label='Descripción'
        value={textTwo}
        onChangeText={textTwo => setTextTwo(textTwo)}
        multiline
      />
      <HelperText type='info'>
        Descripción del reporte (500 carácteres máximo)
      </HelperText>
    </View>
  )
}
