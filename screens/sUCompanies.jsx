import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { SelectList } from 'react-native-dropdown-select-list'
import DuoToggleSwitch from 'react-native-duo-toggle-switch'
import { useAllCompanies } from '../hooks/companyDataQH'
import { AddNewCompanyScreen, EditCompanyDataScreen } from '../apmutations/companyDataM.jsx'
import { ScrollView } from 'react-native-gesture-handler'

/*
  => PANTALLA EMPRESAS {SUCompanies}
    => Agregar nuevas empresas a CtrlA
    => Instalar (Agregar) el paquete comprado por una empresa x
      => Definir cantidad de usuarios según contrato
      => Definir si tendrá o no usuarios del tipo "companyAppAdmin" y cuantos serán
      => Definir cuales serán los tipos de gráficos que podrá disponer según contrato
    => Editar datos generales de una empresa
    => Editar características del contrato de una empresa
    => Activar o desactivar una empresa a la lista de clientes de CtrlA
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
          key: el.idCompany,
          value: el.companyName
        }
      )
    })
  }
  return (
    <ScrollView>
      <View theme={theme} name='SUCompanies'>
        {/* En esta parte hay que Agregar una empresa a nueva (cliente) a CtrlA por lo tanto hay que:
          1)_ Ejecutar la consulta useAllCompanies
          2)_ Llenar el drop-drown, o una lista de elementos de un arreglo que se mostrarán por un componente de búsqueda
          3)_ Una vez seleccionado, mostrar todo lo siguiente
        */}
        <Text style={{ fontSize: 15, fontWeight: '700' }}>Clients Companies Administration's Screen</Text>
        <DuoToggleSwitch
          primaryText='Add New Client 💪'
          secondaryText='Edit clients data 👷‍♂️'
          onPrimaryPress={() => {
            setSelected(false)
            setNewCompanyScreen(true)
          }}
          style={{ width: 200, alignContent: 'center', alignSelf: 'center', gap: 0 }}
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
                {selected && (
                  <>
                    <Text>{`${selected}. Stored data:`}</Text>
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

export default SUCompanies
