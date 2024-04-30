import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {ScreenProps} from '../../../types';
import CustomRoute from '../../../components/atoms/CustomRoute/CustomRoute.atom';
import {dummyArray} from './constant';
import StarIcon from '../../../components/atoms/Icons/StarIcon';
import SearchIcon from '../../../components/atoms/Icons/SearchIcon';
import {makeRupiahValue} from '../../../helper/formatter';

const AllCourse = ({navigation, route}: ScreenProps<'AllCourse'>) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View className="">
        <CustomRoute onPress={() => navigation.goBack()} text="Category" />
        <View className="flex relative">
          <View className="absolute p-5">
            <SearchIcon />
          </View>
          <TextInput
            placeholder={route.params?.search}
            className="border text-black px-10 mx-2 rounded-lg my-2 "
            placeholderTextColor={'gray'}
          />
        </View>

        <View className="flex flex-row flex-wrap">
          {dummyArray.map((list) => (
            <TouchableOpacity
              key={list.name}
              onPress={() => navigation.navigate('DetailCourse', {id: ''})}
              className="shadow-md rounded-xl grid grid-cols-2 m-2 mx-4 border-secondary-50/50 border">
              <Image
                source={list.image}
                className="w-full"
                resizeMode="stretch"
              />
              <Text className="text-black text-base pl-1 font-bold">{list.name}</Text>
              <View className="flex flex-row justify-between pt-5">
                <View className="flex flex-row">
                  <StarIcon />
                  <Text className="text-black pt-1 text-sm">
                    {' '}
                    {list.rating}
                  </Text>
                </View>
                <Text className="text-primary-50 text-base font-bold px-2">
                  {makeRupiahValue(list.price)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default AllCourse;
