import {View, Text, Image, ScrollView, RefreshControl, ToastAndroid, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useHTTP} from '../../hooks/useHTTP';
import {ScreenProps} from '../../types';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import CheckIcon from '../../components/atoms/Icons/CheckIcon';
import {useToken} from '../../redux/SessionSlice/useSessionSelector';

const Material = ({route, navigation}: ScreenProps<'Material'>) => {
  const token = useToken();
  const {getRequest, postRequest} = useHTTP(token);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getSearchCompletion = async () => {
    try {
      const result = await getRequest(
        `/user/course/enrolled?id=${route.params?.id}`,
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

  const onRefresh = async () => {
    setData({})
    setRefreshing(true);
    await getSearchCompletion();
    setRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getSearchCompletion();
    }, [token]),
  );

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <CustomRoute onPress={() => navigation.goBack()} text="Material" />
      <Image
        source={
          data?.course?.thumbnail
            ? {uri: data?.course?.thumbnail}
            : require('../../assets/defaultThumbnailCourse.png')
        }
        style={{width: '100%', aspectRatio: 16 / 9, borderRadius: wp(5)}}
        resizeMode="contain"
      />
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: wp(5),
          padding: hp(2),
        }}>
        {data?.course?.name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}></View>

      <View>
        {data?.course?.modules?.map((list: any) => {
          return (
          <TouchableOpacity
            key={list.module_id}
            style={{
              borderWidth: 1,
              borderRadius: 12,
              padding: wp(2),
              margin: wp(2),
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
            onPress={() =>
              navigation.navigate('Lesson', {
                id: list?.module_id ?? '',
                course_id: data?.course?.course_id,
                score: list?.score ?? 0,
              })
            }>
            <Text
              style={{
                fontSize: wp(4),
                fontWeight: 'bold',
                color: 'black',
              }}>
              {list.name}
            </Text>
            {list.is_completed && <CheckIcon />}
          </TouchableOpacity>
        )})}
      </View>
    </ScrollView>
  );
};

export default Material;
