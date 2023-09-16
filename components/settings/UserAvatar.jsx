import { useEffect, useState } from 'react'
// import { gql, useMutation } from '@apollo/client'
import { useMe } from '../../hooks/userQH.jsx'
import { View, Alert } from 'react-native'
import { Avatar, Text, IconButton } from 'react-native-paper'
import { styles } from './styles.js'
import * as ImagePicker from 'expo-image-picker'
// import CustomActivityIndicator from '../components/CustomActivityIndicator.js'

const UserAvatar = () => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [image, setImage] = useState(null)
  const { me } = useMe()

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasGalleryPermission(galleryStatus.status === 'granted')
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync()
      setHasCameraPermission(cameraStatus.status === 'granted')
    })()
    if (me && me !== 'Loading...') {
      setImage(me.userProfileImage)
    }
  }, [])

  const handleChangeImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })
    // console.log(result)
    try {
      if (!result.canceled && hasGalleryPermission) {
        setImage(result.assets[0].uri)
      }
    } catch (error) {
      console.info(error)
    }
  }
  const handleChangeImageFromCamera = async () => {
    const result2 = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })
    // console.log(result2)

    if (!result2.canceled && hasCameraPermission) {
      try {
        setImage(result2.assets[0].uri)
      } catch (error) {
        console.info(error)
      }
    }
  }
  // console.info(me)
  return (
    <View>
      <View style={styles.centered}>
        <View style={styles.centered}>

          {
            image !== null
              ? <Avatar.Image size={72} source={{ uri: image }} style={{ margin: 2 }} />
              : (
                <Avatar.Icon size={72} icon='account-circle-outline' style={{ margin: 2 }} />
                )
          }
          <IconButton
            icon='pencil'
            size={30}
            style={{ marginTop: -45, marginLeft: 65, backfaceVisibility: 'hidden' }}
            onPress={handleChangeImageFromGallery}
            onLongPress={() => {
              Alert.alert('', 'Select an option:', [
                {
                  text: 'Internal Storage',
                  onPress: handleChangeImageFromGallery
                },
                {
                  text: 'Camera',
                  onPress: handleChangeImageFromCamera
                },
                {
                  text: 'Cancel',
                  // onPress: () => Alert.alert('Operation Aborted'),
                  style: 'cancel'
                }
              ])
            }}
          />

        </View>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text variant='headlineSmall' style={{ textAlignVertical: 'center', textAlign: 'center', marginTop: 15 }}> {me.fullName} </Text>
      </View>
    </View>
  )
}

export default UserAvatar
