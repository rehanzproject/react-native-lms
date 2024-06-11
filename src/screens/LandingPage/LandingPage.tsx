import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable} from 'react-native';
import {Text, Dimensions, StyleSheet, View, Image} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {ScreenProps} from '../../types';
import { useWindowDimensions } from 'react-native';
const arrLanding = [
  {
    image: require('../../assets/image2.png'),
    text: 'Grow your skill & push your limit',
  },
  {
    image: require('../../assets/image3.png'),
    text: 'Study from anywhere with experts',
  },
  {
    image: require('../../assets/image4.png'),
    text: 'Get access to unlimited educational resources ',
  },
  {
    image: '',
    text: '',
  },
];
const LandingPage = ({navigation}: ScreenProps<'LandingPage'>) => {
  const deviceWidth = useWindowDimensions().width
  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay
        autoplayDelay={5}
        showPagination
        data={arrLanding}
        paginationStyleItemActive={styles.rounded}
        paginationActiveColor="#0D6EFD"
        renderItem={({item, index}) => {
          if (index === 3) {
            return (
              <View style={styles.child}>
                <Image
                  source={require('../../assets/image5.png')}
                  style={styles.imageContainer}
                  resizeMode="contain"
                />
                <Text style={styles.text}>
                  Find the best courses & upgrade your skills, start learn now
                  with
                </Text>
                <Pressable
              onPress={() => navigation.navigate('Login')}
              className="rounded-lg border border-primary-50 bg-primary-50 m-4 py-2 absolute bottom-20 w-full">
              <Text className="text-center text-white">Login</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Register')}
              className="absolute bottom-5 rounded-lg border border-primary-50 m-4 py-2 w-full">
              <Text className="text-center text-primary-50">Sign Up</Text>
            </Pressable>
          </View>
            );
          } else {
            return (
              <View style={styles.child}>
                <Image
                  source={item.image}
                  style={styles.imageContainer}
                  resizeMode="contain"
                />
                <Text style={styles.text}>{item.text}</Text>
              </View>
            );
          }
        }}
      />
    </View>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  child: {width, justifyContent: 'center'},
  rounded: {width: 30},
  imageContainer: {
    width: '75%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: 'black',
  },
});

export default LandingPage;
