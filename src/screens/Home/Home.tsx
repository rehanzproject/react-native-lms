import * as React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScreenProps} from '../../types';
import {makeRupiahValue} from '../../helper/formatter';
import {arrDummyHome} from './constant';
import CarouselCustom from './CarouselCustom';
import BellIcon from '../../components/atoms/Icons/BellIcon';
import SearchIcon from '../../components/atoms/Icons/SearchIcon';
function Home({route, navigation}: ScreenProps<'Home'>) {
  const width = Dimensions.get('window').width;
  return (
    <View className="flex-1 p-4">
      <View className="flex flex-row justify-between">
        <View className="flex flex-row">
          <Image
            source={require('../../assets/photo.png')}
            className="flex w-12 h-12"
          />
          <Text className="text-base text-black font-bold pt-4">
            Welcome , Chandra
          </Text>
        </View>
      </View>
      <View className="flex flex-row items-center pt-10">
        <View className='pb-8 pl-2'>

        <SearchIcon />
        </View>
        <TextInput
         
          placeholder='Search'
          placeholderTextColor={'gray'}
          className="border rounded-lg w-3/4 text-black absolute py-1 px-8"
        />

      </View>
      
      <View className="block flex-row justify-between">
          <Text className="text-black font-bold text-lg">Popular Course</Text>
          <Text className="text-primary-50">See All</Text>
        </View>
        <CarouselCustom data={arrDummyHome} navigation={navigation} />
    </View>
  );
}

export default Home;
