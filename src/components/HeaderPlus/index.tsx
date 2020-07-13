import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

export default ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>add</Text>
    </TouchableOpacity>
  );
};
