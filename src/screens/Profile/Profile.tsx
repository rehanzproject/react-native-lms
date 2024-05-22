import React, { useEffect } from 'react';
import {Text, Image, TouchableOpacity, View} from 'react-native';
import {ScreenProps} from '../../types';
import {arrayList} from './constant';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import { useDispatch } from 'react-redux';
import sessionSlice from '../../redux/SessionSlice/SessionSlice';

function Profile({route, navigation}: ScreenProps<'Profile'>) {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(sessionSlice.actions.removeToken())
    navigation.navigate('Login')
  }
  const handleClicks= (list: any)=>{
    navigation.navigate(list.route)
  }
  
  return (
    <View className='flex-1'>
      <CustomRoute onPress={() => navigation.goBack()} text={route.name} />
      <View className="flex items-center ">
        <Image
          source={require('../../assets/photo.png')}
          className="flex justify-center items-center"
        />
        <Text className="font-bold text-lg text-black">Chandra Lion</Text>
        {arrayList.map((list) => (
          <View key={list.name} className="flex justify-center w-3/4">
            <TouchableOpacity
              accessibilityRole="link"
              className={`gap-2 border rounded-lg flex justify-center my-1 ${
                list.route === 'Logout' && 'bg-danger-50'
              }`}
              onPress={() => list.route !== 'Logout' ? handleClicks(list) : handleLogout() }>
              <View className="flex-1">{list.icon}</View>
              <Text
                className={`${
                  list.name === 'Logout' ? 'text-white' : 'text-primary-50'
                } px-8 pb-2`}>
                {' '}
                {list.name}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

export default Profile;
