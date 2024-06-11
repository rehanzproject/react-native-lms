import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import {CourseItem, ScreenProps} from '../../types';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import EmptyStarIcon from '../../components/atoms/Icons/EmptyStarIcon';
import FilledStarIcon from '../../components/atoms/Icons/FIlledStarIcon';
import {useFocusEffect} from '@react-navigation/native';
import {useHTTP} from '../../hooks/useHTTP';
import { MainType } from './dummy';

export default function CompleteCourse({
  navigation,
  route,
}: ScreenProps<'CompleteCourse'>) {
  const [handleModal, setHandleModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [course, setCourse] = useState<MainType[]>();
  const [loading, setLoading] = useState<boolean>();
  const [description, setDescription] = useState<string>('');

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const {getRequest, postRequest} = useHTTP();

  useFocusEffect(
    React.useCallback(() => {
      getCourse();
    }, []),
  );

  const onSubmit = async () => {
    try {
      const result = await postRequest(`/user/review?id=${selectedCourseId}`, {
        rating,
        description,
      });
      if (!result?.data) {
        ToastAndroid.show(result?.statusText as string, ToastAndroid.LONG);
      }
      setHandleModal(false);
      navigation.navigate('DownloadCertificate');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getCourse = async () => {
    try {
      const result = await getRequest('/user/course/completed');
      if (!result?.data) {
        ToastAndroid.show(result?.statusText as string, ToastAndroid.LONG);
      }
      setCourse(result.data);
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
      <CustomRoute onPress={() => navigation.goBack()} text="My Course" />
      <View style={styles.tabContainer}>
        <Pressable onPress={() => navigation.navigate('MyCourse')}>
          <Text style={styles.tabText}>On Progress</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('CompleteCourse')}>
          <Text style={styles.tabTextActive}>Complete</Text>
        </Pressable>
      </View>

      <View style={styles.courseContainer}>
        {course?.map((list) => (
          <View key={list.course.course_id} style={styles.courseItem}>
            <Image
              source={list?.course?.thumbnail ? {uri: list?.course?.thumbnail} : require('../../assets/defaultThumbnailCourse.png')}
              style={styles.courseImage}
            />
            <View style={styles.courseDetails}>
              <Text style={styles.courseName}>{list.course.name}</Text>
              <View style={styles.progressContainer}>
                {/* <Text style={styles.progressText}>
                  {list.total} / {list.total} lessons
                </Text> */}
                <Text style={styles.completeText}>Complete</Text>
              </View>
              <Pressable
                onPress={() => openModal(list.course.course_id)}
                style={styles.certificateButton}>
                <Text style={styles.buttonText}>See Certificate</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      <Modal isVisible={handleModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Review Course</Text>
          <Text style={styles.modalSubtitle}>Rating For Course</Text>
          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable key={star} onPress={() => handleStarPress(star)}>
                {star <= rating ? <FilledStarIcon /> : <EmptyStarIcon />}
              </Pressable>
            ))}
          </View>
          <Text style={styles.reviewText}>Write Your Review</Text>
          <TextInput
            style={styles.reviewInput}
            value={description}
            onChangeText={setDescription}
            placeholder="Your Review here..."
            placeholderTextColor={'gray'}
          />
          <Text style={styles.characterCount}>{description?.length} / 100</Text>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => setHandleModal(false)}
              style={styles.laterButton}>
              <Text style={styles.laterButtonText}>Maybe Later</Text>
            </Pressable>
            <Pressable onPress={onSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  progressText: {
    fontSize: wp(3.5),
    color: 'black',
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
