import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';

function ArrowIcon() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"

        //   xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M20 12.274a.75.75 0 01-.648.744l-.102.006h-15a.75.75 0 01-.102-1.493l.102-.007h15a.75.75 0 01.75.75z"
          fill="#000"
        />
        <Path
          d="M10.83 17.767a.75.75 0 01-.974 1.136l-.084-.072-6.05-6.024a.75.75 0 01-.073-.98l.073-.083 6.05-6.025a.75.75 0 011.13.978l-.072.084-5.516 5.494 5.516 5.492z"
          fill="#000"
        />
      </Svg>
    </TouchableOpacity>
  );
}

export default ArrowIcon;
