import { Image } from 'react-native'

export const Logo = () => {
  return (
    <>
      <Image
        source='../images/logo.png'
        style={{
          width: 40,
          height: 40
        }}
      />
    </>
  )
}
