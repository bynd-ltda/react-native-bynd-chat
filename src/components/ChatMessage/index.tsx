import React from 'react';
import {IMessage} from '../../services/models';
import {View, Text} from 'react-native';
import {parseMessage} from '../../helpers';

interface IChatMessageProps extends IMessage {}

const ChatMessage: React.FC<IChatMessageProps> = (props) => {
  return (
    <View>
      <Text>{parseMessage(props.text)}</Text>
    </View>
  );
};
export default ChatMessage;
