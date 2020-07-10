import React from 'react';
import {IMessage} from '../../services/models';
import {View, Text, Image} from 'react-native';
import {parseMessage, decode} from '../../helpers';

interface IChatMessageProps extends IMessage {}

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

const ChatMessageBuilder = (props: IChatMessageProps) => {
  switch (messageFactory(props)) {
    case MessageType.Image:
      return <ChatImageMessage {...props} />;
    case MessageType.Favorite:
    case MessageType.Text:
    default:
      return <ChatTextMessage {...props} />;
  }
};

const ChatTextMessage: React.FC<IChatMessageProps> = (props) => {
  return <Text>{parseMessage(props.text)}</Text>;
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
