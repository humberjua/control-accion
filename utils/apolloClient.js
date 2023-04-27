import { ApolloClient, InMemoryCache } from '@apollo/client'

const createApolloClient = () => new ApolloClient({
  uri: 'http://192.168.100.154:4000',
  cache: new InMemoryCache()
})

export default createApolloClient
