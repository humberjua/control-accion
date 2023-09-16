import React from 'react'
import { Searchbar } from 'react-native-paper'

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = React.useState('')

  const onChangeSearch = query => setSearchQuery(query)

  return (
    <Searchbar
      placeholder='Search...'
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={{ margin: 20 }}
    />
  )
}

export default UserSearch
