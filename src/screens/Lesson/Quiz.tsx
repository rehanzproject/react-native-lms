import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import {QuizData, ScreenProps} from '../../types';
import {RadioButton} from 'react-native-paper';
import {quizDummy} from './dummy';
import {useFocusEffect} from '@react-navigation/native';
import {useHTTP} from '../../hooks/useHTTP';

const Quiz = ({route, navigation}: ScreenProps<'Quiz'>) => {
  const [quizData, setQuizData] = useState<QuizData>();
  const [loading, setLoading] = useState(true);
  const {getRequest , postRequest} = useHTTP();

  useFocusEffect(
    React.useCallback(() => {
      getHistoryData();
    }, []),
  );

  const getHistoryData = async () => {
    try {
      const result = await getRequest(
        `/user/module/quiz?id=${route.params?.id}`,
      );
      if (!result?.data) {
        ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
      }
      setQuizData(result?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
console.log(route.params);

  interface SelectedAnswers {
    [questionIndex: number]: number;
  }
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
  const [score, setScore] = useState<number | null>(null);

  const handleRadioButtonPress = (
    questionIndex: number,
    choiceIndex: number,
  ) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionIndex]: choiceIndex,
    }));
  };

  const isAnswerSelected = (questionIndex: number, choiceIndex: number) => {
    return selectedAnswers[questionIndex] === choiceIndex;
  };
  const calculateScore = async () => {
    try {
      let correctAnswers = 0;
  
      quizData?.data?.quizzes?.forEach((quiz, questionIndex) => {
        const selectedChoiceIndex = selectedAnswers[questionIndex];
        if (quiz.choices[selectedChoiceIndex]?.valid) {
          correctAnswers++;
        }
      });
  
      const scorePercentage = (correctAnswers / quizData?.data?.quizzes?.length) * 100;
      console.log('Calculated Score Percentage:', scorePercentage);
      
      setScore(scorePercentage); // Update the score state
  
      const result = await postRequest(
        `/user/module/quiz/score?id=${route.params?.id}&score=${scorePercentage}&course_id=${route.params?.course_id}`,
      );
      console.log('Post Request Result:', result);
  
      if (!result?.data) {
        ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
      }
      setQuizData(result?.data);
      navigation.goBack()
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomRoute onPress={() => navigation.goBack()} text="Quiz" />
      {quizData?.data?.quizzes.map((value, questionIndex) => (
        <View style={styles.questionContainer} key={questionIndex}>
          <Text style={styles.questionText}>
            {questionIndex + 1} . {value.question}
          </Text>
          {value.choices.map((choice, choiceIndex) => (
            <View key={choiceIndex} style={styles.choiceContainer}>
              <RadioButton.Android
                value={choice.text}
                status={
                  isAnswerSelected(questionIndex, choiceIndex)
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() =>
                  handleRadioButtonPress(questionIndex, choiceIndex)
                }
              />
              <Text style={styles.choiceText}>{choice.text}</Text>
            </View>
          ))}
        </View>
      ))}
      <View style={styles.submitButtonContainer}>
        <Pressable onPress={() => calculateScore()} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit Answer</Text>
        </Pressable>
      </View>
      {/* {score !== null && (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            Your Score: {score} / {quizDummy.quizzes.length}
          </Text>
        </View>
      )} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  questionContainer: {
    marginBottom: 10,
  },
  questionText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  choiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  choiceText: {
    color: 'black',
    fontSize: 14,
  },
  submitButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  submitButton: {
    backgroundColor: '#0D6EFD',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreContainer: {
    padding: 10,
  },
  scoreText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Quiz;
