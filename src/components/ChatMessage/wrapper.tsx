import React from 'react';
import {IChatMessageProps} from '.';
import {isSameHourAndMinute, parseMessage} from '../../helpers';
import {View, Text} from 'react-native';
import moment from 'moment';

export const ChatMessageGroup: React.FC<IChatMessageProps> = (props) => {
  const hasToShowTime = () => {
    return (
      !props.next ||
      (props.next.sender_id === props.sender_id &&
        !isSameHourAndMinute(props.next.created_at, props.created_at))
    );
  };

  const hasToShowName = (): boolean => {
    if (props.previous === null) {
      return true;
    }
    if (props.previous.sender_id !== props.sender_id) {
      return true;
    }
    if (isSameHourAndMinute(props.previous.created_at, props.created_at)) {
      return false;
    }
    if (!props.sender || !props.sender?.name) {
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
        <Text>{parseMessage(moment(props.created_at).format('HH:mm'))}</Text>
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
