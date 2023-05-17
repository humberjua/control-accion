import { gql, useMutation } from '@apollo/client'
// import { Platform } from 'react-native'

const gqlLoginM = gql`
mutation Login($userName: String!, $password: String!, $userPlatform: String!) {
  login(userName: $userName, password: $password, userPlatform: $userPlatform) {
    value
  }
}

`

export const useLogin = async (userData) => {
  console.info('inside useLogin')
  const { login } = useMutation(gqlLoginM)
  try {
    await login({
      variables:
      {
        userName: userData.userName,
        password: userData.password
      }
    })
    const result = await login.data.map(el => el)
    return { result }
  } catch (error) {
    console.error(error.messsage)
  }
}
