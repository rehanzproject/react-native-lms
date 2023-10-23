import {View, Text, Pressable, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import {ScreenProps} from '../../types';
import {dummyCourseProgress} from './dummy';

export default function CompleteCourse({navigation, route}: ScreenProps<'CompleteCourse'>) {
  return (
    <View className='p-4'>
      <CustomRoute onPress={() => navigation.goBack()} text="My Course" />
      <View className='flex-row justify-evenly'>
      <Pressable onPress={() => navigation.navigate('MyCourse')}>
        <Text className="">On Progress</Text>
      </Pressable>
      <Pressable className='border-b text-primary-50 border-primary-50' onPress={() => navigation.navigate('CompleteCourse')}>
        <Text className='text-primary-50'>Complete</Text>
      </Pressable>
      </View>
     
      <View>
        {dummyCourseProgress.map((list) => (
          <View key={list.name} className='flex flex-row border rounded-lg my-2'>
            <Image
              source={require('../../assets/course.png')}
              className="object-cover object-center w-20 h-20 rounded-md m-2 aspect-auto"
            />
            <View className="flex flex-col">
              <Text className="text-xs text-black font-bold">{list.name}</Text>
             <View className='flex-row pt-4 justify-between'>
              <Text className="text-xs text-black">{list.total} / {list.total} lessons</Text>
              <Text className='text-xs font-bold text-black'>Completed</Text>
             </View>
             <Pressable className='bg-primary-50 rounded-lg'>
              <Text className='text-center text-xs text-white'>Get Certificate</Text>
             </Pressable>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
