import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import {CourseItem, ScreenProps} from '../../../types';
import CustomRoute from '../../../components/atoms/CustomRoute/CustomRoute.atom';
import SearchIcon from '../../../components/atoms/Icons/SearchIcon';
import {makeRupiahValue} from '../../../helper/formatter';
import {useHTTP} from '../../../hooks/useHTTP';
import {useFocusEffect} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {useToken} from '../../../redux/SessionSlice/useSessionSelector';
import StarIconH from '../../../components/atoms/Icons/StarIconH';

const AllCourse = ({navigation, route}: ScreenProps<'AllCourse'>) => {
  const token = useToken();
  const {getRequest, postRequest} = useHTTP(token);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getSearch = async () => {
    try {
      setLoading(true);
      let result;
      if (!route.params?.search) {
        result = await getRequest(`/user/course?size=20&page=1`);
      } else {
        result = await getRequest(
          `/user/search/course?search=${route.params?.search}`,
        );
      }
      if (!result?.data) {
        ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
      } else {
        setData(result?.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getSearch();
    }, [token]),
  );
  const onSearch = (event) => {
    navigation.navigate('AllCourse', {
      search: event.nativeEvent.text,
    });
  };
  const onRefresh = () => {
    setData({});
    setRefreshing(true);
    getSearch();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        <CustomRoute onPress={() => navigation.goBack()} text="Category" />
        <View style={styles.searchContainer}>
          <View style={styles.searchIcon}>
            <SearchIcon />
          </View>
          <TextInput
            placeholder={route.params?.search || 'Search...'}
            style={styles.searchInput}
            placeholderTextColor={'gray'}
            onEndEditing={(event) => onSearch(event)}
          />
        </View>

        <View style={styles.courseContainer}>
          {loading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : data?.length > 0 ? (
            data.map((list: any) => (
              <TouchableOpacity
                key={list.course_id}
                onPress={() =>
                  navigation.navigate('DetailCourse', {id: list.course_id})
                }
                style={styles.courseItem}>
                <Image
                  source={
                    list.thumbnail
                      ? {uri: list.thumbnail}
                      : require('../../../assets/defaultThumbnailCourse.png')
                  }
                  style={styles.courseImage}
                  resizeMode="contain"
                />
                <Text style={styles.courseName}>{list.name}</Text>
                <View style={styles.courseDetails}>
                  <View style={styles.starRating}>
                    <StarIconH />
                    <Text style={styles.ratingText}> {list.rating}</Text>
                  </View>
                  <Text style={styles.priceText}>
                    {makeRupiahValue(list.price)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noCoursesText}>No courses found</Text>
          )}
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
    paddingHorizontal: wp(2),
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
    width: '46%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 10,
  },
  courseImage: {
    width: '100%',
    height: hp(15),
    borderRadius: 10,
  },
  courseName: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
    paddingHorizontal: 1,
    paddingTop: 5,
    color: 'black',
  },
  courseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
    marginTop: 10,
  },
  starRating: {
    flexDirection: 'row',
  },
  ratingText: {
    fontSize: RFValue(10), 
paddingTop: wp(1),
    color: 'black',
  },
  priceText: {
    fontWeight: 'bold',
    color: 'blue',
    fontSize: RFValue(12),
  },
  noCoursesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'black',
  },
});

export default AllCourse;
