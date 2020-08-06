import React from 'react';
import {parseMessage} from '../../helpers';
import {Text, StyleSheet} from 'react-native';
import {IChatMessageProps} from '.';
import { BackgroundColor } from '../../chat/styles';

export const ChatTextMessage: React.FC<IChatMessageProps> = (props) => {
  return <Text style={styles.text}> {parseMessage(props.text)}</Text>;
};

const styles = StyleSheet.create({
    text: {
      color: 'white',
      fontSize: 16
    }
})
