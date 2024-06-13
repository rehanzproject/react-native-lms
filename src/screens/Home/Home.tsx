import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  Dimensions,
  Image,
  Text,
  TextInput,
  View,
  ToastAndroid,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {CourseItem, InfoType, ScreenProps} from '../../types';
import {useHTTP} from '../../hooks/useHTTP';
import CustomSwiperSkeleton from './CustomSwiperSkeleton';
import CustomSwiper from './CustomSwiper';
import SearchIcon from '../../components/atoms/Icons/SearchIcon';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import infoSlice from '../../redux/InfoSlice/InfoSlice';
import SkeletonLoaderOneBar from '../../components/organism/SkeletonOneBar';
import {
  widthPercentageToDP as wd,
  heightPercentageToDP as hd,
} from 'react-native-responsive-screen';
import {useToken} from '../../redux/SessionSlice/useSessionSelector';
import {RFValue} from 'react-native-responsive-fontsize';

function Home({route, navigation}: ScreenProps<'Home'>) {
  const token = useToken();
  const dispatch = useDispatch();
  const {getRequest} = useHTTP(token);
  const [course, setCourse] = useState<any | null>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const info = useSelector((state: InfoType) => state.info);

  useFocusEffect(
    React.useCallback(() => {
      getCourse();
    }, [token]),
  );

  const getCourse = async () => {
    try {
      const result = await getRequest('/user/course?size=6&page=1');
      if (!result?.data) {
        ToastAndroid.show(result?.statusText as string, ToastAndroid.LONG);
      }
      setCourse(result.data);
      const resultInfo = await getRequest('/user/info');
      if (!resultInfo?.data) {
        ToastAndroid.show(result?.data.message as string, ToastAndroid.LONG);
      }
      dispatch(infoSlice.actions.updateInfo(resultInfo.data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setCourse({});
    setRefreshing(true);
    getCourse().finally(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {loading ? (
              <SkeletonLoaderOneBar />
            ) : (
              <>
                <Image
                  source={
                    info?.image
                      ? {uri: info?.image}
                      : require('../../assets/defaultThumbnailCourse.png')
                  }
                  defaultSource={require('../../assets/academade.png')}
                  style={styles.logo}
                />
                <Text style={styles.welcomeText}>
                  Welcome , {info.name ?? 'Kakak'}
                </Text>
              </>
            )}
          </View>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchIcon}>
            <SearchIcon />
          </View>
          <TextInput
            placeholder="Search"
            placeholderTextColor={'gray'}
            onPressIn={() => navigation.navigate('Search')}
            style={styles.searchInput}
          />
        </View>
        <View style={styles.courseSection}>
          <View style={styles.popularCourseContainer}>
            <Text style={styles.popularCourseText}>Popular Course</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllCourse')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <CustomSwiperSkeleton />
          ) : (
            <CustomSwiper data={course} navigation={navigation} />
          )}
        </View>
        <View style={styles.courseSection}>
          <View style={styles.continousCourseContainer}>
            <Text style={styles.popularCourseText}>Continous Course</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllCourse')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <CustomSwiperSkeleton />
          ) : (
            <View style={{flex: 1}}>
              <CustomSwiper data={course} navigation={navigation} />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wd(4),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContent: {
    flexDirection: 'row',
  },
  logo: {
    width: wd(12),
    height: wd(12),
  },
  welcomeText: {
    fontSize: wd(4),
    color: 'black',
    fontWeight: 'bold',
    paddingTop: hd(2),
    paddingLeft: wd(2),
  },
  scrollView: {
    flexGrow: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: hd(2),
  },
  searchIcon: {
    paddingLeft: wd(2),
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    width: wd(70),
    color: 'black',
    paddingVertical: hd(1),
    paddingHorizontal: wd(8),
    marginLeft: wd(2),
  },
  courseSection: {
    paddingVertical: hd(2), // Adjust this value to reduce spacing between sections
  },
  popularCourseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: hd(1), // Adjust this value to reduce spacing within the section
  },
  popularCourseText: {
    fontSize: RFValue(16),
    color: 'black',
    fontWeight: 'bold',
  },
  continousCourseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: hd(1), // Adjust this value to reduce spacing within the section
    paddingTop: 0, // Remove any padding top to bring sections closer
  },
  seeAllText: {
    color: '#0D6EFD',
  },
});

export default Home;
