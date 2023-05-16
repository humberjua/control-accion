// import React, { useState } from 'react'
// import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome'

// const FloatingButton = () => {
//   const [firstIcon] = useState(new Animated.Value(40))
//   const [secondIcon] = useState(new Animated.Value(40))
//   const [thirdIcon] = useState(new Animated.Value(40))

//   const [pop, setPop] = useState(false)

//   const popIn = () => {
//     setPop(true)
//     Animated.timing(firstIcon, {
//       toValue: 130,
//       duration: 500,
//       useNativeDriver: false
//     }).start()
//     Animated.timing(secondIcon, {
//       toValue: 110,
//       duration: 500,
//       useNativeDriver: false
//     }).start()
//     Animated.timing(thirdIcon, {
//       toValue: 130,
//       duration: 500,
//       useNativeDriver: false
//     }).start()
//   }

//   const popOut = () => {
//     setPop(false)
//     Animated.timing(firstIcon, {
//       toValue: 40,
//       duration: 500,
//       useNativeDriver: false
//     }).start()
//     Animated.timing(secondIcon, {
//       toValue: 40,
//       duration: 500,
//       useNativeDriver: false
//     }).start()
//     Animated.timing(thirdIcon, {
//       toValue: 40,
//       duration: 500,
//       useNativeDriver: false
//     }).start()
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <Animated.View style={[styles.circle, { bottom: firstIcon }]}>
//         <TouchableOpacity>
//           <Icon name='cloud-upload' size={25} color='#FFFF' />
//         </TouchableOpacity>
//       </Animated.View>
//       <Animated.View style={[styles.circle, { bottom: secondIcon, right: secondIcon }]}>
//         <TouchableOpacity onPress={() => console.log('Impresora Boton')}>
//           <Icon name='print' size={25} color='#FFFF' />
//         </TouchableOpacity>
//       </Animated.View>
//       <Animated.View style={[styles.circle, { right: thirdIcon }]}>
//         <TouchableOpacity>
//           <Icon name='share-alt' size={25} color='#FFFF' />
//         </TouchableOpacity>
//       </Animated.View>
//       <TouchableOpacity
//         style={styles.circle}
//         onPress={() => {
//           pop === false ? popIn() : popOut()
//         }}
//       >
//         <Icon name='plus' size={25} color='#FFFF' />
//       </TouchableOpacity>
//     </View>
//   )
// }

// export default FloatingButton

// const styles = StyleSheet.create({
//   circle: {
//     backgroundColor: '#f52d56',
//     width: 60,
//     height: 60,
//     position: 'absolute',
//     margin: 30,
//     marginBottom: 105,
//     right: 0,
//     bottom: 0,
//     borderRadius: 50,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// })
