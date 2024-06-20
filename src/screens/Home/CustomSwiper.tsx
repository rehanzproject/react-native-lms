import React from 'react';
import {Text, View, Pressable, Image, StyleSheet} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import StarIcon from '../../components/atoms/Icons/StarIcon';
import {makeRupiahValue} from '../../helper/formatter';
import {IDataCourse} from '../../types';
import {
  widthPercentageToDP as wd,
  heightPercentageToDP as hd,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

const CustomSwiper = ({data, navigation}: IDataCourse) => (
  <View style={styles.container}>
    <SwiperFlatList
      data={data}
      autoplay={true}
      autoplayDelay={5000} // Specify the delay in milliseconds (e.g., 5000 milliseconds = 5 seconds)
      autoplayLoop
      renderItem={({item}) => (
        <Pressable
          onPress={() =>
            navigation.navigate('DetailCourse', {id: item.course_id})
          }
          style={styles.card}>
          <Image
            source={
              item.thumbnail
                ? {
                    uri: item.thumbnail,
                  }
                : require('../../assets/defaultThumbnailCourse.png')
            }
            defaultSource={require('../../assets/defaultThumbnailCourse.png')}
            style={styles.thumbnail}
            resizeMode="contain"
          />
          <Text style={styles.courseName}>{item.name}</Text>
          <View style={styles.courseInfo}>
            <View style={styles.ratingContainer}>
              <StarIcon />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <Text style={styles.priceText}>{makeRupiahValue(item.price)}</Text>
          </View>
        </Pressable>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: wd(40),
    height: wd(40),
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: wd(2),
    padding: wd(2),
  },
  thumbnail: {
    width: '100%',
    height: '50%',
  },
  courseName: {
    fontSize: RFValue(12), // Example using RFValue for responsive font size
    color: 'black',
    fontWeight: 'bold',
    marginTop: hd(1),
  },
  courseInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hd(1),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: RFValue(12), // Example using RFValue for responsive font size

    color: '#0D6EFD',
    marginLeft: wd(1),
  },
  priceText: {
    color: '#0D6EFD',
    fontWeight:'bold',
    fontSize: RFValue(12), // Example using RFValue for responsive font size
  },
});

export default CustomSwiper;
