import { StyleSheet } from 'react-native'

const chatlist = StyleSheet.create({
  chatListRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  chatListContent: {
    flexDirection: 'row',
    width: 220
  }
})

const msginput = StyleSheet.create({
  textInputRow: {
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  textInputBox: {
    width: '80%',
    marginLeft: '2%'
  }
})

const msgbubble = StyleSheet.create({
  container: {
    maxWidth: '80%',
    borderRadius: 8,
    padding: 6,
    height: 'auto',
    marginVertical: 5,
    flexDirection: 'row'
  },
  senderContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#CCE8E7',
    flexWrap: 'wrap'
  },
  receiverContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E6F1F0',
    flexWrap: 'wrap'
  },
  message: {
    fontSize: 18,
    color: '#000000',
    flexShrink: 1
    // El flexShrink me cuelga todo a la tobas
  },
  timeSenderMessage: {
    textAlign: 'right',
    fontSize: 11,
    fontStyle: 'italic'
  },
  senderMessage: {
    textAlign: 'right'
  },
  receiverMessage: {
    textAlign: 'left'
  },
  timeReceiveMessage: {
    textAlign: 'left',
    fontSize: 11,
    fontStyle: 'italic'
  }
})

export { chatlist, msginput, msgbubble }
