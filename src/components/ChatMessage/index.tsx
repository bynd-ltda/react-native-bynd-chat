import React from 'react';
import {IMessage} from '../../services/models';
import {ChatMessageBuilder} from './builder';

export interface IChatMessageProps extends IMessage {
  previous?: IMessage;
  next?: IMessage;
}

export default ChatMessageBuilder;
