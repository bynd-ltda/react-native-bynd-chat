import React from 'react';
import {SafeAreaView} from 'react-native';
import ChatListComponent from './components/ChatList';
import ChatDetailComponent from './components/ChatDetail';
import {IChat} from './services/models';

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
