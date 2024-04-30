import React from 'react';
import {Text, View, Pressable, Image} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import StarIcon from '../../components/atoms/Icons/StarIcon';
import {makeRupiahValue} from '../../helper/formatter';
import {IDataCourse} from '../../types';

const CustomSwiper = ({data, navigation}: IDataCourse) => (
  <View className="flex-1">
    <SwiperFlatList
      index={2}
      data={data}
      renderItem={({item}) => (
        <Pressable
          onPress={() => navigation.navigate('DetailCourse')}
          style={{width: 150, height: 150}}
          className="border border-black rounded-lg mr-2 p-1">
          <Image
            source={require('../../assets/courselong.png')}
            style={{width: '100%', height: '50%'}}
            resizeMode="contain"
          />
          <Text className="text-black text-lg font-bold">{item.name}</Text>
          <View className="flex flex-row justify-between">
            <View className="flex flex-row pt-4">
              <StarIcon />
              <Text className="text-primary-50 pt-1">{item.rating}</Text>
            </View>
            <Text className="text-black pt-5">
              {makeRupiahValue(item.price)}
            </Text>
          </View>
        </Pressable>
      )}
    />
  </View>
);

export default CustomSwiper;
