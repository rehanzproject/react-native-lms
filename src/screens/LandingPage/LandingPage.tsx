import React, {useRef} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
import CustomButton from '../../components/atoms/CustomButton/CustomButton.atom';
import {ScreenProps} from '../../types';

const {width} = Dimensions.get('window');
function LandingPage({navigation}: ScreenProps<'LandingPage'>) {
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToNextPage = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: width,
        y: 0,
        animated: true,
      });
    }
  };

  return (
    <GestureHandlerRootView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}>
        <View style={{width: width}}>
          <Image source={require('../../assets/image2.png')} />
          <Text className="text-center font-bold text-black">
            Grow your skill & push your limit
          </Text>
          <CustomButton onPress={scrollToNextPage}>Next</CustomButton>
        </View>
        <View style={{width: width}}>
          <Image source={require('../../assets/image3.png')} />
          <Text className="text-center font-bold text-black">
            Study from anywhere with experts
          </Text>
          <CustomButton onPress={scrollToNextPage}>Next</CustomButton>
        </View>
        <View style={{width: width}}>
          <Image source={require('../../assets/image4.png')} />
          <Text className="text-center font-bold text-black">
            Get access to unlimited educational resources
          </Text>
          <CustomButton onPress={scrollToNextPage}>Next</CustomButton>
        </View>
        <View style={{width: width}}>
          <Image source={require('../../assets/image5.png')} />

          <Text className="text-center font-bold text-black">
            Find the best courses & upgrade your skills, start learn now with
          </Text>
          <View className="absolute bottom-8 gap-2 w-72 mx-4">
            <Pressable
              className="border rounded-lg bg-primary-50"
              onPress={() => navigation.navigate('Login')}>
              <Text className="text-center text-white">Login</Text>
            </Pressable>
            <Pressable
              className="border rounded-lg"
              onPress={() => navigation.navigate('Register')}>
              <Text className="text-center text-primary-50 ">Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

export default LandingPage;
