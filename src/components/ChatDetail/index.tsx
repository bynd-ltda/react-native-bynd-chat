import React from 'react';
import {useMessages, useLoading} from '../../hooks';
import {IChat, IMessage} from '../../services/models';
import {useRoute} from '@react-navigation/native';

import {FlatList, Text, SafeAreaView, SectionList} from 'react-native';
import ChatMessage from '../ChatMessage';
import {sectionsFrom, previous} from '../../helpers';
import moment from 'moment';
import ChatMessageInput from '../ChatMessageInput';

interface IChatDetailProps {}

const ChatDetailComponent: React.FC<IChatDetailProps> = (props) => {
  const route = useRoute();
  const chat = route.params as IChat;
  const [pending, togglePending] = useLoading();
  const [messages, reload, send] = useMessages(
    chat,
    togglePending,
    togglePending,
  );
  const sections = sectionsFrom<IMessage>(
    messages,
    (message) => moment(message.create_at).format('YYYY-MM-DD'),
    (section) => moment(section).format('L'),
  );
  return (
    <SafeAreaView>
      <SectionList<IMessage>
        sections={sections}
        renderSectionHeader={({section: {title}}) => <Text>{title}</Text>}
        keyExtractor={(item, key) => `${item.id} + ${key}`}
        renderItem={({item, section, index}) => (
          <ChatMessage
            {...item}
            next={index < section.data.length ? section.data[index + 1] : null}
            previous={index > 0 ? section.data[index - 1] : null}
          />
        )}
        refreshing={pending}
        onRefresh={reload}
      />
      <ChatMessageInput onSubmit={send} />
    </SafeAreaView>
  );
};

export default ChatDetailComponent;
