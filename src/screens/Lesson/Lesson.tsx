import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import { ScreenProps } from '../../types';
import {
  widthPercentageToDP as wd,
  heightPercentageToDP as hd,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import Video from 'react-native-video';
import { useFocusEffect } from '@react-navigation/native';
import { useHTTP } from '../../hooks/useHTTP';
import { useToken } from '../../redux/SessionSlice/useSessionSelector';
import RenderHTML from 'react-native-render-html';

const Lesson = ({ route, navigation }: ScreenProps<'Lesson'>) => {
  const token = useToken();
  const { getRequest } = useHTTP(token);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();

  const getModules = async () => {
    try {
      const result = await getRequest(
        `/user/course/modules/detail?id=${route.params?.id}`,
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
      getModules();
    }, [token]),
  );

  const renderDescription = (description: string) => {
    const source = {
      html: description,
    };

    return (
      <RenderHTML
        contentWidth={Dimensions.get('window').width}
        source={source}
        tagsStyles={htmlStyles}
      />
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomRoute onPress={() => navigation.goBack()} text="Lessons" />
      <Video
        source={{ uri: data?.video }} // Replace with your video URL
        style={styles.video}
        controls={true}
        resizeMode="cover"
      />
      <Text style={styles.title}>Description</Text>
      <View style={styles.description}>
        {data?.description && renderDescription(data.description)}
      </View>
      <View style={styles.footer}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score: {route.params?.score}</Text>
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate('Quiz', {
              id: route.params?.id ?? '',
              course_id: route.params?.course_id ?? '',
            })
          }
          style={styles.quizButton}>
          <Text style={styles.quizButtonText}>Take Quiz</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Lesson;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: wd(2.5),
  },
  video: {
    width: '100%',
    height: hd(30),
    backgroundColor: 'black',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: RFValue(14),
    marginTop: hd(2),
  },
  description: {
    marginTop: hd(1),
  },
  footer: {
    position: 'absolute',
    bottom: hd(2),
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: wd(2),
  },
  scoreContainer: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingRight: hd(8),
    paddingLeft: hd(0.5),
    marginTop: hd(1),
    marginBottom: hd(1),
    paddingVertical: hd(1),
    borderRadius: 12,
  },
  scoreText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: RFValue(20),
  },
  quizButton: {
    backgroundColor: '#0D6EFD',
    paddingHorizontal: wd(10),
    paddingVertical: hd(1),
    borderRadius: wd(2),
  },
  quizButtonText: {
    color: 'white',
    fontSize: RFValue(20),
  },
});

const htmlStyles = {
  em: {
    fontStyle: 'italic',
    color: 'black',
  },
  strong: {
    fontWeight: 'bold',
    color: 'black',
  },
  p: {
    marginVertical: 4,
    color: 'black',
  },
  ol: {
    marginVertical: 4,
    paddingLeft: 20,
    color: 'black',
  },
  li: {
    marginVertical: 4,
    color: 'black',
  },
};
