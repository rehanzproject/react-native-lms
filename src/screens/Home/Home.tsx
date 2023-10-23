import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { ScreenProps } from '../../types'
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom'

const Home = ({navigation, route}:ScreenProps<'Home'>) => {
  return (
    <View>
      <Pressable onPress={()=>navigation.navigate('AllCourse') }>
        <Text>Halo</Text>
        </Pressable>   
      <Text>Home</Text>

    </View>
  )
}

export default Home