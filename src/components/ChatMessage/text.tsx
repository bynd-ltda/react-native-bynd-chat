import React from 'react';
import {parseMessage} from '../../helpers';
import {Text, StyleSheet, View} from 'react-native';
import {IChatMessageProps} from '.';
import { BackgroundColor } from '../../chat/styles';
import { getUser } from '../../services/requests';

export const ChatTextMessage: React.FC<IChatMessageProps> = (props) => {
  const isMe = () => {
    return getUser().id === props?.sender?.id

  }
  const styles = isMe() ? stylesPurple: stylesBlack
  return <View style={styles.textBubble}>
            <View style={styles.textContainer}>
              <Text style={styles.text}> {parseMessage(props.text)}</Text>
            </View>
          </View>
};


const stylesPurple = StyleSheet.create({
    text: {
      fontSize: 16,
      color:'white',

    }, 
    textBubble:{
      flexDirection: 'row',

    },
    timeBubble: {
      color: 'white',
      fontSize: 11
    },
    textContainer:{
      justifyContent:'flex-end',
      flexShrink:1,
      margin: 12,
      marginBottom:8 
    },
    userNameStyle: {
      fontWeight: 'bold',
      textAlign: 'right'
    },
})

const stylesBlack = StyleSheet.create({
  text: {
    fontSize: 16,
    color:'black',
    
  },
  textBubble:{
    flexDirection: 'row'
  },
  timeBubble: {
    color: 'white',
    fontSize: 11
  },
  textContainer:{

    justifyContent:'flex-start',
    flexShrink:1,
    margin: 12,
    marginBottom:8 
  },
  userNameStyle: {
    fontWeight: 'bold',
    textAlign: 'left'
  },
})
