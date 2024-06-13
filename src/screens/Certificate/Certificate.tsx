import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TextInput,
  ToastAndroid,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import {ScreenProps} from '../../types';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import EmptyStarIcon from '../../components/atoms/Icons/EmptyStarIcon';
import FilledStarIcon from '../../components/atoms/Icons/FIlledStarIcon';
import {useFocusEffect} from '@react-navigation/native';
import {useHTTP} from '../../hooks/useHTTP';
import {useToken} from '../../redux/SessionSlice/useSessionSelector';
import { RFValue } from 'react-native-responsive-fontsize';
import { MainType } from '../MyCourse/dummy';

export default function Certificate({navigation, route}: ScreenProps<'Certificate'>) {
  const token = useToken();
  const {getRequest, postRequest} = useHTTP(token);
  const [handleModal, setHandleModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [course, setCourse] = useState<MainType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [description, setDescription] = useState<string>('');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setCourse([]);
    setRefreshing(true);
    getCourse();
  }, [token]);

  useFocusEffect(
    React.useCallback(() => {
      getCourse();
    }, [token]),
  );

  const getCourse = async () => {
    try {
      const result = await getRequest('/user/course/completed');
      if (!result?.data) {
        ToastAndroid.show(result?.statusText as string, ToastAndroid.LONG);
      } else {
        setCourse(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const result = await postRequest(`/user/review?id=${selectedCourseId}`, {
        rating,
        description,
      });
      if (!result?.data) {
        ToastAndroid.show(result?.statusText as string, ToastAndroid.LONG);
      } else {
        setHandleModal(false);
        navigation.navigate('DownloadCertificate', {id: selectedCourseId ?? ''});
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStarPress = (starRating: number) => {
    setRating(starRating);
  };

  const openModal = (courseId: string) => {
    setSelectedCourseId(courseId);
    setHandleModal(true);
  };

  return (
    <View style={styles.container}>
      <CustomRoute onPress={() => navigation.goBack()} text="My Certificate" />
      
      {loading ? (
        <ActivityIndicator size="large" color="#0D6EFD" />
      ) : course.length === 0 ? (
        <View style={styles.noCourseContainer}>
          <Text style={styles.noCourseText}>No Certificate Found</Text>
        </View>
      ) : (
        <ScrollView
          style={{flex: 1}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.courseContainer}>
            {course.map((list) => (
              <View key={list.course.course_id} style={styles.courseItem}>
                <Image
                  source={
                    list?.course?.thumbnail
                      ? {uri: list?.course?.thumbnail}
                      : require('../../assets/defaultThumbnailCourse.png')
                  }
                  style={styles.courseImage}
                />
                <View style={styles.courseDetails}>
                  <Text style={styles.courseName}>{list.course.name}</Text>
                  <View style={styles.progressContainer}>
                    <Text style={styles.completeText}>Complete</Text>
                  </View>
                  <Pressable
                    onPress={() => navigation.navigate('DownloadCertificate', {id: list.course.course_id})}
                    style={styles.certificateButton}
                  >
                    <Text style={styles.buttonText}>See Certificate</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
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
    borderBottomWidth: 1,
    borderBottomColor: '#0D6EFD',
  },
  noCourseContainer: {
    flex: 1,
    alignItems: 'center',
  },
  noCourseText: {
    marginTop: hp(2),
    color: 'gray',
    fontSize: wp(4),
  },
  courseContainer: {
    flex: 1,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: wp(2),
    marginBottom: hp(2),
  },
  courseImage: {
    width: wp(20),
    height: wp(20),
    margin: wp(2),
    borderRadius: wp(2),
  },
  courseDetails: {
    flex: 1,
    marginLeft: wp(2),
  },
  courseName: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: hp(1),
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  completeText: {
    fontSize: wp(3.5),
    fontWeight: 'bold',
    color: 'black',
  },
  certificateButton: {
    backgroundColor: '#0D6EFD',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
  },
  buttonText: {
    color: 'white',
    fontSize: wp(3.5),
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: wp(4),
    borderRadius: 10,
    height: hp(50),
  },
  modalTitle: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: hp(1),
  },
  modalSubtitle: {
    fontSize: wp(4),
    color: 'black',
    marginBottom: hp(1),
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: hp(2),
  },
  reviewText: {
    fontSize: wp(4),
    color: 'black',
    marginBottom: hp(1),
  },
  reviewInput: {
    width: wp(80),
    color: 'black',
    height: hp(10),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: wp(2),
    marginBottom: hp(2),
  },
  characterCount: {
    color: 'black',
    fontSize: wp(3.5),
    marginBottom: hp(1),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(80),
  },
  laterButton: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0D6EFD',
  },
  laterButtonText: {
    color: '#0D6EFD',
    fontSize: wp(3.5),
  },
  submitButton: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    backgroundColor: '#0D6EFD',
    borderRadius: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: wp(3.5),
  },
});
