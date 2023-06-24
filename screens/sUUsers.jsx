import { useTheme } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import DuoToggleSwitch from 'react-native-duo-toggle-switch'
import { useAllCompanies } from '../hooks/companyDataQH'
import { ScrollView } from 'react-native-gesture-handler'
import { AddNewUserScreen, EditUserScreen } from '../apmutations/userM'

/*
    => PANTALLA USUARIOS de super usuario {SUUsers} ☑️
    => Seleccionar la empresa respecto de la cual se quiere trabajar (useAllCompanies). ☑️
    => Seleccionar para agregado o edición de usuarios.
      => Para el caso de seleccionar agregar nuevos usuarios (addNewUser), hacer: ☑️
        => Verificar condiciones de contrato: ☑️
          => Si quedan usuarios finales por agregar. En caso positivo, habilitar el formulario de carga ☑️
          => Si corresponden usuarios del tipo CAAdmin: ☑️
            => Verificar si falta agregar. En caso positivo avisar con un warning y habilitar el "checkBox" en el formulario de carga de usuarios. (colocar contador que indique
              dinamicamente cuantos falta por agregar, cuando el contador llegue a cero inhabilitar el "checkBox"). 👎
          => Colocar un campo prellenado con una notificación a enviar al usuario agregado y/o al companyAppAdmin. 👎
      => Para el caso de seleccionar editar usuarios (editUser), hacer:
        => Llenar una lista de todos los usuarios de la empresa y una vez seleccionado uno, habilitar el formulario para la edición. ☑️
        => Si en ese contrato de esa empresa corresponden usuarios del tipo "companyAppAdmin", hacer:
          => Habilitar el checkBox para que se pueda catalogar al usuario en edición como companyAppAdmin, si y solo si todavía faltan por agregar. ☑️
          => Si el usuario en edición es un companyAppAdmin, se deberá habilitar el checkBox, ya sea que falten por agregar o no. ☑️
          => Si ya están todos los "companyAppAdmin" cubiertos y se desea editar un usuario que no es de ese tipo, en ese caso el checkBox deberá quedar deshabilitado. 👎
*/

const SUUsers = () => {
  const theme = useTheme()
  const { allCompaniesData } = useAllCompanies()
  const [selected, setSelected] = useState(false)
  const [newUserScreen, setNewUserScreen] = useState(true)
  const superUser = true
  let preCompanies = [{ key: '', value: '' }]
  if (allCompaniesData !== undefined) {
    try {
      preCompanies = allCompaniesData.map(el => {
        return (
          {
            key: el.companyName,
            value: el.companyName
          }
        )
      })
    } catch (error) {
    }
  }
  useEffect(() => setSelected(selected), [])
  const handleNewUserScreen = () => {
    setNewUserScreen(true)
  }
  return (
    <ScrollView>
      <View theme={theme} name='SUUsers'>
        <Text style={{ fontSize: 15, fontWeight: '700' }}>Company users management screen</Text>
        <SelectList
          onSelect={handleNewUserScreen}
          setSelected={(val) => setSelected(val)}
          data={preCompanies}
          save='value'
          boxStyles={{ backgroundColor: 'lightgray' }}
          inputStyles={{ fontSize: 14 }}
          dropdownStyles={{ backgroundColor: 'lightgray' }}
          dropdownItemStyles={{ marginHorizontal: 10 }}
          dropdownTextStyles={{ color: 'black' }}
          placeholder='🔽 Select Company'
        />
        {
          selected && (
            <>
              <DuoToggleSwitch
                style={styles.DuoToggleSwitch}
                primaryText='Add new user 👷‍♂️'
                secondaryText='Edit user data ✏️'
                onPrimaryPress={handleNewUserScreen}
                onSecondaryPress={() => setNewUserScreen(false)}
              />
              {
                newUserScreen
                  ? <AddNewUserScreen superCreator={superUser} companySelected={selected} />
                  : <EditUserScreen superCreator={superUser} companySelected={selected} />
              }
            </>
          )
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  DuoToggleSwitch: {
    width: 180,
    alignContent: 'stretch',
    alignSelf: 'center',
    gap: 0,
    height: 40,
    borderStyle: 'solid',
    borderWidth: 1,
    direction: 'rtl',
    elevation: 20,
    backgroundColor: 'lightgray',
    fontWeight: '500',
    textDecorationColor: 'blue'
  }
})

export default SUUsers
