import React from 'react';
import {parseMessage} from '../../helpers';
import {Text} from 'react-native';
import {IChatMessageProps} from '.';

export const ChatTextMessage: React.FC<IChatMessageProps> = (props) => {
  return <Text> {parseMessage(props.text)}</Text>;
};
