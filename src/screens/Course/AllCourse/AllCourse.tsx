import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {CourseItem, ScreenProps} from '../../../types';
import CustomRoute from '../../../components/atoms/CustomRoute/CustomRoute.atom';
import {dummyArray} from './constant';
import StarIcon from '../../../components/atoms/Icons/StarIcon';
import SearchIcon from '../../../components/atoms/Icons/SearchIcon';
import {makeRupiahValue} from '../../../helper/formatter';
import {useHTTP} from '../../../hooks/useHTTP';
import {useFocusEffect} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

const AllCourse = ({navigation, route}: ScreenProps<'AllCourse'>) => {
  const {getRequest, postRequest} = useHTTP();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();

  const getSearch = async () => {
    try {
      if (!route.params?.search) {
        const result = await getRequest(`/user/course?size=20&page=1`);
        if (!result?.data) {
          ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
        }
        setData(result?.data);
      }
      const result = await getRequest(
        `/user/search/course?search=${route.params?.search}`,
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
      getSearch();
    }, []),
  );
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <CustomRoute onPress={() => navigation.goBack()} text="Category" />
        <View style={styles.searchContainer}>
          <View style={styles.searchIcon}>
            <SearchIcon />
          </View>
          <TextInput
            placeholder={route.params?.search}
            style={styles.searchInput}
            placeholderTextColor={'gray'}
            onEndEditing={(event) => {
              navigation.navigate('AllCourse', {
                search: event.nativeEvent.text,
              });
            }}
          />
        </View>

        <View style={styles.courseContainer}>
          {data?.map((list: any) => (
            <TouchableOpacity
              key={list.name}
              onPress={() =>
                navigation.navigate('DetailCourse', {id: list.course_id})
              }
              style={styles.courseItem}>
              <Image
                source={
                  list.thumbnail
                    ? {uri: list.thumbnail}
                    : require('../../../assets/defaulThumbnailCourse.png')
                }
                style={styles.courseImage}
                resizeMode="stretch"
              />
              <Text style={styles.courseName}>{list.name}</Text>
              <View style={styles.courseDetails}>
                <View style={styles.starRating}>
                  <StarIcon />
                  <Text style={styles.ratingText}> {list.rating}</Text>
                </View>
                <Text style={styles.priceText}>
                  {makeRupiahValue(list.price)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  searchContainer: {
    position: 'relative',
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: [{translateY: -12}],
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
    paddingHorizontal: 40,
    fontSize: 16,
    color: 'black',
    width: wp(20),
    marginHorizontal: wp(2),
  },
  courseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  courseItem: {
    width: '48%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 10,
  },
  courseImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  courseName: {
    fontSize: RFValue(14), // Example using RFValue for responsive font size

    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingTop: 5,
    color: 'black',
  },
  courseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  starRating: {
    flexDirection: 'row',
  },
  ratingText: {
    fontSize: RFValue(12), // Example using RFValue for responsive font size
    color: 'black',
  },
  priceText: {
    fontWeight: 'bold',
    color: 'blue',
    fontSize: RFValue(12), // Example using RFValue for responsive font size
  },
});

export default AllCourse;
