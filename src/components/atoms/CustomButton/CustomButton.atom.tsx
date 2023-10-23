import React, {PropsWithChildren} from 'react';
import {Pressable, Text} from 'react-native';

type ButtonType = PropsWithChildren<{className?: string; onPress: () => void}>;
function CustomButton({onPress, children, className}: ButtonType) {
  
  return (
    <>
      <Pressable onPress={onPress} className='absolute bottom-8 w-3/4 rounded-lg flex items-center justify-center mx-8 bg-primary-50'>
        <Text className='text-center font-bold text-white'>{children}</Text>
      </Pressable>
    </>
  );
}

export default CustomButton;
