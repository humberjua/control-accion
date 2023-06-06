import { gql, useMutation } from '@apollo/client'
import {
  View,
  Button,
  StyleSheet,
  Platform,
  Text,
  Alert
} from 'react-native'
import { useEffect, useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import CustomInput from '../components/CustomInput.js'
import CustomCheckBox from '../components/CustomCheckBox.js'
import { CIRules, CIRulesNumber } from '../components/CIRules.js'
import { ErrorText } from '../components/ErrorText.js'
import CustomSelectList from '../components/CustomSelectList.js'
import CustomActivityIndicator from '../components/CustomActivityIndicator.js'
import { useFindCompany } from '../hooks/companyDataQH.js'
import { useFindContract } from '../hooks/companyContractQH.js'
import { DataContext } from '../context/DataContext.js'

const numericKeyboard = Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'

/*
  Mutation:addNewCompanyData
*/

// Mutation definition from BE. All constants definitions used for useMutation hook, will have an M letter at the end
const addNewCompanyM = gql`
mutation AddNewCompany($companyName: String!, $companyCategory: String!, $headQuartersCountry: String!, $headQuartersCity: String!, $headQuartersStreet: String!, $headQuartersNumber: String!, $headQuartersZipCode: String!, $headQuartersMainContactPhone: String!, $headQuartersMainContactEmail: String!, $companyInternalDescription: String!, $companyLogo: String!) {
  addNewCompany(companyName: $companyName, companyCategory: $companyCategory, headQuartersCountry: $headQuartersCountry, headQuartersCity: $headQuartersCity, headQuartersStreet: $headQuartersStreet, headQuartersNumber: $headQuartersNumber, headQuartersZipCode: $headQuartersZipCode, headQuartersMainContactPhone: $headQuartersMainContactPhone, headQuartersMainContactEmail: $headQuartersMainContactEmail, companyInternalDescription: $companyInternalDescription, companyLogo: $companyLogo) {
    idCompany
    companyName
    companyCategory
    headQuartersCountry
    headQuartersCity
    headQuartersStreet
    headQuartersNumber
    headQuartersZipCode
    address
    headQuartersMainContactPhone
    headQuartersMainContactEmail
    companyInternalDescription
    companyLogo
  }
}

`

const addNewCompanyContractM = gql`
mutation AddNewCompanyContract($companyName: String!, $hasCaAdmin: Boolean!, $amountOfCaa: Int!, $amountOfUsers: Int!, $amountOfChartsAllowed: Int!) {
  addNewCompanyContract(companyName: $companyName, hasCAAdmin: $hasCaAdmin, amountOfCAA: $amountOfCaa, amountOfUsers: $amountOfUsers, amountOfChartsAllowed: $amountOfChartsAllowed) {
    idContract
    idCompany
    companyName
    hasCAAdmin
    amountOfCAA
    amountOfUsers
    amountOfChartsAllowed
  }
}

`

const categories = [
  { key: 1, value: 'Minning' }, { key: 2, value: 'Oil & Gas' }, { key: 3, value: 'Manufacture' }, { key: 4, value: 'Energy' }, { key: 5, value: 'Agriculture' }, { key: 6, value: 'Construction' }, { key: 7, value: 'Government' }, { key: 8, value: 'Other' }
]

const countries = [
  { key: 1, value: 'Afghanistan' }, { key: 2, value: 'Albania' }, { key: 3, value: 'Algeria' }, { key: 4, value: 'Andorra' }, { key: 5, value: 'Angola' }, { key: 6, value: 'Antigua and Barbuda' }, { key: 7, value: 'Argentina' }, { key: 8, value: 'Armenia' }, { key: 9, value: 'Australia' }, { key: 10, value: 'Austria' }, { key: 11, value: 'Azerbaijan' }, { key: 12, value: 'The Bahamas' }, { key: 13, value: 'Bahrain' }, { key: 14, value: 'Bangladesh' }, { key: 15, value: 'Barbados' }, { key: 16, value: 'Belarus' }, { key: 17, value: 'Belgium' }, { key: 18, value: 'Belize' }, { key: 19, value: 'Benin' }, { key: 20, value: 'Bhutan' }, { key: 21, value: 'Bolivia' }, { key: 22, value: 'Bosnia and Herzegovina' }, { key: 23, value: 'Botswana' }, { key: 24, value: 'Brazil' }, { key: 25, value: 'Brunei' }, { key: 26, value: 'Bulgaria' }, { key: 27, value: 'Burkina Faso' }, { key: 28, value: 'Burundi' }, { key: 29, value: 'Cabo Verde' }, { key: 30, value: 'Cambodia' }, { key: 31, value: 'Cameroon' }, { key: 32, value: 'Canada' }, { key: 33, value: 'Central African Republic' }, { key: 34, value: 'Chad' }, { key: 35, value: 'Chile' }, { key: 36, value: 'China' }, { key: 37, value: 'Colombia' }, { key: 38, value: 'Comoros' }, { key: 39, value: 'Democratic Republic of the Congo' }, { key: 40, value: 'Costa Rica' }, { key: 41, value: 'Côte d’Ivoire' }, { key: 42, value: 'Croatia' }, { key: 43, value: 'Cuba' }, { key: 44, value: 'Cyprus' }, { key: 45, value: 'Czech Republic' }, { key: 46, value: 'Denmark' }, { key: 47, value: 'Djibouti' }, { key: 48, value: 'Dominican Republic' }, { key: 49, value: 'East Timor (Timor-Leste)' }, { key: 50, value: 'Ecuador' }, { key: 51, value: 'Egypt' }, { key: 52, value: 'El Salvador' }, { key: 53, value: 'Equatorial Guinea' }, { key: 54, value: 'Eritrea' }, { key: 55, value: 'Estonia' }, { key: 56, value: 'Eswatini' }, { key: 57, value: 'Ethiopia' }, { key: 58, value: 'Fiji' }, { key: 59, value: 'Finland' }, { key: 60, value: 'France' }, { key: 61, value: 'Gabon' }, { key: 62, value: 'The Gambia' }, { key: 63, value: 'Georgia' }, { key: 64, value: 'Germany' }, { key: 65, value: 'Ghana' }, { key: 66, value: 'Greece' }, { key: 67, value: 'Grenada' }, { key: 68, value: 'Guatemala' }, { key: 69, value: 'Guinea' }, { key: 70, value: 'Guinea-Bissau' }, { key: 71, value: 'Guyana' }, { key: 72, value: 'Haiti' }, { key: 73, value: 'Honduras' }, { key: 74, value: 'Hungary' }, { key: 75, value: 'Iceland' }, { key: 76, value: 'India' }, { key: 77, value: 'Indonesia' }, { key: 78, value: 'Iran' }, { key: 79, value: 'Iraq' }, { key: 80, value: 'Ireland' }, { key: 81, value: 'Israel' }, { key: 82, value: 'Italy' }, { key: 83, value: 'Jamaica' }, { key: 84, value: 'Japan' }, { key: 85, value: 'Jordan' }, { key: 86, value: 'Kazakhstan' }, { key: 87, value: 'Kenya' }, { key: 88, value: 'Kiribati' }, { key: 89, value: 'Korea – North' }, { key: 90, value: 'Korea – South' }, { key: 91, value: 'Kosovo' }, { key: 92, value: 'Kuwait' }, { key: 93, value: 'Kyrgyzstan' }, { key: 94, value: 'Laos' }, { key: 95, value: 'Latvia' }, { key: 96, value: 'Lebanon' }, { key: 97, value: 'Lesotho' }, { key: 98, value: 'Liberia' }, { key: 99, value: 'Libya' }, { key: 100, value: 'Liechtenstein' }, { key: 101, value: 'Lithuania' }, { key: 102, value: 'Luxembourg' }, { key: 103, value: 'Madagascar' }, { key: 104, value: 'Malawi' }, { key: 105, value: 'Malaysia' }, { key: 106, value: 'Maldives' }, { key: 107, value: 'Mali' }, { key: 108, value: 'Malta' }, { key: 109, value: 'Marshall Islands' }, { key: 110, value: 'Mauritania' }, { key: 111, value: 'Mauritius' }, { key: 112, value: 'Mexico' }, { key: 113, value: 'Federated States of Micronesia' }, { key: 114, value: 'Moldova' }, { key: 115, value: 'Monaco' }, { key: 116, value: 'Mongolia' }, { key: 117, value: 'Montenegro' }, { key: 118, value: 'Morocco' }, { key: 119, value: 'Mozambique' }, { key: 120, value: 'Myanmar (Burma)' }, { key: 121, value: 'Namibia' }, { key: 122, value: 'Nauru' }, { key: 123, value: 'Nepal' }, { key: 124, value: 'Netherlands' }, { key: 125, value: 'New Zealand' }, { key: 126, value: 'Nicaragua' }, { key: 127, value: 'Niger' }, { key: 128, value: 'Nigeria' }, { key: 129, value: 'North Macedonia' }, { key: 130, value: 'Norway' }, { key: 131, value: 'Oman' }, { key: 132, value: 'Pakistan' }, { key: 133, value: 'Palau' }, { key: 134, value: 'Panama' }, { key: 135, value: 'Papua New Guinea' }, { key: 136, value: 'Paraguay' }, { key: 137, value: 'Peru' }, { key: 138, value: 'Philippines' }, { key: 139, value: 'Poland' }, { key: 140, value: 'Portugal' }, { key: 141, value: 'Qatar' }, { key: 142, value: 'Romania' }, { key: 143, value: 'Russia' }, { key: 144, value: 'Rwanda' }, { key: 145, value: 'Saint Kitts and Nevis' }, { key: 146, value: 'Saint Lucia' }, { key: 147, value: 'Saint Vincent and the Grenadines' }, { key: 148, value: 'Samoa' }, { key: 149, value: 'San Marino' }, { key: 150, value: 'Sao Tome and Principe' }, { key: 151, value: 'Saudi Arabia' }, { key: 152, value: 'Senegal' }, { key: 153, value: 'Serbia' }, { key: 154, value: 'Seychelles' }, { key: 155, value: 'Sierra Leone' }, { key: 156, value: 'Singapore' }, { key: 157, value: 'Slovakia' }, { key: 158, value: 'Slovenia' }, { key: 159, value: 'Solomon Islands' }, { key: 160, value: 'Somalia' }, { key: 161, value: 'South Africa' }, { key: 162, value: 'Spain' }, { key: 163, value: 'Sri Lanka' }, { key: 164, value: 'Sudan' }, { key: 165, value: 'South Sudan' }, { key: 166, value: 'Suriname' }, { key: 167, value: 'Sweden' }, { key: 168, value: 'Switzerland' }, { key: 169, value: 'Syria' }, { key: 170, value: 'Taiwan' }, { key: 171, value: 'Tajikistan' }, { key: 172, value: 'Tanzania' }, { key: 173, value: 'Thailand' }, { key: 174, value: 'Togo' }, { key: 175, value: 'Tonga' }, { key: 176, value: 'Trinidad and Tobago' }, { key: 177, value: 'Tunisia' }, { key: 178, value: 'Turkey' }, { key: 179, value: 'Turkmenistan' }, { key: 180, value: 'Tuvalu' }, { key: 181, value: 'Uganda' }, { key: 182, value: 'Ukraine' }, { key: 183, value: 'United Arab Emirates' }, { key: 184, value: 'United Kingdom' }, { key: 185, value: 'United States' }, { key: 186, value: 'Uruguay' }, { key: 187, value: 'Uzbekistan' }, { key: 188, value: 'Vanuatu' }, { key: 189, value: 'Vatican City' }, { key: 190, value: 'Venezuela' }, { key: 191, value: 'Vietnam' }, { key: 192, value: 'Yemen' }, { key: 193, value: 'Zambia' }, { key: 194, value: 'Zimbabwe' }
]

const preValues = {
  companyName: 'New Company',
  companyCategory: 'Minning',
  headQuartersCountry: 'Argentina',
  headQuartersCity: 'San Juan',
  headQuartersStreet: 'Calle x',
  headQuartersNumber: '0',
  headQuartersZipCode: 'Z0000',
  headQuartersMainContactPhone: '00-000-00000000',
  headQuartersMainContactEmail: 'info@NewCompany.com',
  companyInternalDescription: 'default company',
  companyLogo: 'some web address',
  // A partir de acá vienen los preValues de companyContract
  hasCAAdmin: false,
  amountOfCAA: '0',
  amountOfUsers: '50',
  amountOfChartsAllowed: '4'
}

export const AddNewCompanyScreen = () => {
  const { data } = useContext(DataContext)
  // console.info('dataFromContext= \n', data)
  const [countrySelected, setCountrySelected] = useState('Argentina')
  const [categorySelected, setCategorySelected] = useState('Minning')
  const { control, handleSubmit, watch, formState: { errors } } = useForm(
    {
      defaultValues: preValues
    })

  const hasCAAdmin = watch('hasCAAdmin')
  const [addNewCompany, dataNewCompany] = useMutation(addNewCompanyM)
  const [addNewCompanyContract, dataNewCompanyContract] = useMutation(addNewCompanyContractM)
  const [saveChanges, setSaveChanges] = useState(false)
  const onAddNewCompanyPressed = async (useFormData) => {
    setSaveChanges(true)
    try {
      await addNewCompany(
        {
          variables:
          {
            companyName: useFormData.companyName,
            companyCategory: useFormData.companyCategory,
            headQuartersCountry: useFormData.headQuartersCountry,
            headQuartersCity: useFormData.headQuartersCity,
            headQuartersStreet: useFormData.headQuartersStreet,
            headQuartersNumber: useFormData.headQuartersNumber,
            headQuartersZipCode: useFormData.headQuartersZipCode,
            headQuartersMainContactPhone: useFormData.headQuartersMainContactPhone,
            headQuartersMainContactEmail: useFormData.headQuartersMainContactEmail,
            companyInternalDescription: useFormData.companyInternalDescription,
            companyLogo: useFormData.companyLogo
          },
          Authorization: {
            Authorization: data.userToken
          }
        }
      )
      try {
        const dNC = dataNewCompany
        await addNewCompanyContract(
          {
            variables:
            {
              idCompany: dNC.idCompany,
              hasCAAdmin: useFormData.hasCAAdmin,
              amountOfCAA: useFormData.amountOfCAA,
              amountOfUsers: useFormData.amountOfUsers,
              amountOfChartsAllowed: useFormData.amountOfChartsAllowed
            },
            Authorization: {
              Authorization: data.userToken
            }
          }
        )
        const newContract = dataNewCompanyContract
        Alert.alert(`
          ${newContract.companyName} has been added as a new CtrlA client 💪!\n
          idContract= ${newContract.idContract}, Total Users allowed= ${newContract.amountOfUsers} \n
          Amount of chart types allowed= ${newContract.amountOfChartsAllowed}. With \n
          ${newContract.hasCAAdmin ? newContract.amountOfCAA : 'No Company App Admin by contract.'}
        `)
        setSaveChanges(false)
      } catch (error) {
        console.error(error.message)
      }
    } catch (error) {
      console.error(error.message)
    }
  }
  useEffect(() => setCategorySelected(categorySelected), [])
  useEffect(() => setCountrySelected(countrySelected), [])
  return (
    <View style={styles.root}>
      <Text>Add New Company Form</Text>
      <CustomInput name='companyName' extraTitle='Company Name' control={control} rules={CIRules('companyName', 3, true)} />
      <CustomSelectList name='companyCategory' control={control} data={categories} setSelected={setCategorySelected} rules={CIRules('companyCategory', 3, true)} />
      <CustomSelectList name='headQuartersCountry' control={control} data={countries} setSelected={setCountrySelected} placeholder='Select Country' rules={CIRules('headQuartersCountry', 3, true)} />
      <CustomInput name='headQuartersCity' placeholder='Headquarters City' control={control} rules={CIRules('Headquarters City', 3)} />
      <CustomInput name='headQuartersStreet' placeholder='Headquarters Street' control={control} rules={CIRules('headQuartersStreet', 3)} />
      <CustomInput name='headQuartersNumber' placeholder='Street number' control={control} rules={CIRules('headQuartersNumber', 3)} />
      <CustomInput name='headQuartersZipCode' placeholder='Zip Code' control={control} rules={CIRules('headQuartersZipCode', 3)} />
      <CustomInput name='headQuartersMainContactPhone' placeholder='Main Contact Phone' control={control} rules={CIRules('headQuartersMainContactPhone', 3)} />
      <CustomInput name='headQuartersMainContactEmail' placeholder='Main Contact Email' control={control} rules={CIRules('headQuartersMainContactEmail', 3)} isEmail />
      <CustomInput name='companyInternalDescription' placeholder='Company internal description (CtrlA Description)' control={control} rules={CIRules('companyInternalDescription', 3)} />
      <CustomInput name='companyLogo' placeholder='Uri Company Logo' control={control} rules={CIRules('companyLogo', 3)} />
      <Text style={{ color: 'rgb(220,120,120)' }}>Contract information</Text>
      <CustomCheckBox name='hasCAAdmin' control={control} title='Has company App Admins?' />
      {
        hasCAAdmin && (
          <CustomInput name='amountOfCAA' placeholder='Amount of Company App Admins' control={control} rules={CIRulesNumber('Chart width')} keyboardType={numericKeyboard} />
        )
      }
      <CustomInput name='amountOfUsers' placeholder='Total number of users granted' control={control} rules={CIRulesNumber('Chart width')} keyboardType={numericKeyboard} />
      <CustomInput name='amountOfChartsAllowed' placeholder='Number of Chart Types Granted' control={control} rules={CIRulesNumber('Chart width')} keyboardType={numericKeyboard} />
      <ErrorText errors={errors} />
      <Button title='Add New Company' style={styles.button} onPress={handleSubmit(onAddNewCompanyPressed)} />
      <CustomActivityIndicator visible={saveChanges} />
    </View>
  )
}

/*
  Mutation:editCompanyData
*/

// Mutation definition from BE. All constants definitions used for useMutation hook, will have an M letter at the end
const editCompanyDataM = gql`
mutation EditCompanyData($idCompany: ID!, $companyName: String, $companyCategory: String, $headQuartersCountry: String, $headQuartersCity: String, $headQuartersStreet: String, $headQuartersNumber: String, $headQuartersZipCode: String, $headQuartersMainContactPhone: String, $headQuartersMainContactEmail: String, $companyInternalDescription: String, $companyLogo: String) {
  editCompanyData(idCompany: $idCompany, companyName: $companyName, companyCategory: $companyCategory, headQuartersCountry: $headQuartersCountry, headQuartersCity: $headQuartersCity, headQuartersStreet: $headQuartersStreet, headQuartersNumber: $headQuartersNumber, headQuartersZipCode: $headQuartersZipCode, headQuartersMainContactPhone: $headQuartersMainContactPhone, headQuartersMainContactEmail: $headQuartersMainContactEmail, companyInternalDescription: $companyInternalDescription, companyLogo: $companyLogo) {
    idCompany
    companyName
    companyCategory
    headQuartersCountry
    headQuartersCity
    headQuartersStreet
    headQuartersNumber
    headQuartersZipCode
    address
    headQuartersMainContactPhone
    headQuartersMainContactEmail
    companyInternalDescription
    companyLogo
  }
}

`

const editCompanyContractM = gql`
mutation EditCompanyContract($idCompany: ID!, $idContract: ID, $companyName: String, $hasCaAdmin: Boolean, $amountOfCaa: Int, $amountOfUsers: Int, $amountOfChartsAllowed: Int) {
  editCompanyContract(idCompany: $idCompany, idContract: $idContract, companyName: $companyName, hasCAAdmin: $hasCaAdmin, amountOfCAA: $amountOfCaa, amountOfUsers: $amountOfUsers, amountOfChartsAllowed: $amountOfChartsAllowed) {
    idContract
    idCompany
    companyName
    hasCAAdmin
    amountOfCAA
    amountOfUsers
    amountOfChartsAllowed
  }
}

`

export const EditCompanyDataScreen = ({ companySelected }) => {
  const { data } = useContext(DataContext)
  // console.info('dataFromContext= \n', data)

  const [load, setLoad] = useState(true)
  const dataEditedCompany = useFindCompany(companySelected)
  const dataEditedContract = useFindContract(companySelected)
  if (!dataEditedContract || !dataEditedCompany) return <></>
  const [countrySelected, setCountrySelected] = useState('')
  const [categorySelected, setCategorySelected] = useState('')
  // console.info('dataEditedContract=\n', dataEditedContract)
  const { control, handleSubmit, watch, formState: { errors } } = useForm(
    {
      defaultValues: {
        idCompany: dataEditedCompany.idCompany,
        companyName: dataEditedCompany.companyName,
        headQuartersCountry: dataEditedCompany.headQuartersCountry,
        companyCategory: dataEditedCompany.companyCategory,
        headQuartersCity: dataEditedCompany.headQuartersCity,
        headQuartersStreet: dataEditedCompany.headQuartersStreet,
        headQuartersNumber: dataEditedCompany.headQuartersNumber,
        headQuartersZipCode: dataEditedCompany.headQuartersZipCode,
        headQuartersMainContactPhone: dataEditedCompany.headQuartersMainContactPhone,
        headQuartersMainContactEmail: dataEditedCompany.headQuartersMainContactEmail,
        companyInternalDescription: dataEditedCompany.companyInternalDescription,
        address: dataEditedCompany.address,
        companyLogo: dataEditedCompany.companyLogo,
        idContract: dataEditedContract.idContract,
        hasCAAdmin: dataEditedContract.hasCAAdmin,
        amountOfCAA: dataEditedContract.amountOfCAA,
        amountOfUsers: dataEditedContract.amountOfUsers,
        amountOfChartsAllowed: dataEditedContract.amountOfChartsAllowed
      }
    })
  const hasCAAdmin = watch('hasCAAdmin')
  const address = watch('address')
  // const headers = {
  //   Authorization: `bearer ${data.userToken}`
  // }
  // console.info('headers=\n', headers)
  const [editCompanyData, dataEditCompanyData] = useMutation(editCompanyDataM)
  const [editCompanyContract, dataEditCompanyContract] = useMutation(editCompanyContractM)
  useEffect(() => setLoad(false), [])

  const onEditCompanyPressed = async (useFormData) => {
    setLoad(true)
    console.clear()
    console.info('useFormData= \n', useFormData)
    console.info('dataContext= \n', data)
    try {
      await editCompanyData(
        {
          variables:
          {
            idCompany: useFormData.idCompany,
            companyName: useFormData.companyName,
            companyCategory: useFormData.companyCategory,
            headQuartersCountry: useFormData.headQuartersCountry,
            headQuartersCity: useFormData.headQuartersCity,
            headQuartersStreet: useFormData.headQuartersStreet,
            headQuartersNumber: useFormData.headQuartersNumber,
            headQuartersZipCode: useFormData.headQuartersZipCode,
            address: useFormData.address,
            headQuartersMainContactPhone: useFormData.headQuartersMainContactPhone,
            headQuartersMainContactEmail: useFormData.headQuartersMainContactEmail,
            companyInternalDescription: useFormData.companyInternalDescription,
            companyLogo: useFormData.companyLogo
          }
        }
      )
      console.info('primera mutation superada')
    } catch (error) {
      setLoad(false)
      console.error(error.message)
    }
    try {
      // const dEC = dataEditCompanyData
      await editCompanyContract(
        {
          variables:
          {
            idContract: useFormData.idContract,
            idCompany: useFormData.idCompany,
            companyName: useFormData.companyName,
            hasCAAdmin: useFormData.hasCAAdmin,
            amountOfCAA: useFormData.amountOfCAA,
            amountOfUsers: useFormData.amountOfUsers,
            amountOfChartsAllowed: useFormData.amountOfChartsAllowed
          }
        }
      )
      console.info('segunda mutation superada')
      setLoad(false)
    } catch (error) {
      setLoad(false)
      console.error(error.message)
    }
  }

  return (
    <>
      <View style={styles.root}>
        <CustomInput name='companyName' placeholder='Company Name' control={control} rules={CIRules('companyName', 3, true)} />
        <CustomSelectList name='companyCategory' control={control} data={categories} setSelected={setCategorySelected} placeholder='Select Company Cathegory' />
        <CustomSelectList name='headQuartersCountry' control={control} data={countries} setSelected={setCountrySelected} placeholder='Select Country' />
        <CustomInput name='headQuartersCity' placeholder='Headquarters City' control={control} rules={CIRules('headQuartersCity', 3)} />
        <CustomInput name='headQuartersStreet' placeholder='Headquarters Street' control={control} rules={CIRules('headQuartersStreet', 3)} />
        <CustomInput name='headQuartersNumber' placeholder='Street number' control={control} rules={CIRules('headQuartersNumber', 3)} />
        <CustomInput name='headQuartersZipCode' placeholder='Zip Code' control={control} rules={CIRules('headQuartersZipCode', 3)} />
        <CustomInput name='address' placeholder='address' extraTitle='address' control={control} rules={CIRules('address', 3)} readOnly value={address} />

        <CustomInput name='headQuartersMainContactPhone' placeholder='Main Contact Phone' control={control} rules={CIRules('headQuartersMainContactPhone', 3)} />
        <CustomInput name='headQuartersMainContactEmail' placeholder='Main Contact Email' control={control} rules={CIRules('headQuartersMainContactEmail', 3)} isEmail />
        <CustomInput name='companyInternalDescription' placeholder='Company internal description (CtrlA Description)' control={control} rules={CIRules('companyInternalDescription', 3)} />
        <CustomInput name='companyLogo' placeholder='Uri Company Logo' control={control} rules={CIRules('companyLogo', 3)} />

        <Text style={{ color: 'rgb(220,120,120)' }}>Contract information</Text>
        <CustomInput name='idContract' placeholder='idContract' extraTitle='idContract' control={control} rules={CIRules('idContract', 3)} readOnly />
        <CustomInput name='amountOfUsers' placeholder='Users granted' extraTitle='Users granted' control={control} rules={CIRulesNumber('amountOfUsers', true, 50)} keyboardType={numericKeyboard} />
        <CustomInput name='amountOfChartsAllowed' placeholder='Chart Types Granted' control={control} rules={CIRulesNumber('amountOfChartsAllowed', true, 2, 4)} keyboardType={numericKeyboard} />
        <CustomCheckBox name='hasCAAdmin' control={control} title='Has company App Admins?' />
        {
          hasCAAdmin && (
            <CustomInput name='amountOfCAA' placeholder='Amount of Company App Admins' control={control} rules={CIRulesNumber('amountOfCAA', true, 0, 10)} keyboardType={numericKeyboard} />
          )
        }
        <ErrorText errors={errors} />
        <Button title='Edit Selected Company Data' style={styles.button} onPress={handleSubmit(onEditCompanyPressed)} />
        <CustomActivityIndicator visible={load} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 400
  },
  button: {
    backgroundColor: 'rgb(211,111,111)',
    alignSelf: 'stretch',
    borderRadius: '15'
  }
})
