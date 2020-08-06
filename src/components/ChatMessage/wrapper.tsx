import React from 'react';
import {IChatMessageProps} from '.';
import {isSameHourAndMinute, parseMessage} from '../../helpers';
import {View, Text} from 'react-native';
import moment from 'moment';
import { getUser, getBChatSetup } from '../../services/requests';
import { useRoute } from '@react-navigation/native';

export const ChatMessageGroup: React.FC<IChatMessageProps> = (props) => {
  
  const isMe = () => {
    return getUser().id === props?.sender?.id

  }

  const hasToShowTime = () => {

    return (
      !props.next ||
      (props.next.sender_id === props.sender_id &&
        !isSameHourAndMinute(props.next.created_at, props.created_at))
    );
  };



  const hasToShowName = (): boolean => {
    if(isMe()){
      return false
    }
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

  const styles = isMe() ? stylesPurple: stylesGray

  return (
    <View>
    {hasToShowName() && (
        <Text style={styles.userNameStyle}>{props?.sender?.name}</Text>
      )}
    <View style={styles.containerMessageStyle}>
      <View style={styles.textWrapper}>
          {props.children}
      

         <Text style={styles.timeBubble}>{parseMessage(moment(props.created_at).format('HH:mm'))}</Text>

        </View>
      </View>
    </View>
  );
};



const stylesPurple = {
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

  timeBubble: {
    color: 'white',
    fontSize: 11
  },
  userNameStyle: {
    fontWeight: 'bold',
    textAlign: 'right'
  },
};


const stylesGray = {
  containerMessageStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  textWrapper:{
    flexDirection:'column',
    alignItems:'flex-start',
    padding: 8,
    backgroundColor:'#D3D3D3',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    borderBottomRightRadius:30,
    marginTop:4,
    marginBottom:4, 
    minWidth: 100
  },
  textBubble:{
    color:'red'
  },
  timeBubble: {
    color: '#8E8E8E',
    fontSize: 11,
    marginLeft: 12,
  },
  textContainer:{
    flexWrap: 'wrap',
    justifyContent:'flex-start',
    flexShrink:1,
    margin: 12,
    marginBottom:8 
  },
  userNameStyle: {
    fontWeight: 'bold',
    textAlign: 'left'
  },
}