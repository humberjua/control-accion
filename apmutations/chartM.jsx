import { gql, useMutation } from '@apollo/client'
import {
  View,
  ScrollView,
  Button,
  StyleSheet,
  Platform
} from 'react-native'
import { useForm } from 'react-hook-form'
import CustomInput from '../components/CustomInput.js'
import CustomCheckBox from '../components/CustomCheckBox.js'
import CustomPicker from '../components/CustomPicker.js'
import { CIRules, CIRulesNumber } from '../components/CIRules.js'
import { ErrorText } from '../components/ErrorText.js'

const numericKeyboard = Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'

/*
  Mutation:addNewChart
*/

// Mutation definition from BE. All constants definitions used for useMutation hook, will have an M letter at the end
const addNewChartM = gql`
mutation AddNewChart($chartDescription: String!, $chartWidth: Int!, $chartHeight: Int!, $isAndroidChart: Boolean!, $isIOSChart: Boolean!, $isWebChart: Boolean!, $maxNumberSeries: Int!, $fromDay: String!, $toDay: String!, $x1: String!, $x2: String!, $x3: String!, $x4: String!, $y1DataField: String!, $y1DataGroupingWay: String!, $y1Value: String!, $y2DataField: String!, $y2DataGroupingWay: String!, $y2Value: String!, $y3DataField: String!, $y3DataGroupingWay: String!, $y3Value: String!, $y4DataField: String!, $y4DataGroupingWay: String!, $y4Value: String!, $showLabelX1: Boolean!, $labelX1: String!, $showLabelX2: Boolean!, $labelX2: String!, $showLabelX3: Boolean!, $labelX3: String!, $showLabelX4: Boolean!, $labelX4: String!, $showLabelY1: Boolean!, $labelY1: String!, $showLabelY2: Boolean!, $labelY2: String!, $showLabelY3: Boolean!, $labelY3: String!, $showLabelY4: Boolean!, $labelY4: String!, $showTitle: Boolean!, $title: String!) {
  addNewChart(chartDescription: $chartDescription, chartWidth: $chartWidth, chartHeight: $chartHeight, isAndroidChart: $isAndroidChart, isIOSChart: $isIOSChart, isWebChart: $isWebChart, maxNumberSeries: $maxNumberSeries, fromDay: $fromDay, toDay: $toDay, x1: $x1, x2: $x2, x3: $x3, x4: $x4, y1DataField: $y1DataField, y1DataGroupingWay: $y1DataGroupingWay, y1Value: $y1Value, y2DataField: $y2DataField, y2DataGroupingWay: $y2DataGroupingWay, y2Value: $y2Value, y3DataField: $y3DataField, y3DataGroupingWay: $y3DataGroupingWay, y3Value: $y3Value, y4DataField: $y4DataField, y4DataGroupingWay: $y4DataGroupingWay, y4Value: $y4Value, showLabelX1: $showLabelX1, labelX1: $labelX1, showLabelX2: $showLabelX2, labelX2: $labelX2, showLabelX3: $showLabelX3, labelX3: $labelX3, showLabelX4: $showLabelX4, labelX4: $labelX4, showLabelY1: $showLabelY1, labelY1: $labelY1, showLabelY2: $showLabelY2, labelY2: $labelY2, showLabelY3: $showLabelY3, labelY3: $labelY3, showLabelY4: $showLabelY4, labelY4: $labelY4, showTitle: $showTitle, title: $title) {
    idChart
    chartDescription
    chartWidth
    chartHeight
    isAndroidChart
    isIOSChart
    isWebChart
    maxNumberSeries
    fromDay
    toDay
    x1
    x2
    x3
    x4
    y1DataField
    y1DataGroupingWay
    y1Value
    y2DataField
    y2DataGroupingWay
    y2Value
    y3DataField
    y3DataGroupingWay
    y3Value
    y4DataField
    y4DataGroupingWay
    y4Value
    showLabelX1
    labelX1
    showLabelX2
    labelX2
    showLabelX3
    labelX3
    showLabelX4
    labelX4
    showLabelY1
    labelY1
    showLabelY2
    labelY2
    showLabelY3
    labelY3
    showLabelY4
    labelY4
    showTitle
    title
  }
}
`

