import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  ProgressBarAndroidBase,
} from 'react-native';
import React from 'react';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import {ScreenProps} from '../../types';
import {dummyCourseProgress} from './dummy';
import * as Progress from 'react-native-progress';

export default function MyCourse({navigation, route}: ScreenProps<'MyCourse'>) {
  return (
    <View className="p-4 ">
      <CustomRoute onPress={() => navigation.goBack()} text="My Course" />
      <View className="flex-row justify-evenly ">
        <Pressable onPress={() => navigation.navigate('MyCourse')}>
          <Text className="border-b text-primary-50 border-primary-50">
            On Progress
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('CompleteCourse')}>
          <Text className="text-black">Complete</Text>
        </Pressable>
      </View>

      <View>
        {dummyCourseProgress.map((list) => (
          <TouchableOpacity
            key={list.name}
            className="flex flex-row border rounded-lg my-2 ">
            <Image
              source={require('../../assets/course.png')}
              className="object-cover object-center w-20 h-20 rounded-md m-2 aspect-auto"
            />
            <View className="flex flex-col gap-3">
              <Text className="text-base text-black font-bold pt-2">
                {list.name}
              </Text>
              <Text className="text-black">
                {list.completed} / {list.total} Lessons
              </Text>
              <Progress.Bar
                progress={0.9}
                width={200}
                height={15}
                color='rgb(0,112,255)'
                animated
                borderWidth={0}
                unfilledColor="rgb(217,217,217)"
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
