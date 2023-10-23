import {View, Text, Image, Pressable, ScrollView} from 'react-native';
import React from 'react';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import {ScreenProps} from '../../types';
import {dummy} from './dummy';
import Video from 'react-native-video';
const Lesson = ({route, navigation}: ScreenProps<'Lesson'>) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <CustomRoute onPress={() => navigation.goBack()} text="Course Detail" />
      <Video
        source={{uri: '../../assets/video.mp4'}}
        ref={(ref) => {
          // this.player = ref;
        }}
        controls
        resizeMode='cover'
        // onBuffer={this.onBuffer}
        // onError={videoError}
      />

      <Text className="text-black font-bold">{dummy.name}</Text>
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

export default Lesson;
