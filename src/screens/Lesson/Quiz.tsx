import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import {ScreenProps} from '../../types';
import {dummy, quizDummy} from './dummy';
import Video from 'react-native-video';
import {RadioButton} from 'react-native-paper';
const Quiz = ({route, navigation}: ScreenProps<'Quiz'>) => {
  interface SelectedAnswers {
    [questionIndex: number]: number;
  }
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});

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

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, padding: 10}}>
      <CustomRoute onPress={() => navigation.goBack()} text="Quiz" />
      {quizDummy.quizzes.map((value, questionIndex) => (
        <View className="gap-2" key={questionIndex}>
          <Text className="text-black text-lg font-bold">
            {questionIndex + 1} . {value.question}
          </Text>
          {value.choices.map((choice, choiceIndex) => (
            <View
              key={choiceIndex}
              style={{flexDirection: 'row', alignItems: 'center'}}>
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
              <Text className="text-black">{choice.text}</Text>
            </View>
          ))}
        </View>
      ))}
      <View className="fixed left-0 right-0">
        <Pressable
          onPress={() => console.log(selectedAnswers)}
          className="bg-primary-50 py-2 rounded-md mx-2">
          <Text className="text-white text-center">Submit Answer</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default Quiz;
