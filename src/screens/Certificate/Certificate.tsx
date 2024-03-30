import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import {ScreenProps} from '../../types';
import {arrDummyCertificate} from './constant';

const Certificate = ({navigation}: ScreenProps<'Certificate'>) => {
  return (
    <View>
      <CustomRoute onPress={() => navigation.goBack()} text="My Certificate" />
      {arrDummyCertificate.map((list) => (
        <View
          key={list.name}
          className="m-5 border rounded-lg flex flex-row items-center">
          <Image
            source={require('../../assets/course.png')}
            className="object-cover object-center w-20 h-20 rounded-md m-2  aspect-auto"
          />
          <View className="flex">
            <View className=' flex flex-row justify-between'>

            <Text className="text-xs text-black font-bold">{list.name}</Text>
            <Text className="text-success-50">Completed</Text>
            </View>
            <View className='flex justify-center items-center p-2'>
              <Pressable className="bg-primary-50 rounded-lg">
                <Text className="text-white text-center">See Certificate</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Certificate;
