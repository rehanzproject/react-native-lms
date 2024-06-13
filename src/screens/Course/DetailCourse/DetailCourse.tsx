import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { Course, ScreenProps } from '../../../types';
import CustomRoute from '../../../components/atoms/CustomRoute/CustomRoute.atom';
import StarIcon from '../../../components/atoms/Icons/StarIcon';
import { makeRupiahValue } from '../../../helper/formatter';
import * as Progress from 'react-native-progress';
import { useFocusEffect } from '@react-navigation/native';
import { useHTTP } from '../../../hooks/useHTTP';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useToken } from '../../../redux/SessionSlice/useSessionSelector';

const DetailCourse = ({ route, navigation }: ScreenProps<'DetailCourse'>) => {
  const token = useToken();
  const { getRequest, postRequest } = useHTTP(token);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Course>();

  const onConfirm = async () => {
    try {
      const result = await postRequest(`/user/checkout?id=${route.params?.id}`);
      if (!result?.data) {
        ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
      }

      navigation.navigate('BuyCourse', {
        id: result?.data?.id ?? '',
        coupon: data?.coupon ?? '',
        price: data?.price ?? 0,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getCourse();
    }, []),
  );

  const getCourse = async () => {
    try {
      const result = await getRequest(
        `/user/course/modules?id=${route.params?.id}`,
      );
      if (!result?.data) {
        ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
      }
      setData(result?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to prepare the ratings data
  const prepareRatingsData = () => {
    const totalRatings = (data?.rating1 ?? 0) + (data?.rating2 ?? 0) + (data?.rating3 ?? 0) + (data?.rating4 ?? 0) + (data?.rating5 ?? 0);
    const ratings = [
      { no: 5, rating: data?.rating5 ?? 0 },
      { no: 4, rating: data?.rating4 ?? 0 },
      { no: 3, rating: data?.rating3 ?? 0 },
      { no: 2, rating: data?.rating2 ?? 0 },
      { no: 1, rating: data?.rating1 ?? 0 },
    ];
    return ratings.map(r => ({ ...r, progress: totalRatings > 0 ? r.rating / totalRatings : 0 }));
  };

  const ratingsData = prepareRatingsData();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <CustomRoute onPress={() => navigation.goBack()} text="Course Detail" />
        <Image
          source={{ uri: data?.thumbnail }}
          style={styles.thumbnail}
        />
        <Text style={styles.courseName}>
          {data?.name}
        </Text>
        <View style={styles.ratingPriceContainer}>
          <View style={styles.ratingContainer}>
            <StarIcon />
            <Text style={styles.ratingText}>
              {data?.rating ?? 'Belum ada rating'}
            </Text>
          </View>
          <Text style={styles.priceText}>
            {makeRupiahValue(data?.price ?? 0)}
          </Text>
        </View>
        <View style={styles.tabContainer}>
          <Pressable
            onPress={() =>
              navigation.navigate('DetailCourse', { id: route.params?.id || '' })
            }
            style={[
              styles.tab,
              route.name === 'DetailCourse' && styles.activeTab,
            ]}>
            <Text style={[
              styles.tabText,
              route.name === 'DetailCourse' && styles.activeTabText,
            ]}>
              Overview
            </Text>
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate('DetailLesson', { id: route.params?.id || '' })
            }
            style={[
              styles.tab,
              route.name !== 'DetailCourse' && styles.activeTab,
            ]}>
            <Text style={[
              styles.tabText,
              route.name !== 'DetailCourse' && styles.activeTabText,
            ]}>
              Lessons
            </Text>
          </Pressable>
        </View>
        <Text style={styles.sectionTitle}>
          Description
        </Text>
        <Text style={styles.descriptionText}>
          {data?.description}
        </Text>
        <View style={styles.reviewsContainer}>
          <Text style={styles.sectionTitle}>
            Reviews
          </Text>
          <Text style={styles.ratingOverall}>
            {data?.rating}
          </Text>
          <View style={styles.ratingsBarContainer}>
            {ratingsData.map((item, i) => (
              <View key={i} style={styles.ratingBar}>
                <Text style={styles.ratingBarText}>{item.no}</Text>
                <Progress.Bar
                  progress={item.progress}
                  width={wp(50)}
                  height={hp(2)}
                  color="rgb(0,112,255)"
                  animated
                  borderWidth={0}
                  unfilledColor="rgb(217,217,217)"
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buyNowButtonContainer}>
        <Pressable
          onPress={onConfirm}
          style={styles.buyNowButton}>
          <Text style={styles.buyNowButtonText}>
            Buy Now
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: wp(4),
    paddingBottom: hp(10), // Ensure space at the bottom for the button
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: wp(5),
    marginVertical: hp(2),
  },
  courseName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: wp(5),
    paddingTop: hp(2),
  },
  ratingPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: 'black',
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  priceText: {
    color: '#0D6EFD',
    fontWeight: 'bold',
    fontSize: wp(4),
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp(2),
    paddingTop: hp(4),
    paddingHorizontal: wp(2),
    marginRight: wp(2),
  },
  tab: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0D6EFD',
    width: '48%',
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#0D6EFD',
  },
  tabText: {
    textAlign: 'center',
    paddingVertical: wp(2),
    color: '#0D6EFD',
    fontWeight: 'bold',
    fontSize: wp(4),
  },
  activeTabText: {
    color: 'white',
  },
  sectionTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: wp(5),
    paddingTop: hp(2),
  },
  descriptionText: {
    color: 'black',
    fontSize: wp(4),
  },
  reviewsContainer: {
    position: 'relative',
    flex: 1,
  },
  ratingOverall: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: wp(10),
  },
  ratingsBarContainer: {
    position: 'absolute',
    right: wp(10),
    top: hp(8),
    flex: 1,
  },
  ratingBar: {
    flexDirection: 'row',
    gap: wp(2),
    paddingVertical: hp(1),
    alignItems: 'center',
  },
  ratingBarText: {
    color: 'black',
  },
  buyNowButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: wp(2),
  },
  buyNowButton: {
    backgroundColor: '#0D6EFD',
    borderRadius: 12,
    padding: wp(4),
  },
  buyNowButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp(5),
  },
});

export default DetailCourse;
