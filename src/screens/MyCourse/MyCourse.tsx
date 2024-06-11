import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import { ScreenProps } from '../../types';
import * as Progress from 'react-native-progress';
import { useHTTP } from '../../hooks/useHTTP';
import { useFocusEffect } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

export default function MyCourse({ navigation, route }: ScreenProps<'MyCourse'>) {
  const { getRequest, postRequest } = useHTTP();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();

  const getSearchCompletion = async () => {
    try {
      const result = await getRequest(`/user/mycourse`);
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
    }, [])
  );
  return (
    <View style={styles.container}>
      <CustomRoute onPress={() => navigation.goBack()} text="My Course" />
      <View style={styles.tabContainer}>
        <Pressable onPress={() => navigation.navigate('MyCourse')}>
          <Text style={styles.tabTextActive}>On Progress</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('CompleteCourse')}>
          <Text style={styles.tabText}>Complete</Text>
        </Pressable>
      </View>

      <View>
        {data?.courseCompletionData?.map((list: any) => {
          const progress =
            list.totalComplete && list.totalModules
              ? list.totalComplete / list.totalModules
              : 0;

          return (
            <TouchableOpacity
              key={list?.course?.course_id}
              onPress={() => navigation.navigate('Material', {id: list?.course?.course_id})}
              style={styles.courseContainer}
            >
              <Image
                source={{uri: list?.course?.thumbnail}}
                defaultSource={require('../../assets/defaultThumbnailCourse.png')}
                style={styles.courseImage}
              />
              <View style={styles.courseDetails}>
                <Text style={styles.courseTitle}>
                  {list.course.name}
                </Text>
                <Text style={styles.courseProgress}>
                  {list.totalComplete ?? 0} / {list.totalModules ?? 0} Lessons
                </Text>
                <Progress.Bar
                  progress={progress}
                  width={wp(50)}
                  height={hp(1.5)}
                  color="rgb(0,112,255)"
                  animated
                  borderWidth={0}
                  unfilledColor="rgb(217,217,217)"
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(2),
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: hp(2),
  },
  tabText: {
    color: 'black',
    fontSize: wp(4),
  },
  tabTextActive: {
    color: '#0D6EFD',
    fontSize: wp(4),
    borderBottomWidth: wp(0.2),
    borderBottomColor: '#0D6EFD',
  },
  courseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: wp(0.2),
    borderColor: 'lightgray',
    borderRadius: wp(1),
    marginBottom: hp(2),
  },
  courseImage: {
    width: wp(20),
    height: wp(20),
    margin: wp(2),
    borderRadius: wp(1),
  },
  courseDetails: {
    flex: 1,
    marginLeft: wp(2),
  },
  courseTitle: {
    color:'black',
    fontSize: RFValue(13),
    fontWeight: 'bold',
    marginBottom: hp(1),
  },
  courseProgress: {
    color:'black',
    fontSize: RFValue(10),
    marginBottom: hp(1),
  },
});
