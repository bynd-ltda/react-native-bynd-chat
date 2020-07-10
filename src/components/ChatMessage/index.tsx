import React from 'react';
import {IMessage, IUser} from '../../services/models';
import {ChatMessageBuilder} from './builder';

export interface IChatMessageProps extends IMessage {
  sender: IUser;
  previous?: IMessage;
  next?: IMessage;
}

export default ChatMessageBuilder;
