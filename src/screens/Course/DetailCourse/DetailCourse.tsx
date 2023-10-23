import {View, Text, Image, Pressable, ScrollView} from 'react-native';
import React from 'react';
import {ScreenProps} from '../../../types';
import CustomRoute from '../../../components/atoms/CustomRoute/CustomRoute.atom';
import {dummy} from './constant';
import StarIcon from '../../../components/atoms/Icons/StarIcon';
import {makeRupiahValue} from '../../../helper/formatter';

const DetailCourse = ({route, navigation}: ScreenProps<'DetailCourse'>) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <CustomRoute onPress={() => navigation.goBack()} text="Course Detail" />
      <Image source={require('../../../assets/courselong.png')} />
      <Text className="text-black font-bold">{dummy.name}</Text>
      <View className="flex flex-row justify-between">
        <View className="flex-row">
          <StarIcon />
          <Text>{dummy.rating}</Text>
        </View>
        <Text className="text-primary-50">{makeRupiahValue(dummy.price)}</Text>
      </View>
      <View className="flex flex-row justify-between gap-2 px-2 mr-2">
        <Pressable
          onPress={() => navigation.navigate('DetailCourse')}
          className={`rounded-lg border border-primary-50 w-1/2 ${
            route.name === 'DetailCourse' ? 'bg-primary-50' : ''
          }`}>
          <Text
            className={`text-center ${
              route.name === 'DetailCourse' ? 'text-white' : 'text-primary-50'
            }`}>
            Overview
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('DetailLesson')}
          className={`rounded-lg w-1/2 border border-primary-50 ${
            route.name !== 'DetailCourse' ? 'bg-primary-50' : ''
          }`}>
          <Text
            className={`text-center  ${
              route.name !== 'DetailCourse' ? 'text-white' : 'text-primary-50'
            }`}>
            Lessons
          </Text>
        </Pressable>
      </View>
      <Text className="text-black font-bold text-sm">Description</Text>
      <Text className="text-xs text-black">{dummy.description}</Text>
      <View className="fixed bottom-4 w-full px-4">
        <Pressable
          onPress={() =>
            navigation.navigate('BuyCourse', {
              id: '',
              coupon: 'LETSROCK',
              price: 200000,
            })
          }
          className=" bg-primary-50 rounded-lg">
          <Text className="text-center text-white">Buy Now</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default DetailCourse;
