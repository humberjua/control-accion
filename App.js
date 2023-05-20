import { ApolloProvider } from '@apollo/client'
import createApolloClient from './utils/apolloClient.js'
import { DataProvider } from './context/DataContext.js'
import { FirstScreen } from './screens/firstScreen.js'

const apolloClient = createApolloClient()

export default function App () {
  return (
    <DataProvider>
      <ApolloProvider client={apolloClient}>
        <FirstScreen />
      </ApolloProvider>
    </DataProvider>
  )
}
