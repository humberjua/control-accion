import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { TextInput, IconButton } from 'react-native-paper'
import { msginput } from './styles'
import { gql, useMutation } from '@apollo/client'
import { useMe } from '../../hooks/userQH'

const addNewChatM = gql`
mutation AddNewChat($idUser: ID!, $idEmployee: ID!, $firstName: String!, $secondName: String!, $lastName: String!, $secondLastName: String!, $nickName: String!, $email: String!, $phone: String!, $companyName: String!, $idCompanyBusinessUnit: ID!, $companyBusinessUnitDescription: String!, $idCompanySector: ID!, $companySectorDescription: String!, $idcompanyJobRole: ID!, $companyJobRoleDescription: String!, $idUserTo: ID!, $userProfileImage: String!, $chatText: String!, $chatDateTimePost: String!, $idConversation: ID!, $userProfileImageTo: String, $messageRead: Boolean!) {
  addNewChat(idUser: $idUser, idEmployee: $idEmployee, firstName: $firstName, secondName: $secondName, lastName: $lastName, secondLastName: $secondLastName, nickName: $nickName, email: $email, phone: $phone, companyName: $companyName, idCompanyBusinessUnit: $idCompanyBusinessUnit, companyBusinessUnitDescription: $companyBusinessUnitDescription, idCompanySector: $idCompanySector, companySectorDescription: $companySectorDescription, idcompanyJobRole: $idcompanyJobRole, companyJobRoleDescription: $companyJobRoleDescription, idUserTo: $idUserTo, userProfileImage: $userProfileImage, chatText: $chatText, chatDateTimePost: $chatDateTimePost, idConversation: $idConversation, userProfileImageTo: $userProfileImageTo, messageRead: $messageRead) {
    idChat
    idUser
    idEmployee
    firstName
    secondName
    lastName
    secondLastName
    nickName
    email
    phone
    companyName
    idCompanyBusinessUnit
    companyBusinessUnitDescription
    idCompanySector
    companySectorDescription
    idcompanyJobRole
    companyJobRoleDescription
    idUserTo
    userProfileImage
    userProfileImageTo
    chatText
    chatDateTimePost
    idConversation
    messageRead
  }
}

`

const MsgInput = (idUserTo) => {
  const { me } = useMe()
  const [addNewChat] = useMutation(addNewChatM)
  const [msg, setMsg] = useState('')
  // const date = new Date()
  useEffect(() => {
    setMsg(msg)
  }, [msg])
  const handleSendMessage = async () => {
    try {
      await addNewChat(
        {
          variables: {
            idUser: me.idUser,
            idEmployee: me.idEmployee,
            firstName: me.firstName,
            secondName: me.secondName,
            lastName: me.lastName,
            secondLastName: me.secondLastName,
            nickName: me.nickName,
            email: me.email,
            phone: me.phone,
            companyName: me.companyName,
            companyBusinessUnitDescription: me.companyBusinessUnitDescription,
            idCompanySector: me.idCompanySector,
            idCompanyBusinessUnit: me.idCompanyBusinessUnit,
            companySectorDescription: me.companySectorDescription,
            idcompanyJobRole: me.idcompanyJobRole,
            companyJobRoleDescription: me.companyJobRoleDescription,
            idUserTo: idUserTo.idUserTo,
            userProfileImage: me.userProfileImage,
            userProfileImageTo: '',
            chatText: msg,
            chatDateTimePost: new Date(),
            idConversation: '', // Este valor necesita ser actualizado cuando se implemente el sistema de charla entre varias personas
            messageRead: false
          }
        }
      )
      setMsg('')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <View style={msginput.textInputRow}>
      <TextInput
        style={msginput.textInputBox}
        value={msg}
        mode='outlined'
        placeholder='Type a message...'
        multiline
        onChange={val => setMsg(val.nativeEvent.text)}
      />
      <IconButton
        style={msginput.textInputRow}
        icon='send-circle'
        size={50}
        animated
        onPress={() => handleSendMessage()}
      />
    </View>
  )
}

export default MsgInput
