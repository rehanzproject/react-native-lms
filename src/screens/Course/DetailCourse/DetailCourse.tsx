import {View, Text, Image, Pressable, ScrollView} from 'react-native';
import React from 'react';
import {ScreenProps} from '../../../types';
import CustomRoute from '../../../components/atoms/CustomRoute/CustomRoute.atom';
import {dummy} from './constant';
import StarIcon from '../../../components/atoms/Icons/StarIcon';
import {makeRupiahValue} from '../../../helper/formatter';
import * as Progress from 'react-native-progress';

const DetailCourse = ({route, navigation}: ScreenProps<'DetailCourse'>) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} className="p-5">
      <CustomRoute onPress={() => navigation.goBack()} text="Course Detail" />
      <Image
        source={require('../../../assets/courselong.png')}
        className="w-full rounded-xl"
      />
      <Text className="text-black font-bold text-xl pt-4">{dummy.name}</Text>
      <View className="flex flex-row justify-between">
        <View className="flex-row">
          <StarIcon />
          <Text className="text-black text-lg">{dummy.rating}</Text>
        </View>
        <Text className="text-primary-50 font-bold text-lg">
          {makeRupiahValue(dummy.price)}
        </Text>
      </View>
      <View className="flex flex-row justify-between gap-2 pt-4 px-2 mr-2">
        <Pressable
          onPress={() => navigation.navigate('DetailCourse')}
          className={`rounded-lg border border-primary-50 w-1/2 ${
            route.name === 'DetailCourse' ? 'bg-primary-50' : ''
          }`}>
          <Text
            className={`text-center p-2 ${
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
            className={`text-center p-2 ${
              route.name !== 'DetailCourse' ? 'text-white' : 'text-primary-50'
            }`}>
            Lessons
          </Text>
        </Pressable>
      </View>
      <Text className="text-black font-bold text-lg">Description</Text>
      <Text className="text-black">{dummy.description}</Text>
      <View className="flex-1">
        <Text className="text-black font-bold text-lg pt-2">Reviews</Text>
        <Text className="text-black font-extrabold text-4xl">4,5</Text>
        <View className="absolute right-12 py-5">
          {[5, 4, 3, 2, 1].map((item, i) => (
            <View key={i} className='flex-1 flex-row gap-2 py-1'>
              <Text className="text-black">{item}</Text>
              <Progress.Bar
                progress={0.9}
                width={200}
                height={18}
                color="rgb(0,112,255)"
                animated
                borderWidth={0}
                unfilledColor="rgb(217,217,217)"
                
              />
            </View>
          ))}
        </View>
      </View>

      <View className="absolute bottom-0 w-full">
        <Pressable
          onPress={() =>
            navigation.navigate('BuyCourse', {
              id: '',
              coupon: 'LETSROCK',
              price: dummy.price,
            })
          }
          className=" bg-primary-50 rounded-lg">
          <Text className="text-center p-2 text-white">Buy Now</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default DetailCourse;
