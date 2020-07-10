import React from 'react';
import {Text} from 'react-native';
import {IChat} from '../../services/models';

const ChatInfoItem: React.FC<IChat> = (props) => {
  return <Text>{props.user.name}</Text>;
};
export default ChatInfoItem;
