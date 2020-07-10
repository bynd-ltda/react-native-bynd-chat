import {IMessage} from '../../services/models';
import React from 'react';
import {IChatMessageProps} from '.';
import {ChatImageMessage} from './image';
import {ChatTextMessage} from './text';
import {ChatMessageGroup} from './wrapper';

enum MessageType {
  Text,
  Image,
  Favorite,
}

export const messageFactory = (message: IMessage): MessageType => {
  if (message.text.startsWith('/img_url')) return MessageType.Image;
  if (message.text.startsWith('/favourite')) {
    return MessageType.Favorite;
  }
  return MessageType.Text;
};

export const ChatMessageBuilder = (props: IChatMessageProps) => {
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
