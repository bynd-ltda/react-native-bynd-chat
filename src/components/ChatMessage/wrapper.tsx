import React from 'react';
import {IChatMessageProps} from '.';
import {isSameHourAndMinute, parseMessage} from '../../helpers';
import {View, Text} from 'react-native';
import moment from 'moment';

export const ChatMessageGroup: React.FC<IChatMessageProps> = (props) => {
  const hasToShowTime = () => {
    return true
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
    if (!props.sender) {
      return false;
    }
    return true;
  };

  return (
    <View>
    {hasToShowName() && (
        <Text style={styles.userNameStyle}>{props?.sender?.name}</Text>
      )}
    <View style={styles.containerMessageStyle}>
      <View style={styles.textWrapper}>
        <View style={styles.textBubble}>
          <View style={styles.textContainer}>
            {props.children}
          </View>
        </View>
        {hasToShowTime() && (
         <Text style={styles.timeBubble}>{parseMessage(moment(props.created_at).format('HH:mm'))}</Text>
        )}
      </View>
    </View>
    </View>
  );
};



const styles = {
  containerMessageStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  textWrapper:{
    flexDirection:'column',
    backgroundColor: '#9F66C0',
    alignItems:'flex-end',
    padding: 8,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    borderBottomLeftRadius:30,
    marginTop:4,
    marginBottom:4, 
    minWidth: 100
  },
  textBubble:{
    flexDirection: 'row'
    
  },
  timeBubble: {
    color: 'white',
    fontSize: 11
  },
  textContainer:{
    flexWrap: 'wrap',
    justifyContent:'flex-end',
    flexShrink:1,
    margin: 12,
    marginBottom:8 
  },
  userNameStyle: {
    fontWeight: 'bold',
    textAlign: 'right'
  },
};
