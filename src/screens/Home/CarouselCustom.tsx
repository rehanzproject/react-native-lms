import * as React from 'react';
import {Dimensions, Image, Pressable, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {IDataCourse} from '../../types';
import {makeRupiahValue} from '../../helper/formatter';
import StarIcon from '../../components/atoms/Icons/StarIcon';
function CarouselCustom({data ,navigation}: IDataCourse) {
  const width = Dimensions.get('window').width;
  return (
    <View style={{flex: 1}}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={5000}
        // onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({item}) => (
          <Pressable
          onPress={()=>navigation.navigate('DetailCourse')}
            style={{width: 150, height: 150}}
            className="border border-black rounded-lg">
            <Image
              source={require('../../assets/courselong.png')}
              style={{width: '100%', height: '50%'}}
              resizeMode="contain"
            />
            <Text className="text-black text-lg font-bold">{item.name}</Text>
            <View className="flex flex-row justify-between">
              <View className='flex flex-row pt-4'>
                <StarIcon />
              <Text className="text-primary-50 pt-1">{item.rating}</Text>
              </View>
              <Text className="text-black pt-5">{makeRupiahValue(item.price)}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

export default CarouselCustom;
