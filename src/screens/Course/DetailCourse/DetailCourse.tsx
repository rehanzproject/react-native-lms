import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {CourseItem, ScreenProps} from '../../../types';
import CustomRoute from '../../../components/atoms/CustomRoute/CustomRoute.atom';
import {dummy, dummyRating} from './constant';
import StarIcon from '../../../components/atoms/Icons/StarIcon';
import {makeRupiahValue} from '../../../helper/formatter';
import * as Progress from 'react-native-progress';
import {useFocusEffect} from '@react-navigation/native';
import {useHTTP} from '../../../hooks/useHTTP';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DetailCourse = ({route, navigation}: ScreenProps<'DetailCourse'>) => {
  const {getRequest, postRequest} = useHTTP();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<CourseItem>();
  
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
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <CustomRoute onPress={() => navigation.goBack()} text="Course Detail" />
      <Image
        source={{uri: data?.thumbnail}}
        style={{width: '100%', aspectRatio: 16 / 9, borderRadius: wp(5) , marginHorizontal: 2}}
      />
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: wp(5),
          paddingTop: hp(2),
        }}>
        {data?.name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <StarIcon />
          <Text style={{color: 'black', fontSize: wp(4), fontWeight: 'bold'}}>
            {data?.rating1 ?? 'Belum ada rating'}
          </Text>
        </View>
        <Text style={{color: '#0D6EFD', fontWeight: 'bold', fontSize: wp(4)}}>
          {makeRupiahValue(data?.price ?? 0)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: wp(2),
          paddingTop: hp(4),
          paddingHorizontal: wp(2),
          marginRight: wp(2),
        }}>
        <Pressable
          onPress={() =>
            navigation.navigate('DetailCourse', {id: route.params?.id || ''})
          }
          style={{
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#0D6EFD',
            width: '48%',
            backgroundColor:
              route.name === 'DetailCourse' ? '#0D6EFD' : 'transparent',
          }}>
          <Text
            style={{
              textAlign: 'center',
              paddingVertical: wp(2),
              color: route.name === 'DetailCourse' ? 'white' : '#0D6EFD',
              fontWeight: 'bold',
              fontSize: wp(4),
            }}>
            Overview
          </Text>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate('DetailLesson', {id: route.params?.id || ''})
          }
          style={{
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#0D6EFD',
            width: '48%',
            backgroundColor:
              route.name !== 'DetailCourse' ? '#0D6EFD' : 'transparent',
          }}>
          <Text
            style={{
              textAlign: 'center',
              paddingVertical: wp(2),
              color: route.name !== 'DetailCourse' ? 'white' : '#0D6EFD',
              fontWeight: 'bold',
              fontSize: wp(4),
            }}>
            Lessons
          </Text>
        </Pressable>
      </View>
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: wp(5),
          paddingTop: hp(2),
        }}>
        Description
      </Text>
      <Text style={{color: 'black', fontSize: wp(4)}}>{data?.description}</Text>
      <View style={{position: 'relative', flex: 1}}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: wp(5),
            paddingTop: hp(2),
          }}>
          Reviews
        </Text>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: wp(10)}}>
          4,5
        </Text>
        <View
          style={{position: 'absolute', right: wp(10), top: hp(8), flex: 1}}>
          {dummyRating.map((item, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row',
                gap: wp(2),
                paddingVertical: hp(1),
              }}>
              <Text style={{color: 'black'}}>{item.no}</Text>
              <Progress.Bar
                progress={item.rating / 10}
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

      <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <Pressable
          onPress={() => onConfirm()}
          style={{backgroundColor: '#0D6EFD', borderRadius: 12 , margin: wp(2)}}>
          <Text
            style={{
              textAlign: 'center',
              padding: wp(2),
              color: 'white',
              fontWeight: 'bold',
              fontSize: wp(5),
            }}>
            Buy Now
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default DetailCourse;
