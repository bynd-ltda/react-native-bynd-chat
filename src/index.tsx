import React, {useState, useEffect} from 'react';
import Chat from './chat';
import {Text, SafeAreaView} from 'react-native';
import {getBChatSetup, initBChat, getChatList} from './services/requests';
import ChatListComponent from './components/ChatList';
import {IChat} from './services/models';
import {useChatList} from './hooks';

interface IBChatProps {
  server_key: string;
  user_id: number;
}

const BChatList: React.FC<IBChatProps> = (props) => {
  initBChat({server_key: 'Bynd2020!', user_id: 'abraao@bynd.com.br'});

  return (
    <SafeAreaView>
      <ChatListComponent />

      <Text>Chat</Text>
    </SafeAreaView>
  );
};

export default BChatList;
