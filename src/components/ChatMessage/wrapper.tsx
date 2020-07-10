import React from 'react';
import {IChatMessageProps} from '.';
import {isSameHourAndMinute, parseMessage} from '../../helpers';
import {View, Text} from 'react-native';
import moment from 'moment';

export const ChatMessageGroup: React.FC<IChatMessageProps> = (props) => {
  const hasToShowTime = () => {
    return (
      !props.next ||
      (props.next.sender.id === props.sender.id &&
        !isSameHourAndMinute(props.next.create_at, props.create_at))
    );
  };

  const hasToShowName = (): boolean => {
    if (props.previous === null) {
      return true;
    }
    if (props.previous.sender.id !== props.sender.id) {
      return true;
    }
    if (isSameHourAndMinute(props.previous.create_at, props.create_at)) {
      return false;
    }
    return true;
  };

  return (
    <View style={styles.containerMessageStyle}>
      {hasToShowName() && (
        <Text style={styles.userNameStyle}>{props.sender.name}</Text>
      )}
      {props.children}
      {hasToShowTime() && (
        <Text>{parseMessage(moment(props.create_at).format('HH:mm'))}</Text>
      )}
    </View>
  );
};

const styles = {
  containerMessageStyle: {},
  userNameStyle: {
    fontWeight: 'bold',
  },
};
