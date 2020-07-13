import React from 'react';
import {SafeAreaView} from 'react-native';
import ChatListComponent from './components/ChatList';
import ChatDetailComponent from './components/ChatDetail';
import ChatCreateComponent from './components/ChatCreate';
import ChatCreateConfirmComponent from './components/ChatCreateConfirm';
import {IChat} from './services/models';

interface IBChatProps {
  server_key: string;
  user_id: number;
  base_url: string;
}

export const BChatList: React.FC<IBChatProps> = () => {
  return (
    <SafeAreaView>
      <ChatListComponent />
    </SafeAreaView>
  );
};

export const BChatCreate: React.FC<IBChatProps> = () => {
  return (
    <SafeAreaView>
      <ChatCreateComponent />
    </SafeAreaView>
  );
};

export const BChatCreateConfirm: React.FC<IBChatProps> = () => {
  return (
    <SafeAreaView>
      <ChatCreateConfirmComponent />
    </SafeAreaView>
  );
};

interface IBChatDetail {
  chat: IChat;
}

export const BChatDetail: React.FC<IBChatDetail> = () => {
  return (
    <SafeAreaView>
      <ChatDetailComponent />
    </SafeAreaView>
  );
};

export default BChatList;
