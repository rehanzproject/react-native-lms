import * as React from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {ScreenProps} from '../../types';
import SearchIcon from '../../components/atoms/Icons/SearchIcon';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import XIcon from '../../components/atoms/Icons/XIcon';
function Search({route, navigation}: ScreenProps<'Search'>) {
  const example = [
    'Ui Design',
    'Wireframe',
    'Prototyping',
    'Design System',
    'Design System',
    'Design System',
    'Design System',
  ];
  return (
    <View className="flex-1">
      <View className="flex flex-row">
        <CustomRoute onPress={() => navigation.goBack()} />
        <View className="flex flex-row items-center pt-10">
          <View className="pt-10 pl-2 absolute">
            <SearchIcon />
          </View>
          <TextInput
            placeholder="Search"
            placeholderTextColor={'gray'}
            className="border rounded-lg w-80 text-black pl-8"
            onEndEditing={(event) => {
              navigation.navigate('AllCourse', {
                search: event.nativeEvent.text,
              });
            }}
          />
          <View className="absolute right-8 pt-8">
            <XIcon />
          </View>
        </View>
      </View>

      <View className="flex flex-row justify-between mx-8 pt-5 border-b ">
        <Text className="text-black font-bold text-xl">Recent:</Text>
        <XIcon />
      </View>
      <View className=" ">
        {example.map((item, index) => (
          <View
            key={index}
            className="flex flex-row justify-between mx-8 pt-5 ">
            <Pressable
              onPress={() => navigation.navigate('AllCourse', {search: item})}>
              <Text className="text-black text-xl">{item}</Text>
            </Pressable>
            <Pressable>
              <XIcon />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

export default Search;
