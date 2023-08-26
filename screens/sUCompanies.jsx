import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { SelectList } from 'react-native-dropdown-select-list'
import DuoToggleSwitch from 'react-native-duo-toggle-switch'
import { useAllCompanies } from '../hooks/companyDataQH'
import { AddNewCompanyScreen, EditCompanyDataScreen } from '../apmutations/companyDataM.jsx'
import { ScrollView } from 'react-native-gesture-handler'

/*
  => PANTALLA EMPRESAS de super usuario {SUCompanies}
    => Agregar nuevas empresas a CtrlA ☑️
    => Instalar (Agregar) el paquete comprado por una empresa x ☑️
      => Definir cantidad de usuarios según contrato ☑️
      => Definir si tendrá o no usuarios del tipo "companyAppAdmin" y cuantos serán ☑️
      => Definir cuales serán los tipos de gráficos que podrá disponer según contrato ☑️
    => Editar datos generales de una empresa ☑️
    => Editar características del contrato de una empresa ☑️
    => Activar o desactivar una empresa a la lista de clientes de CtrlA 👎
    => En general, falta solucionar el problema del login... aunque parece que ya lo logré 🤔
*/

const SUCompanies = () => {
  const theme = useTheme()
  const [newCompanyScreen, setNewCompanyScreen] = useState(true) // To know if the user want to add a new Company or edit an existing one
  const [selected, setSelected] = useState(false) // Used to know if one company was selected by the user
  const { allCompaniesData } = useAllCompanies()
  let preCompanies = []
  if (allCompaniesData !== undefined) {
    preCompanies = allCompaniesData.map(el => {
      return (
        {
          key: el.companyName,
          value: el.companyName
        }
      )
    })
  }
  useEffect(() => setSelected(selected), [])
  return (
    <ScrollView>
      <View theme={theme} name='SUCompanies'>
        <Text style={{ fontSize: 15, fontWeight: '700' }}>Clients Companies Administration's Screen</Text>
        <DuoToggleSwitch
          primaryText='ADD NEW'
          secondaryText='EDIT'
          onPrimaryPress={() => {
            setSelected(false)
            setNewCompanyScreen(true)
          }}
          style={styles.DuoToggleSwitch}
          onSecondaryPress={() => setNewCompanyScreen(false)}
        />
        {
          newCompanyScreen
            ? <AddNewCompanyScreen />
            : (
              <>
                <SelectList
                  setSelected={(val) => setSelected(val)}
                  data={preCompanies}
                  save='value'
                  boxStyles={{ backgroundColor: 'lightgray' }}
                  inputStyles={{ fontSize: 14 }}
                  dropdownStyles={{ backgroundColor: 'lightgray' }}
                  dropdownItemStyles={{ marginHorizontal: 10 }}
                  dropdownTextStyles={{ color: 'black' }}
                  placeholder='Select Company'
                />
                {
                  console.info(selected)
                }
                {selected && (
                  <>
                    <Text style={{ color: 'rgb(220,120,120)' }}>{`${selected}. Stored data:`}</Text>
                    <EditCompanyDataScreen companySelected={selected} />
                  </>
                )}
              </>
              )
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  DuoToggleSwitch: {
    width: 178,
    height: 40,
    alignSelf: 'center',
    gap: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    direction: 'rtl',
    elevation: 20,
    backgroundColor: 'lightgray',
    fontWeight: '500',
    justifyContent: 'center'
  }
})

export default SUCompanies
