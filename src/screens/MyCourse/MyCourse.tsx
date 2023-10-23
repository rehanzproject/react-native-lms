import {View, Text, Pressable, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import {ScreenProps} from '../../types';
import {dummyCourseProgress} from './dummy';

export default function MyCourse({navigation, route}: ScreenProps<'MyCourse'>) {
  return (
    <View className='p-4'>
      <CustomRoute onPress={() => navigation.goBack()} text="My Course" />
     <View className='flex-row justify-evenly '>
     <Pressable onPress={() => navigation.navigate('MyCourse')}>
        <Text className="border-b text-primary-50 border-primary-50">On Progress</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('CompleteCourse')}>
        <Text>Complete</Text>
      </Pressable>
     </View>
     
      <View>
        {dummyCourseProgress.map((list) => (
          <TouchableOpacity key={list.name} className='flex flex-row border rounded-lg my-2 '>
            <Image
              source={require('../../assets/course.png')}
              className="object-cover object-center w-20 h-20 rounded-md m-2 aspect-auto"
            />
            <View className="flex flex-col">
              <Text className="text-xs text-black font-bold">{list.name}</Text>
              <Text>{list.completed} / {list.total} Lessons</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
