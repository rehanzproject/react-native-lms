import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, useWindowDimensions} from 'react-native';
import {Text, Dimensions, StyleSheet, View, Image} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {ScreenProps} from '../../types';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
  const deviceWidth = useWindowDimensions().width;
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
                  style={[styles.button, styles.loginButton]}>
                  <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate('Register')}
                  style={[styles.button, styles.signUpButton]}>
                  <Text style={[styles.buttonText, styles.signUpButtonText]}>Sign Up</Text>
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
  child: {width, justifyContent: 'center', alignItems: 'center'},
  rounded: {width: 30},
  imageContainer: {
    width: wp('75%'),
    height: hp('50%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: wp('4%'),
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: 'black',
    marginVertical: hp('2%'),
  },
  button: {
    width: wp('80%'),
    paddingVertical: hp('1.5%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginVertical: hp('1%'),
  },
  loginButton: {
    backgroundColor: '#0D6EFD',
    borderColor: '#0D6EFD',
  },
  signUpButton: {
    borderColor: '#0D6EFD',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: wp('4%'),
    textAlign: 'center',
  },
  signUpButtonText: {
    color: '#0D6EFD',
  },
});

export default LandingPage;
