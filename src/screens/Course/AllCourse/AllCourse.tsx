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

const AllCourse = ({navigation, route}: ScreenProps<'AllCourse'>) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View className="">
        <CustomRoute onPress={() => navigation.goBack()} text="Category" />
        <View className="flex relative">
        <View className='absolute p-5'>
          <SearchIcon />
        </View>
          <TextInput
            placeholder="Search"
            className="border px-10 mx-2 rounded-lg my-2"
          />
        </View>

        <View className="flex flex-row flex-wrap">
          {dummyArray.map((list) => (
            <TouchableOpacity
              key={list.name}
              onPress={() => navigation.navigate('DetailCourse', {id: ''})}
              className="shadow-sm rounded-xl grid grid-cols-2 w-1/2 gap-1 px-2">
              <Image source={require('../../../assets/course.png')} />
              <Text className="text-black">{list.name}</Text>
              <View className="flex flex-row justify-between">
                <View className='flex flex-row'>
                  <StarIcon />
                  <Text>{list.rating}</Text>
                </View>
                <Text className="text-primary-50 ">{list.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default AllCourse;