let dayB = new Date()
const dayA = new Date(dayB - (1000 * 60 * 60 * 24 * 10)).toLocaleDateString()
dayB = new Date(dayB).toLocaleDateString()

export const AddNewChartScreen = () => {
  const preValues = {
    chartDescription: 'New App Chart',
    chartHeight: '400',
    chartWidth: '400',
    isAndroidChart: true,
    isIOSChart: true,
    isWebChart: true,
    maxNumberSeries: 1,
    fromDay: dayA,
    toDay: dayB,
    x1: '[0,0]',
    x2: '[0,0]',
    x3: '[0,0]',
    x4: '[0,0]',
    y1DataField: 'not assigned',
    y1DataGroupingWay: 'total',
    y2DataField: 'not assigned',
    y2DataGroupingWay: 'total',
    y3DataField: 'not assigned',
    y3DataGroupingWay: 'total',
    y4DataField: 'not assigned',
    y4DataGroupingWay: 'total',
    y1Value: '[0,0]',
    y2Value: '[0,0]',
    y3Value: '[0,0]',
    y4Value: '[0,0]',
    showLabelX1: true,
    labelX1: 'labelX1',
    showLabelX2: false,
    labelX2: 'labelX2',
    showLabelX3: false,
    labelX3: 'labelX3',
    showLabelX4: false,
    labelX4: 'labelX4',
    showLabelY1: true,
    labelY1: 'labelY1',
    showLabelY2: false,
    labelY2: 'labelY2',
    showLabelY3: false,
    labelY3: 'labelY3',
    showLabelY4: false,
    labelY4: 'labelY4',
    showTitle: true,
    title: 'Title'
  }
  const { control, handleSubmit, watch, formState: { errors } } = useForm(
    {
      defaultValues: preValues
    })

  const maxNumberSeries = watch('maxNumberSeries')
  const showLabelX1 = watch('showLabelX1')
  const showLabelX2 = watch('showLabelX2')
  const showLabelX3 = watch('showLabelX3')
  const showLabelX4 = watch('showLabelX4')
  const showLabelY1 = watch('showLabelY1')
  const showLabelY2 = watch('showLabelY2')
  const showLabelY3 = watch('showLabelY3')
  const showLabelY4 = watch('showLabelY4')
  const showTitle = watch('showTitle')

  const [addNewChart] = useMutation(addNewChartM)

  const onAddNewChartPressed = async (useFormData) => {
    try {
      await addNewChart(
        {
          variables:
            {
              ...useFormData,
              chartWidth: Number(useFormData.chartWidth),
              chartHeight: Number(useFormData.chartHeight),
              maxNumberSeries: Number(useFormData.maxNumberSeries)
            }
        })
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        {/* <Image
          source={Logo} // We need a logo
          style={[styles.logo, {height: height*0.3}]}
          resizeMode='contain'
        /> */}
        <ErrorText errors={errors} />
        <Button title='Add Chart' onPress={handleSubmit(onAddNewChartPressed)} />
        <CustomInput name='chartDescription' placeholder='Chart description' control={control} rules={CIRules('Chart Description', 3)} />
        <CustomInput name='chartWidth' placeholder='Chart width' control={control} rules={CIRulesNumber('Chart width')} keyboardType={numericKeyboard} />
        <CustomInput name='chartHeight' placeholder='Chart height' control={control} rules={CIRulesNumber('Chart height')} keyboardType={numericKeyboard} />

        <CustomCheckBox name='isAndroidChart' control={control} title='Android chart?' />
        <CustomCheckBox name='isIOSChart' control={control} title='IOS chart?' />
        <CustomCheckBox name='isWebChart' control={control} title='Web chart?' />

        <CustomPicker name='maxNumberSeries' control={control} items={[1, 2, 3, 4]} title='Maximus number of series' />

        <CustomInput name='fromDay' placeholder={dayA.toString()} control={control} extraTitle='From day' value={dayA.toString()} readOnly isDate />
        <CustomInput name='toDay' placeholder={dayB.toString()} control={control} extraTitle='To day' value={dayB.toString()} readOnly isDate />

        <CustomInput name='x1' placeholder='x1' control={control} rules={CIRules('x1', 3)} />
        <CustomCheckBox name='showLabelX1' control={control} title='Show label X1?' />
        {showLabelX1 && (<CustomInput name='labelX1' placeholder='Label X1' control={control} rules={CIRules('labelX1', 3, false)} />)}
        <CustomCheckBox name='showLabelY1' control={control} title='Show label Y1?' />
        {showLabelY1 && (<CustomInput name='labelY1' placeholder='Label Y1' control={control} rules={CIRules('labelY1', 3, false)} />)}
        <CustomInput name='y1DataField' placeholder='Y1 data field' control={control} rules={CIRules('y1DataField', 3)} />
        <CustomInput name='y1DataGroupingWay' placeholder='Y1 data groupingWay' control={control} rules={CIRules('y1DataGroupingWay', 3)} />
        <CustomInput name='y1Value' placeholder='Y1 value' control={control} rules={CIRules('y1Value', 3)} />

        {
          maxNumberSeries >= 2 &&
            <>
              <CustomInput name='x2' placeholder='x2' control={control} rules={CIRules('x2', 3, false)} />
              <CustomCheckBox name='showLabelX2' control={control} title='Show label X2?' />
              {showLabelX2 && (<CustomInput name='labelX2' placeholder='Label X2' control={control} rules={CIRules('labelX2', 3, false)} />)}
              <CustomCheckBox name='showLabelY2' control={control} title='Show label Y2?' />
              {showLabelY2 && (<CustomInput name='labelY2' placeholder='Label Y2' control={control} rules={CIRules('labelY2', 3, false)} />)}
              <CustomInput name='y2DataField' placeholder='Y2 data field' control={control} rules={CIRules('y2DataField', 3, false)} />
              <CustomInput name='y2DataGroupingWay' placeholder='Y2 data groupingWay' control={control} rules={CIRules('y2DataGroupingWay', 3)} />
              <CustomInput name='y2Value' placeholder='Y2 value' control={control} rules={CIRules('y2Value', 3, false)} />
            </>
        }
        {
          maxNumberSeries >= 3 &&
            <>
              <CustomInput name='x3' placeholder='x3' control={control} rules={CIRules('x3', 3, false)} />
              <CustomCheckBox name='showLabelX3' control={control} title='Show label X3?' />
              {showLabelX3 && (<CustomInput name='labelX3' placeholder='Label X3' control={control} rules={CIRules('labelX3', 3, false)} />)}
              <CustomCheckBox name='showLabelY3' control={control} title='Show label Y3?' />
              {showLabelY3 && (<CustomInput name='labelY3' placeholder='Label Y3' control={control} rules={CIRules('labelY3', 3, false)} />)}
              <CustomInput name='y3DataField' placeholder='Y3 data field' control={control} />
              <CustomInput name='y3DataGroupingWay' placeholder='Y3 data groupingWay' control={control} rules={CIRules('y3DataGroupingWay', 3)} />
              <CustomInput name='y3Value' placeholder='Y3 value' control={control} rules={CIRules('y3Value', 3, false)} />
            </>
        }
        {
          maxNumberSeries === 4 &&
            <>
              <CustomInput name='x4' placeholder='x4' control={control} rules={CIRules('x4', 3, false)} />
              <CustomCheckBox name='showLabelX4' control={control} title='Show label X4?' />
              {showLabelX4 && (<CustomInput name='labelX4' placeholder='Label X4' control={control} rules={CIRules('labelX4', 3, false)} />)}
              <CustomCheckBox name='showLabelY4' control={control} title='Show label Y4?' />
              {showLabelY4 && (<CustomInput name='labelY4' placeholder='Label Y4' control={control} rules={CIRules('labelY4', 3, false)} />)}
              <CustomInput name='y4DataField' placeholder='Y4 data field' control={control} />
              <CustomInput name='y4DataGroupingWay' placeholder='Y4 data groupingWay' control={control} rules={CIRules('y4DataGroupingWay', 3)} />
              <CustomInput name='y4Value' placeholder='Y4 value' control={control} rules={CIRules('y4Value', 3, false)} />
            </>
        }

        <CustomCheckBox name='showTitle' control={control} title='Show title?' />
        {showTitle && (<CustomInput name='title' placeholder='Title' control={control} rules={CIRules('title', 3, false)} />)}

      </View>

    </ScrollView>
  )
}

/*
  Mutation:editChart
*/

// Mutation definition from BE. All constants definitions used for useMutation hook, will have an M letter at the end
const editChartM = gql`
mutation EditChart($idChart: ID!, $chartDescription: String!, $chartWidth: Int!, $chartHeight: Int!, $isAndroidChart: Boolean!, $isIOSChart: Boolean!, $isWebChart: Boolean!, $maxNumberSeries: Int!, $fromDay: String!, $toDay: String!, $x1: String!, $x2: String!, $x3: String!, $x4: String!, $y1DataField: String!, $y1DataGroupingWay: String!, $y1Value: String!, $y2DataField: String!, $y2DataGroupingWay: String!, $y2Value: String!, $y3DataField: String!, $y3DataGroupingWay: String!, $y3Value: String!, $y4DataField: String!, $y4DataGroupingWay: String!, $y4Value: String!, $showLabelX1: Boolean!, $labelX1: String!, $showLabelX2: Boolean!, $labelX2: String!, $showLabelX3: Boolean!, $labelX3: String!, $showLabelX4: Boolean!, $labelX4: String!, $showLabelY1: Boolean!, $labelY1: String!, $showLabelY2: Boolean!, $labelY2: String!, $showLabelY3: Boolean!, $labelY3: String!, $showLabelY4: Boolean!, $labelY4: String!, $showTitle: Boolean!, $title: String!) {
  editChart(idChart: $idChart, chartDescription: $chartDescription, chartWidth: $chartWidth, chartHeight: $chartHeight, isAndroidChart: $isAndroidChart, isIOSChart: $isIOSChart, isWebChart: $isWebChart, maxNumberSeries: $maxNumberSeries, fromDay: $fromDay, toDay: $toDay, x1: $x1, x2: $x2, x3: $x3, x4: $x4, y1DataField: $y1DataField, y1DataGroupingWay: $y1DataGroupingWay, y1Value: $y1Value, y2DataField: $y2DataField, y2DataGroupingWay: $y2DataGroupingWay, y2Value: $y2Value, y3DataField: $y3DataField, y3DataGroupingWay: $y3DataGroupingWay, y3Value: $y3Value, y4DataField: $y4DataField, y4DataGroupingWay: $y4DataGroupingWay, y4Value: $y4Value, showLabelX1: $showLabelX1, labelX1: $labelX1, showLabelX2: $showLabelX2, labelX2: $labelX2, showLabelX3: $showLabelX3, labelX3: $labelX3, showLabelX4: $showLabelX4, labelX4: $labelX4, showLabelY1: $showLabelY1, labelY1: $labelY1, showLabelY2: $showLabelY2, labelY2: $labelY2, showLabelY3: $showLabelY3, labelY3: $labelY3, showLabelY4: $showLabelY4, labelY4: $labelY4, showTitle: $showTitle, title: $title) {
    idChart
    chartDescription
    chartWidth
    chartHeight
    isAndroidChart
    isIOSChart
    isWebChart
    maxNumberSeries
    fromDay
    toDay
    x1
    x2
    x3
    x4
    y1DataField
    y1DataGroupingWay
    y1Value
    y2DataField
    y2DataGroupingWay
    y2Value
    y3DataField
    y3DataGroupingWay
    y3Value
    y4DataField
    y4DataGroupingWay
    y4Value
    showLabelX1
    labelX1
    showLabelX2
    labelX2
    showLabelX3
    labelX3
    showLabelX4
    labelX4
    showLabelY1
    labelY1
    showLabelY2
    labelY2
    showLabelY3
    labelY3
    showLabelY4
    labelY4
    showTitle
    title
  }
}
`

export const EditChartScreen = ({ preValues }) => {
  // console.log('preValues= \n', preValues)
  const { control, handleSubmit, watch, formState: { errors } } = useForm(
    {
      defaultValues: { ...preValues }
    })

  const maxNumberSeries = watch('maxNumberSeries')
  const showLabelX1 = watch('showLabelX1')
  const showLabelX2 = watch('showLabelX2')
  const showLabelX3 = watch('showLabelX3')
  const showLabelX4 = watch('showLabelX4')
  const showLabelY1 = watch('showLabelY1')
  const showLabelY2 = watch('showLabelY2')
  const showLabelY3 = watch('showLabelY3')
  const showLabelY4 = watch('showLabelY4')
  const showTitle = watch('showTitle')

  const [editChart] = useMutation(editChartM)

  const onEditSelectedChartPressed = async (useFormData) => {
    try {
      await editChart(
        {
          variables:
          {
            ...useFormData,
            chartWidth: Number(useFormData.chartWidth),
            chartHeight: Number(useFormData.chartHeight),
            maxNumberSeries: Number(useFormData.maxNumberSeries)
          }
        })
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        {/* <Image
          source={Logo} // We need a logo
          style={[styles.logo, {height: height*0.3}]}
          resizeMode='contain'
        /> */}
        <ErrorText errors={errors} />
        <Button title='Save changes into Chart' onPress={handleSubmit(onEditSelectedChartPressed)} />
        <CustomInput name='chartDescription' placeholder='Chart description' control={control} rules={CIRules('Chart Description', 3)} />
        <CustomInput name='chartWidth' placeholder='Chart width' control={control} rules={CIRulesNumber('Chart width')} keyboardType={numericKeyboard} />
        <CustomInput name='chartHeight' placeholder='Chart height' control={control} rules={CIRulesNumber('Chart height')} keyboardType={numericKeyboard} />

        <CustomCheckBox name='isAndroidChart' control={control} title='Android chart?' />
        <CustomCheckBox name='isIOSChart' control={control} title='IOS chart?' />
        <CustomCheckBox name='isWebChart' control={control} title='Web chart?' />

        <CustomPicker name='maxNumberSeries' control={control} items={[1, 2, 3, 4]} title='Maximus number of series' />

        <CustomInput name='fromDay' placeholder={dayA} control={control} extraTitle='From day' value={dayA} readOnly isDate />
        <CustomInput name='toDay' placeholder={dayB} control={control} extraTitle='To day' value={dayB} readOnly isDate />

        <CustomInput name='x1' placeholder='x1' control={control} rules={CIRules('x1', 3)} />
        <CustomCheckBox name='showLabelX1' control={control} title='Show label X1?' />
        {showLabelX1 && (<CustomInput name='labelX1' placeholder='Label X1' control={control} rules={CIRules('labelX1', 3, false)} />)}
        <CustomCheckBox name='showLabelY1' control={control} title='Show label Y1?' />
        {showLabelY1 && (<CustomInput name='labelY1' placeholder='Label Y1' control={control} rules={CIRules('labelY1', 3, false)} />)}
        <CustomInput name='y1DataField' placeholder='Y1 data field' control={control} rules={CIRules('y1DataField', 3)} />
        <CustomInput name='y1DataGroupingWay' placeholder='Y1 data groupingWay' control={control} rules={CIRules('y1DataGroupingWay', 3)} />
        <CustomInput name='y1Value' placeholder='Y1 value' control={control} rules={CIRules('y1Value', 3)} />

        {
          maxNumberSeries >= 2 &&
            <>
              <CustomInput name='x2' placeholder='x2' control={control} rules={CIRules('x2', 3, false)} />
              <CustomCheckBox name='showLabelX2' control={control} title='Show label X2?' />
              {showLabelX2 && (<CustomInput name='labelX2' placeholder='Label X2' control={control} rules={CIRules('labelX2', 3, false)} />)}
              <CustomCheckBox name='showLabelY2' control={control} title='Show label Y2?' />
              {showLabelY2 && (<CustomInput name='labelY2' placeholder='Label Y2' control={control} rules={CIRules('labelY2', 3, false)} />)}
              <CustomInput name='y2DataField' placeholder='Y2 data field' control={control} rules={CIRules('y2DataField', 3, false)} />
              <CustomInput name='y2DataGroupingWay' placeholder='Y2 data groupingWay' control={control} rules={CIRules('y2DataGroupingWay', 3)} />
              <CustomInput name='y2Value' placeholder='Y2 value' control={control} rules={CIRules('y2Value', 3, false)} />
            </>
        }
        {
          maxNumberSeries >= 3 &&
            <>
              <CustomInput name='x3' placeholder='x3' control={control} rules={CIRules('x3', 3, false)} />
              <CustomCheckBox name='showLabelX3' control={control} title='Show label X3?' />
              {showLabelX3 && (<CustomInput name='labelX3' placeholder='Label X3' control={control} rules={CIRules('labelX3', 3, false)} />)}
              <CustomCheckBox name='showLabelY3' control={control} title='Show label Y3?' />
              {showLabelY3 && (<CustomInput name='labelY3' placeholder='Label Y3' control={control} rules={CIRules('labelY3', 3, false)} />)}
              <CustomInput name='y3DataField' placeholder='Y3 data field' control={control} />
              <CustomInput name='y3DataGroupingWay' placeholder='Y3 data groupingWay' control={control} rules={CIRules('y3DataGroupingWay', 3)} />
              <CustomInput name='y3Value' placeholder='Y3 value' control={control} rules={CIRules('y3Value', 3, false)} />
            </>
        }
        {
          maxNumberSeries === 4 &&
            <>
              <CustomInput name='x4' placeholder='x4' control={control} rules={CIRules('x4', 3, false)} />
              <CustomCheckBox name='showLabelX4' control={control} title='Show label X4?' />
              {showLabelX4 && (<CustomInput name='labelX4' placeholder='Label X4' control={control} rules={CIRules('labelX4', 3, false)} />)}
              <CustomCheckBox name='showLabelY4' control={control} title='Show label Y4?' />
              {showLabelY4 && (<CustomInput name='labelY4' placeholder='Label Y4' control={control} rules={CIRules('labelY4', 3, false)} />)}
              <CustomInput name='y4DataField' placeholder='Y4 data field' control={control} />
              <CustomInput name='y4DataGroupingWay' placeholder='Y4 data groupingWay' control={control} rules={CIRules('y4DataGroupingWay', 3)} />
              <CustomInput name='y4Value' placeholder='Y4 value' control={control} rules={CIRules('y4Value', 3, false)} />
            </>
        }

        <CustomCheckBox name='showTitle' control={control} title='Show title?' />
        {showTitle && (<CustomInput name='title' placeholder='Title' control={control} rules={CIRules('title', 3, false)} />)}

      </View>

    </ScrollView>
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
  }
})
