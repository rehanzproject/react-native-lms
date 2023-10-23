import { View, Text, Image } from 'react-native'
import React from 'react'

export default function NotFound() {
  return (
    <View className='flex justify-center items-center'>
        <Image source={require('../../assets/404_picture.jpg')} />
      <Text>NotFound</Text>
    </View>
  )
}