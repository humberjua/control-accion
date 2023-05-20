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

// HJ ===> funciona, pero solo reiniciando la aplicación
let tokenValue
const getValue = async () => {
  AsyncStorage.flushGetRequests()
  await AsyncStorage.getItem('token').then(async value => {
    tokenValue = `BEARER ${value}`
    console.log('tokenValue on ApolloClient side (then)= \n', tokenValue)
  }
  ).catch(
    value => {
      tokenValue = `BEARER ${value}`
      console.log('tokenValue on ApolloClient side (catch)= \n', tokenValue)
    }
  )
  if (tokenValue === 'BEARER ' + null) {
    tokenValue = await AsyncStorage.getItem('token')
    AsyncStorage.flushGetRequests()
    console.log('tokenValue on ApolloClient side (tokenValue===null)= \n', tokenValue)
  }
  return await tokenValue
}
// https://media.licdn.com/dms/image/D4D03AQHQIMFq29YR_w/profile-displayphoto-shrink_200_200/0/1674560532914?e=1689811200&v=beta&t=em199B96wPlX0rhAIPNJ9mrn5YU0UcwfSLB9ielQRYY
// FRANCÓ (por ahora no funciona)
// let tokenValue
// export const getValue = async () => {
//   // await AsyncStorage.multiRemove('token')
//   AsyncStorage.flushGetRequests()
//   tokenValue = await AsyncStorage.getItem('token')
//   console.log('tokenValue= \n', tokenValue)
//   if (tokenValue === undefined) {
//     try {
//       const storedToken = await AsyncStorage.getItem('token')
//       tokenValue = `BEARER ${storedToken}`
//     } catch (e) {
//       // no se que se puede hacer aca, asumo que desloguear
//       console.log('No token stored was found')
//     }
//   }
//   console.log('tokenValue from apolloClient side= \n', await tokenValue)
//   return tokenValue
// }

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: await getValue()
    }
  }
})

const createApolloClient = () => {
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })
  return client
}
// const createApolloClient = () => new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// })

export default createApolloClient
