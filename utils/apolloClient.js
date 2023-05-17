import { setContext } from '@apollo/client/link/context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from '@apollo/client'

const httpLink = createHttpLink({
  uri: 'http://192.168.100.154:4000'
})

// HJ
let tokenValue
const getValue = async () => {
  // AsyncStorage.clear()
  AsyncStorage.getItem('token').then(value => {
    tokenValue = `BEARER ${value}`
  }
  ).catch(
    value => {
      tokenValue = `BEARER ${value}`
    }
  )
  console.log('tokenValue on ApolloClient side= \n', tokenValue)
  return await tokenValue
}

// const clearData = async () => {
//   // await AsyncStorage.clear()
//   const keys = await AsyncStorage.getAllKeys().then()
//   // await AsyncStorage.multiRemove(keys)
//   console.log(keys[0])
// }

// FRANCÓ
// let tokenValue
// export const getValue = async () => {
//   // await AsyncStorage.multiRemove('token')
//   if (!tokenValue) {
//     try {
//       const storedToken = await AsyncStorage.getItem('token')
//       tokenValue = `Bearer ${storedToken}`
//     } catch (e) {
//       // no se que se puede hacer aca, asumo que desloguear
//       console.log('No token stored was found')
//     }
//   }
//   return await tokenValue
// }

const authLink = setContext(async (_, { headers }) => {
  // await clearData()
  return {
    headers: {
      ...headers,
      Authorization: await getValue()
    }
  }
})

const createApolloClient = () => new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default createApolloClient
