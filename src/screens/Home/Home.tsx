import React, {useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  Image,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
  Alert,
} from 'react-native';
import {InfoType, ScreenProps} from '../../types';
import {useHTTP} from '../../hooks/useHTTP';
import CustomSwiperSkeleton from './CustomSwiperSkeleton';
import CustomSwiper from './CustomSwiper';
import SearchIcon from '../../components/atoms/Icons/SearchIcon';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import infoSlice from '../../redux/InfoSlice/InfoSlice';
import SkeletonLoaderOneBar from '../../components/organism/SkeletonOneBar';

function Home({route, navigation}: ScreenProps<'Home'>) {
  const dispatch = useDispatch();
  const {getRequest} = useHTTP();
  const width = Dimensions.get('window').width;
  const [course, setCourse] = useState([]);
  const [error, setError] = useState(false);
  const info = useSelector((state: InfoType) => state.info);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);
  useFocusEffect(
    React.useCallback(() => {
      getCourse();
      getAccountUser();
    }, []),
  );
  const getCourse = async () => {
    try {
      const result = await getRequest('/user/course?size=3&page=1');
      if (!result?.data) {
        ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const getAccountUser = async () => {
    try {
      const result = await getRequest('/user/info');
      if (!result?.data) {
        ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
      }
      dispatch(infoSlice.actions.updateInfo(result?.data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 p-4">
      <View className="flex flex-row justify-between">
        <View className="flex flex-row">
          {loading ? (
            <SkeletonLoaderOneBar />
          ) : (
            <>
              <Image
                source={{
                  uri: info.image,
                }}
                className="flex w-12 h-12"
              />
              <Text className="text-base text-black font-bold pt-4">
                Welcome , {info.name}
              </Text>
            </>
          )}
        </View>
      </View>
      <View className="flex flex-row items-center pt-10">
        <View className="pb-8 pl-2">
          <SearchIcon />
        </View>
        <TextInput
          placeholder="Search"
          placeholderTextColor={'gray'}
          onPressIn={() => navigation.navigate('Search')}
          className="border rounded-lg w-3/4 text-black absolute py-1 px-8"
        />
      </View>

      <View className="block flex-row justify-between">
        <Text className="text-black font-bold text-lg">Popular Course</Text>
        <Text className="text-primary-50">See All</Text>
      </View>

      {loading ? (
        <CustomSwiperSkeleton />
      ) : (
        <CustomSwiper data={course} navigation={navigation} />
      )}
    </View>
  );
}

export default Home;
