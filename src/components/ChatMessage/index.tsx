import React from 'react';
import {IMessage} from '../../services/models';
import {View, Text, Image} from 'react-native';
import {parseMessage, decode, isSameHourAndMinute} from '../../helpers';
import moment from 'moment';
import {getBChatSetup, getUserInfo} from '../../services/requests';

interface IChatMessageProps extends IMessage {
  previous?: IMessage;
  next?: IMessage;
}

enum MessageType {
  Text,
  Image,
  Favorite,
}
const messageFactory = (message: IMessage): MessageType => {
  if (message.text.startsWith('/img_url')) return MessageType.Image;
  if (message.text.startsWith('/favourite')) {
    return MessageType.Favorite;
  }
  return MessageType.Text;
};

const ChatMessageGroup: React.FC<IChatMessageProps> = (props) => {
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

const ChatMessageBuilder = (props: IChatMessageProps) => {
  switch (messageFactory(props)) {
    case MessageType.Image:
      return (
        <ChatMessageGroup {...props}>
          <ChatImageMessage {...props} />
        </ChatMessageGroup>
      );
    case MessageType.Favorite:
    case MessageType.Text:
    default:
      return (
        <ChatMessageGroup {...props}>
          <ChatTextMessage {...props} />
        </ChatMessageGroup>
      );
  }
};

const ChatTextMessage: React.FC<IChatMessageProps> = (props) => {
  return <Text> {parseMessage(props.text)}</Text>;
};

const styles = {
  containerMessageStyle: {},
  userNameStyle: {
    fontWeight: 'bold',
  },
};

const ChatImageMessage: React.FC<IChatMessageProps> = ({text}) => {
  const base64 = decode(text).replace('/img_url ', '');
  return (
    <>
      <Image
        style={{width: 200, height: 200}}
        width={200}
        height={200}
        source={{uri: base64}}
      />
    </>
  );
};
export default ChatMessageBuilder;
