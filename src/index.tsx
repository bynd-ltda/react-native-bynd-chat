import React, {useState, useEffect} from 'react';
import Chat from './chat';
import {Text, SafeAreaView} from 'react-native';
import {getBChatSetup, initBChat, getChatList} from './services/requests';
import ChatListComponent from './components/ChatList';
import ChatDetailComponent from './components/ChatDetail';
import {IChat} from './services/models';
import {useChatList} from './hooks';

interface IBChatProps {
  server_key: string;
  user_id: number;
  base_url: string;
}

export const BChatList: React.FC<IBChatProps> = (props) => {
  return (
    <SafeAreaView>
      <ChatListComponent />
    </SafeAreaView>
  );
};

interface IBChatDetail {
  chat: IChat;
}

export const BChatDetail: React.FC<IBChatDetail> = (props) => {
  return (
    <SafeAreaView>
      <ChatDetailComponent />
    </SafeAreaView>
  );
};

export default BChatList;
