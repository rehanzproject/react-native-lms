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
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {CourseItem, InfoType, ScreenProps, SessionType} from '../../types';
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
import axios from 'axios';

function Home({route, navigation}: ScreenProps<'Home'>) {
  const dispatch = useDispatch();
  const {getRequest} = useHTTP();
  const [course, setCourse] = useState<any | null>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state : SessionType) => state.session.token)
  const info = useSelector((state : InfoType) => state.info)
  
  useFocusEffect(
    React.useCallback(() => {
      getCourse();
    }, [token]),
  );
  
  const getCourse = async () => {
    try {
      const result = await axios.get(`https://89e2-36-71-68-163.ngrok-free.app/api/v1/user/course?size=6&page=1`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!result?.data) {
        ToastAndroid.show(result?.statusText as string, ToastAndroid.LONG);
      }
      setCourse(result.data);
      const resultInfo = await axios.get('https://89e2-36-71-68-163.ngrok-free.app/api/v1/user/info', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!resultInfo?.data) {
        ToastAndroid.show(result?.data.message as string, ToastAndroid.LONG);
      }
      dispatch(infoSlice.actions.updateInfo(resultInfo.data.data))
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {loading ? (
            <SkeletonLoaderOneBar />
          ) : (
            <>
              <Image
                source={info?.image ? {uri: info?.image} : require('../../assets/defaultThumbnailCourse.png')}
                defaultSource={require('../../assets/academade.png')}
                style={styles.logo}
              />
              <Text style={styles.welcomeText}>Welcome , {info?.name ?? 'Kakak'}</Text>
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
      <View style={styles.popularCourseContainer}>
        <Text style={styles.popularCourseText}>Popular Course</Text>
       <TouchableOpacity onPress={()=>navigation.navigate('AllCourse')} >

        <Text style={styles.seeAllText}>See All</Text>
       </TouchableOpacity>
      </View>
      {loading ? (
        <CustomSwiperSkeleton />
      ) : (
        <CustomSwiper data={course?.data} navigation={navigation} />
      )}
    </View>
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
  popularCourseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: hd(2),
  },
  popularCourseText: {
    fontSize: wd(4),
    color: 'black',
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#0D6EFD',
  },
});

export default Home;
