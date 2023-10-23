import {View, Text, Pressable, TextInput} from 'react-native';
import React from 'react';
import ArrowIcon from '../../../components/atoms/Icons/ArrowIcon';
import {ScreenProps} from '../../../types';
import SearchIcon from '../../../components/atoms/Icons/SearchIcon';
import XIcon from '../../../components/atoms/Icons/XIcon';
import {arrDummySearch} from './dummy';

const SearchCourse = ({navigation}: ScreenProps<'SearchCourse'>) => {
  return (
    <View>
      <View className="flex relative">
        <Pressable onPress={() => navigation.goBack()}>
          <XIcon />
        </Pressable>
        <View className="absolute p-5">
          <SearchIcon />
        </View>
        <TextInput
          placeholder="Search"
          className="border px-10 mx-2 rounded-lg my-2"
        />
      </View>
      <View className="flex-row justify-between">
        <Text className="font-bold">Recent:</Text>
        <XIcon />
      </View>
      <View className="flex-row justify-between w-3/4">
        {arrDummySearch.map((list, index) => (
          <View key={index} className="flex-row justify-between">
            <Text>{list}</Text>
            <Pressable>
              <XIcon />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SearchCourse;