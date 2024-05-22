import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import {ScreenProps} from '../../types';
import {dummy} from './dummy';
const FinalTask = ({route, navigation}: ScreenProps<'FinalTask'>) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, padding: 10}}>
      <CustomRoute onPress={() => navigation.goBack()} text="Final Task" />
      <Text className="text-black font-bold text-sm">Description</Text>
      <Text className="text-xs text-black">{dummy.description}</Text>
      <View className="absolute bottom-2 right-0 left-0 justify-center items-center rounded-md flex flex-row">
        <View className='bg-light-70 pr-32 pl-2 my-2 py-1 rounded-md'>
          <Text className='text-black font-extrabold text-xl'>Score: 0</Text>

        </View>
        <Pressable onPress={()=>navigation.navigate('Quiz')} className='bg-primary-50 px-10 py-1 rounded-md'>
          <Text className='text-white text-xl'>Take Quiz</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default FinalTask;
