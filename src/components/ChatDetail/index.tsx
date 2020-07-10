import React from 'react';
import {useMessages, useLoading} from '../../hooks';
import {IChat, IMessage} from '../../services/models';
import {useRoute} from '@react-navigation/native';

import {FlatList, Text, SafeAreaView} from 'react-native';
import ChatMessage from '../ChatMessage';

interface IChatDetailProps {}

const ChatDetailComponent: React.FC<IChatDetailProps> = (props) => {
  const route = useRoute();
  const chat = route.params as IChat;
  const [pending, togglePending] = useLoading();
  const [messages, reload] = useMessages(chat, togglePending, togglePending);
  return (
    <SafeAreaView>
      <FlatList<IMessage>
        data={messages}
        renderItem={({item}) => <ChatMessage {...item} />}
        refreshing={pending}
        onRefresh={reload}
      />
    </SafeAreaView>
  );
};

export default ChatDetailComponent;
