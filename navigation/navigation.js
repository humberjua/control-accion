import { createStackNavigator } from '@react-navigation/stack'

export const Stack = createStackNavigator()

// Acá abajo sería otra forma de hacerlo... como se hacía antes, se traian todos los componentes y se creaba "el arbol de pantallas"

// import { createStackNavigator } from '@react-navigation/stack'
// import { createAppContainer } from 'react-navigation'

// import { ChartM } from '../apmutations/chartM'
// import { ChartMedit } from '../apmutations/chartMedit.jsx'
// import { notificationM } from '../apmutations/notificationM.jsx'
// import { notificationMEdit } from '../apmutations/notificationMEdit.jsx'
// import { userM } from '../apmutations/userM.jsx'
// // import { userMEdit } from '../apmutations/userMEdit.jsx'

// import AllCharts from '../screens/allCharts.js'
// import chatScreen from '../screens/chatScreen.js'
// import firstScreen from '../screens/firstScreen.js'
// import myCharts from '../screens/myCharts.js'
// import reportEvent from '../screens/reportEvent.js'
// import searchScreen from '../screens/searchScreen.js'
// import settingScreen from '../screens/settingsScreen.js'

// import { LoginScreen } from '../ValidationSchemas/Login.jsx'

// const screens = {
//   Home: {
//     screen: firstScreen
//   },
//   LoginScreen: {
//     screen: LoginScreen
//   },
//   AllCharts: {
//     screen: AllCharts
//   },
//   chatScreen: {
//     screen: chatScreen
//   },
//   myCharts: {
//     screen: myCharts
//   },
//   reportEvent: {
//     screen: reportEvent
//   },
//   searchScreen: {
//     screen: searchScreen
//   },
//   settingScreen: {
//     screen: settingScreen
//   },
//   ChartM: {
//     screen: ChartM
//   },
//   ChartMedit: {
//     screen: ChartMedit
//   },
//   notificationM: {
//     screen: notificationM
//   },
//   notificationMEdit: {
//     screen: notificationMEdit
//   },
//   userM: {
//     screen: userM
//   }
//   // userMEdit: {
//   //   screen: userMEdit
//   // }
// }

// const Stack = createStackNavigator(screens)

// export default createAppContainer(Stack)
