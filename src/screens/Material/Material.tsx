import {View, Text, Image, ScrollView, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useHTTP} from '../../hooks/useHTTP';
import {ScreenProps} from '../../types';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import {TouchableOpacity} from 'react-native';
import CheckIcon from '../../components/atoms/Icons/CheckIcon';

const Material = ({route, navigation}: ScreenProps<'Material'>) => {
  const {getRequest, postRequest} = useHTTP();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();

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

  useFocusEffect(
    React.useCallback(() => {
      getSearchCompletion();
    }, []),
  );

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <CustomRoute onPress={() => navigation.goBack()} text="Material" />
      <Image
        source={{uri: data?.course?.thumbnail}}
        style={{width: '100%', aspectRatio: 16 / 9, borderRadius: wp(5)}}
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
        {data?.course?.modules?.map((list, index) => (
          <TouchableOpacity
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
              }}
              key={index}>
              {list.name}
            </Text>
            {list.is_completed && <CheckIcon />}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Material;
